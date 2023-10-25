module.exports = {
    name: "Timeout",
    author: ["aoe#4851", "@miroxik74"],
    version: "0.0.2",
    changelog: "Fixed",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function(data) {
        return `
        </div>
        <div class="col">
        <label>User to Timeout (Leave it out to get the user via mention) </label>
    <div class="input-group mb-3">
        <input class="form-control" name="user"></input><br>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="user">Insert Variable</a>
        </div>
    </div>
</div>
    </div>
        <div class="col">
        <label>Time to Timeout the User (ex: 60s, 5m, 10m, 1h, 1d, null) *</label>
    <div class="input-group mb-3">
        <input class="form-control needed-field" name="time"></input><br>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="time">Insert Variable</a>
        </div>
    </div>
    <p class="text-muted">Values:<br>s - Seconds<br>m - Minutes<br>h - Hours<br>d - Days<br>null - Remove Timeout</p>
</div>
    </div>
        <div class="col">
        <label>Reason for the Timeout</label>
    <div class="input-group mb-3">
        <input class="form-control needed-field" name="reason"></input><br>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="reason">Insert Variable</a>
        </div>
    </div>
</div>
        `;
    },
    init: async function(DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        console.log("Loaded Timeout Mod")
    },
mod: async function(DBS, message, action, args, command, index) {
    if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

    const ms = require("ms");
    if (DBS.BetterMods.parseAction(action.user, message) !== "null") {
        const User = await message.guild.members.fetch(DBS.BetterMods.parseAction(action.user, message));
        User.timeout(null)
            .then(console.log)
            .catch(console.error);
    }
    if (action.user == "") {
        const Time = ms(DBS.BetterMods.parseAction(action.time, message));
        const User = message.mentions.members.first();
        const Reason = DBS.BetterMods.parseAction(action.reason, message);
        User.timeout(Time, Reason)
            .then(console.log)
            .catch(console.error);
    }
    if (action.user !== "") {
        const Time = ms(DBS.BetterMods.parseAction(action.time, message));
        const User = await message.guild.members.fetch(DBS.BetterMods.parseAction(action.user, message));
        const Reason = DBS.BetterMods.parseAction(action.reason, message);
        User.timeout(Time, Reason)
            .then(console.log)
            .catch(console.error);
    }
    DBS.callNextAction(command, message, args, index + 1);
}
};
