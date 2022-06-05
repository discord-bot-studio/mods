module.exports = {
    name: "forEach",
    author: ["PlayboyPrime#3839"],
    version: "1.0.2",
    changelog: "Fixed issue",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Control",
    html: function (data) {
        return `
        <div class="form-group">
            <label>Type *</label>
            <div class="form-group">
            <select onchange="change(this.value)" class="form-control" id="curr" name="curr">
                <option value="guild">Guild</option>
                <option value="user">Member</option>
                <option value="channel">Channel</option>
                <option value="message">Message</option>
                <option value="userdata">User Data</option>
            </select>
        </div>
            
        <div id="group1" class="form-group">
            <label id="desc1">ID: </label>
            <div class="input-group mb-3">
                <input class="form-control" id="currid" name="currid"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="currid">Insert Variable</a>
                </div>
            </div>
        </div>
            
        <div id="group2" class="form-group">
            <label id="desc2">ID: </label>
            <div class="input-group mb-3">
                <input class="form-control" id="currid2" name="currid2"></input>
                <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="currid2">Insert Variable</a>
                </div>
            </div>
        </div>
            
        <hr>
        <div class="form-group">
            <label>Variable Name *</label>
            <input onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control needed-field" id="varname" name="varname"/>
            <h6 id="varlabel"></h6>
        </div>
        <div class="form-group">
            <label>Variable Type *</label>
            <select id="vartype" onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="vartype" name="vartype">
                <option value="temp" selected>Temp Variable</option>
                <option value="server">Server Variable</option>
                <option value="global">Global Variable</option>
            </select>
        </div>
            
        <script>
            $(document).on("click", "#saveEditResponseBtn", function(e) {
                if(e.target === this){
                    varnameid = "varname"
                    vartypeid = "vartype"
                
                    switch (document.getElementById("curr").value) {
                        case "guild":
                            type = "guild"
                            break;
                        case "channel":
                            type = "channel"
                            break;
                        case "message":
                            type = "message"
                            break;
                        case "user":
                            type = "member"
                            break;
                        default:
                            type = "string"
                            break;
                    }
                
                    vardesc = "This variable is from forEach mod"
                    varid = "forEachModVar"
                
                    //ignore
                    vartype = document.getElementById(vartypeid).value
                    varname = document.getElementById(varnameid).value
                
                    varFunc(vartype, varname, type, vardesc, varid)
                }
            })
            function varFunc(vartype, varname, type, vardesc, id) {
                if(vartype && varname && type && vardesc && id) {} else { return alert("[varFunc] Missing parameters") }
            
                if(document.getElementById(id)){
                    document.getElementById(id).remove()
                }
                var newLiHtml = '<li id="' + id + '"' + 'class="list-group-item py-0" vartype="' + type + '">';
                newLiHtml += "<strong>" + vartype + "Vars." + varname + "</strong> - " + vardesc + "</li>";
                $("#UserVariableList").append(newLiHtml);
            }
        
            function change(value){
                text = document.getElementById("desc1")
                text2 = document.getElementById("desc2")
                switch (value) {
                    case "guild":
                        text.innerHTML = "Not Needed"
                        text2.innerHTML = "Not Needed"
                        document.getElementById("group1").style.display = "none"
                        document.getElementById("group2").style.display = "none"
                        break;
                    case "channel":
                        text.innerHTML = "Guild ID: *"
                        text2.innerHTML = "Not Needed"
                        document.getElementById("group1").style.display = "block"
                        document.getElementById("group2").style.display = "none"
                        break;
                    case "message":
                        text.innerHTML = "Guild ID: *"
                        text2.innerHTML = "Channel ID: *"
                        document.getElementById("group1").style.display = "block"
                        document.getElementById("group2").style.display = "block"
                        break;
                    case "user":
                        text.innerHTML = "Guild ID: *"
                        text2.innerHTML = "Not Needed"
                        document.getElementById("group1").style.display = "block"
                        document.getElementById("group2").style.display = "none"
                        break;
                    case "userdata":
                        text.innerHTML = "Data Field"
                        text2.innerHTML = "Data Field2"
                        document.getElementById("group1").style.display = "block"
                        document.getElementById("group2").style.display = "block"
                        break;
                    default:
                        text.innerHTML = "ID: "
                        text2.innerHTML = "ID: "
                        document.getElementById("group1").style.display = "block"
                        document.getElementById("group2").style.display = "block"
                
                        break;
                }
            }
        </script>
        `
        ;
    },
    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded forEach");
    },
    mod: async function (DBS, message, action, args, command, index) {
        await DBS.Bot.guilds.fetch()
        var guild
        var channel

        if(action.curr != "userdata"){
            guild = await DBS.Bot.guilds.cache.get(DBS.BetterMods.parseAction(action.currid, message))
            channel = await guild.channels.cache.get(DBS.BetterMods.parseAction(action.currid2, message))
        }

        const fs = require("fs")
        const { resolve } = require('path')
        const ud = JSON.parse(fs.readFileSync(resolve(__dirname, "../BotData/user/user.json"), 'utf8'))

        function next(type, name, value) {
            DBS.BetterMods.saveVar(type, name, value, message.guild)
            DBS.callNextAction(command, message, args, index + 1);
        }

        switch (action.curr) {
            case "guild":
                const guilds = await DBS.Bot.guilds.fetch()
                guilds.forEach(guild => {
                    next(action.vartype, action.varname, guild)
                });
                break;
            case "channel":
                const channels = await guild.channels.fetch()
                channels.forEach(ch => {
                    next(action.vartype, action.varname, ch)
                });
                break;
            case "message":
                const messages = await guild.channels.cache.get(channel.id).messages.fetch()
                messages.forEach(msg => {
                    next(action.vartype, action.varname, msg)
                });
                break;
            case "user":
                const users = await guild.members.fetch()
                users.forEach(user => {
                    next(action.vartype, action.varname, user)
                });
                break;
            case "userdata":
                var input1 = DBS.BetterMods.parseAction(action.currid, message)
                var input2 = DBS.BetterMods.parseAction(action.currid2, message)

                Object.entries(ud).forEach(datauser => {
                    if(input1 && input2){
                        if(datauser[input1] && datauser[input2])
                        {
                            next(action.vartype, action.varname, datauser[0])
                        }
                    }
                    else if(input1){
                        if(datauser[input1])
                        {
                            next(action.vartype, action.varname, datauser[0])
                        }
                    }
                    else if(input2){
                        if(datauser[input2])
                        {
                            next(action.vartype, action.varname, datauser[0])
                        }
                    }
                    else 
                    {
                        next(action.vartype, action.varname, datauser[0])
                    }
                })
                break;
            default:
                DBS.callNextAction(command, message, args, index + 1);
                break;
        }
    }
};
