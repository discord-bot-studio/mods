const { Guild, Client } = require("discord.js");

module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Slowmode",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "0.1.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "nothing",

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
                <label>Slowmode(use $$slowmode$$ to set the slowmode for a mentioned duration in a message)*</label>
                <textarea class="form-control needed-field" name="slowmode" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>Slowmode message(use $$slowmode$$ to get the seconds)</label>
            <textarea class="form-control field" name="slowmsg" rows="1" ></textarea>
        </div>
           \
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Slowmode");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var slowmode1 = action.slowmode;
        slowmode1 = slowmode1.replace("$$slowmode$$", args);
        message.channel.setRateLimitPerUser(slowmode1);
        var slowmsg = action.slowmsg;
        slowmsg = slowmsg.replace("$$slowmode$$", args);
        if(!action.slowmsg == "" && !slowmode1 == "" && slowmode1 >= 0 && slowmode1 <= 21600){
            message.channel.send(slowmsg);
        }else{
            message.channel.send("That's not a valid amount!");
        }
       /* if(isNaN(args) == true){
            message.channel.send("That's not a valid amount!");
        }else if(slowmode1 < 0){
            message.channel.send("That's not a valid amount!");
        }else if(slowmode1 > 21600){
            message.channel.send("That's not a valid amount!");
        }
       */
       
        DBS.callNextAction(command, message, args, index + 1);
    }
};
