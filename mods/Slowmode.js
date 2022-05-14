module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Slowmode",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Fixes and added variable support",

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
            Slowmode time in seconds
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="slowmode" id="slowmode" rows="1" ></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="slowmode">Insert Variable</a>
                </div>
            </div>
        </div>
        <div class="form-group">
            Slowmode message (use $$slowmode$$ to get the seconds)
            <div class="input-group mb-3">
                <textarea class="form-control needed-field" name="slowmsg" id="slowmsg" rows="1" ></textarea>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="slowmsg">Insert Variable</a>
                </div>
            </div>
        </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded Slowmode");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var slowmode1 = DBS.BetterMods.parseAction(action.slowmode, message)
        message.channel.setRateLimitPerUser(slowmode1);
        var slowmsg = DBS.BetterMods.parseAction(action.slowmsg, message).replace("$$slowmode$$", slowmode1)
        
        if (!action.slowmsg == "" && !slowmode1 == "" && slowmode1 >= 0 && slowmode1 <= 21600){
            message.channel.send(slowmsg);
        } else message.channel.send("That's not a valid amount!");
       
        DBS.callNextAction(command, message, args, index + 1);
    }
};
