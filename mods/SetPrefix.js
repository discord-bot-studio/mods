module.exports = {
    name: "SetPrefix",
    author: ["aoe#4851"],
    version: "2.0.0",
    changelog: "Updated SetPrefix Mod ~ aoe#4851",
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
        const fs = require("fs");
        await DBS.BetterMods.requireModule("better-sqlite3");
        const flatted = await DBS.BetterMods.requireModule("flatted");
        const pref = await DBS.BetterMods.requireModule('discord-prefix');
        console.log("Loaded SetPrefix Mod ~ aoe#9022");

        DBS.checkMessage = async function (message) {
            const prefix = pref.getPrefix(message.guild.id) || DBS.SettingsFile.prefix;
            if (message.author.bot) return;
        
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Any Message", message.member);
                if (DBS.RulesFile.enabled) DBS.antiSpam.message(message);
        
                if (!message.content.startsWith(prefix)) return;
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const command = args.shift();
                let hasPermission = false;
        
                for (const commandF of DBS.CommandsFile.command) {
                    if (commandF.name == command) {
                        if (!commandF.perms || commandF.perms.length === 0) {
                            hasPermission = true;
                        } else {
                            message.member.roles.cache.forEach((role) => {
                                commandF.perms.forEach((perm) => {
                                    if (role.name.toLowerCase() === perm.toLowerCase())  hasPermission = true;
                                });
                            });
                        };
        
                        if (hasPermission && commandF.actions.length > 0) DBS.callNextAction(commandF, message, args, 0);
                    };
                };

                fs.writeFileSync(
                    DBS.UserFile,
                    JSON.stringify(DBS.usercache.memoryCache, null, 2),
                    function (err) {
                        if (err) return console.log(err);
                    }
                );
                fs.writeFileSync(
                    __dirname + "/../BotData/variables/servervars.json",
                    flatted.stringify(DBS.serverVars, null, 2),
                    function (err) {
                        if (err) return console.log(err);
                    }
                );
                fs.writeFileSync(
                    __dirname + "/../BotData/variables/globalvars.json",
                    flatted.stringify(DBS.globalVars, null, 2),
                    function (err) {
                        if (err) return console.log(err);
                    }
                );
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Check Message: " + "[" + message.content + "] " + error.stack,
                });
            };
        };
    },
    mod: async function(DBS, msg, action, args, command, index) {
        const prefix = await DBS.BetterMods.requireModule('discord-prefix');

        switch(action.main) {
            case "setPrefix":
                prefix.setPrefix(args[0], msg.guild.id);
                DBS.callNextAction(command, msg, args, index + 1);
            break
            case "removePrefix":
                prefix.removePrefix(msg.guild.id);
                DBS.callNextAction(command, msg, args, index + 1);
            break
            case "getPrefix":
                DBS.BetterMods.saveVar(action.vartype, action.varname, prefix.getPrefix(msg.guild.id) || DBS.SettingsFile.prefix, msg.guild);
                DBS.callNextAction(command, msg, args, index + 1);
            break
        };
    }
};
