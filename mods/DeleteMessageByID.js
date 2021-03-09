module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Delete Message By ID",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["mrballou#9055"],

    // Place the version of the mod here.
    version: "0.0.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "some changelog",

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
    html: function (data) {
        return `
        <div class="form-group">
            <label>message</label>
            <textarea rows="1" class="form-control needed-field" id="message" name="message"></textarea>
            <small class="form-text text-muted">Message ID</small>
        </div>
      `;
    },

    // When the bot is first started, this code will be ran.
    init: function () {
        console.log("Loaded delete message by id mod");
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
        var messageid = DBS.BetterMods.getVar("temp", action.message.replace("${tempVars.", "").replace("}", ""), message.guild)
        for (let c in message.guild.channels.cache._array){
            var channel = message.guild.channels.cache._array[c]
            if (channel.type === 'text'){
                var Message = await channel.messages.fetch(messageid).catch(err => {})
                if (typeof Message !== 'undefined'){
                    Message.delete()
                    break;
                }
            }
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};