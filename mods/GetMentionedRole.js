module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Get Mentioned Role",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Pokemonultra#2815"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Created Get Mentioned Role ~ Pokemonultra",

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
    html: function(data) {
        return `
            <div class="form-group">
                <label>Variable Name *</label>
                <input class="form-control needed-field" name="varName"></input>
                </div>
                <hr>
                <label>Variable Type *</label>
                <div class="form-group">
                <select class="form-control" name="varType">
                    <option value="temp" selected>Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Get Mentioned Role\n|Contact me(Pokemonultra#2815) for any Problems");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        const MRole = message.mentions.roles.map(r => r.name);
        DBS.BetterMods.saveVar(action.vartype, action.varname, MRole, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
