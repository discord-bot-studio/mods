module.exports = {
    name: "Captcha",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",

    html: function (data) {
        return `
        <h3>Tabs</h3>
        <label style="float: left; margin-left: 3px; padding: 20px; background: lightgray" for="image">Image</label>
        <input style="display: none" type="radio" onchange="changetab(this.id)" checked="checked" id="image" name="tab">
        <label style="float: left; margin-left: 10px; padding: 20px; background: lightgray" id="msglabel" for="message">Message</label>
        <input style="margin-bottom:50px; display: none" type="radio" onchange="document.getElementById('msglabel').innerHTML = document.getElementById('msgtype').value; changetab(this.id)" id="message" name="tab">
        <label style="float: left; margin-left: 10px; padding: 20px; background: lightgray" for="code">Code</label>
        <input style="margin-bottom:50px; display: none" type="radio" onchange="changetab(this.id)" id="code" name="tab">
        <label style="float: left; margin-left: 10px; padding: 20px; background: lightgray" for="awaitusermsg">AwaitUserMessage</label>
        <input style="margin-bottom:50px; display: none" type="radio" onchange="changetab(this.id)" id="awaitusermsg" name="tab">
        <label style="float: left; margin-top: -5px; margin-left: 10px;" for="msgtype">Message Type</label>
        <br></br>
        <select name="msgtype" onchange="changemsgtype(this.value)" id="msgtype" class="form-control" style="margin-bottom: 20px; margin-top: -22px; margin-left:10px; width: 20%; float: left">
            <option value="Message">Message</option>
            <option value="Embed">Embed</option>
        </select>
        
        <br></br>   
        <hr style="margin-top: -15px;">
        
        <div id="imageblock" style="display: block;">
            <h3><u>Image</u></h3>
        
            <h4 style="margin-top: 10px;">Text</h4>
        
            <label for="imagetextcolorpicker">Captcha text color</label>
            <input type="color" onchange="document.getElementById('imagetextcolor').value = this.value.slice(1)" id="imagetextcolorpicker" name="imagetextcolorpicker">
            <input type="text" onchange="document.getElementById('imagetextcolorpicker').value = '#' + this.value" id="imagetextcolor" name="imagetextcolor" class="form-control">
        
            <label for="opacityrange">Captcha text opacity</label>
            <input onchange="document.getElementById('opacitypercantage').innerHTML = this.value + '%'" style="margin-top: 15px;" type="range" name="opacityrange" id="opacityrange" step="5" min="0" max="100">
            <label id="opacitypercantage" for="opacityrange">%</label>
        
            <h4 style="margin-top: 10px;">Line</h4>
        
            <label for="imagelinecolorpicker">Captcha line color</label>
            <input type="color" onchange="document.getElementById('imagelinecolor').value = this.value.slice(1)" id="imagelinecolorpicker" name="imagelinecolorpicker">
            <input type="text" onchange="document.getElementById('imagelinecolorpicker').value = '#' + this.value" id="imagelinecolor" name="imagelinecolor" class="form-control">
        
            <label for="lineopacityrange">Captcha line opacity</label>
            <input onchange="document.getElementById('lineopacitypercantage').innerHTML = this.value + '%'" style="margin-top: 15px;" type="range" name="lineopacityrange" id="lineopacityrange" step="5" min="0" max="100">
            <label id="lineopacitypercantage" for="lineopacityrange">%</label>
        
            <h4 style="margin-top: 10px;">Decoy</h4>
        
            <label for="imagedecoycolorpicker">Captcha decoy color</label>
            <input type="color" onchange="document.getElementById('imagedecoycolor').value = this.value.slice(1)" id="imagedecoycolorpicker" name="imagedecoycolorpicker">
            <input type="text" onchange="document.getElementById('imagedecoycolorpicker').value = '#' + this.value" id="imagedecoycolor" name="imagedecoycolor" class="form-control">
        
            <label for="decoyopacityrange">Captcha decoy opacity</label>
            <input onchange="document.getElementById('decoyopacitypercantage').innerHTML = this.value + '%'" style="margin-top: 15px;" type="range" name="decoyopacityrange" id="decoyopacityrange" step="5" min="0" max="100">
            <label id="decoyopacitypercantage" for="decoyopacityrange">%</label>
        
            <label style="margin-left: 50px;" for="decoysizerange">Captcha decoy size</label>
            <input onchange="document.getElementById('decoysizepercantage').innerHTML = this.value" style="margin-top: 15px;" type="range" name="decoysizerange" id="decoysizerange" min="0" max="100">
            <label id="decoysizepercantage" for="decoysizerange"></label>
            <br></br>
        
            <label style="margin-top: -20px;" for="decoytotalrange">Captcha total decoys</label>
            <input onchange="document.getElementById('decoytotalpercantage').innerHTML = this.value" style="margin-top: 15px;" type="range" name="decoytotalrange" id="decoytotalrange" step="5" min="0" max="100">
            <label id="decoytotalpercantage" for="decoytotalrange"></label>
        </div>
        
        <div id="messageblock" style="display: none;">
            <h4>Channel id</h4>
            <input type="text" id="messagechannel" name="messagechannel" class="form-control">
            <h6 style="color: gray;">Use {commandchannel} for the channel where the command was executed.</h6>
        
            <h4 style="margin-top: 15px;"><u>Message</u></h4>
            
            <label style="margin-top: 10px;" for="msg">Message content</label>
            <input type="text" id="msg" name="msg" class="form-control">
        </div>
        
        <div id="embedblock" style="display: none;">
            <h4>Channel id</h4>
            <input type="text" id="embedchannel" name="embedchannel" class="form-control">
            <h6 style="color: gray;">Use {commandchannel} for the channel where the command was executed.</h6>
        
            <h4 style="margin-top: 15px;"><u>Embed</u></h4>
            
            <label style="margin-top: 10px;" for="embedcolor">Embed hexcolor</label>
            <input type="color" onchange="document.getElementById('embedcolorinput').value = this.value.slice(1)" id="embedcolor" name="embedcolor">
            <input type="text" onchange="document.getElementById('embedcolor').value = '#' + this.value" id="embedcolorinput" name="embedcolorinput" class="form-control">
        
            <label style="margin-top: 10px;" for="embedtitle">Title</label>
            <input type="text" id="embedtitle" name="embedtitle" class="form-control">
        
            <label style="margin-top: 10px;" for="embedurl">Url</label>
            <input type="text" id="embedurl" name="embedurl" class="form-control">
        
            <label style="margin-top: 10px;" for="embedauthor">Author</label>
            <input type="text" id="embedauthor" name="embedauthor" class="form-control">
        
            <label style="margin-top: 10px;" for="embeddesc">Description</label>
            <input type="text" id="embeddesc" name="embeddesc" class="form-control">
        
            <label style="margin-top: 10px;" for="embedthumbnail">Thumbnail</label>
            <input type="text" id="embedthumbnail" name="embedthumbnail" class="form-control">
        
            <label style="margin-top: 10px;" for="embedtimestamp">Timestamp</label>
            <select class="form-control" name="embedtimestampsel" id="embedtimestamp">
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
        
            <label style="margin-top: 10px;" for="embedfooter">Footer</label>
            <input type="text" id="embedfooter" name="embedfooter" class="form-control">
        </div>
        
        <div id="codeblock" style="display: none;">
            <h4><u>Code</u></h4>
            
            <label for="codetype">Code type</label>
            <select onchange="changecodetype(this.value)" name="codetype" id="codetype" class="form-control">
                <option name="random" value="random">Random</option>
                <option name="custom" value="custom">Custom</option>
                <option name="input" value="input">Input</option>
            </select>
        
            <div id="custom" style="display: none;">
                <label style="margin-top: 10px;" for="customlength">Code length</label>
                <input onchange="document.getElementById('customcodelengthpercantage').innerHTML = this.value" style="margin-top: 15px;" type="range" name="customlength" id="customlength" min="1" max="6">
                <label id="customcodelengthpercantage" for="customlength"></label>
        
                <label style="margin-left: 20px;" for="codenumbers">Use numbers</label>
                <input type="checkbox" name="codenumbers" id="codenumbers" class="from-control">
        
                <label style="margin-left: 20px;" for="customcodeletters">Use letters</label>
                <input type="checkbox" name="customcodeletters" id="customcodeletters" class="from-control">
            </div>
            
            <div id="input" style="display: none;">
                <label style="margin-top: 15px;" for="codeinput">Your own captcha code</label>
                <input type="text" maxlength="6" id="codeinput" name="codeinput" class="form-control">
            </div>
        </div>
        
        <div id="awaitusermsgblock" style="display: none;">
            <h4><u>AwaitUserMessage (Made by Snorlaxmon#7278)</u></h4>
        
            <label style="margin-top: 15px;" for="aumuser">Variable name to save user in</label>
            <input type="text" onchange="document.getElementById('aumuservardisplay').innerHTML = '\${tempVars.' + this.value + '}'" id="aumuser" name="aumuser" class="form-control">
            <h6 style="color: gray;" id="aumuservardisplay"></h6>
        
            <label style="margin-top: 15px;" for="aumch">Variable name to save channel in</label>
            <input type="text" onchange="document.getElementById('aumchvardisplay').innerHTML = '\${tempVars.' + this.value + '}'" id="aumch" name="aumch" class="form-control">
            <h6 style="color: gray;" id="aumchvardisplay"></h6>
        
            <label style="margin-top: 15px;" for="aumtime">Seconds to wait for an message</label>
            <input type="text" id="aumtime" name="aumtime" class="form-control">
        
            <hr>
        
            <h4>Create a Switch case with Variable to check \${tempVars.captcha} and values true and false after this node. See <a href="https://i.imgur.com/vM8WCQc.png" target="none">example.</a></h4>
        
        </div>
        
        <script>
            function changetab(id){
                switch(id) {
                    case "image":
                        document.getElementById("imageblock").style.display = "block"
                        document.getElementById("messageblock").style.display = "none"
                        document.getElementById("embedblock").style.display = "none"
                        document.getElementById("codeblock").style.display = "none"
                        document.getElementById("awaitusermsgblock").style.display = "none"
                        break;
                    case "message":
                        if(document.getElementById("msgtype").value == "Message"){
                            document.getElementById("imageblock").style.display = "none"
                            document.getElementById("messageblock").style.display = "block"
                            document.getElementById("embedblock").style.display = "none"
                            document.getElementById("codeblock").style.display = "none"
                        } else {
                            document.getElementById("imageblock").style.display = "none"
                            document.getElementById("messageblock").style.display = "none"
                            document.getElementById("embedblock").style.display = "block"
                            document.getElementById("codeblock").style.display = "none"
                            document.getElementById("awaitusermsgblock").style.display = "none"
                            document.getElementById("message").checked = "false"
                        }
                        break;
                    case "code":
                        document.getElementById("imageblock").style.display = "none"
                        document.getElementById("messageblock").style.display = "none"
                        document.getElementById("embedblock").style.display = "none"
                        document.getElementById("codeblock").style.display = "block"
                        document.getElementById("awaitusermsgblock").style.display = "none"
        
                        if(codetype.value == "custom"){
                            document.getElementById("custom").style.display = "block"
                            document.getElementById("input").style.display = "none"
                        } else if(codetype.value = "input") {
                            document.getElementById("custom").style.display = "none"
                            document.getElementById("input").style.display = "block"
                        } else if(codetype.value = "random") {
                            document.getElementById("custom").style.display = "none"
                            document.getElementById("input").style.display = "none"
                        }
                        break;
                    case "awaitusermsg":
                        document.getElementById("imageblock").style.display = "none"
                        document.getElementById("messageblock").style.display = "none"
                        document.getElementById("embedblock").style.display = "none"
                        document.getElementById("codeblock").style.display = "none"
                        document.getElementById("awaitusermsgblock").style.display = "block"
        
                        if(document.getElementById('aumuser').value){
                            document.getElementById('aumuservardisplay').innerHTML = '\${tempVars.' + document.getElementById('aumuser').value + '}'
                        }
        
                        if(document.getElementById('aumch').value){
                            document.getElementById('aumchvardisplay').innerHTML = '\${tempVars.' + document.getElementById('aumch').value + '}'
                        }
                        break;
                    default:
                }
            }
        
            function changecodetype(id){
                switch(id) {
                    case "random":
                        document.getElementById("custom").style.display = "none"
                        document.getElementById("input").style.display = "none"
        
                        break;
                    case "custom":
                        document.getElementById("custom").style.display = "block"
                        document.getElementById("input").style.display = "none"
        
                        break;
                    case "input":
                        document.getElementById("custom").style.display = "none"
                        document.getElementById("input").style.display = "block"
        
                        break;
                    default:
                }
            }
        
            function changemsgtype(value) {
                if(value == "Message"){
                    document.getElementById('msglabel').innerHTML = "Message"
                    if(document.getElementById("embedblock").style.display == "block"){
                        document.getElementById("imageblock").style.display = "none"
                        document.getElementById("messageblock").style.display = "block"
                        document.getElementById("embedblock").style.display = "none"
                        document.getElementById("codeblock").style.display = "none"
                        document.getElementById("awaitusermsgblock").style.display = "none"
                    }
                } else {
                    document.getElementById('msglabel').innerHTML = "Embed"
                    if(document.getElementById("messageblock").style.display == "block"){
                        document.getElementById("imageblock").style.display = "none"
                        document.getElementById("messageblock").style.display = "none"
                        document.getElementById("embedblock").style.display = "block"
                        document.getElementById("codeblock").style.display = "none"
                        document.getElementById("awaitusermsgblock").style.display = "none"
                    }
                }
            }
        </script>
    `},

    init: function (DBS) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        DBS.BetterMods.requireModule("captcha-canvas")
        console.log("Loaded Captcha");
    },

    mod: async function (DBS, message, action, args, command, index) {
        if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

        switch (action.codetype) {
            case "random":
                code = Math.random().toString(16).substr(2, 6)
                break;
        
            case "custom":
                if(action.codenumbers !== "false" && action.customcodeletters !== "false"){
                    code = Math.random().toString(16).substr(2, action.customlength)
                } else if(action.codenumbers !== "false"){
                    code = Math.floor(Math.random() * (Math.pow(6, (action.customlength)) - Math.pow(6, (action.customlength-1))) + Math.pow(6, (action.customlength-1))).toString()                 
                } else {
                    function gentext(length) {
                        var result = '';
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                        for ( var i = 0; i < length; i++ ) {
                            result += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                        return result;
                    }
                    code = gentext(action.customlength)
                }
                break

            case "input":
                code = action.codeinput
                break
            default:
        }

        const { Captcha } = require("captcha-canvas");
        const { MessageAttachment } = require("discord.js")
        const captcha = new Captcha()
        captcha.async = true
        captcha.addDecoy({color: "#" + action.imagedecoycolor, opacity: parseInt(action.decoyopacityrange) / 100, size: action.decoysizerange, total: parseInt(action.decoytotalrange)})
        captcha.drawTrace({color: "#" + action.imagelinecolor, opacity: parseInt(action.lineopacityrange) / 100})
        captcha.drawCaptcha({text: code, color: "#" + action.imagetextcolor, opacity: parseInt(action.opacityrange) / 100})

        const captchaAttachment = new MessageAttachment(await captcha.png, "captcha.png")

        switch (action.msgtype) {
            case "Message":
                if(action.messagechannel.trim() == "{commandchannel}"){
                    message.channel.send({ files: [captchaAttachment], content: action.msg})
                } else {
                    message.guild.channels.cache.get(action.messagechannel, message.channel) .send({ files: [captchaAttachment], content: action.msg})
                } 
                break;
            case "Embed":
                const { MessageEmbed } = require("discord.js")
                const embed = new MessageEmbed()
                    .setColor(action.embedcolorinput)
                    .setTitle(action.embedtitle)
                    .setURL(action.embedurl)
                    .setAuthor(action.embedauthor)
                    .setDescription(action.embeddesc)
                    .setThumbnail(action.embedthumbnail)
                    .setImage('attachment://captcha.png')
                    .setTimestamp(action.embedtimestamp)
                    .setFooter(action.embedfooter)
                    if(action.embedchannel.trim() == "{commandchannel}"){
                        message.channel.send({ embeds:[embed], files: [captchaAttachment] })
                    } else {
                        message.guild.channels.cache.get(action.embedchannel, message.channel).send({ embeds:[embed], files: [captchaAttachment] })
                    } 
                break;
            default:
        }
        var channel
        if(action.msgtype == "Message"){
            if(action.messagechannel.trim() == "{commandchannel}"){
                channel = message.channel
            } else channel = await message.guild.channels.cache.find(channel => channel.id === action.messagechannel); 
        } else {
            if(action.embedchannel.trim() == "{commandchannel}"){
                channel = message.channel
            } else channel = await message.guild.channels.cache.find(channel => channel.id === action.embedchannel); 
        }

        const filter = msg => msg.author.id === message.author.id;
        channel.awaitMessages({
            filter,
            time: parseInt(DBS.BetterMods.parseAction(action.aumtime, message)) * 1000,
            max: 1
        })
        .then(msg => { 
            DBS.BetterMods.saveVar("temp", action.aumuser, msg.first().author, message.guild);
            DBS.BetterMods.saveVar("temp", action.aumch, message.channel, message.guild);
            if(msg.first().content == captcha.text){
                DBS.BetterMods.saveVar("temp", "captcha", "true", message.guild) 
                DBS.callNextAction(command, message, args, index + 1)
            } else {
                DBS.BetterMods.saveVar("temp", "captcha", "false", message.guild) 
                DBS.callNextAction(command, message, args, index + 1)
            } 
        })
        .catch(error => {
            DBS.logError({
                level: 'error',
                message: '[Captcha (AwaitUserMessage)] ' + error,
            });
            DBS.BetterMods.saveVar("temp", "captcha", "false", message.guild) 
            DBS.callNextAction(command, message, args, index + 1)
        });
    }
};
