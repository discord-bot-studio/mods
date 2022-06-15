module.exports = {
    name: "Leaderboard",
    author: ["PlayboyPrime#3839"],
    version: "1.0.3",
    changelog: "Added multiple values",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "User Data",
    html: function (data) {
        return `
            <div class="form-group">
                <label>Data field 1 (Only this will be sorted) *</label>
                <div class="input-group mb-3">
                    <input class="form-control needed-field" id="df1" name="df1"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="df1">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Data field 2</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="df2" name="df2"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="df2">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Data field 3</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="df3" name="df3"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="df3">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Data field 4</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="df4" name="df4"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="df4">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Data field 5</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="df5" name="df5"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="df5">Insert Variable</a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <label>Display limit *</label>
                <div class="input-group mb-3">
                    <input class="form-control needed-field" id="dlimit" name="dlimit"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="dlimit">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Seperator *</label>
                <div class="input-group mb-3">
                    <input class="form-control needed-field" id="sep" name="sep"></input>
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="sep">Insert Variable</a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Sort type *</label>
                <select class="form-control" name="sorttype">
                    <option value="ascending" selected>Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            <hr>
            <div class="form-group">
                <label>Variable Name *</label>
                <input onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control needed-field" id="varname" name="varname"></input>
                <h6 id="varlabel"></h6>
            </div>
            
            <div class="form-group">
                <label>Variable Type *</label>
                <select onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="vartype" name="vartype">
                    <option value="temp" selected>Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
            </div>
        `;
    },
    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);
        console.log("Loaded Leaderboard");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const fs = require("fs")
        const { resolve } = require('path')
        const ud = JSON.parse(fs.readFileSync(resolve(__dirname, "../BotData/user/user.json"), 'utf8'))
        const df1 = DBS.BetterMods.parseAction(action.df1, message)
        const df2 = DBS.BetterMods.parseAction(action.df2, message)
        const df3 = DBS.BetterMods.parseAction(action.df3, message)
        const df4 = DBS.BetterMods.parseAction(action.df4, message)
        const df5 = DBS.BetterMods.parseAction(action.df5, message)
        const sep = DBS.BetterMods.parseAction(action.sep, message) 
        const dlimit = DBS.BetterMods.parseAction(action.dlimit, message)

        var amount = 0
        var temparray = []
        var array = []
        var msg = ""
        var place = 1

        Object.entries(ud.users).forEach(user =>{
            temparray.push(user)
        })

        for (let i = 0; i < temparray.length; i++) {
            const arr = temparray[i];
            for (let j = 0; j < arr.length; j++) {
                const value = arr[j];
                if(value[df1]){
                    {
                        array.push(arr)
                    }
                }
            }
        }

        if(action.sorttype == "ascending"){
            array.sort((a,b) => a[1][df1] - b[1][df1])
        } else array.sort((a,b) => b[1][df1] - a[1][df1])

        function val(value, df)
        {
            if(value){
                return  df + ": " + value.toString() + " " + sep + " "
            } else return ""
        }        
        array.forEach(user => {
            user.forEach(value => {
                if(value[df1]){
                    if(amount < parseInt(dlimit)){
                        msg = msg + place + ". <@" + user[0] + ">: " + val(value[df1], df1) + val(value[df2], df2) + val(value[df3], df3) + val(value[df4], df4) + val(value[df5], df5) + "\n"
                        msg = msg.slice(0,-4) + "\n"
                        place++
                    }
                    amount++
                }
            })
        })

        DBS.BetterMods.saveVar(action.vartype, action.varname, msg, message.guild)

        DBS.callNextAction(command, message, args, index + 1);
    }
};
