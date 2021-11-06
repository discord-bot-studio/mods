module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Meme Variable",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["koki1019#1019"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Variable",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
           <div class="col">
                <label>Variable Name *</label>
                <input class="form-control" name="storeresult"></input><br>
            </div>
           <div class="col">
                <label>Variable Type *</label>
                    <select name="vartype" class="form-control">
                        <option value="temp">Temp Variable</option>
                        <option value="server">Server Variable</option>
                        <option value="global">Global Variable</option>
                </select><br>
                <label>Data Type *</label>
                    <select name="fetchtype" class="form-control">
                        <option value="text">Subreddit Name</option>
                        <option value="image">Image of the meme</option>
                        <option value="link">Link of the subreddit</option>
                </select><br>
           </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        DBS.BetterMods.requireModule('random-puppy');
        console.log("Meme Variable Loaded!\n Contact koki1019#1019 For help");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const randomPuppy = require("random-puppy")

        const SubReddits = ["dankmeme", "dankmemes", "meme", "me_irl", "memes", "AdviceAnimals", "terriblefacebookmemes", "MemeEconomy", "ComedyCemetery", "PrequelMemes"];
        const random = SubReddits[Math.floor(Math.random() * SubReddits.length)];

        const img = await randomPuppy(random);

        const link = `https://reddit.com/r/${random}`;
        

        switch(action.fetchtype) {
            case "text":
                 DBS.BetterMods.saveVar(action.vartype, action.storeresult, random, message.guild);
            break
            case "link":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, link, message.guild);
            break
            case "image":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, img, message.guild);
            break
        }
        
        DBS.callNextAction(command, message, args, index + 1);
    }
};