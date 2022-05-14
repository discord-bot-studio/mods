module.exports = {
    name: "GetInviteCount",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added GetInviteCount Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function(data) {
        return `
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

        console.log("Loaded GetInviteCount Mod ~ aoe#4851");
    },
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const user = message.author;
        const invites = await message.guild.fetchInvites();
        const userInvites = invites.array().filter(o => o.inviter.id === user.id);
        let userInviteCount = 0;

        for (let i = 0; i < userInvites.length; i++) {
            var invite = userInvites[i];
            userInviteCount += invite['uses'];
        };

        DBS.BetterMods.saveVar(action.vartype, action.varname, userInviteCount, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};