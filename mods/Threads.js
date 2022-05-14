module.exports = {
    name: "Threads",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added Threads Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function(data) {
        return `
        <div class="form-group">
        <label>Thread Action *</label>
        <select name="main" id="main" class="form-control" required>
            <option value="create">Create a Thread</option>
            <option value="delete">Delete a Thread</option>
            <option value="archive">Archive a Thread</option>
            <option value="unarchive">Unarchive a Thread</option>
            <option value="lock">Lock a Thread</option>
            <option value="unlock">Unlock a Thread</option>
            <option value="join">Let the Client join the Thread</option>
            <option value="leave">Let the Client leave the Thread</option>
            <option value="add">Add a Member to the Thread</option>
            <option value="remove">Remove a Member from the Thread</option>
        </select><br>
    </div>
    <div class="row" id="wherethread">
       <div class="col">
       <label>Channel to create the Thread in *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="wheretothread"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="wheretothread">Insert Variable</a>
    </div>
  </div>
</div>
</div>
    <div class="row" id="threadingid">
       <div class="col">
       <label>Thread ID *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="threadid"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="threadid">Insert Variable</a>
    </div>
  </div>
</div>
</div>
    <div class="row" id="name">
      <div class="col">
       <label>Thread Name *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="channelname"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelname">Insert Variable</a>
    </div>
  </div>
</div>
</div>
<div class="row" id="archiveduration">
       <div class="col">
       <label>Auto Archive Duration in Minutes(Lvl. 2 Boost required for 1 week) *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="autoarchiveduration"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="autoarchiveduration">Insert Variable</a>
    </div>
  </div>
</div>
</div>
<div class="row" id="reason">
       <div class="col">
       <label>Reason *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="channelreason"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelreason">Insert Variable</a>
    </div>
  </div>
</div>
</div>
    <div class="row" id="channel">
       <div class="col">
       <label>Channel ID *</label>
       <div class="input-group mb-3">
      <input class="form-control" name="channelid"></input><br>
      <div class="input-group-append">
      <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelid">Insert Variable</a>
    </div>
  </div>
</div>
</div>
<div class="row" id="member">
<div class="col">
     <label>Member ID *</label>
     <div class="input-group mb-3">
    <input class="form-control" name="memberid"></input><br>
    <div class="input-group-append">
    <a class="btn btn-outline-primary" role="button" id="variables" forinput="memberid">Insert Variable</a>
    </div>
  </div>
</div>
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

    <script>
        $(function() {
            $("#wherethread").hide();
            $("#threadingid").hide();
            $("#name").hide();
            $("#archiveduration").hide();
            $("#reason").hide();
            $("#channel").hide();
            $("#member").hide();
            $("#var").hide();
            check()
            $('#main').change(() => {
                check()
                check2()
                check3()
                check4()
            });
        })
        function check() {
            if ($('#main').val() == "delete" || $('#main').val() == "archive" || $('#main').val() == "unarchive" || $('#main').val() == "lock" || $('#main').val() == "unlock" || $('#main').val() == "join" || $('#main').val() == "leave" || $('#main').val() == "add" || $('#main').val() == "remove") {
                $("#channel").show()
            } else {
                $("#channel").hide()
            }
        }
        function check2() {
            if ($('#main').val() == "create") {
                $("#wherethread").show()
                $("#name").show()
                $("#archiveduration").show()
                $("#reason").show()
                $("#var").show()
            } else {
                $("#wherethread").hide()
                $("#name").hide()
                $("#archiveduration").hide()
                $("#reason").hide()
                $("#var").hide()
            }
        }
        function check3() {
            if($('#main').val() == "add" || $('#main').val() == "remove") {
                $("#member").show();
            } else {
                $("#member").hide();
            }
        }
        function check4() {
            if($('#main').val() == "delete" || $('#main').val() == "archive" || $('#main').val() == "unarchive" || $('#main').val() == "lock" || $('#main').val() == "unlock" || $('#main').val() == "join" || $('#main').val() == "leave" || $('#main').val() == "add" || $('#main').val() == "remove") {
                $("#threadingid").show();
            } else {
                $("#threadingid").hide();
            }
        }
    </script>
        `;
    },
    init: async function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded Threads Mod ~ aoe#4851")
    },
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        switch(action.main) {
            case "create":
                const channel = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread = await channel.threads.create({
                    name: DBS.BetterMods.parseAction(action.channelname, message),
                    autoArchiveDuration: DBS.BetterMods.parseAction(action.autoarchiveduration, message),
                    reason: DBS.BetterMods.parseAction(action.channelreason, message),
                });
                DBS.BetterMods.saveVar(action.vartype, action.varname, thread.id, message.guild);
                console.log(`${thread}`);                
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "delete":
                const channel1 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread1 = channel1.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread1.delete();
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "archive":
                const channel2 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread2 = channel2.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread2.setArchived(true); 
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "unarchive":
                const channel3 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread3 = channel3.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread3.setArchived(false); 
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "lock":
                const channel4 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread4 = channel4.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread4.setLocked(true);
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "unlock":
                const channel5 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread5= channel5.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread5.setLocked(false);
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "join":
                const channel6 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread6 = channel6.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                if (thread6.joinable) await thread.join();
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "leave":
                const channel7 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread7= channel7.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread7.leave();
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "add":
                const channel8 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread8 = channel8.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread8.members.add(DBS.BetterMods.parseAction(action.memberid, message));
                DBS.callNextAction(command, message, args, index + 1);
            break
            case "remove":
                const channel9 = DBS.Bot.channels.cache.get(DBS.BetterMods.parseAction(action.wheretothread, message))
                const thread9 = channel9.threads.cache.find(t => t.id === DBS.BetterMods.parseAction(action.threadid, message));
                await thread9.members.remove(DBS.BetterMods.parseAction(action.memberid, message));
                DBS.callNextAction(command, message, args, index + 1);
            break
        };
    }
};