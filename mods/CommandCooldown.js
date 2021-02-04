module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Command Cooldown",

    // Place the author of the mod here. This is an array so you can add multiple authors.
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "1.0.1",

    // Whenever you make a change, place the changelog here.
    changelog: "Added command cooldown",

    // Set this to true if this will be an event.
    isEvent: false,

    // Set this to true if this is a response.
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio (what category in the dropdown when adding a response)
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod. Each input/select field will be saved to commands.json based on the NAME
    // attribute, so each input must have a NAME attribute.
    html: function (data) {
        return `
        <div class="form-group">
            <label>Must be placed at the start of command </label>
        </div>
        <div class="form-group">
            <label>Seconds to wait for *</label>
            <input class="form-control needed-field" name="seconds" />
        </div>
        <div class="form-group">
            <label>On Cooldown - Jump To (Node ID)</label>
            <input class="form-control" name="onCooldown"></input>
        </div>
        <div class="form-group">
            <label>On Cooldown Finished - Jump To (Node ID)</label>
            <input class="form-control field" name="onCooldownFinished" />
        </div>
        `;
    },

    // When the bot is first started this code will be ran.
    init: function (DBS) {
        console.log("Loaded Cooldown Mod");
        DBS.CommandCooldown = {}
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
        const delay = action.seconds * 1000;
        
        if (DBS.CommandCooldown[command.name] == undefined) DBS.CommandCooldown[command.name] = {};
        if (DBS.CommandCooldown[command.name][message.author.id]) {
            DBS.callNextAction(command, message, args, parseInt(action.oncooldown));
        } else {
            DBS.callNextAction(command, message, args, index + 1);
            DBS.CommandCooldown[command.name][message.author.id] = true;

            setTimeout(() => {
                DBS.CommandCooldown[command.name][message.author.id] = undefined;
                DBS.callNextAction(command, message, args, parseInt(action.oncooldownfinished));
            }, delay);
        };
    }
};
