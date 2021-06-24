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
    init: function() {
        console.log("Loaded GetInviteCount Mod ~ aoe#4851");
    },
    mod: function(DBS, message, action, args, command, index) {
        var user = message.author;

        message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
               DBS.BetterMods.saveVar(action.vartype, action.varname, userInviteCount, message.guild);
            }
        )

        DBS.callNextAction(command, message, args, index + 1);
        }
    };