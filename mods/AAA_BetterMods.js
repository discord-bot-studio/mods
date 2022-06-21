module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "AAA_Better Mods",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.4",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Fixed an issue with the bot not responding to default events.",

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

        DBS.Bot.on("messageCreate", message => DBS.checkMessage(message));
        DBS.Bot.on("guildMemberAdd", member => {
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "User Joins Server", member);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild member add: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildMemberRemove", member => {
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "User Kicked", member);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild member remove: " + error.stack
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
                    message: "Guild ban add: " + error.stack
                });
            }
        });
        DBS.Bot.on("channelCreate", channel => {
            let channelVars = {};
            channelVars.guild = channel.guild;
            channelVars.channel = channel;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Channel Create", channelVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Channel create: " + error.stack
                });
            }
        });
        DBS.Bot.on("channelDelete", channel => {
            let channelVars = {};
            channelVars.guild = channel.guild;
            channelVars.channel = channel;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Channel Delete", channelVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Channel delete: " + error.stack
                });
            }
        });
        DBS.Bot.on("channelPinsUpdate", (channel, time) => {
            let channelVars = {};
            channelVars.guild = channel.guild;
            channelVars.channel = channel;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Channel Pins Update", channelVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Channel pins update: " + error.stack
                });
            }
        });
        DBS.Bot.on("channelUpdate", (oldchannel, newchannel) => {
            let channelVars = {};
            channelVars.guild = newchannel.guild;
            channelVars.oldchannel = oldchannel;
            channelVars.newchannel = newchannel;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Channel Update", channelVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Channel update: " + error.stack
                });
            }
        });
        DBS.Bot.on("emojiCreate", emoji => {
            let emojiVars = {};
            emojiVars.guild = emoji.guild;
            emojiVars.emoji = emoji;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Emoji Create", emojiVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Emoji create: " + error.stack
                });
            }
        });
        DBS.Bot.on("emojiDelete", emoji => {
            let emojiVars = {};
            emojiVars.guild = emoji.guild;
            emojiVars.emoji = emoji;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Emoji Delete", emojiVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Emoji delete: " + error.stack
                });
            }
        });
        DBS.Bot.on("emojiUpdate", (oldemoji, newemoji) => {
            let emojiVars = {};
            emojiVars.guild = newemoji.guild;
            emojiVars.oldemoji = oldemoji;
            emojiVars.newemoji = newemoji;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Emoji Update", emojiVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Emoji update: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildBanRemove", (guild, user) => {
            let emojiVars = {};
            emojiVars.guild = guild;
            emojiVars.user = user;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Ban Remove", emojiVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild ban remove: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildCreate", guild => {
            let guildVars = {};
            guildVars.guild = guild;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Create", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild create: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildDelete", guild => {
            let guildVars = {};
            guildVars.guild = guild;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Delete", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild delete: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildMemberAvailable", member => {
            let guildVars = {};
            guildVars.guild = member.guild;
            guildVars.member = member;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Member Available", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild member available: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildMemberSpeaking", (member, speaking) => {
            let guildVars = {};
            guildVars.guild = member.guild;
            guildVars.member = member;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Member Speaking", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild member speaking: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildMemberUpdate", (oldmember, newmember) => {
            let guildVars = {};
            guildVars.guild = newmember.guild;
            guildVars.oldmember = oldmember;
            guildVars.newmember = newmember;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Member Update", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild member update: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildUnavailable", guild => {
            let guildVars = {};
            guildVars.guild = guild;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Unavailable", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild unavailable: " + error.stack
                });
            }
        });
        DBS.Bot.on("guildUpdate", (oldguild, newguild) => {
            let guildVars = {};
            guildVars.guild = newguild;
            guildVars.oldguild = oldguild;
            guildVars.newguild = newguild;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Guild Update", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Guild update: " + error.stack
                });
            }
        });
        DBS.Bot.on("messageDelete", message => {
            console.log("message deleted");
            let guildVars = {};
            guildVars.guild = message.guild;
            guildVars.message = message;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Message Delete", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Message delete: " + error.stack
                });
            }
        });
        DBS.Bot.on("messageUpdate", (oldmessage, newmessage) => {
            let guildVars = {};
            guildVars.guild = newmessage.guild;
            guildVars.newmessage = newmessage;
            guildVars.oldmessage = oldmessage;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Message Update", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Message update: " + error.stack
                });
            }
        });
        DBS.Bot.on("roleCreate", role => {
            let guildVars = {};
            guildVars.guild = role.guild;
            guildVars.role = role;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Role Create", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Role create: " + error.stack
                });
            }
        });
        DBS.Bot.on("roleDelete", role => {
            let guildVars = {};
            guildVars.guild = role.guild;
            guildVars.role = role;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Role Delete", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Role delete: " + error.stack
                });
            }
        });
        DBS.Bot.on("roleUpdate", (oldrole, newrole) => {
            let guildVars = {};
            guildVars.guild = newrole.guild;
            guildVars.oldrole = oldrole;
            guildVars.newrole = newrole;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Role Update", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Role update: " + error.stack
                });
            }
        });
        DBS.Bot.on("typingStart", (typing) => {
            let guildVars = {};
            guildVars.guild = typing.channel.guild;
            guildVars.channel = typing.channel;
            guildVars.user = typing.user;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Typing Start", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Typing start: " + error.stack
                });
            }
        });
        DBS.Bot.on("userUpdate", (olduser, newuser) => {
            let guildVars = {};
            guildVars.guild = newuser.guild;
            guildVars.olduser = olduser;
            guildVars.newuser = newuser;
            try {
                DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "User Update", guildVars);
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "User Update: " + error.stack
                });
            }
        });
        DBS.Bot.on("interactionCreate", async interaction => {
            let guildVars = {};
            guildVars.guild = interaction.guild;
            try {
                if (interaction.isButton()) {
                    await interaction.deferReply({ephemeral: DBS.buttons[interaction.customId]["ephemeral"]});
                    guildVars.buttoninteraction = interaction;
                    DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Button Interaction", guildVars);
                } else if (interaction.isSelectMenu()) {
                    console.log(DBS.selects);
                    await interaction.deferReply({ephemeral: DBS.selects[interaction.customId]["ephemeral"]});
                    guildVars.selectinteraction = interaction;
                    DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Select Interaction", guildVars);
                }
                else {
                    //interaction.followUp({ content: "hello" });
                    await interaction.deferReply({ephemeral: DBS.slashCommands[interaction.commandName]["ephemeral"]});
                    guildVars.commandinteraction = interaction;
                    DBS.EventHandler.Event_Handle(DBS, DBS.EventsFile, 0, "Command Interaction", guildVars);
                }
            } catch (error) {
                DBS.logError({
                    level: "error",
                    message: "Interaction Create: " + error.stack
                });
            }
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
            for (let i = 0; i < (command.actions || []).length; i++) {
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
