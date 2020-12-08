const { Guild, Client } = require("discord.js");

module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Unban",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "added the option to unban a mentioned person",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "User Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="form-group">
                <label>User to unban. Use $$id$$ to unban a mentioned id or tag: ex1: -unban 4576587568568 ex2: -unban <@!4576587568568> *</label>
                <textarea class="form-control needed-field" name="id" rows="1" ></textarea>
            </div>
           \
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Unban");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {

        var id = action.id;
        id = id.replace("$$id$$", args);
        id = id.replace("@", "");
        id = id.replace("!", "");
        id = id.replace("<", "");
        id = id.replace(">", "");
        message.guild.members.unban(id);
        
      
    
        DBS.callNextAction(command, message, args, index + 1);
    }
};
