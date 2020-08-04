module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "BotSize",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Electraboss"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Created Server Size Mod ~ Electraboss",

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
                <label>Bot size message use $$BotSize$$ to insert bot size *</label>
                <textarea class="form-control needed-field" name="bsm" rows="3" ></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded bot size message");
    },
    
    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var botSizeMessage = (action.bsm)
        botSizeMessage = botSizeMessage.replace("$$BotSize$$", DBS.Bot.guilds.size)
        message.channel.send(botSizeMessage);

        DBS.callNextAction(command, message, args, index + 1);
    }
};