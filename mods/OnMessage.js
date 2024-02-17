module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "On Message",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["your a nerd/Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Bot Action",

    // Better Mods Settings
    BetterMods: {
        isEvent: true,
        event: "message",
    },

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <h1>On Direct Message</h1>
            <b>Note: You must click save or this mod wont work.</b>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {

    },

    // Place your mod here.
    mod: function(DBS, command, type, message) {    
        if (type != "Type:BetterMods:Trigger") return

        if (message.author.bot) return
        // if (message.guild) return

        const prefix = DBS.SettingsFile.prefix;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        DBS.callNextAction(command, message, args, 1);
    }
};