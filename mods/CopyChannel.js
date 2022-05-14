module.exports = {
    name: "CopyChannel",
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
        <label>Channel to Copy(Use $$Command_Channel$$ to Copy the Command Channel) *</label>
        <div class="input-group mb-3">
       <input class="form-control needed-field" name="copychannel"></input><br>
       <div class="input-group-append">
       <a class="btn btn-outline-primary" role="button" id="variables" forinput="copychannel">Insert Variable</a>
     </div>
   </div>
 </div>
        `;
    },
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded CopyChannel Mod ~ aoe#4851");
    },
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

    if (action.copychannel == "$$Command_Channel$$") {
        message.channel.clone().then(channel => { console.log(channel) })
    } else {
        let chan = DBS.BetterMods.parseAction(action.copychannel, message)
        const chann = await message.guild.channels.cache.get(chan)
        chann.clone().then(channel => { console.log(channel) })
    }
    DBS.callNextAction(command, message, args, index + 1);
    }
};