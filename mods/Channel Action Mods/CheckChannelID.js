module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Check Channel ID",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Big D#1129"],

    // Place the version of the mod here.
    version: "0.1.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Added ability to check if the command was sent in certain channel or not",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Channel Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="form-group">
                <label>The ID of the channel you want the command to work in *</label>
                <textarea class="form-control needed-field" name="channelid" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Incorrect channel message *</label>
                <textarea rows="2" class="form-control needed-field" name="nomatch"></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Channel Check mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var channelID = action.channelid;
        var NoMatch = action.nomatch;

        if (message.channel.id === channelID) {
            DBS.callNextAction(command, message, args, index + 1)

        } else {
            
            if (NoMatch) {
                message.channel.send(NoMatch)
            }
        }
    }
};