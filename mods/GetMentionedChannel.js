module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Get Mentioned Channel",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Pokemonultra#2815"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Created Get Mentioned Channel ~ Pokemonultra#2815",

    // Set this to true if this will be an event. Note events wont show up in DBS.
    isEvent: false,

    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Variable",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function (data) {
        return `
        <div class="form-group">
        <label>Store into Variable with Name *</label>
        <input class="form-control needed-field" name="varName"></input>
        <small class="form-text text-muted">This will be used in other references</small>
        </div>
        <hr>
        <label>Store Variable in Type *</label>
        <div class="form-group">
        <select class="form-control" name="varType">
            <option value="temp" selected>Temp Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select>
    </div>
    <label><span style="font-weight: bold">Mod made by:</span> Pokemonultra#2815</label>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded Get Mentioned Channel/n|Any Problems? Message me Pokemonultra#2815");
    },

    // Place your mod here.
    mod: function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const MChannel = message.mentions.channels.first();

        
        DBS.BetterMods.saveVar(action.vartype, action.varname, MChannel.id, message.guild);



        // Remember to use callNextAction or the bot wont continue any actions after this mod.
        DBS.callNextAction(command, message, args, index + 1);

    }
};
