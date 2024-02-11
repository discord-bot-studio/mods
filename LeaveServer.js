module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Leave Server",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["aoe#9022", "@miroxik74"],

    // Place the version of the mod here.
    version: "1.0.2",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Now the response will be sent even if it was used on the same server",

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
                    <label">Guild ID *</label>
                <div class="input-group mb-3">
                    <input class="form-control needed-field" id="gid" name="gid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="gid">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Color</label>
                <input class="form-control jscolor" name="color" id="color" placeholder="#FFFFFF">
                <small class="form-text text-muted">Hex color</small>
             </div>

            <div class="form-group">
                <label>Title *</label>
                <div class="input-group mb-3">
                    <textarea class="form-control needed-field" name="title" id="title" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="title">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Description *</label>
                <div class="input-group mb-3">
                    <textarea rows="3" class="form-control needed-field" name="description" id="description"></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="description">Insert Variable</a>
                    </div>
                </div>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Leave Server mod");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
            const Discord = require("discord.js")
            const server = DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.gid, message))
                const embed = new Discord.MessageEmbed()
                .setColor(DBS.BetterMods.parseAction(action.color, message))
                .setTitle(DBS.BetterMods.parseAction(action.title, message))
                .setDescription(DBS.BetterMods.parseAction(action.description, message))
            if (!server) {
                return message.reply({ content: `Invalid server ID`, allowedMentions: { repliedUser: false }});
            } try {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }});
                await server.leave();
              } catch (error) {
                message.reply({ content: `An error occurred while leaving the server: ${error}`, allowedMentions: { repliedUser: false }});
              }
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};
