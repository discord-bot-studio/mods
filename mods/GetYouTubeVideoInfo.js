module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Get YouTube Video Info",

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
                <label>YouTube Video URL *</label>
                <input class="form-control" name="songURL"></input><br>

                <div class="row">
                    <div class="col">
                        <label>Get *</label>
                        <select class="form-control" name="fetchType">
                            <option value="videoURL">Video Title</option>
                            <option value="videoDescription">Video Description</option>
                            <option value="videoThumbnail">Video Thumbnail</option>
                            <option value="videoLength">Video Length</option>
                        </select>
                    </div>
                    <div class="col">
                        <label>Invalid URL (Node ID)</label>
                        <input class="form-control" name="onError"></input><br>
                    </div>
                </div><br>

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
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded send message");
        DBS.BetterMods.requireModule('ytdl-core');
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const url = DBS.BetterMods.parseAction(action.songurl, message);

        if (url) {
            const ytdl = await DBS.BetterMods.requireModule('ytdl-core');

            let songInfo = undefined;

            try {
                songInfo = await ytdl.getInfo(url);
            } catch (error) {};

            if (songInfo) {
                switch(action.fetchtype) {
                    case "videoURL":
                        DBS.BetterMods.saveVar(action.vartype, action.storeresult, songInfo.videoDetails.video_url, message.guild);
                    break
                    case "videoDescription":
                        DBS.BetterMods.saveVar(action.vartype, action.storeresult, songInfo.videoDetails.description, message.guild);
                    break
                    case "videoThumbnail":
                        DBS.BetterMods.saveVar(action.vartype, action.storeresult, songInfo.videoDetails.thumbnails[0].url, message.guild);
                    break
                    case "videoLength":
                        DBS.BetterMods.saveVar(action.vartype, action.storeresult, songInfo.videoDetails.lengthSeconds, message.guild);
                    break
                }
            } else if (action.onError != "") return DBS.callNextAction(command, message, args, parseInt(action.onerror));
    
        } else message.channel.send("Invalid URL Variable");
        DBS.callNextAction(command, message, args, index + 1);
    }
};