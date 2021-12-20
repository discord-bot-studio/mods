module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Command Cooldown",

    // Place the author of the mod here. This is an array so you can add multiple authors.
    author: ["Vannzilla", "STR1KE#6969", "Subcher"],

    // Place the version of the mod here.
    version: "2.1.0",

    // Whenever you make a change, place the changelog here.
    changelog: "I made different type of time ~Subcher, next is checkboxes to custom your timers",

    // Set this to true if this will be an event.
    isEvent: false,

    // Set this to true if this is a response.
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio (what category in the dropdown when adding a response)
    section: "Control",

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
                        <label>Type of remaining Time</label>
                        <select name="remainingtype" class="form-control">
                            <option value="onlyseconds" selected>Only Seconds</option>
                            <option value="hoursminutesandseconds">Hours, Minutes and Seconds</option>
                            <option value="hoursandminutes">Hours and Minutes</option>
                            <option value="onlyhours">Only Hours</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cooldown message (use $$TimeLeft$$ to insert the remaining time in seconds) *</label>
                        <textarea rows="3" class="form-control needed-field" name="cooldownmessage" ></textarea>
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
                        <textarea rows="3" class="form-control field" name="endmessage" ></textarea>
                    </div>
            `;
    },
    
    // When the bot is first started this code will be ran.
    init: function (DBS) {
        console.log("Loaded Cooldown Mod");
        const { Collection } = require('discord.js');
        DBS.Bot.cooldowns = new Collection();
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
        const { Collection } = require('discord.js');
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
                    var hours = Math.floor(timeLeft / (60 * 60));
                
                    var divisor_for_minutes = timeLeft % (60 * 60);
                    var minutes = Math.floor(divisor_for_minutes / 60);
                 
                    var divisor_for_seconds = divisor_for_minutes % 60;
                    var seconds = Math.ceil(divisor_for_seconds);
                
                    if (action.remainingtype === "onlyhours") {
                        var TimeRemaining = hours + 'h';
                    } else if (action.remainingtype === "hoursandminutes") {
                        var TimeRemaining = hours + 'h ' + minutes + 'm';
                    } else if (action.remainingtype === "hoursminutesandseconds") {
                        var TimeRemaining = hours + 'h ' + minutes + 'm ' + seconds + 's';
                    } else if (action.remainingtype === "onlyseconds") {
                        var TimeRemaining = seconds + 's';
                    }
                    return message.reply(cooldownMessage.replace("$$TimeLeft$$", TimeRemaining));
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
