module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Get YouTube Video",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Get YouTube Video ~ Great Plains Modding",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Bot Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="form-group">
                <label>Search Query *</label>
                <input class="form-control" name="searchQuery"></input><br>

                <label>Variable Name (TempVar) *</label>
                <input class="form-control" name="varName"></input>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded GetYouTubeVideo");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const youtube = require('scrape-youtube').default;
        const video = (await youtube.search(DBS.BetterMods.parseAction(action.searchquery, message))).videos[0];
        DBS.Cache[message.guild.id].variables[action.varname] = video.link;
        DBS.callNextAction(command, message, args, index + 1);
    }
};