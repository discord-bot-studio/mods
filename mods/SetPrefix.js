module.exports = {
    name: "SetPrefix",
    author: ["aoe#4851"],
    version: "1.0.0",
    changelog: "Added SetPrefix Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function(data) {
        return `
    <div class="form-group">
        <label>Action: *</label>
        <select name="main" id="main" class="form-control" required>
            <option value="setPrefix">Set the Prefix [Takes all Arguments and sets the Prefix for the Server]</option>
            <option value="removePrefix">Remove the Prefix [Removes the Prefix from the Server]</option>
            <option value="getPrefix">Save Prefix to Variabel [Saves the Server Prefix to a Variabel]</option>
        </select><br>
    </div>
        <div class="row" id="vtype">
        <div class="col">
        <label>Variable Type *</label>
        <select name="vartype" class="form-control">
            <option value="temp">Temp Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select><br>
    </div>
    <div class="col">
            <label>Variable Name *</label>
            <input class="form-control" name="varname"></input><br>
        </div>
    </div>
    <hr>
    <p>The Prefix you put in at the Setup Page is the default Prefix!</P>
    <p>Make sure you are running in CMD!</p>

    <script>
    $(function() {
        $("#vtype").hide();
        check()
        $('#main').change(() => {
            check()
        });
    })
    function check() {
        if ($('#main').val() == "getPrefix") {
            $("#vtype").show()
        } else {
            $("#vtype").hide()
        }
    }
    </script>
        `;
    },
    init: async function(DBS) {
        const { join } = require("path")
        const { execSync } = require("child_process")
        console.log(`[SetPrefix Mod] Successfully Installed discord-prefix`)
        console.log(`[SetPrefix Mod] Re-/Installing better-sqlite3`)
        const cliiCommand = 'npm install better-sqlite3 --save';
        await execSync(cliiCommand, {
            cwd: join(__dirname),
            stdio: [0, 1, 2]
        });
        console.log("Loaded SetPrefix Mod ~ aoe#9022");
        const fs = require('fs') 
        
        process.send(`[SetPrefix Mod] Consider Running through CMD! ~ aoe#4851`)
            
        // Data which will write in a file. 
        let data = `
        /* External Modules */
        const Discord = require("discord.js");
        const fs = require("fs");
        const path = require("path");
        const AntiSpam = require("discord-anti-spam");
        const winston = require("winston");
        const flatted = require("flatted");
        // /* External Modules End */
        const packageName = "discord-prefix"
        const { join } = require("path")
        const { execSync } = require("child_process")
        console.log(\`[SetPrefix Mod] Re-/Installing discord-prefix\`)
        const cliCommand = 'npm install ' + packageName + ' --save';
        execSync(cliCommand, {
            cwd: join(__dirname),
            stdio: [0, 1, 2]
        });
        console.log(\`[SetPrefix Mod] Successfully Installed discord-prefix\`)
        const pref = require('discord-prefix');
        
        process.send = process.send || function () {}; // avoid error when no parent process
        
        const logger = winston.createLogger({
            level: "info",
            format: winston.format.json(),
            defaultMeta: { service: "user-service" },
            transports: [
                // - Write all logs with level \`error\` and below to \`botErrors.log\`
                // - Write all logs with level \`info\` and below to \`combined.log\`
                new winston.transports.File({
                    filename: path.join(__dirname, "/botErrors.log"),
                    level: "error",
                    format: winston.format.combine(
                        winston.format.timestamp({
                          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
                        }),
                        winston.format.json()
                      ),
                }),
                new winston.transports.File({ filename: "combined.log" }),
            ],
        });
        const DBS = {};
        DBS.Bot = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
        
        DBS.MsgHandler = require("./Handlers/Message");
        DBS.EventHandler = require("./Handlers/Events");
        DBS.usercache = require("./BotData/usercache");
        DBS.Cache = require("./BotData/varcache");
        DBS.Discord = Discord;
        
        DBS.SettingsFile = require("./BotData/Settings/Settings.json");
        DBS.RulesFile = require("./BotData/Settings/Rules.json");
        DBS.EventsFile = require("./BotData/commands/events");
        DBS.CommandsFile = require("./BotData/commands/commands");
        DBS.UserFile = __dirname + "/BotData/user/user.json";
        
        console.log(DBS.RulesFile.obj);
        DBS.antiSpam = new AntiSpam(DBS.RulesFile.obj);
        
        // Discord-Anti-Spam is broken so here's a temp fix
        DBS.antiSpam.options.warnEnabled = DBS.RulesFile.obj.warnEnabled;
        DBS.antiSpam.options.kickEnabled = DBS.RulesFile.obj.kickEnabled;
        DBS.antiSpam.options.banEnabled = DBS.RulesFile.obj.banEnabled;
        DBS.antiSpam.options.muteEnabled = false;
        DBS.antiSpam.options.errorMessages = false;
        DBS.antiSpam.options.verbose = false;
        
        DBS.Mods = new Map();
        
        DBS.loadMods = async function () {
            let dir = require("path").join(__dirname, "mods");
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            require("fs")
                .readdirSync(require("path").join(__dirname, "mods"))
                .forEach((mod) => {
                    const fetchedMod = require(require("path").join(__dirname, \`mods/$\{mod\}\`));
                    fetchedMod.init(DBS);
                    if (fetchedMod.isEvent) {
                        DBS.Bot.on(fetchedMod.name, fetchedMod.mod.bind(null, DBS.Bot));
                    } else if (fetchedMod.isResponse) {
                        DBS.Mods.set(fetchedMod.name, fetchedMod);
                    }
                });
        };
        
        DBS.checkMessage = async function (message) {
            // Made by aoe#4851
            const pref = require('discord-prefix');
        
            //if the server doesn't have a set prefix yet
            let defaultPrefix = DBS.SettingsFile.prefix;
            
            //stop code execution if message is received in DMs
            if (!message.guild) return;
        
            //get the prefix for the discord server
            let prefix = pref.getPrefix(message.guild.id);
        
            //set prefix to the default prefix if there isn't one
            if (!prefix) prefix = defaultPrefix;
            if (message.author.bot) return;
        
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Any Message", message.member);
                if (DBS.RulesFile.enabled) {
                    DBS.antiSpam.message(message);
                }
        
                if (!message.content.startsWith(prefix)) return;
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const command = args.shift();
                var hasPermission = false;
        
                for (const commandF of DBS.CommandsFile.command) {
                    if (commandF.name == command) {
                        if (!commandF.perms || commandF.perms.length === 0) {
                            hasPermission = true;
                        } else {
                            // Verify permissions
                            message.member.roles.cache.forEach((role) => {
                                commandF.perms.forEach((perm) => {
                                    if (role.name.toLowerCase() === perm.toLowerCase()) {
                                        // Only execute actions if permissions check passes
                                        hasPermission = true;
                                    }
                                });
                            });
                        }
        
                        if (hasPermission) {
                            if (commandF.actions.length > 0) {
                                DBS.callNextAction(commandF, message, args, 0);
                            }
                        }
                    }
        
                    fs.writeFileSync(
                        DBS.UserFile,
                        JSON.stringify(DBS.usercache.memoryCache, null, 2),
                        function (err) {
                            if (err) return console.log(err);
                        }
                    );
                    fs.writeFileSync(
                        __dirname + "/BotData/variables/servervars.json",
                        flatted.stringify(DBS.serverVars, null, 2),
                        function (err) {
                            if (err) return console.log(err);
                        }
                    );
                    fs.writeFileSync(
                        __dirname + "/BotData/variables/globalvars.json",
                        flatted.stringify(DBS.globalVars, null, 2),
                        function (err) {
                            if (err) return console.log(err);
                        }
                    );
                }
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Check Message: " + "[" + message.content + "] " + error.stack,
                });
            }
        };
        /**
         * Calls the action(response) at a given index, whether a mod or standard  message handler response
         */
        DBS.callNextAction = async function (command, message, args, index) {
            try {
                var action = command.actions[index];
                var fetchedAction;
                if (action) {
                    if (action.type) {
                        fetchedAction = DBS.Mods.get(action.type);
                    } else {
                        fetchedAction = null;
                    }
        
                    if (!fetchedAction) {
                        var msg = message;
                        msg.content = message.content.slice(DBS.SettingsFile.prefix.length);
                        DBS.MsgHandler.Message_Handle(DBS, msg, command, index, args);
                    } else {
                        fetchedAction.mod(DBS, message, action, args, command, index);
                    }
                }
                
        
                
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Call next action: " + "[" + message.content + "] " + error.stack,
                });
            }
        };
        
        /**
         * Calls the action(response) at a given index, whether a mod or standard event handler response
         */
        DBS.callNextEventAction = async function (type, varsE, index) {
            DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, index, type, varsE);
        };
        
        DBS.startBot = async function () {
            await DBS.Bot.login(DBS.SettingsFile.token)
            .then(value => {
                process.send("success");
            })
            .catch((e) => {
                DBS.logError({
                    level: "error",
                    message: "Bot login: " + e,
                });
                //process.send("Error: " + e);
            });
        
            DBS.CheckIfLoaded();
        };
        
        DBS.LoadedGuilds = [];
        
        DBS.CheckIfLoaded = async function () {
            DBS.Bot.guilds.cache.forEach((guild) => {
                if (guild.available) {
                    if (!DBS.LoadedGuilds.includes(guild.name)) {
                        DBS.LoadedGuilds.push(guild.name);
                        var serverObj = {};
                        serverObj.guild = guild;
                        DBS.callNextEventAction("Bot Initialization", serverObj, 0);
                    }
                } else {
                    setTimeout(DBS.CheckIfLoaded, 500);
                }
            });
        };
        
        DBS.loadBot = async function () {
            await DBS.loadMods().catch((e) => {
                DBS.logError({
                    level: "error",
                    message: "Loading mods: " + e,
                });
            });
            await DBS.startBot();
        };
        
        DBS.Bot.on("message", (message) => DBS.checkMessage(message));
        DBS.Bot.on("guildMemberAdd", (member) => {
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "User Joins Server", member);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild member add: " + error.stack,
                });
            }
        });
        DBS.Bot.on("guildMemberRemove", (member) => {
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "User Kicked", member);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild member remove: " + error.stack,
                });
            }
        });
        DBS.Bot.on("guildBanAdd", (guild, user) => {
            let banVars = {};
            banVars.guild = guild;
            banVars.user = user;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "User Banned", banVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild ban add: " + error.stack,
                });
            }
        });
        
        DBS.loadVars = async function () {
            DBS.serverVars = {};
            DBS.globalVars = {};
            try {
                var rawserverdata = fs.readFileSync(__dirname + "/BotData/variables/servervars.json");
                var serverdata = flatted.parse(rawserverdata);
            } catch (error) {
                var serverdata = {};
            }
        
            try {
                var rawglobaldata = fs.readFileSync(__dirname + "/BotData/variables/globalvars.json");
                var globaldata = flatted.parse(rawglobaldata);
            } catch (error) {
                var globaldata = {};
            }
        
            DBS.serverVars = serverdata;
            DBS.globalVars = globaldata;
        };
        
        DBS.loadVars();
        DBS.loadBot();
        
        /* If the UI program is closed, kill the bot so the process isn't left hanging */
        function cleanExit() {
            try {
                console.log("Killing bot");
                DBS.Bot.destroy();
                process.exit(0);
            } catch (error) {
                console.log(error);
            }
        }
        
        //process.on("SIGINT", cleanExit()); // catch ctrl-c
        //process.on("SIGTERM", cleanExit());
        
        process.on("message", (msg) => {
            if (msg.action === "STOP") {
                // Execute Graceful Termination code
                cleanExit();
            }
        });
        
        process.on('unhandledRejection', (error, p) => {
            DBS.logError({level: "error",
                        message: "Unhandled rejection: " + error.stack
            });
        });
        
        DBS.logError = async function(error) {
            logger.log(error);
            process.send(error.message);
            console.log(error.message);

        // Overwrite by aoe#4851
        };`
        if (fs.existsSync("../bot.js")) {
            fs.unlinkSync("../bot.js")
        } else {
        // Write new bot.js file with given data . 
        fs.writeFile('bot.js', data, (err) => { 
            console.log(`[SetPrefix Mod] Re-/Replacing code in the bot.js file [Made by aoe#4851]`)
            if (!err == null) console.log(err);
        }) 
        }
        process.title = `${__dirname}`
        console.log('\x1b[33m' + '[SetPrefix Mod] If this is your first Time seeing this Message restart the Bot!', '\x1b[0m')
    },
    mod: function(DBS, message, action, args, command, index) {
        const prefix = require('discord-prefix');
        switch(action.main) {
            case "setPrefix":
                const pref = args[0]
                const guild1 = message.guild
                prefix.setPrefix(pref, guild1.id);
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "removePrefix":
                const guild2 = message.guild
                prefix.removePrefix(guild2.id)
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "getPrefix":
                const guild = message.guild
                const varName = action.varname
                const gotPrefix = prefix.getPrefix(guild.id)
                switch(action.vartype) {
                    case "temp":
                        DBS.Cache[guild.id].variables[varName] = gotPrefix;
                    break
                    case "server":
                        DBS.serverVars[guild.id][varName] = gotPrefix;
                    break
                    case "global":
                        DBS.globalVars[guild.id][varName] = gotPrefix;
                    break
                }
                DBS.callNextAction(command, message, args, index + 1);
            break
                }
        }
};
