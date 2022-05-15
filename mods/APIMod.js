module.exports = {
    name: "API Mod",
    author: ["Pokemonultra#2815", "PlayboyPrime#3839"],
    version: "1.0.2",
    changelog: "Array support and removed the quotes ~ PlayboyPrime#3839",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function (data) {
        return `
            <div class="form-group">
                <label>Select Request Type *</label>
                <select onchange="change(this.value)" class="form-control" id="requesttype" name="requesttype">
                    <option value="get" selected>GET Request</option>
                    <option value="post">POST Request</option>
                </select>
            </div>
            <div class="form-group">
                <label>Type URL below to make a request to *</label>
                <div class="input-group mb-3">
                    <input class="form-control needed-field" id="apiurl" name="apiurl"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="apiurl">Insert Variable</a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <label id="label">Path of value that will be stored (Ex: user5.id or players[4].name) or use $$response.all$$ for whole response</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="valuepath" name="valuepath"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="valuepath">Insert Variable</a>
                    </div>
                </div>
            </div>
            <hr>
            <br></br>
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
                function change(value){
                    if(value == 'get'){
                        document.getElementById('label').innerText = 'Path of value that will be stored (Ex: user5.id or players[4].name) or use $$response.all$$ for whole response'
                    } else document.getElementById('label').innerText = 'Type path of a file on your pc below that will be sent *'
                }
            </script>
        `;
    },

    init: function (DBS) {
        const { join } = require("path")
        const { execSync } = require("child_process")

        DBS.BetterMods = {};
        DBS.BetterMods.Logger = {
            error: (msg) => console.log('\x1b[31m' + msg, '\x1b[0m'),
            success: (msg) => console.log('\x1b[32m' + msg, '\x1b[0m'),
            warn: (msg) => console.log('\x1b[33m' + msg, '\x1b[0m')
        };

        DBS.BetterMods.requireModule = async function(packageName) {
            try{
                try {
                    const modulePath = join(__dirname, "../node_modules", packageName);
                    return require(modulePath);
                } catch (e) {
                    DBS.BetterMods.Logger.warn(`[DBS Module Installer] - Installing ${packageName}`);
    
                    const cliCommand = 'npm install ' + packageName + ' --save';
                    await execSync(cliCommand, {
                        cwd: join(__dirname),
                        stdio: [0, 1, 2]
                    });
    
                    DBS.BetterMods.Logger.warn(`[DBS Module Installer] - Successfully Installed ${packageName}. Note you may need to restart your bot.`);
                    const modulePath = join(__dirname, "../node_modules", packageName);
                    return require(modulePath);
                };
            }catch{
                process.send(`Could not install <b>${packageName}</b> module`)
            }
        };

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

        DBS.BetterMods.getVar = function(type, varName, guild) {
            switch(type) {
                case "temp":
                    return DBS.Cache[guild.id].variables[varName];
                case "server":
                    return DBS.serverVars[guild.id][varName];
                case "global":
                    return DBS.globalVars[guild.id][varName];
            }
        }
        function getDescendantProp(obj, desc) {
            var arr = desc.split(".");
            while (arr.length) {
                obj = obj[arr.shift()];
            }
            return obj;
        }

        DBS.BetterMods.requireModule("node-fetch")
        DBS.BetterMods.requireModule("lodash")
        console.log("Loaded API Mod");
    },

    mod: async function (DBS, message, action, args, command, index) {
        const fetch = require("node-fetch")
        const lodash = require("lodash")

        const read = async body => {
            let error;
            body.on('error', err => {
                error = err;
            });
        
            for await (const chunk of body) {
                return JSON.parse(chunk.toString());
            }
        
            return new Promise((resolve, reject) => {
                body.on('close', () => {
                    error ? reject(error) : resolve();
                });
            });
        };

        switch (action.requesttype) {
            case "get":

                var response = await fetch(DBS.BetterMods.parseAction(action.apiurl, message), { method: "GET" })
                var ans = await read(response.body);
            
                try {  
                    JSON.parse(JSON.stringify(ans));  
                } catch (e) {  
                    DBS.logError({
                        level: "error",
                        message: "[API Mod] Error: Invalid json!"
                    });
                    console.log("[API Mod] Error: Invalid json!")
                }
            
                if(!response.status == 200){
                    DBS.logError({
                        level: "error",
                        message: "[API Mod] Status Code: " + response.status
                    });
                    console.log("\x1b[33m" + "[API Mod] Status code: " + response.status,'\x1b[0m')
                }
                
                var acapiobj = DBS.BetterMods.parseAction(action.valuepath, message)
                if(acapiobj == "$$response.all$$"){
                    var data = JSON.stringify(ans, null, 8)
                    DBS.BetterMods.saveVar(action.vartype, action.varname, data.toString(), message.guild)
                } else {
                    var string = JSON.parse(JSON.stringify(ans))
                    if(lodash.get(string, acapiobj)){
                        var value = lodash.get(string, acapiobj)
                        if(JSON.stringify(value, null, 8)[0] == "\"" && JSON.stringify(value, null, 8)[JSON.stringify(value, null, 8).length - 1] == "\""){
                            DBS.BetterMods.saveVar(action.vartype, action.varname, JSON.stringify(value, null, 8).slice(1, -1), message.guild)
                        } else {
                            DBS.BetterMods.saveVar(action.vartype, action.varname, JSON.stringify(value, null, 8), message.guild)
                        }
                    } else {
                        DBS.logError({
                            level: "error",
                            message: "[API Mod] Value was not found!"
                        });
                        DBS.BetterMods.saveVar(action.vartype, action.varname, "Value was not found!", message.guild)
                    }
                }
                

                break;
            case "post":
                const fs = require("fs")

                if(action.valuepath){
                    if(fs.existsSync(action.valuepath.replace("\\", "/"))){
                        var response = await fetch(DBS.BetterMods.parseAction(action.apiurl, message), { method: "POST", body: JSON.stringify(fs.readFileSync(action.valuepath.replace("\\", "/"))), headers: {'Content-Type': 'application/json'} })
                        var data = await response.json();
                        DBS.BetterMods.saveVar(action.vartype, action.varname, JSON.stringify(data), message.guild)

                    } else {
                        DBS.BetterMods.saveVar(action.vartype, action.varname, "[API Mod] File to post was not found!", message.guild)
                        DBS.logError({
                            level: "error",
                            message: "[API Mod] File to post was not found!"
                        });
                    }
                } else {
                    DBS.BetterMods.saveVar(action.vartype, action.varname, "[API Mod] File to post was not found!", message.guild)
                    DBS.logError({
                        level: "error",
                        message: "[API Mod] No file to post was selected!"
                    });
                }


                break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
