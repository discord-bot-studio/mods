module.exports = {
    name: "Guilds",
    author: ["aoe#9214"],
    version: "0.0.1",
    changelog: "Added Threads Mod ~ aoe#9214",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function(data) {
        return `
        <div class="form-group">
        <label>Guild Action *</label>
        <select name="main" id="main" class="form-control" required>
            <option value="create">Create a Guild</option>
            <option value="icon">Change the Server Icon</option>
            <option value="name">Change the Server Name</option>
            <option value="region">Change the Server Region</option>
            <option value="delete">Delete a Guild(Bot needs to be Owner)</option>
            <option value="owner">Set new Guild Owner(Bot needs to be Owner)</option>
        </select><br>
    </div>
    <div class="row" id="serverid">
    <div class="col">
    <label>Guild ID *</label>
    <div class="input-group mb-3">
   <input class="form-control" name="guildid"></input><br>
   <div class="input-group-append">                              
   <a class="btn btn-outline-primary" role="button" id="variables" forinput="guildid">Insert Variable</a>
 </div>
</div>
</div>
</div>
    <div class="row" id="servername">
       <div class="col">
       <label>Guild Name *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="guildname"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="guildname">Insert Variable</a>
    </div>
  </div>
</div>
</div>
    <div class="row" id="servericon">
      <div class="col">
       <label>Guild Icon *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="guildicon"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="guildicon">Insert Variable</a>
    </div>
  </div>
</div>
</div>
<div class="row" id="serverregion">
       <div class="col">
       <label>Guild Region *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="guildregion"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="guildregion">Insert Variable</a>
    </div>
  </div>
</div>
</div>
<div class="row" id="serverowner">
       <div class="col">
       <label>User ID *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="guildowner"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="guildowner">Insert Variable</a>
    </div>
  </div>
</div>
</div>
<div id="saveid">
<hr>
<b>Save Guild ID</b>
<hr>
</div>
<div class="row" id="var">
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
<div id="savelnk">
<hr>
<b>Save Invite Link</b>
<hr>
</div>
<div class="row" id="var2">
<div class="col">
    <label>Variable Type *</label>
    <select name="vartype2" class="form-control">
        <option value="temp">Temp Variable</option>
        <option value="server">Server Variable</option>
        <option value="global">Global Variable</option>
    </select><br>
</div>
<div class="col">
    <label>Variable Name *</label>
    <input class="form-control" name="varname2"></input><br>
</div>
</div>
    <script>
        $(function() {
            $("#servername").hide();
            $("#serverid").hide();
            $("#servericon").hide();
            $("#archiveduration").hide();
            $("#serverregion").hide();
            $("#serverowner").hide();
            $("#saveid").hide();
            $("#savelnk").hide();
            $("#var").hide();
            $("#var2").hide();
            check()
            $('#main').change(() => {
                check()
                check2()
                check3()
                check4()
                check5()
                check6()
            });
        })
        function check() {
            if ($('#main').val() == "create" || $('#main').val() == "name") {
                $("#servername").show()
            } else {
                $("#servername").hide()
            }
        }
        function check2() {
            if ($('#main').val() == "icon" || $('#main').val() == "name"|| $('#main').val() == "region" || $('#main').val() == "delete" || $('#main').val() == "owner") {
                $("#serverid").show()
            } else {
                $("#serverid").hide()
            }
        }
        function check3() {
            if ($('#main').val() == "icon") {
                $("#servericon").show()
            } else {
                $("#servericon").hide()
            }
        }
        function check4() {
            if ($('#main').val() == "region") {
                $("#serverregion").show()
            } else {
                $("#serverregion").hide()
            }
        }
        function check5() {
            if ($('#main').val() == "owner") {
                $("#serverowner").show()
            } else {
                $("#serverowner").hide()
            }
        }
        function check6() {
            if ($('#main').val() == "create") {
                $("#saveid").show()
                $("#savelnk").show()
                $("#var").show()
                $("#var2").show()
            } else {
                $("#saveid").hide()
                $("#savelnk").hide()
                $("#var").hide()
                $("#var2").hide()
            }
        }
    </script>
        `;
    },
    init: async function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded Guilds Mod ~ aoe#9214")
    },
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        switch(action.main) {
            case "create":
                const Guild = await DBS.Bot.guilds.create(DBS.BetterMods.parseAction(action.guildname, message), {
                    channels: [
                        {"name": "auto-generated"},
                    ]
                })
                const GuildChannel = Guild.channels.cache.find(channel => channel.name == "auto-generated");
                const Invite = await GuildChannel.createInvite({maxAge: 0, unique: true, reason: "Guild Created"});
                DBS.BetterMods.saveVar(action.vartype, action.varname, Guild.id, message.guild);
                DBS.BetterMods.saveVar(action.vartype2, action.varname2, `${Invite.url}`, message.guild);             
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "icon":
                const guild = DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.guildid, message))
                guild.setIcon(DBS.BetterMods.parseAction(action.guildicon, message))
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "name":
                const guild1 = DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.guildid, message))
                guild1.setName(DBS.BetterMods.parseAction(action.guildname, message))
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "region":
                const guild2 = DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.guildid, message))
                guild2.setRegion(DBS.BetterMods.parseAction(action.guildregion, message))
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "delete":
                const Guild1 = DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.guildid, message))
                Guild1.delete()
                .then(g => console.log(`Deleted the guild ${g}`))
                .catch(console.error);
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "owner":
                const guild3 = await DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.guildid, message))
                let owner = DBS.Bot.users.fetch(DBS.BetterMods.parseAction(action.guildowner, message));
                owner.then(function(newOwner) {
                    guild3.setOwner(newOwner)
                    .then(guild => guild.fetchOwner())
                    .then(owner => console.log(`Updated the guild owner to ${owner.displayName}`))
                    .catch(console.error);
                });
                DBS.callNextAction(command, message, args, index + 1);
            break
        
        };
    }
};