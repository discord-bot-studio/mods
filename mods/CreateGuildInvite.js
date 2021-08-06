module.exports = {
    name: "CreateGuildInvite",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added CreateGuildInvite Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
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
    init: function() {
        console.log("Loaded CreateGuildInvite Mod ~ aoe#4851");
    },
    mod: async function(DBS, message, action, args, command, index) {
        const invite = await message.channel.createInvite({unique: true})
        DBS.BetterMods.saveVar(action.vartype, action.varname, invite, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};