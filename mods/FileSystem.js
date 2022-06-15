module.exports = {
    name: "File System",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function (data) {
        return `<h4><u>Be careful using this Mod!</u></h4>
        <label for="job">Action</label>
        <select onchange="change(this.value)" name="job" id="job" class="form-control">
            <option value="write">Write</option>
            <option value="read">Read</option>
            <option value="delete">Delete</option>
            <option disabled value="rename">Rename</option>
        </select>
        <hr>
        <div style="display: block;" id="writeblock">
            <div class="form-group">
                <label>File Path:</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="writefp" name="writefp">
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="writefp">Insert Variable</a>
                    </div>
                </div>
            </div>
        
            <div class="form-group">
                <label>What to write:</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="writed" name="writed">
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="writed">Insert Variable</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="display: none;" id="readblock">
            <div class="form-group">
                <label>File Path:</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="readfp" name="readfp">
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="readfp">Insert Variable</a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="form-group">
                <label>Variable Name</label>
                <input onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="varname" name="varname"/>
                <h6 id="varlabel"></h6>
            </div>
            <div class="form-group">
                <label>Variable Type</label>
                <select id="vartype" onchange="document.getElementById('varlabel').innerHTML = '$\{' + document.getElementById('vartype').value + 'Vars.' + document.getElementById('varname').value + '\}'" class="form-control" id="vartype" name="vartype">
                    <option value="temp" selected>Temp Variable</option>
                    <option value="server">Server Variable</option>
                    <option value="global">Global Variable</option>
                </select>
                <hr>
            </div>
        </div>
        
        <div style="display: none;" id="secret">
            <h1 style="margin-top: 10%;margin-left: 30%;">¯\\_(ツ)_/¯</h1>
        </div>
        
        <div style="display: none;" id="deleteblock">
            <div class="form-group">
                <label>File Path:</label>
                <div class="input-group mb-3">
                    <input class="form-control" id="deletefp" name="deletefp">
                    <div class="input-group-append">
                        <a class="btn btn-outline-primary" role="button" id="variables" forinput="deletefp">Insert Variable</a>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
            setTimeout(() => {
                loadsettings()
            }, 1);
            function loadsettings() {
                switch (document.getElementById("job").value) {
                    case "write":
                        document.getElementById("writeblock").style.display = "block"
                        document.getElementById("readblock").style.display = "none"
                        document.getElementById("deleteblock").style.display = "none"
                        document.getElementById("secret").style.display = "none"
                        break;
                    case "read":
                        document.getElementById("writeblock").style.display = "none"
                        document.getElementById("readblock").style.display = "block"
                        document.getElementById("deleteblock").style.display = "none"
                        document.getElementById("secret").style.display = "none"
                        break;
                    case "delete":
                        document.getElementById("writeblock").style.display = "none"
                        document.getElementById("readblock").style.display = "none"
                        document.getElementById("deleteblock").style.display = "block"
                        document.getElementById("secret").style.display = "none"
                        break;
                    case "rename":
                        document.getElementById("writeblock").style.display = "none"
                        document.getElementById("readblock").style.display = "none"
                        document.getElementById("deleteblock").style.display = "none"
                        document.getElementById("secret").style.display = "block"
                        break;
                }
            }
        
            function change(value){
                switch (value) {
                    case "write":
                        document.getElementById("writeblock").style.display = "block"
                        document.getElementById("readblock").style.display = "none"
                        document.getElementById("secret").style.display = "none"
                        document.getElementById("deleteblock").style.display = "none"
                        break;
                    case "read":
                        document.getElementById("writeblock").style.display = "none"
                        document.getElementById("readblock").style.display = "block"
                        document.getElementById("secret").style.display = "none"
                        document.getElementById("deleteblock").style.display = "none"
                        break;
                    case "delete":
                        document.getElementById("writeblock").style.display = "none"
                        document.getElementById("readblock").style.display = "none"
                        document.getElementById("secret").style.display = "none"
                        document.getElementById("deleteblock").style.display = "block"
                        break;
                    case "rename":
                        document.getElementById("writeblock").style.display = "none"
                        document.getElementById("readblock").style.display = "none"
                        document.getElementById("secret").style.display = "block"
                        document.getElementById("deleteblock").style.display = "none"
                        break;
                }
            }
        </script>`; 
        ;
    },
    init: function () {
        console.log("Loaded fs");
    },
    mod: function (DBS, message, action, args, command, index) {
        const fs = require("fs")
        function par(act){
            return DBS.BetterMods.parseAction(act, message)
        }
        
        const writefp = par(action.writefp)
        const writed = par(action.writed)
        const readfp = par(action.readfp)
        const deletefp = par(action.deletefp)

        switch (action.job) {
            case "write":
                fs.writeFileSync(writefp.replace("\\", "\\\\"), writed)
                break;
            case "read":
                DBS.BetterMods.saveVar(action.vartype, action.varname, fs.readFileSync(readfp.replace("\\", "\\\\")), message.guild)
                break;
            case "delete":
                fs.unlinkSync(deletefp.replace("\\", "\\\\"))
                break;
        }

        DBS.callNextAction(command, message, args, index + 1);
    }
};
