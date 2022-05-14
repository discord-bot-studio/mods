module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Reply Message",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["your a nerd", "New User"]
    author: ["ni#5375"],

    // Place the version of the mod here.
    version: "0.1.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ your a nerd\n
    changelog: "Reply to a message",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
        <div class="col">
        <label>Message ID *</label>
	<div class="input-group mb-3">
        <input class="form-control needed-field" name="msgid"></input><br>
        <div class="input-group-append">
            <a class="btn btn-outline-primary" role="button" id="variables" forinput="msgid">Insert Variable</a>
                </div>
            </div>
        </div>
            <div class="col">	
            	<div class="form-group">
                <label>Reply text message</label>
                <textarea class="form-control needed-field" name="replytext" rows="3" ></textarea>
            	</div>
            </div>
            <div class="col">
                <label>Mention User?</label>
                    <select name="mentionuser" class="form-control">
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </select>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded ReplyMessage");
        console.log("This mod requires BetterMods V2.1, contact ni#5375 to get it");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const msg = await message.channel.messages.fetch(DBS.BetterMods.parseAction(action.msgid, message));
        const mention = action.mentionuser;

        msg.reply({
            content: `${action.replytext}`,
            allowedMentions: {
                repliedUser: mention
                }
        })
            DBS.callNextAction(command, message, args, index + 1);
        }
    };
