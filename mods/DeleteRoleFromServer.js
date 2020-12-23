module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Delete Role from Server",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["qizzle"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "None ~ qizzle",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Server Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <label>Note: You must add me to the end of your command.\n</label>
            <div class="form-group">
                <label>Role *</label>
                <textarea class="form-control needed-field" name="messageText" rows="1" ></textarea>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded delete role from server mod");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {

        const guild = message.guild;
        const roleName = action.messagetext;

        const role = guild.roles.cache.find((role) => {
        return role.name === roleName;})
        if (!role) {
            return;
        }
        role.delete()
    }
};