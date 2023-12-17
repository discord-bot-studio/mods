module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "More Status",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Vannzilla#5260, Revised by Big D#1129", "@miroxik74"],

    // Place the version of the mod here.
    version: "0.3.2",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Fixed undefined value and added variables",

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
            <div class="input-group mb-3">
                <label>To show the server or member count, use $$Servers$$ or $$Members$$ *</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="statustext"></input><br>
                            <div class="input-group-append">
                                <a class="btn btn-outline-primary" role="button" id="variables" forinput="statustext" rows="1" >Insert Variable</a>
                    </div>
            </div>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: async function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("| Loaded More Status Mod");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        var status = action.statustext;

        const client = DBS.Bot;
        let totalUsers = 0;
        client.guilds.cache.forEach(guild => {totalUsers += guild.memberCount;});
        
        status = (DBS.BetterMods.parseAction(action.statustext, message));
        status = status.replace("$$Servers$$", client.guilds.cache.size);
        status = status.replace("$$Members$$", totalUsers);

        DBS.Bot.user.setActivity(status, { type: action.statusoption})
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};
