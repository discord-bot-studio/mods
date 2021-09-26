module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Emoji",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["aoe#4851"],

    // Place the version of the mod here.
    version: "1.0.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "You can now get the mentioned name ~ aoe#",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Server Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
        <div class="form-group">
            <label>The URL of the emoji *</label>
            <textarea class="form-control needed-field" name="url" rows="1" ></textarea>
        </div>
        <div class="form-group">
            <label>The Name of the emoji *</label>
            <textarea class="form-control needed-field" name="emojiname" rows="1" ></textarea>
        </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded EditedChangeServerName mod ~ aoe#4851");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        message.guild.emojis.create(action.url, action.emojiname);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
