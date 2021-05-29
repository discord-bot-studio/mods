module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Leave Server",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["aoe#4851"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Added Leave Server Mod ~ aoe#4851",

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
                <label>Set the color that shows up in the embed that will be send on leave *</label>
                <textarea class="form-control needed-field" name="messagecolor" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Set the Title that shows up in the embed that will be send on leave *</label>
                <textarea class="form-control needed-field" name="messagetitle" rows="1" ></textarea>
            </div>
            <div class="form-group">
                <label>Set the Description that shows up in the embed that will be send on leave *</label>
                <textarea class="form-control needed-field" name="messagedesc" rows="1" ></textarea>
            </div>
        `;
    },


    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Leave Server mod ~ aoe#9022");
    },

    

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
            const Discord = require("discord.js");
            const embed = new Discord.MessageEmbed()
            .setColor(action.messagecolor)
            .setTitle(action.messagetitle)
            .setDescription(action.messagedesc)
    
            console.log(`leaving...`);
            message.channel.send(embed).then(sentMessage =>  message.guild.leave())
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};