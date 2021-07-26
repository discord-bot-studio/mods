module.exports = {
    name: "Create Guild Invite",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added CreateGuildInvite Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function(data) {
        return `
                <div class="form-group">
                    <label>Message when Invite Gets Created, Leave Blank for no Message(use $$code$$ to get the Invite Code) </label>
                    <input class="form-control" name="msg" />
                </div
        `;
    },
    init: function() {
        console.log("Loaded CreateGuildInvite Mod ~ aoe#4851");
    },
    mod: function(DBS, message, action, args, command, index) {
        let channel = message.channel;
        channel.createInvite({unique: true})
        .then(invite => { 
           console.log(`New Invite Created in: ` + message.guild.name + `Code of Invites is:` + invite)
           var invmsg = action.msg 
           invmsg = invmsg.replace("$$code$$", invite.code);
           if (invmsg == "") {
            console.log("nothing")
           }
           else {
           message.channel.send(invmsg)
           }
        })

        DBS.callNextAction(command, message, args, index + 1);
        }
    };
