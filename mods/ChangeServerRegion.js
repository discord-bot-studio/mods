module.exports = {
    name: "ChangeServerRegion",
    author: ["aoe#9022"],
    version: "1.0.0",
    changelog: "Added ChangeServerregion Mod ~ aoe#9022",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function(data) {
        return `
        <b>Available Regions: </b>
        <b>"brazil" </b>
        <b>"hongkong" </b>
        <b>"india" </b>
        <b>"japan" </b>
        <b>"russia" </b>
        <b>"singapore" </b>
        <b>"southafrica </b>
        <b>"sydney" </b>
        <b>"us-central" </b>
        <b>"us-east" </b>
        <b>"us-south" </b>
        <b>"us-west" </b>
        <b>"europe" </b>
        <div class="form-group">
            <label>The New Region *</label>
            <textarea class="form-control needed-field" name="reg" rows="1" ></textarea>
        </div>
        `;
    },
    init: function() {
        console.log("Loaded ChangeServerRegion Mod ~ aoe#9022");
    },
    mod: function(DBS, message, action, args, command, index) {
        message.guild.setRegion(action.reg) // changes server region
        DBS.callNextAction(command, message, args, index + 1);
    }
};