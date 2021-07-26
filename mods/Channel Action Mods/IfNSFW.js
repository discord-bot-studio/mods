module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "If NSFW",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Vannzilla#5260"],

    // Place the version of the mod here.
    version: "0.2.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Added failed messge response option ~Vannzilla",

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
                <label>Check if: *</label>
                <select class="form-control" name="NSFWTrueFalse">
                    <option value="True" selected>True</option>
                    <option value="False">False</option>
                </select>
            </div>
            <div class="form-group">
                <label>Failed Message Text</label>
                <textarea rows="1" class="form-control" name="failedmessage"></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded If NSFW Mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var failMessage = action.failedmessage

        if (action.nsfwtruefalse === 'True') {
            if (message.channel.nsfw) {
                DBS.callNextAction(command, message, args, index + 1)
            } else {
                if (failMessage) {
                    message.channel.send(failMessage)
                }
            }

        } else {
            if (!message.channel.nsfw) {
                DBS.callNextAction(command, message, args, index + 1)
            } else {
                if (failMessage) {
                    message.channel.send(failMessage)
                }
            }
        }
    }
};
