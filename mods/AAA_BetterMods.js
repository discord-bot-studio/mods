module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "AAA_Better Mods",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.2",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Fixed getDescandantProp is not defined ~ PlayboyPrime",

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
            let dbsVars = {}
            dbsVars["CommandAuthor"] = msg.member
            dbsVars["CommandChannel"] = msg.channel
            dbsVars["CommandMessage"] = msg
            dbsVars["guild"] = msg.guild
            dbsVars["DefaultChannel"] = Array.from(msg.guild.channels).sort((a,b) => a.calculatedPosition - b.calculatedPosition)[0]
            let tempVars = DBS.Cache[msg.guild.id].variables
            let serverVars = DBS.serverVars[msg.guild.id]
            let globalVars = DBS.globalVars[msg.guild.id]
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
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {}
};
