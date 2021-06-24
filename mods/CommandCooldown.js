const { Collection } = require('discord.js')
module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Command Cooldown",

    // Place the author of the mod here. This is an array so you can add multiple authors.
    author: ["Vannzilla", "STR1KE#6969"],

    // Place the version of the mod here.
    version: "2.0.0",

    // Whenever you make a change, place the changelog here.
    changelog: "Everywhere I go I see STR1KE's terrible code ~Vannzy",

    // Set this to true if this will be an event.
    isEvent: false,

    // Set this to true if this is a response.
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio (what category in the dropdown when adding a response)
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod. Each input/select field will be saved to commands.json based on the NAME
    // attribute, so each input must have a NAME attribute.
    html: function (data) {
        return `<h5>Must be placed at the beginning of a command</h5>
                </br>
                <div class="form-group">
                    <label>Seconds *</label>
                    <input class="form-control needed-field" name="seconds" />
                </div>
                <div class="form-group">
                    <label>Cooldown message (use $$TimeLeft$$ to insert the remaining time in seconds) *</label>
                    <input class="form-control needed-field" name="cooldownmessage" />
                </div>
                <div class="form-group">
                    <label>Cooldown ended message channel</label>
                    <select name="endchannel" class="form-control">
                        <option value="messagechannel" selected>Message Channel</option>
                        <option value="dmchannel">DM Channel</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Cooldown ended message</label>
                    <input class="form-control field" name="endmessage" />
                </div>`;
    },

    // When the bot is first started this code will be ran.
    init: function (DBS) {
        console.log("Loaded Cooldown Mod");
        DBS.Bot.cooldowns = new Collection();
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
        const { cooldowns } = DBS.Bot;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (action.seconds) * 1000;
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const cooldownMessage = action.cooldownmessage;
                return message.reply(cooldownMessage.replace("$$TimeLeft$$", timeLeft.toFixed(1)));
            }
        } else {
            timestamps.set(message.author.id, now);

            function cooldownEnd() {
                timestamps.delete(message.author.id)
                if (action.endmessage) {
                    if (action.endchannel === "messagechannel") {
                        message.reply(action.endmessage);
                    } else if (action.endchannel === "dmchannel") {
                        message.author.send(action.endmessage);
                    }
                }
            }
            setTimeout(() => cooldownEnd(), cooldownAmount);
        }

        try {
            DBS.callNextAction(command, message, args, index + 1);
        } catch (error) {
            console.error(error);
        }

    }
};
