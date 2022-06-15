module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "AAA_Better Mods",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.3",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Added event support",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: false,

    // Set this to true if this will be a response mod.
    isMod: false,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return ``;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        const { join } = require("path")
        const { execSync } = require("child_process")

        DBS.BetterMods = {};
        DBS.BetterMods.Logger = {
            error: (msg) => console.log('\x1b[31m' + msg, '\x1b[0m'),
            success: (msg) => console.log('\x1b[32m' + msg, '\x1b[0m'),
            warn: (msg) => console.log('\x1b[33m' + msg, '\x1b[0m')
        };

        DBS.BetterMods.requireModule = async function(packageName) {
            try {
                const modulePath = join(__dirname, "../node_modules", packageName);
                return require(modulePath);
            } catch (e) {
                DBS.BetterMods.Logger.warn(`[DBS Module Installer] - Installing ${packageName}`);

                try {
                    const cliCommand = 'npm install ' + packageName + ' --save';
                    await execSync(cliCommand, {
                        cwd: join(__dirname),
                        stdio: [0, 1, 2]
                    });
    
                    DBS.BetterMods.Logger.warn(`[DBS Module Installer] - Successfully Installed ${packageName}. Note you may need to restart your bot.`);
                    const modulePath = join(__dirname, "../node_modules", packageName);
                    return require(modulePath);
                } catch (error) {
                    console.log(error);
                    DBS.BetterMods.Logger.warn(`[DBS Module Installer] - We ran into an error installing ${packageName}.`);
                    return null;
                };
            };
        };

        DBS.BetterMods.parseAction = function(string, msg) {
            let tempVars = DBS.Cache[msg.guild.id].variables
            let serverVars = DBS.serverVars[msg.guild.id]
            let globalVars = DBS.globalVars[msg.guild.id]

            let dbsVars = {
                CommandAuthor: msg.member,
                CommandChannel: msg.channel,
                CommandMessage: msg,
                guild: msg.guild,
                DefaultChannel: Array.from(msg.guild.channels).sort((a,b) => a.calculatedPosition - b.calculatedPosition)[0],
            }

            let vars = {
                tempVars: tempVars,
                serverVars: serverVars,
                globalVars: globalVars,
                dbsVars: dbsVars,
            }

            let varRegex = /\${(.*?)}/g;
            let newVal = string;

            for(let i = 0; i <string.match(varRegex)?.length; i++){
                newVal = newVal.replace(string.match(varRegex)[i],getDescendantProp(vars,string.match(varRegex)[i].split("${").join("").split("}").join("")))
            }

            return newVal
        }

        DBS.BetterMods.saveVar = function(type, varName, data, guild) {
            switch(type) {
                case "temp":
                    DBS.Cache[guild.id].variables[varName] = data;
                break
                case "server":
                    DBS.serverVars[guild.id][varName] = data;
                break
                case "global":
                    DBS.globalVars[guild.id][varName] = data;
                break
            }
        }

        DBS.BetterMods.getVar = function(type, varName, guild) {
            switch(type) {
                case "temp":
                    return DBS.Cache[guild.id].variables[varName];
                case "server":
                    return DBS.serverVars[guild.id][varName];
                case "global":
                    return DBS.globalVars[guild.id][varName];
            }
        }

        function getDescendantProp(obj, desc) {
            var arr = desc.split(".");
            while (arr.length) {
                obj = obj[arr.shift()];
            }
            return obj;
        }

        // Update DBS Intents
        const { Client, Intents } = require('discord.js');

        DBS.Bot = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
            partials: [
                'CHANNEL', // Required to receive DMs
            ]
        });

        // Event Extension Handler
        DBS.Cache["BetterMods"] = {}  
        
        const EventExtension = [];
        require("fs")
        .readdirSync(__dirname)
        .forEach(mod => {
            const fetchedMod = require(`${__dirname}/${mod}`);
            if (fetchedMod.BetterMods) {
                if (fetchedMod.BetterMods.isEvent) {
                    EventExtension[fetchedMod.name] = fetchedMod;
                }
            }
        });

        for (let command of DBS.CommandsFile.command) {
            for (let i = 0; i < command.actions.length; i++) {
                const data = EventExtension[command.actions[i].type];

                if (data) {
                    DBS.Bot.on(data.BetterMods.event, (...args) => {
                        data.mod(DBS, command, "Type:BetterMods:Trigger", ...args)
                    })
                }
            }
        }
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {}
};
