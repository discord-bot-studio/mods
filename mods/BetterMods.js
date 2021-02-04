module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Better Mods",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Better Mods ~ Great Plains Modding",

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
        return `
        `;
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

                const cliCommand = 'npm install ' + packageName + ' --save';
                await execSync(cliCommand, {
                    cwd: join(__dirname),
                    stdio: [0, 1, 2]
                });

                DBS.BetterMods.Logger.warn(`[DBS Module Installer] - Successfully Installed ${packageName}. Note you may need to restart your bot.`);
                const modulePath = join(__dirname, "../node_modules", packageName);
                return require(modulePath);
            };
        };

        DBS.BetterMods.parseAction = function(string, msg) {
            let newVal = string;

            if (msg) {
                newVal = newVal.replace("$$CommandChannel$$", msg.channel.name)
                .replace("$$CommandAuthor$$", msg.author.id)
                .replace("$$AuthorDisplayName$$", msg.member.displayName)
                .replace("$$AuthorAvatar$$", msg.author.avatarURL)
                // .replace("$$DefaultChannel$$", Functions.getDefaultChannel(msg.guild))
                .replace("$$ServerIcon$$", msg.guild.iconURL)
                .replace("$$MemberCount$$", msg.guild.memberCount.toString())
                .replace("$$JoinedAt$$", msg.guild.joinedAt.toString())
                .replace("$$ServerName$$", msg.guild.name)
                // .replace("$$ServerOwner$$", msg.guild.owner.id)
                .replace("$$ServerRegion$$", msg.guild.region)
                .replace("${dbsVars.CommandAuthor.user.dmChannel}", "@@MSG_AUTHOR@@")
                .replace("$$VerificationLevel$$", msg.guild.verificationLevel.toString())
                .replace("${dbsVars.CommandAuthor.user.avatarURL}", msg.member.user.displayAvatarURL());
            };

            newVal = newVal.replace(/\${(.*?)}/g, (d) => {
                const match = d.slice(2, d.toString().length - 1);
                if (match.includes("tempVars.")) return DBS.Cache[msg.guild.id].variables[match.split(".")[1]];
                if (match.includes("serverVars.")) return DBS.serverVars[msg.guild.id][match.split(".")[1]];
                if (match.includes("globalVars.")) return DBS.globalVars[msg.guild.id][match.split(".")[1]];
            });

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
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {

    }
};