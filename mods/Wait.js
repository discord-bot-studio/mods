module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Wait",

    // Place the author of the mod here. This is an array so you can add multiple authors.
    author: ["Discord Bot Studio", "Vannzilla", "Finbar"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, place the changelog here.
    changelog: "Added more time options, optimized code.",

    // Set this to true if this will be an event.
    isEvent: false,

    // Set this to true if this is a response.
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio (what category in the dropdown when adding a response)
    section: "Bot Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod. Each input/select field will be saved to commands.json based on the NAME
    // attribute, so each input must have a NAME attribute.
    html: function (data) {
        return `
            <label>Increment *</label>
            <select name="increment" class="form-control">
                <option value="ms">Milliseconds</option>
                <option value="seconds" selected>Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
            </select>
            <div class="form-group">
                    <label>Time to wait for *</label>
                    <input class="form-control needed-field" name="time"/>
            </div>
            <b>Better mods is required for variable support</b>
        `;
    },

    // When the bot is first started this code will be ran.
    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded Wait Mod");
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        let seconds;
        // Get time to wait
        try {
            seconds = DBS.BetterMods.parseAction(action.time, message);
        } catch (error) {
            // Allow mod to function without BetterMods
            console.log("Wait.js - Better mods not found")
            seconds = action.time;
        }
        // Find the time increment
        seconds = [seconds / 1000, seconds, seconds * 60, seconds * 3600, seconds * 86400][["milliseconds", "seconds", "minutes", "hours", "days"].indexOf(action.increment)];

        try {
            if(isNaN(seconds))
                return DBS.callNextAction(command, message, args, index + 1);
            setTimeout(() => {
                DBS.callNextAction(command, message, args, index + 1);
            }, seconds);
        } catch (error) {
            console.error(error);
        }
    }
};
