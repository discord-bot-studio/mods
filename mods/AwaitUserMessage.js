//Required: BetterModsV2
module.exports = {
    name: "Await User Message",
    author: ["Snorlaxmon#2007", 'Tested by Pokemonultra#2815'],
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
        <small class="form-text text-muted" style="margin-top: -10px;">ID of the CHANNEL where the user is going to send the message</small>
    </div>  
    <div class="form-group">
        <label>User ID:</label>
        <div class="input-group mb-3">
            <input class="form-control needed-field" name="userid"></input>
            <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="userid">Insert Variable</a>
            </div>
        </div>
        <small class="form-text text-muted" style="margin-top: -10px;">ID of the USER who is going to send the message</small>
    </div>
    <div class="form-group">
        <label>Time (in seconds):</label>
        <input class="form-control needed-field" name="time"></input>
        <small class="form-text text-muted">TIME to wait for the message from the user</small>
    </div>
    <hr>
    <div class="form-group">
        <label>Save message content in variable called:</label>
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
    init: function () {
        console.log('[MOD]' + "\x1b[32m" + ` ${this.name} was successfully loaded on v${this.version}` + "\x1b[36m");
    },
    //<---------------------------------------------------------------------------------------------->//
    mod: async function (DBS, message, action, args, command, index) {
        const channel = message.guild.channels.cache.find(channel => channel.id === DBS.BetterMods.parseAction(action.channelid, message));
        const user = message.guild.members.cache.find(user => user.id === DBS.BetterMods.parseAction(action.userid, message));
        const filter = msg => msg.author.id === user.id;

        channel.awaitMessages({
            filter,
            time: parseInt(DBS.BetterMods.parseAction(action.time, message)) * 1000,
            max: 1
        })
            .then(msg => {
                DBS.BetterMods.saveVar(action.variabletype, action.variablename, msg.first().content, message.guild), DBS.callNextAction(command, message, args, index + 1)
            })
            .catch(error => {
                DBS.logError({
                    level: 'error',
                    message: '[Await User Message]: ' + error,
                })
            });
    },
};