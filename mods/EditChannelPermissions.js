module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Edit Channel Permissions",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["zCuzImJonas#1010", "Pokemonultra#2815"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name.
    changelog: "Added Variable Support ~ Pokemonultra",

    // Set this to true if this will be an event.
    isEvent: false,

    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Channel Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function (data) {
        return `
        <div class="form-group">
        <label>Role/User ID or Name: *</label>
        <div class="input-group mb-3">
        <input class="form-control needed-field" name="roleidorname"/>
        <div class="input-group-append">
        <a class="btn btn-outline-primary" role="button" id="variables" forinput="roleidorname">Insert Variable</a>
        </div>
        </div>
        <small class="form-text text-muted">Type @everyone so set Permissions for everyone</small>
        </div>
        <div class="form-group">
        <label>Channel ID or Name: *</label>
        <div class="input-group mb-3">
        <input class="form-control needed-field" name="channelidorname"></input>
        <div class="input-group-append">
        <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelidorname">Insert Variable</a>
        </div>
        </div>
        </div>
        <div class="form-group">
        <label>Channel Type: *</label>
            <select class="form-control" name="channeltype" id="cType">
                <option value="voice" selected>Voice</option>
                <option value="text">Text</option>
            </select>
        </div>
        <label>Which permission(s) should be changed? (control + click to select multiple) *</label>
        <div class="form-group" id="vcPerms">
            <select multiple class="form-control" name="editvcperms" size="12">
                <option value="VIEW_CHANNEL">VIEW_CHANNEL</option>
                <option value="MANAGE_CHANNELS">MANAGE_CHANNELS</option>
                <option value="CREATE_INSTANT_INVITE">CREATE_INSTANT_INVITE</option>
                <option value="CONNECT">CONNECT</option>
                <option value="SPEAK">SPEAK</option>
                <option value="STREAM">STREAM</option>
                <option value="USE_VAD">USE_VOICE_ACTIVITY_DETECTION</option>
                <option value="PRIORITY_SPEAKER">PRIORITY_SPEAKER</option>
                <option value="MUTE_MEMBERS">MUTE_MEMBERS</option>
                <option value="DEAFEN_MEMBERS">DEAFEN_MEMBERS</option>
                <option value="MOVE_MEMBERS">MOVE_MEMBERS</option>
                <option value="MOVE_MEMBERS">MANAGE_ROLES</option>
            </select>
        </div>
        <div class="form-group" id="txtPerms">
            <select class="form-control" name="edittxtperms" multiple size="14">
                <option value="VIEW_CHANNEL">VIEW_CHANNEL</option>
                <option value="MANAGE_CHANNELS">MANAGE_CHANNELS</option>
                <option value="MANAGE_WEBHOOKS">MANAGE_WEBHOOKS</option>
                <option value="CREATE_INSTANT_INVITE">CREATE_INSTANT_INVITE</option>
                <option value="SEND_MESSAGES">SEND_MESSAGES</option>
                <option value="EMBED_LINKS">EMBED_LINKS</option>
                <option value="ATTACH_FILES">ATTACH_FILES</option>
                <option value="ADD_REACTIONS">ADD_REACTIONS</option>
                <option value="USE_EXTERNAL_EMOJIS">USE_EXTERNAL_EMOJIS</option>
                <option value="MENTION_EVERYONE">MENTION_EVERYONE</option>
                <option value="MANAGE_MESSAGES">MANAGE_MESSAGES</option>
                <option value="READ_MESSAGE_HISTORY">READ_MESSAGE_HISTORY</option>
                <option value="SEND_TTS_MESSAGES">SEND_TTS_MESSAGES</option>
                <!--<option value="USE_APPLICATION_COMMANDS">USE_APPLICATION_COMMANDS</option>
                <option value="MANAGE_THREADS">MANAGE_THREADS</option>
                <option value="USE_PRIVATE_THREADS">USE_PRIVATE_THREADS</option>
                <option value="USE_PUBLIC_THREADS">USE_PUBLIC_THREADS</option>
                <option value="USE_EXTERNAL_STICKERS">USE_EXTERNAL_STICKERS</option>-->
                <option value="MANAGE_ROLES">MANAGE_ROLES</option>
            </select>
        </div>
        <div class="form-group">
        <label>Set Permission to true/false *</label>
            <select class="form-control" name="yesNo">
                <option value="settrue" selected>true</option>
                <option value="setfalse">false</option>
            </select>
        </div>
        <label><span style="font-weight: bold">Mod made by:</span> Pokemonultra#2815 & zCuzImJonas#1010</label>
                
                <script>
                $(function() {
                    
                    
                    $("#txtPerms").hide()
                    
                    
                    check()
                    $('#cType').change(() => {
                check()
            });
        })
        
        function check() {
            if ($('#cType').val() == "voice") {
                $("#vcPerms").show()
                $("#txtPerms").hide()
            } else {
                $("#vcPerms").hide()
                $("#txtPerms").show()
            }
        }
        </script>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function () {
        console.log("Loaded Edit Channel Permissions - by zCuzImJonas#1010 & Pokemonultra#2815");
    },

    // Place your mod here.
    mod: function (DBS, message, action, args, command, index) {
        const Groles = message.guild.roles;
        const User = message.guild.members;
        const list = action.editvcperms && action.edittxtperms;
        let channel = DBS.BetterMods.parseAction(action.channelidorname, message);
        let role = DBS.BetterMods.parseAction(action.roleidorname, message);


        role = Groles.cache.find(r => r.name === role) || Groles.cache.find(r => r.id === role) || User.cache.find(u => u.displayName === role) || User.cache.find(u => u.id === role);
        channel = message.guild.channels.cache.find(c => c.name === channel) || message.guild.channels.cache.find(c => c.id === channel);


        if (!role && !channel)
            return message.channel.send("Invalid Role/User & Channel ID or Name");
        else if (!channel)
            return message.channel.send("Invalid Channel ID or Name");
        else if (!role)
            return message.channel.send("Invalid Role/User ID or Name");


        if (action.yesno === "settrue") {
            action.yesno = true
        } else {
            action.yesno = false
        };


        const bool = action.yesno;


        const permOvOpt = {}
        list.forEach(item => permOvOpt[item] = bool)
        channel.updateOverwrite(role, permOvOpt).then(message.channel.send("Done"));


        DBS.callNextAction(command, message, args, index + 1);
    }
};