module.exports = {
    name: "ChangeServerName",
    author: ["aoe#9022"],
    version: "1.0.0",
    changelog: "Added ChangeServerName Mod ~ aoe#9022",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function(data) {
        return `
        <div class="form-group">
            <label>New Name of the Server *</label>
            <textarea class="form-control needed-field" name="name" rows="1" ></textarea>
        </div>
        `;
    },
    init: function() {
        console.log("Loaded ChangeServerName Mod ~ aoe#9022");
    },
    mod: function(DBS, message, action, args, command, index) {
        message.guild.setName(action.name) // changes server name
        // This Scipt is one of the Longest Scripts ive ever made lmao
        DBS.callNextAction(command, message, args, index + 1);
    }
};