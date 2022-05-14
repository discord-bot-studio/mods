module.exports = {
    name: "CreateGuildInvite",
    author: ["aoe#4851"],
    version: "1.2.0",
    changelog: "Added Max Age and Max Uses ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
    </div> 
      <div class="col"> 
        <label>Max Age (Use 0 for ∞ Age)*</label> 
        <input class="form-control" name="maxage"></input><br> 
      </div> 
    </div> 
    </div> 
      <div class="col"> 
        <label>Max Uses (Use 0 for ∞ Uses) *</label> 
        <input class="form-control" name="maxuses"></input><br> 
      </div> 
    </div> 
        <div class="row">
            <div class="col">
                <label>Variable Type *</label>
                <select name="vartype" class="form-control">
                    <option value="temp">Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select><br>
            </div>
            <div class="col">
                <label>Variable Name *</label>
                <input class="form-control" name="varname"></input><br>
            </div>
        </div>
        `;
    },
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded CreateGuildInvite Mod ~ aoe#4851");
    },
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const invite = await message.channel.createInvite({ maxAge: action.maxage, maxUse: action.maxuses })
        DBS.BetterMods.saveVar(action.vartype, action.varname, invite, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
