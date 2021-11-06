module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Level Card",

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
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="from-group">
                <label>Needed XP</label>
                <input class="form-control" name="neededxp"></input><br>
            </div>

            <div class="from-group">
                <label>XP User has</label>
                <input class="form-control" name="userxp"></input><br>
            </div>

            <div class="from-group">
                <label>Level User Has</label>
                <input class="form-control" name="userlvl"></input><br>
            </div>

            <div class="from-group">
                <label>Level Color</label>
                <input class="form-control" value="#8feb34" name="lvlcolor"></input><br>
            </div>

            <div class="from-group">
                <label>Progress Bar Color</label>
                <input class="form-control" value="#8feb34" name="barcolor"></input><br>
            </div>

            <div class="form-group">
                <label>Choose Background Type:</label>
                <select class="form-control" name="bgtype">
                    <option value="IMAGE">Image</option>
                    <option value="COLOR">Color</option>
                </select>
            </div>

            <div class="from-group">
                <label>Background Color/Image</label>
                <input class="form-control" name="bg"></input><br>
                <p>If the BG type is Image, type avatarURL Variable, else type hex color</p>
            </div>  
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        DBS.BetterMods.requireModule('canvacord');
        console.log("Level Card Loaded!\n Contact koki1019#1019 For help");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const Discord = require("discord.js")
        const canvacord = require("canvacord");

        const mention = message.mentions.members.first() || message.member;

        let name = mention.user.username;
        let tag = mention.user.tag.slice(mention.user.username.length + 1);

        let neededXP = DBS.BetterMods.parseAction(action.neededxp, message);
        let userXP = DBS.BetterMods.parseAction(action.userxp, message);
        let userLevel = DBS.BetterMods.parseAction(action.userlvl, message);
        let lvlColor = DBS.BetterMods.parseAction(action.lvlcolor, message);
        let barColor = DBS.BetterMods.parseAction(action.barcolor, message);
        let avatar = mention.user.displayAvatarURL({ format: 'jpg' });
        let background = DBS.BetterMods.parseAction(action.bg, message);
        let bgtype = DBS.BetterMods.parseAction(action.bgtype, message);

        const rank = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(parseInt(userXP))
        .setRequiredXP(parseInt(neededXP))
        .setStatus("online")
        .setProgressBar(barColor)
        .setUsername(name)
        .setDiscriminator(tag)
        .setLevel(parseInt(userLevel))
        .setLevelColor(lvlColor)
        .setRank(parseInt(userLevel))
        .setRankColor(lvlColor)
        .setBackground(bgtype, background)

        rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, 'lvlCard.png');
            message.reply({ files: [attachment] })
        })

        DBS.callNextAction(command, message, args, index + 1);
    }
};