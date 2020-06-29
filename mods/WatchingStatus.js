module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Watching Status",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Vannzilla#5260"],

    // Place the version of the mod here.
    version: "0.1.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Added Watching Status response",

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
    html: function (data) {
        return `<div class="form-group">
                    <label> Status (Variables not yet working) *</label>
                    <input class="form-control needed-field" name="watchingStatus" />
                </div>`;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("| Loaded Watching Status Mod.\n| Contact Vannzilla#5260 if you have any problems with the mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        //Set activity
        DBS.Bot.user.setActivity(action.watchingstatus, { type: 'WATCHING'})
            .catch(console.error)
        console.log('Activity set to "Watching ' + action.watchingstatus + '"')
        //Go to next action
        DBS.callNextAction(command, message, args, index + 1);

    }
};
