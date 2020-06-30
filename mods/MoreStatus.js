module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "More Status",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Vannzilla#5260"],

    // Place the version of the mod here.
    version: "0.2.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Added watching and listening status options",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Bot Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="form-group">
                <label>Set To *</label>
                <select class="form-control" name="watchListen">
                    <option value="setToWatching" selected>Watching</option>
                    <option value="setToListening">Listening</option>
                </select>
            </div>
            <div class="form-group">
                <label>Status *</label>
                <textarea class="form-control needed-field" name="statusText" rows="1" ></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("| Loaded More Status Mod\n| If you have any problems with the mod contact Vannzilla#5260");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        //Check if watching
        if (action.watchlisten === 'setToWatching') {
            //Set activity
            DBS.Bot.user.setActivity(action.statustext, { type: 'WATCHING'})
                .catch(console.error)
            console.log('Activity set to "Watching ' + action.statustext + '"')
            //Go to next action
            DBS.callNextAction(command, message, args, index + 1);

            //Check if listening
        } else if (action.watchlisten === 'setToListening') {
            //Set activity
            DBS.Bot.user.setActivity(action.statustext, { type: 'LISTENING'})
                .catch(console.error)
            console.log('Activity set to "Listening to ' + action.statustext + '"')
            //Go to next action
            DBS.callNextAction(command, message, args, index + 1);
        } else {
            console.log('An error has occured, if this problem persists contact Vannzilla#5260')
        }
    }
};