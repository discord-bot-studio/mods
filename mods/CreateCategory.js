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
     </div>
       <div class="col">
        <label>The Category Name *</label>
         <div class="input-group mb-3">
         <input class="form-control needed-field" name="name"></input><br>
        <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="name">Insert Variable</a>
    </div>
  </div>
        `;
    },
    init: function() {
        console.log("Loaded CreateCategory Mod ~ aoe#4851");
    },
    mod: function(DBS, message, action, args, command, index) {
    message.guild.channels.create(DBS.BetterMods.parseAction(action.name, message), { type: 'category' });
    DBS.callNextAction(command, message, args, index + 1);
  }
};
