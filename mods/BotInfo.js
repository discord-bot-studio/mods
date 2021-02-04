module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Bot Info",

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
                <select name="info" class="form-control">
                    <option value="clientGuildCount">Client Guild Count</option>
                    <option value="clientPing">Client Ping</option>
                    <option value="clientUptimeSeconds">Client Uptime (Seconds)</option>
                    <option value="clientUptimeMinutes">Client Uptime (Minutes)</option>
                    <option value="clientUptimeHours">Client Uptime (Hours)</option>
                    <option value="clientUptimeDays">Client Uptime (Days)</option>
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
        console.log("Loaded send message");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        switch(action.info) {
            case "clientGuildCount":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, DBS.Bot.guilds.size, message.guild)
            break
            case "clientPing":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, DBS.Bot.ws.ping, message.guild)
            break
            case "clientUptimeSeconds":        
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(DBS.Bot.uptime / 1000) % 60, message.guild)
            break
            case "clientUptimeMinutes":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(DBS.Bot.uptime / 60000) % 60, message.guild)
            break
            case "clientUptimeHours":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(DBS.Bot.uptime / 3600000) % 24, message.guild)
            break
            case "clientUptimeDays":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, Math.floor(DBS.Bot.uptime / 86400000), message.guild)
            break
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};