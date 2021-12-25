module.exports = {
    name: "Timeout",
    author: ["aoe#4851"],
    version: "0.0.1",
    changelog: "Added Timeout Mod ~ aoe#4851",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Action",
    html: function(data) {
        return `
        </div>
        <div class="col">
        <label>User to Timeout *</label>
    <div class="input-group mb-3">
        <input class="form-control needed-field" name="user"></input><br>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="user">Insert Variable</a>
        </div>
    </div>
</div>
    </div>
        <div class="col">
        <label>Time to Timeout the User(ex: 10m, 1h, 30s; use null to remove the Timeout) *</label>
    <div class="input-group mb-3">
        <input class="form-control needed-field" name="time"></input><br>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="time">Insert Variable</a>
        </div>
    </div>
</div>
    </div>
        <div class="col">
        <label>Reason for the Timeout *</label>
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
        console.log("Loaded Timeout Mod ~ aoe#4851");
        console.log('\x1b[33m%s\x1b[0m', '[Timeout Mod] - Installing newest discord.js Version.');
        var process = require('child_process');
        process.exec('npm install discord.js@latest',async function (err) {
            if (err) throw err
        });
        console.log('\x1b[32m%s\x1b[0m', '[Timeout Mod] - Finnished installing the newest discord.js Version!');
    },
    mod: async function(DBS, message, action, args, command, index) {
        const ms = require("ms");
        if (action.time == "null") {
            const User = await message.guild.members.fetch(action.user)
            const Reason = action.reason
            User.timeout(null, Reason)
                .then(console.log)
                .catch(console.error);
        }
        const Time = ms(action.time);
        const User = await message.guild.members.fetch(action.user)
        const Reason = action.reason
        User.timeout(Time, Reason)
            .then(console.log)
            .catch(console.error);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
