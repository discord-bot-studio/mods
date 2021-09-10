module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Canvas",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["koki1019#1019"],

    // Place the version of the mod here.
    version: "1.0.0",

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
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
           <div class="col">
                <label>Background</label>
                <input class="form-control" name="bg" value="background.png"></input><br>
                <label>Draw Image on background</label>
                <input class="form-control" name="img" value="image.png"></input><br>
                <p><code>NOTE: You must create a folder called: images where the mod folder is for it to work!</code></p>
                <p>Type: $$author$$ To draw the author image</p>
           </div>

           <div class="col">
                <label>Width of Background</label>
                <input class="form-control" name="width" value="800"></input><br>
                <label>Height of Background</label>
                <input class="form-control" name="height" value="600"></input><br>
           </div>

           <div class="col">
                <label>Width of Image</label>
                <input class="form-control" name="widthimg" value="200"></input><br>
                <label>Height of Image</label>
                <input class="form-control" name="heightimg" value="200"></input><br>
           </div>

           <div class="col">
                <label>X Axis of Image</label>
                <input class="form-control" name="xaxis" value=""></input><br>
                <label>Y Axis of Image</label>
                <input class="form-control" name="yaxis" value=""></input><br>
                <p>Image drawn on background's rotation</p>
           </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        DBS.BetterMods.requireModule('canvas');
        console.log("Loaded Canvas");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const Discord = require('discord.js');
        const Canvas = require("canvas");

        const canvas = Canvas.createCanvas(parseInt(action.width), parseInt(action.height));
	    const context = canvas.getContext('2d');

        const background = await Canvas.loadImage("./images/" + action.bg);
    	context.drawImage(background, 0, 0, canvas.width, canvas.height);

        if(action.img === "$$author$$"){
            const drawOnBG = await Canvas.loadImage(message.author.avatarURL({dynamic: true}));   
            
            context.drawImage(drawOnBG, action.xaxis, action.yaxis, action.widthimg, action.heightimg);


            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');
    
            message.channel.send(attachment);          
        } else {
            const drawOnBG = await Canvas.loadImage("./images/" + action.img);

            context.drawImage(drawOnBG, action.xaxis, action.yaxis, action.widthimg, action.heightimg);


            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');

            message.channel.send(attachment);
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};