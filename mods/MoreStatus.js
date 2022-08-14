module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "More Status",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Vannzilla#5260, Updated by Jeroentje#4361"],

    // Place the version of the mod here.
    version: "0.3.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Updated",

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
                <label>Set To *</label>
                <select class="form-control" name="statusOption">
                    <option value="WATCHING" selected>Watching</option>
                    <option value="LISTENING">Listening</option>
                    <option value="PLAYING">Playing</option>
                </select>
            </div>
            <div class="form-group">
                <label>To show the server or member count, use $$Servers$$ or $$Members$$  (other variables not supported) *</label>
                <textarea class="form-control needed-field" name="statusText" rows="1" ></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        console.log("| Loaded More Status Mod\n| If you have any problems with the mod contact Vannzilla#5260");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var status = action.statustext;
        status = status.replace("$$Servers$$", DBS.Bot.guilds.cache.size);
        status = status.replace("$$Members$$", DBS.Bot.users.cache.size);

        DBS.Bot.user.setActivity(status, { type: action.statusoption})
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};
