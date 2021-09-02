module.exports = {
    name: "Remove Reactions",
    author: ["Miro#6969"],
    version: "1.0.0",
    changelog: "None ~ miro",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section:"Reaction",
    html: function(data) {
        return `
        <div class="form-group">
            <label>Message to remove reaction from</label>
            <div class="input-group mb-3">
            <textarea class="form-control field" name="reactionmessage" rows="1" ></textarea>
            <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="reactionmessage">Insert Variable</a>
            </div>
            </div>
        </div>
        <div class="form-group">
        <label>User reaction to remove</label>
        <div class="input-group mb-3">
        <textarea class="form-control field" name="reactionuser" rows="1" ></textarea>
        <div class="input-group-append">
        <a class="btn btn-outline-primary" role="button" id="variables" forinput="reactionuser">Insert Variable</a>
        </div>
        </div>
    </div>
    <div class="form-group">
        <label>Reaction to remove</label>
        <div class="input-group mb-3">
        <textarea class="form-control field" name="reactid" rows="1" ></textarea>
        </div>
        </div>
    </div>
    <div class="form-group">
        <label>Channel of where the Message is</label>
        <div class="input-group mb-3">
        <textarea class="form-control field" name="reactionchannel" rows="1" ></textarea>
        <div class="input-group-append">
        <a class="btn btn-outline-primary" role="button" id="variables" forinput="reactionchannel">Insert Variable</a>
    </div>
    </div>
        `;
    },
    init: function() {
        console.log("Loaded Remove Reactions v1.0.0 \n   If you've got any issues/questions please DM Miro#6969");
    },
    mod: async function(DBS, message, action, args, command, index) {
        DBS.R
        const channel = DBS.BetterMods.parseAction(action.reactionchannel , message)
        const MessageID = DBS.BetterMods.parseAction(action.reactionmessage , message)
        const rmessageuser = DBS.BetterMods.parseAction(action.reactionuser, message)
        const reaction = DBS.BetterMods.parseAction(action.reactid, message)
        const msg = await message.channel.messages.fetch(MessageID);
        msg.reactions.resolve(reaction).users.remove(rmessageuser);
        DBS.callNextAction(command, message, args, index + 1)
    },
};