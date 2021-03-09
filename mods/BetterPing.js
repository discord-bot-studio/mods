module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Better Ping",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["mrballou#9055"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "some changelog",

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
            <label>Calculating message</label>
            <textarea rows="1" class="form-control needed-field" id="a1" name="a1"></textarea>
        </div>
        <div class="form-group">
            <label>Done Calculating message</label>
            <textarea rows="1" class="form-control" id="a2" name="a2"></textarea>
        </div>
        <div class="form-group">
            <label>Embed title</label>
            <textarea rows="1" class="form-control" id="title" name="title"></textarea>
        </div>

        <div class="form-group">
            <label>Color</label>
            <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="color">
            <small class="form-text text-muted">Hex color</small>
        </div>
        <div class="form-group">
            <label>Data. use $$ping$$ for bots latency and $$dcping$$ for discords latency</label>
            <textarea rows="5" class="form-control needed-field" id="description" name="description"></textarea>
        </div>
      `;
    },

    // When the bot is first started, this code will be ran.
    init: function () {
        console.log("Loaded better ping mod");
    },

    // Place your mod here.
    mod: function (DBS, message, action, args, command, index) {
        var ping
        var dcping = DBS.Bot.ws.ping
        message.channel.send(action.a1).then(mes => {
            ping = Date.now() - mes.createdTimestamp
            var Embed = new DBS.Discord.MessageEmbed()
            .setColor(action.color)
            .setDescription(action.description.replace('$$ping$$', ping).replace('$$dcping$$', dcping))
            if (typeof action.title !== 'undefined'){
                Embed.setTitle(action.title)
            }
            mes.edit(Embed)
            mes.edit(action.a2)
        })


        DBS.callNextAction(command, message, args, index + 1);
    }
};