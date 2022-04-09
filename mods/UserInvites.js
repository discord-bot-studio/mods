module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "User Invites",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["PlayboyPrime#3839"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Release",

    // Set this to true if this will be an event. Note events wont show up in DBS.
    isEvent: false,

    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "User Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function (data) {
        return `
            <div class="form-group">
                <div class="form-group">
                    <label>User ID *</label>
                    <div class="input-group mb-3">
                        <input class="form-control needed-field" name="userid"></input>
                        <div class="input-group-append">
                            <a class="btn btn-outline-primary" role="button" id="variables" forinput="userid">Insert Variable</a>
                        </div>
                    </div>
                    <small class="form-text text-muted" style="margin-top: -10px;">User ID to get the invite amount</small>
                </div>
                </div>
                <label>Variable Name *</label>
                <input onchange="document.getElementById('labelidhere').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control needed-field" id="varname" name="varname"></input>
                </div>
                <hr>
                <label>Variable Type *</label>
                <div class="form-group">
                <select onchange="document.getElementById('labelidhere').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="vartype" name="vartype">
                    <option value="temp" selected>Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
                <small class="form-text text-muted" id="labelidhere"">variable will be displayed here on changes</small>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function (DBS) {
        console.log("Loaded UserInvites mod");

        if(!DBS.BetterMods){
            DBS.BetterMods = {};
            DBS.BetterMods.parseAction = function(string, msg) {
                let dbsVars = {}
                dbsVars["CommandAuthor"] = msg.member
                dbsVars["CommandChannel"] = msg.channel
                dbsVars["guild"] = msg.guild
                let tempVars = DBS.Cache[msg.guild.id].variables
                let serverVars = DBS.serverVars[msg.guild.id]
                let globalVars = DBS.globalVars[msg.guild.id]
                let vars = {
                    tempVars: tempVars,
                    serverVars: serverVars,
                    globalVars: globalVars,
                    dbsVars: dbsVars,
                }
                let varRegex = /\${(.*?)}/g;
                let newVal = string;
                for(let i = 0; i <string.match(varRegex)?.length; i++){
                    newVal = newVal.replace(string.match(varRegex)[i],getDescendantProp(vars,string.match(varRegex)[i].split("${").join("").split("}").join("")))
                }
                return newVal
            }

            DBS.BetterMods.saveVar = function(type, varName, data, guild) {
                switch(type) {
                    case "temp":
                        DBS.Cache[guild.id].variables[varName] = data;
                    break
                    case "server":
                        DBS.serverVars[guild.id][varName] = data;
                    break
                    case "global":
                        DBS.globalVars[guild.id][varName] = data;
                    break
                }
            }
        }
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
	//mod here
        const user = DBS.BetterMods.parseAction(action.userid, message)
        count = 0

        await message.guild.invites.fetch().then(invites => {
            invites.forEach(invite => {
                if (invite.inviter == user) {
                    count += invite.uses
                }
            })
        })

        DBS.BetterMods.saveVar(action.vartype, action.varname, count, message.guild)

        DBS.callNextAction(command, message, args, index + 1);
    }
};