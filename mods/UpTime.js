const { error } = require("console");

module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Up Time",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Big D#1129"],

    // Place the version of the mod here.
    version: "0.1.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Added up time command",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label>Collect *</label>
                    <select name="collectType" class="form-control">
                        <option value="1">Seconds</option>
                        <option value="2">Minutes</option>
                        <option value="3">Hours</option>
                        <option value="4">Days</option>
                    </select><br>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Variable Type *</label>
                    <select name="varType" class="form-control">
                        <option value="temp">Temp Variable</option>
                        <option value="server">Server Variable</option>
                        <option value="global">Global Variable</option>
                    </select><br>
                </div>

                <div class="col">
                    <label>Variable Name *</label>
                    <input class="form-control" name="varName"></input><br>
                </div>
            </div>
        </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded UpTime mod");
    },

    // Place your mod here.
    mod: function(DBS, msg, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const bottime = DBS.Bot.uptime;
        console.log(action)
        switch(action.collecttype) {
            case "1":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 1000) % 60, msg.guild);
            break
            case "2":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 60000) % 60, msg.guild);
            break
            case "3":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 3600000) % 24, msg.guild);
            break
            case "4":
                DBS.BetterMods.saveVar(action.vartype, action.varname, Math.floor(bottime / 86400000), msg.guild);
            break
        }

        DBS.callNextAction(command, msg, args, index + 1);
    }
};