module.exports = {
    name: "MessageReply",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added MessageReply Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function(data) {
        return `
        <div class="form-group">
        <label>Reply *</label>
        <select name="main" class="form-control">
            <option value="mention">with Mention</option>
            <option value="nomention">without Mention</option>
        </select><br>
            <div class="form-group">
                <label>Reply Message Text *</label>
                <input class="form-control" name="txt"></input><br>
            </div>
        </div>
    </div>
    `;
},
    init: function(DBS) {
        console.log("Loaded MessageReply Mod ~ aoe#4851");
        DBS.BetterMods.requireModule("discord-reply");
    },
    mod: async function(DBS, message, action, args, command, index) {
    require('discord-reply'); 
    switch(action.main) {
        case "mention":
            message.lineReply(action.txt); // Reply with mention
        break
        case "nomention":
            message.lineReplyNoMention(action.txt)
        break
    };

    DBS.callNextAction(command, message, args, index + 1);
    }
};