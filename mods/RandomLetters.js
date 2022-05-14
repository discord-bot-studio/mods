module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Random Letters",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["ByFr0st#0001"],

    // Place the version of the mod here.
    version: "1.0.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "fixes and added length input ~ PlayboyPrime#3839",

    // Set this to true if this will be an event.
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
            <div class="col">
                <label>Variable Name *</label>
                <input class="form-control" name="varname"></input><br>
            </div>
            <div class="col">
                <label>Variable Type *</label>
                <select name="vartype" class="form-control">
                    <option value="temp">Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
                <hr>
                <label>Data Type *</label>
                <select name="fetchtype" class="form-control">
                    <option value="symbols">Only generates symbols and letters</option>
                    <option value="numbers">Only generates numbers</option>
                    <option value="all">Generates a password with letters and symbols</option>
                </select><br>
                <div class="form-group">
                    <label>Length (Number, max 2000) *</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="length"></input>
                        <div class="input-group-append">
                            <a class="btn btn-outline-primary" role="button" id="variables" forinput="length">Insert Variable</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Random Letters loaded");
        
        DBS.BetterMods.requireModule('generate-password');
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const generator = require('generate-password');
        if(DBS.BetterMods.parseAction(action.length, message) > 2000){
            length = 2000
        } else length = DBS.BetterMods.parseAction(action.length, message)

        switch(action.fetchtype) {
            case "symbols":
                password = generator.generate({
                    length: length,
                    numbers: false,
                    symbols: true
                });

                DBS.BetterMods.saveVar(action.vartype, action.varname, password, message.guild);
            break
            case "numbers":
                password = generator.generate({
                    length: length,
                    numbers: true,
                    symbols: false
                });

                DBS.BetterMods.saveVar(action.vartype, action.varname, password, message.guild);
            break
            case "all":
                password = generator.generate({
                    length: length,
                    numbers: true,
                    symbols: true
                });

                DBS.BetterMods.saveVar(action.vartype, action.varname, password, message.guild);
            break
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
