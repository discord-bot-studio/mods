module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "RandomImage",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["OLEK4640"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Maked the mod ~ OLEK4640",

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
                <label>Enter in the field what random picture you would like!</label>
                <input class="form-control needed-field" name="image"/>
                <p>You must have <code>BetterMods</code>!<code>discord.js</code> and <code>got</code> modules must be installed!!</p>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        console.log("Loaded image mod");
        DBS.BetterMods.requireModule('got');
        DBS.BetterMods.requireModule('discord.js');
    },
    
    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const got = await DBS.BetterMods.requireModule('got');
        const Discord = await DBS.BetterMods.requireModule('discord.js');

        
        const embed = new Discord.MessageEmbed()
        got(`https://www.reddit.com/r/${action.image}/random/.json`).then(response => {
            let content = JSON.parse(response.body);
            let memeImage = content[0].data.children[0].data.url;
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            message.channel.send(embed);

        DBS.callNextAction(command, message, args, index + 1);
    })
}
}