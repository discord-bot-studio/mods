module.exports = {
    name: "SetChannelPos",
    author: ["aoe#4851"],
    version: "1.2.0",
    changelog: "Re-Coded the Mod + var Support ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
        </div>
        <div class="col">
        <label>New Channel Position(Use $$pos$$ to set it to the last Channel where the Command was executed) *</label>
        <div class="input-group mb-3">
       <input class="form-control needed-field" name="newpos"></input><br>
       <div class="input-group-append">
       <a class="btn btn-outline-primary" role="button" id="variables" forinput="newpos">Insert Variable</a>
     </div>
   </div>
 </div>
        `;
    },
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded SetChannelPos Mod ~ aoe#4851");
    },
    mod: function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

    if (action.newpos == "$$pos$$") {
        var pos = message.channel.position
        message.channel.setPosition(pos)
    } else {
        message.channel.setPosition(DBS.BetterMods.parseAction(action.newpos, message))
    }
    DBS.callNextAction(command, message, args, index + 1);
    }
};
