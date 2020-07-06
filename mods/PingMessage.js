module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Ping Message",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Vannzilla#5260"],

    // Place the version of the mod here.
    version: "0.1.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Added ping message",

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
                <label>Ping message use $$ping$$ to insert ping *</label>
                <textarea class="form-control needed-field" name="pingMessage" rows="3" ></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded ping message mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var pingMsg = (action.pingmessage)
        var ping = Date.now() - message.createdTimestamp + " ms";
        pingMsg = pingMsg.replace("$$ping$$", ping)
        message.channel.send(pingMsg);

        DBS.callNextAction(command, message, args, index + 1);
    }
};