module.exports = {
    name: "ChangeServerIcon",
    author: ["aoe#9022"],
    version: "1.0.0",
    changelog: "Added ChangeServerIcon Mod ~ aoe#9022",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function(data) {
        return `
        <div class="form-group">
            <label>Link of the new Server Profile(works with gifs too) *</label>
            <textarea class="form-control needed-field" name="pfp" rows="1" ></textarea>
        </div>
        `;
    },
    init: function() {
        console.log("Loaded ChangeServerIcon Mod ~ aoe#9022");
    },
    mod: function(DBS, message, action, args, command, index) {
        message.guild.setIcon(action.pfp) // changes server pfp
        // This Scipt is one of the Longest Scripts ive ever made lmao
        DBS.callNextAction(command, message, args, index + 1);
    }
};
