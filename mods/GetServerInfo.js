module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Get Server Info",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "added back the member counter",

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
                <label>Send a message displaying the server's info. Use $$members$$, $$icon$$ and $$date$$ to get the members, icon and creation date*</label>
                <textarea class="form-control needed-field" name="info" rows="1" ></textarea>
            </div>
           \
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        console.log("Loaded Get Server Info");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        var serverInf = action.info;
        var serverIcon = message.guild.iconURL();
        var serverMembers = message.guild.memberCount;
        
        var date = message.guild.createdAt;
        serverInf = serverInf.replace("$$members$$", serverMembers);
        serverInf = serverInf.replace("$$icon$$", serverIcon);
        serverInf = serverInf.replace("$$date$$", date);
        message.channel.send(serverInf);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
