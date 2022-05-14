module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Play YouTube Video",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Created Play YouTube Video ~ your a nerd",

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

                <div class="row">
                    <div class="col">
                        <label>Variable Type *</label>
                        <select name="varType" class="form-control">
                            <option value="temp">Temp Variable</option>
                            <option value="server">Server Variable</option>
                            <option value="global">Global Variable</option>
                        </select><br>
                    </div>

                    <div class="col">
                        <label>Variable Name *</label>
                        <input class="form-control" name="storeResult"></input><br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label>On Song Started (Node ID)</label>
                        <input class="form-control" name="onSuccess"></input><br>
                    </div>
                    <div class="col">
                        <label>On Song Finished (Node ID)</label>
                        <input class="form-control" name="onFinish"></input><br>
                    </div>
                    <div class="col">
                        <label>Invalid URL (Node ID)</label>
                        <input class="form-control" name="onError"></input>
                    </div>
                </div><br>
                <p>Having issues? Make sure you are running in CMD and have installed the correct node_modules <code>ffmpeg-static ffmpeg fluent-ffmpeg @discordjs/opus ytdl-core</code> in your bot folder.</p>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded send message");
        DBS.BetterMods.requireModule('ytdl-core');
        DBS.BetterMods.requireModule("ffmpeg-static");
        DBS.BetterMods.requireModule("ffmpeg");
        DBS.BetterMods.requireModule("fluent-ffmpeg");
        DBS.BetterMods.requireModule("@discordjs/opus");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const url = DBS.BetterMods.parseAction(action.songurl, message);

        if (url) {
            const ytdl = await DBS.BetterMods.requireModule('ytdl-core');

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
                        DBS.Cache[message.guild.id].dispatcher = undefined;
                        if (action.onfinish != "") return DBS.callNextAction(command, message, args, parseInt(action.onfinish))
                    }).on("error", error => message.channel.send("Error! " + error.name + " " + error.message));

                    DBS.Cache[message.guild.id].dispatcher.setVolumeLogarithmic(1);
                    DBS.BetterMods.saveVar(action.vartype, action.storeresult, songInfo.videoDetails.title, message.guild)

                    if (action.onsuccess != "") return DBS.callNextAction(command, message, args, parseInt(action.onsuccess));
                } else if (action.onError != "") return DBS.callNextAction(command, message, args, parseInt(action.onerror));
            };
        } else message.channel.send("Invalid URL Variable");

        DBS.callNextAction(command, message, args, index + 1);
    }
};