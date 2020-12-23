const { Guild, Client } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "EditEmbed",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "0.1.0",

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
            <div class="form-group">
                <label>Set Title</label>
                <textarea class="form-control field" name="title" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>Set Description</label>
            <textarea class="form-control field" name="desc" rows="1" ></textarea>
        </div>
        <div class="form-group">
        <label>Set Timestamp</label>
        <textarea class="form-control field" name="timestamp" rows="1" ></textarea>
    </div>
    <div class="form-group">
    <label>Set Footer</label>
    <textarea class="form-control field" name="foot" rows="1" ></textarea>
</div>
<div class="form-group">
<label>Set Author(use $$author$$ to get the command author)</label>
<textarea class="form-control field" name="auth" rows="1" ></textarea>
</div>
</div>
<div class="form-group">
<label>Set Image(use $$img$$ to set the command author profile picture as image)</label>
<textarea class="form-control field" name="img" rows="1" ></textarea>
</div>
</div>
<div class="form-group">
<label>Set Thumbnail(use $$thumbnail$$ to set the command author profile picture as thumbnail)</label>
<textarea class="form-control field" name="thumb" rows="1" ></textarea>
</div>
<div class="form-group">
<label>Set Color(make sure it is in caps lock)</label>
<textarea class="form-control field" name="col" rows="1" ></textarea>
</div>
            <div class="form-group">
            <label>Delay*</label>
            <textarea class="form-control needed-field" name="del" rows="1" ></textarea>
        </div>
    <div class="form-group">
                <label>Set Title</label>
                <textarea class="form-control field" name="edittitle" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>Set Description</label>
            <textarea class="form-control field" name="editdesc" rows="1" ></textarea>
        </div>
        <div class="form-group">
        <label>Set Timestamp</label>
        <textarea class="form-control field" name="edittimestamp" rows="1" ></textarea>
    </div>
    <div class="form-group">
    <label>Set Footer</label>
    <textarea class="form-control field" name="editfoot" rows="1" ></textarea>
</div>
<div class="form-group">
<label>Set Author(use $$author$$ to get the command author)</label>
<textarea class="form-control field" name="editauth" rows="1" ></textarea>
</div>
</div>
<div class="form-group">
<label>Set Image(use $$img$$ to set the command author profile picture as image)</label>
<textarea class="form-control field" name="editimg" rows="1" ></textarea>
</div>
</div>
<div class="form-group">
<label>Set Thumbnail(use $$thumbnail$$ to set the command author profile picture as thumbnail)</label>
<textarea class="form-control field" name="editthumb" rows="1" ></textarea>
</div>
<div class="form-group">
<label>Set Color(make sure it is in caps lock)</label>
<textarea class="form-control field" name="editcol" rows="1" ></textarea>
</div>
           \
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded EditEmbed");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        action.auth = action.auth.replace("$$author$$", message.author.tag);
        action.editauth = action.editauth.replace("$$author$$", message.author.tag);
        action.img = action.img.replace("$$img$$", message.author.avatarURL());
        action.editimg = action.editimg.replace("$$img$$", message.author.avatarURL());
        action.thumb = action.thumb.replace("$$thumbnail$$", message.author.avatarURL());
        action.editthumb = action.editthumb.replace("$$thumbnail$$", message.author.avatarURL());
        const embed = new Discord.MessageEmbed()
        .setTitle(action.title)
        .setDescription(action.desc)
        .setTimestamp(action.timestamp)
        .setFooter(action.foot)
        .setAuthor(action.auth)
        .setImage(action.img)
        .setThumbnail(action.thumb)
        .setColor(action.col);
    const delay = action.del * 1000;
    const msg = message.channel.send(embed);
        const editembed = new Discord.MessageEmbed()
        .setTitle(action.edittitle)
        .setDescription(action.editdesc)
        .setTimestamp(action.edittimestamp)
        .setFooter(action.editfoot)
        .setAuthor(action.editauth)
        .setImage(action.editimg)
        .setThumbnail(action.editthumb)
        .setColor(action.editcol);
    setTimeout(function() {
        msg.then(((sentMessage) => sentMessage.edit(editembed)))
        
    }, delay);
    DBS.callNextAction(command, message, args, index - action.nodes);
}};
