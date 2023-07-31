module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Leave Server",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["aoe#9022", "@miroxik74"],

    // Place the version of the mod here.
    version: "1.0.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Now the bot sends the message correctly",

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
                <label>Color (ex. 9EFF91)*</label>
                <textarea class="form-control needed-field" name="messagecolor" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Title *</label>
                <textarea class="form-control needed-field" name="messagetitle" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Description *</label>
                <textarea class="form-control needed-field" name="messagedesc" rows="2" ></textarea>
            </div>
            <div class="form-group">
                <label>This embed will be sent one second before leaving server where you using command </label>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Leave Server mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
            const Discord = require("discord.js");
            const embed = new Discord.MessageEmbed()
            .setColor(action.messagecolor, message)
            .setTitle(action.messagetitle, message)
            .setDescription(action.messagedesc, message)
    
            console.log(`leaving...`);
            message.channel.send({ embeds: [embed] }).then(sentMessage =>  message.guild.leave())
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};
