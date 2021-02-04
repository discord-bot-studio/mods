module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Get Server Info",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
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
            <label>Get *</label>
            <select name="info" class="form-control">
                <option value="memberCount">Member Count</option>
                <option value="serverIcon">Server Icon</option>
                <option value="guildCreated">Guild Created Date/option>
            </select><br>

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
    init: function() {
        console.log("Loaded Get Server Info");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        switch(action.info) {
            case "memberCount":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, message.guild.memberCount, message.guild);
            break
            case "serverIcon":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, message.guild.iconURL(), message.guild);
            break
            case "guildCreated":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, message.guild.createdAt, message.guild);
            break
        };

        DBS.callNextAction(command, message, args, index + 1);
    }
};
