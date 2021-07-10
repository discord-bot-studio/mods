module.exports = {
    name: "CreateCategory",
    author: ["aoe#4851"],
    version: "1.0.0",
    changelog: "Added CreateCategory Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function(data) {
        return `
        <div class="form-group">
            <label>The Category Name *</label>
            <textarea class="form-control needed-field" name="name" rows="1" ></textarea>
        </div>
        `;
    },
    init: function() {
        console.log("Loaded CreateCategory Mod ~ aoe#4851");
    },
    mod: function(DBS, message, action, args, command, index) {
    message.guild.channels.create(action.name, { type: 'category' });
    DBS.callNextAction(command, message, args, index + 1);
  }
};