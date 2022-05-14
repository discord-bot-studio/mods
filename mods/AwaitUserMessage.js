//Required: BetterModsV2
module.exports = {
    name: "Await User Message",
    author: ["Snorlaxmon#7278", 'Tested by Pokemonultra#2815'],
    version: "1.0.0",
    changelog: "",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    //<---------------------------------------------------------------------------------------------->//
    html: function (data) {
        return `
    <div class="form-group">
        <label>Channel ID:</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="channelid"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelid">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted" style="margin-top: -10px;">ID of the channel where the user is going to send the
            message</small>
    </div>
    <div class="form-group">
        <label>User ID:</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="userid"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="userid">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted" style="margin-top: -10px;">ID of the user who is going to send the
            message</small>
    </div>
    <div class="form-group">
        <label>Time (in seconds):</label>
        <input class="form-control needed-field" name="time"></input>
        <small class="form-text text-muted">TIME in seconds to wait for the message from the user</small>
    </div>
    <hr>
    <div class="form-group">
        <label>IF true jump to node called:</label>
        <input class="form-control" name="true"></input>
        <small class="form-text text-muted">NAME of the node to jump if the user has sent the message. Note: IF the node to
            jump is after a double output node it won't jump</small>
    </div>
    <div class="form-group">
        <label>IF false jump to node called:</label>
        <input class="form-control" name="false"></input>
        <small class="form-text text-muted">NAME of the node to jump if the user hasn't sent the message. Note: IF the node
            to jump is after a double output node it won't jump</small>
    </div>
    <hr>
    <div class="form-group">
        <label>Save message </label>
        <select name="dropdown" required>
            <option value="content">content</option>
            <option value="id">id</option>
            <option value="type">type</option>
            <option value="url">url</option>
        </select>
        <label>in variable called:</label>
        <input class="form-control needed-field" name="variablename"></input>
        <small class="form-text text-muted">NAME of the variable where message content will be stored</small>
    </div>
    <div class="form-group">
        <label>Variable type:</label>
        <select name="variabletype" class="form-control">
            <option value="temp">Temporary Variable</option>
            <option value="server">Server Variable</option>
            <option value="global">Global Variable</option>
        </select>
    </div>
    `},
    //<---------------------------------------------------------------------------------------------->//
    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log('[MOD]' + '\x1b[36m' + ' ' + `${this.name}` + '\x1b[0m' + '\x1b[32m' + ' ' + `was successfully loaded on ` + '\x1b[0m' + '\x1b[31m' + `v${this.version}` + '\x1b[0m');
    },
    //<---------------------------------------------------------------------------------------------->//
    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        const channel = message.guild.channels.cache.find(channel => channel.id === DBS.BetterMods.parseAction(action.channelid, message));
        const user = message.guild.members.cache.find(user => user.id === DBS.BetterMods.parseAction(action.userid, message));
        const filter = (msg) => msg.author.id === user.id;
        let data;

        channel.awaitMessages({
            filter,
            time: parseInt(DBS.BetterMods.parseAction(action.time, message)) * 1000,
            max: 1
        })
            .then(msg => {
                switch (action.dropdown) {
                    case 'content':
                        data = msg.first().content
                        break;
                    case 'id':
                        data = msg.first().id
                        break;
                    case 'type':
                        data = msg.first().type
                        break;
                    case 'url':
                        data = msg.first().url
                        break;
                };
                DBS.BetterMods.saveVar(action.variabletype, action.variablename, data, message.guild);
                if (action.true) { DBS.callNextAction(command, message, args, command.actions.findIndex(node => node.name == action.true)) };
            })
            .catch(error => {
                DBS.logError({
                    level: 'error',
                    message: '[Await User Message] ' + error,
                });
                console.log('[Await User Message] ' + '\x1b[31m' + error + '\x1b[0m')
                if (action.false) { DBS.callNextAction(command, message, args, command.actions.findIndex(node => node.name == action.false)) };
            });
    },
};