module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Code Block",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Pokemonultra#2815"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Created Code Block ~ Pokemonultra",

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
    html: function (data) {
        return `
            <div class="form-group">
                <label>You can enter Custom Code here </label>
                <textarea class="form-control needed-field" name="ownCode" rows="20" placeholder='message.channel.send("This is a Test");'></textarea>
                <p>Need help?, <a href="https://discord.js.org/#/docs/main/main/general/welcome" target="_blank">Click me to open Discord.js Docs</a></p>
            </div>
            <label><span style="font-weight: bold">Mod made by:</span> Pokemonultra#2815</label>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function (DBS) {
        console.log("Loaded Code Block");
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
        try {
            eval(action.owncode);
        } catch (error) {
            console.log(error);
        };
        DBS.callNextAction(command, message, args, index + 1);
    }
};