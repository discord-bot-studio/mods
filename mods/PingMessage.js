module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Ping Message",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Vannzilla#5260"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Added variable support",

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
            <label for="varname">Var Name to save ping in*</label>
            <input type="text" class="form-control" name="varname" id="varname">
        </div>
        <div class="form-group">
            <label for="vartype">Var Type *</label>
            <select name="vartype" id="vartype" class="form-control">
                <option value="temp">Temp</option>
                <option value="server">Server</option>
                <option value="global">Global</option>
            </select>
        </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded ping message mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var ping = Date.now() - message.createdTimestamp + " ms";
        DBS.BetterMods.saveVar(action.vartype, action.varname, ping, message.guild)

        DBS.callNextAction(command, message, args, index + 1);
    }
};
