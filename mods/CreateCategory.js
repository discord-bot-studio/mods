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
    init: function(DBS) {
      if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded CreateCategory Mod ~ aoe#4851");
    },
    mod: function(DBS, message, action, args, command, index) {
      if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

    message.guild.channels.create(DBS.BetterMods.parseAction(action.name, message), { type: 'category' });
    DBS.callNextAction(command, message, args, index + 1);
  }
};
