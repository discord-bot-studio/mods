const usedCommand = new Set();
module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Command Cooldown",

    // Place the author of the mod here. This is an array so you can add multiple authors.
    author: ["STR1KE#6969"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, place the changelog here.
    changelog: "Added command cooldown",

    // Set this to true if this will be an event.
    isEvent: false,

    // Set this to true if this is a response.
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio (what category in the dropdown when adding a response)
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod. Each input/select field will be saved to commands.json based on the NAME
    // attribute, so each input must have a NAME attribute.
    html: function (data) {
        return `<div class="form-group">
                    <label>Must be placed at the start of command </label>
                </div>
                <div class="form-group">
                    <label>Seconds to wait for *</label>
                    <input class="form-control needed-field" name="seconds" />
                </div>
                <div class="form-group">
                    <label>Message to send when you are on cooldown.*</label>
                    <input class="form-control needed-field" name="msg1" />
                </div>
                <div class="form-group">
                    <label>Message to send when you finish cooldown</label>
                    <input class="form-control field" name="msg2" />
                </div>`;
    },

    // When the bot is first started this code will be ran.
    init: function () {
        console.log("Loaded Cooldown Mod");
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args, command, index) {
        
    
    var delay = action.seconds * 1000;
    
    
    if(usedCommand.has(message.author.id)){
        message.reply(action.msg1)
    }else{
        

        DBS.callNextAction(command, message, args, index + 1);

        usedCommand.add(message.author.id);
        setTimeout(() => {
            if(!action.msg2 == ""){
                message.reply(action.msg2);
            }
            usedCommand.delete(message.author.id);
        }, delay);

    }
    
          
        
    }
};
