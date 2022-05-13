module.exports = {
    name: "Transcript",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Channel Action",
    html: function (data) {
        return `
            <div class="form-group">
                <label>Channel ID for transcript*</label>
                <div class="input-group mb-3">
                    <textarea class="form-control needed-field" name="chid" id="chid" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="chid">Insert Variable</a>
                    </div>
                </div>
                <hr>
                <label>Message limit (max 100) *</label>
                <div class="input-group mb-3">
                    <textarea class="form-control needed-field" name="msglimit" id="msglimit" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="msglimit">Insert Variable</a>
                    </div>
                </div>
                <hr>
                <label>Channel ID to send transcript to*</label>
                <div class="input-group mb-3">
                    <textarea class="form-control needed-field" name="chid2" id="chid2" rows="1" ></textarea>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="chid2">Insert Variable</a>
                    </div>
                </div>
            </div>
        `;
    },
    init: function (DBS) {
        DBS.BetterMods.requireModule("discord-transcripts")
        console.log("Loaded Transcript");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const transcript = require('discord-transcripts');
        const ch = message.guild.channels.cache.get(DBS.BetterMods.parseAction(action.chid, message))
        const msglimit = DBS.BetterMods.parseAction(action.msglimit, message)

        let messagecoll = await ch.messages.fetch({limit: parseInt(msglimit)})
        const attachment = await transcript.generateFromMessages(messagecoll, ch)

        let ch2 = message.guild.channels.cache.get(DBS.BetterMods.parseAction(action.chid2, message)) || message.channel
        ch2.send({files: [attachment]})
        DBS.callNextAction(command, message, args, index + 1);
    }
};
