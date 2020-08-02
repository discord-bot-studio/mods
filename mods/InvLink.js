module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Inv Link",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Vannzilla#5260"],

    // Place the version of the mod here.
    version: "0.1.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Created send inv link node",

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
                <label>Client ID *</label>
                <textarea class="form-control needed-field" name="clientid" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Permissions integer (8 = administrator) *</label>
                <textarea class="form-control needed-field" name="permInt" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Message Text (use $$link$$ to insert the invite link) *</label>
                <textarea class="form-control needed-field" name="msgText" rows="3" ></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Inv Link");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var msg = action.msgtext
        var link = `https://discord.com/api/oauth2/authorize?client_id=${action.clientid}&permissions=${action.permint}&scope=bot`
        msg = msg.replace("$$link$$", link);

        message.channel.send(msg)
        DBS.callNextAction(command, message, args, index + 1)
    }
};
