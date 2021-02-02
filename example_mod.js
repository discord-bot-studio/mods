module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Message Mod",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Created Send Message ~ Great Plains Modding",

    // Set this to true if this will be an event. Note events wont show up in DBS.
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
                <label>Send To *</label>
                <select class="form-control">
                    <option value="SameChannel" selected>Same Channel</option>
                    <option value="MessageAuthor">Message Author</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Response message text *</label>
                <textarea class="form-control needed-field" name="messageText" rows="3" ></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded send message");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {

        // Note DBS stores all data from the HTML field into lowercase. messageText = messagetext
        switch (action.channelname) {
            case "sameChannel":
                message.channel.send(action.messagetext);
                break;
            case "messageAuthor":
                message.author.send(action.messagetext);
                break;
            case "mentionedUser":
                message.mentions.first().send(action.messagetext);
                break;
        }

        // Remember to use callNextAction or the bot wont continue any actions after this mod.
        DBS.callNextAction(command, message, args, index + 1);
    }
};
