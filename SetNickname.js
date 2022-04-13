module.exports = {
    name: "Set Nickname",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function (data) {
        return `
            <div class="form-group">
                <label>User ID *</label>
                <input class="form-control needed-field" id="userid" name="userid"></input>
                </div>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="userid">Insert Variable</a>
            </div>
            <div class="form-group">
                <label>New Nickname *</label>
                <input class="form-control needed-field" name="nickname"></input>
                </div>
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="nickname">Insert Variable</a>
            </div>
        `;
    },
    init: function () {
        console.log("Loaded setNickname Mod");
    },
    mod: function (DBS, message, action, args, command, index) {
        message.guild.members.cache.get(DBS.BetterMods.parseAction(action.userid, message)).setNickname(DBS.BetterMods.parseAction(action.nickname, message))

        DBS.callNextAction(command, message, args, index + 1);
    }
};
