module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Voice Manager",

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
                <label>Get *</label>
                <select name="info" id="info" class="form-control" required>
                    <option value="isAuthorInVC">Is Author In Voice Channel</option>
                    <option value="IsBotPlayingSong">Is Bot Playing Song</option>
                    <option value="leaveVC">Leave Voice Channel</option>
                    <option value="voiceVolume">Set Voice Volume</option>
                    <option value="stopPlaying">Stop Playing</option>
                </select><br>

                <div class="row" id="trueFalse">
                    <div class="col">
                        <label>If True Jump To Node *</label>
                        <input class="form-control" name="ifTrue"></input><br>
                    </div>

                    <div class="col">
                        <label>If False Jump To Node *</label>
                        <input class="form-control" name="ifFalse"></input><br>
                    </div>
                </div>

                <div id="volumeField">
                    <label>Volume *</label>
                    <input class="form-control" name="volume"></input><br>
                </div>
            </div>

            <script>
                $(function() {
                    $("#trueFalse").hide();
                    $("#volumeField").hide()


                    check()
                    $('#info').change(() => {
                        check()
                    });
                })

                function check() {
                    if ($('#info').val() == "isAuthorInVC" || $("#info").val() == "IsBotPlayingSong") {
                        $("#trueFalse").show()
                    } else {
                        $("#trueFalse").hide()
                    }

                    if ($('#info').val() == "voiceVolume") {
                        $("#volumeField").show()
                    } else {
                        $("#volumeField").hide()
                    }
                }
            </script>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded VoiceManager.js");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        switch(action.info) {
            case "isAuthorInVC":
                if (message.member.voice.channel) {
                    DBS.callNextAction(command, message, args, parseInt(action.iftrue));
                } else DBS.callNextAction(command, message, args, parseInt(action.iffalse));
            break
            case "IsBotPlayingSong":
                if (DBS.Cache[message.guild.id].dispatcher) {
                    DBS.callNextAction(command, message, args, parseInt(action.iftrue));
                } else DBS.callNextAction(command, message, args, parseInt(action.iffalse));
            break
            case "leaveVC":
                message.member.voice.channel.leave()
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "voiceVolume":
                DBS.Cache[message.guild.id].dispatcher.setVolumeLogarithmic(parseInt(DBS.BetterMods.parseAction(action.volume, message)) / 100);
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "stopPlaying":
                DBS.Cache[message.guild.id].dispatcher.destroy();
                DBS.Cache[message.guild.id].dispatcher = undefined;
                DBS.callNextAction(command, message, args, index + 1);
            break
        }
    }
};