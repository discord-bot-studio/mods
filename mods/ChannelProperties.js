module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Channel Properties",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Hectoliters#7743"],

    // Place the version of the mod here.
    version: "0.1.1",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Updated to fix some bugs ~ Hectoliters",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Channel Action",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
        <div class="form-group">
        <labelProperty to edit *</label>
        <select class="form-control" name="channelprop">
            <option value="CategoryParent" selected>Channel Category</option>
            <option value="ChannelName">Channel Name</option>
            <option value="ChannelDescription">Channel Description</option>
        </select>
    </div>
            <div class="form-group">
                <label>Set property to (this will be the reason if you selected delete channel)* </label>
                <textarea class="form-control needed-field" name="channelInfo" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>This will take effect on the channel the command is executed in</label>
        </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded channel properties");
    },

    // Place your mod here.
    mod: function(DBS, message, action, args, command, index) {
        switch (action.channelprop) {
            case "CategoryParent":
                message.channel.setParent(action.channelinfo, { lockPermissions: false });
                break;
            case "ChannelName":
                message.channel.setName(action.channelinfo);
                break;
            case "ChannelDescription":
                message.channel.setTopic(action.channelinfo)
                 break;
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};
