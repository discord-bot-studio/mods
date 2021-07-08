module.exports = {
    name: "RandomUser",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added RandomUser Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function(data) {
        return `
        </div>
        <div class="col">
        <label>Message ID *</label>
	<div class="input-group mb-3">
      <input class="form-control needed-field" name="msgid"></input><br>
        <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="roleedit">Insert Variable</a>
        </div>
  </div>
</div>
    </div>
       <div class="col">
       <label>Emoji (In Unicode) *</label>
       <div class="input-group mb-3">
      <input class="form-control needed-field" name="emojiid"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="roleedit">Insert Variable</a>
    </div>
  </div>
</div>
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
        <input class="form-control needed-field" name="varname"></input><br>
    </div>
</div>
        `;
    },
    init: function(DBS) {
        console.log("Loaded Random User Mod ~ aoe#4851");
    },
    mod: async function(DBS, message, action, args, command, index) {
        const reactionMessage = await message.channel.messages.fetch(DBS.BetterMods.parseAction(action.msgid, message));
        const emoji = DBS.BetterMods.parseAction(action.emojiid, message)

        const messageReaction = reactionMessage.reactions.cache.get(emoji)
        const users = await messageReaction.users.fetch();
        const user = users.random();

        DBS.BetterMods.saveVar(action.vartype, action.varname, user.id, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
