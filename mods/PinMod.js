module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Pin Mod",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Hectoliters#7743"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Updated to fix some bugs ~ Hectoliters",

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
        <label>Pin Mode *</label>
        <select class="form-control" name="PinMode">
            <option value="Fixed" selected>Fixed</option>
            <option value="Custom">Custom</option>
        </select>
    </div>
        <div class="form-group">
        <label>Text to pin (Only works if you choosed custom and it doesnt work with variables) *</label>
        <textarea class="form-control needed-field" name="messageText" rows="1" ></textarea>
    </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Pin Mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        switch (action.pinmode) {
            case "Fixed":
                message.pin([]);
                break;
            case "Custom":
                message.channel.send(action.messagetext).then((message) => message.pin());
                break;
        }
        DBS.callNextAction(command, message, args, index + 1);
        }
    };
