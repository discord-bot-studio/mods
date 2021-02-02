module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Play YouTube Video",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Created Play YouTube Video ~ Great Plains Modding",

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
                <label>YouTube URL *</label>
                <input class="form-control" name="songURL"></input><br>

                <label>Store Song Name (Temp Var) *</label>
                <input class="form-control" name="storeSongName"></input><br>

                <label>Success (Node ID)*</label>
                <input class="form-control" name="onSuccess"></input><br>

                <label>Invalid URL (Node ID) *</label>
                <input class="form-control" name="onError"></input>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded send message");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const url = DBS.BetterMods.parseAction(action.songurl, message);

        if (url) {
            const ytdl = require('ytdl-core');

            const voiceChannel = message.member.voice.channel;
            let songInfo = undefined;

            if (voiceChannel) {                
                try {
                    songInfo = await ytdl.getInfo(url);
                } catch (error) {};

                if (songInfo) {
                    const connection = await voiceChannel.join();
                    const stream = ytdl(songInfo.videoDetails.video_url);
                    DBS.Cache[message.guild.id].dispatcher = await connection.play(stream).on("finish", () => { 
                        DBS.Cache[message.guild.id].dispatcher.destroy();
                    }).on("error", error => message.channel.send("Error! " + error.name + " " + error.message));

                    DBS.Cache[message.guild.id].dispatcher.setVolumeLogarithmic(1);
                    DBS.Cache[message.guild.id].variables[action.storesongname] = songInfo.videoDetails.title;

                    if (action.onsuccess != "") return DBS.callNextAction(command, message, args, parseInt(action.onsuccess));
                } else if (action.onError != "") return DBS.callNextAction(command, message, args, parseInt(action.onerror));
            };
        } else message.channel.send("Invalid URL Variable");

        DBS.callNextAction(command, message, args, index + 1);
    }
};