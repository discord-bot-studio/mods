module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Embed Poll",

    // Place the author of the mod here. This is an array so you can add multiple authors.
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, place the changelog here.
    changelog: "Created Poll Mod",

    // Set this to true if this will be an event.
    isEvent: false,

    // Set this to true if this is a response.
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core, feature set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio (what category in the dropdown when adding a response)
    section: "Message",

    // Place your html to show inside of Discord Bot Studio when they select your mod. Each input/select field will be saved to commands.json based on the NAME
    // attribute, so each input must have a NAME attribute.
    html: function (data) {
        return `<p><strong>Max of 10 options</strong></p>
                <div class="form-group">
                    <label>Title *</label>
                    <input class="form-control needed-field" name="title" />
                </div>
    
                <div class="form-group">
                    <label>Color</label>
                    <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="color">
                    <small class="form-text text-muted">Hex color</small>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="5" class="form-control" id="description" name="description"></textarea>
                </div>
                <div class="form-group">
                    <label>Thumbnail</label>
                    <input class="form-control" id="thumbnail" name="thumbnail">
                    <small class="form-text text-muted">Url of thumbnail image</small>
                </div>
                <div class="form-group">
                    <label>Image</label>
                    <input class="form-control" id="image" name="image">
                    <small class="form-text text-muted">Main embed image url</small>
                </div>
                <div class="form-group">
                    <label>Poll options * (max of 10)</label>
                    <input class="form-control needed-field" id="options" name="options">
                    <small class="form-text text-muted">Separate poll choices with comma here</small>
                </div>`;
    },

    // When the bot is first started this code will be ran.
    init: function (DBS) {
        console.log("Loaded Poll Mod");
    },

    // Place your mod here.
    mod: async function (DBS, message, action, args) {
        const emojiArray = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        try {
            // Replaces %%variables%% with their value from cache
            var newaction = DBS.Cache.ParseAction(action, message.guild);

            // Get array of poll options based on comma separated list
            var options = newaction.options.split(",");
            if (options.length > 0 && options.length < 11) {
                const Embed = new DBS.Discord.RichEmbed()
                    .setColor(newaction.color)
                    .setTitle(newaction.title)
                    .setDescription(newaction.description)
                    .setThumbnail(newaction.thumbnail)
                    .setImage(newaction.image);

                for (var i = 0; i < options.length; i++) {
                    Embed.addField(options[i], emojiArray[i], true);
                }

                var poll = await message.channel.send(Embed);
                
                for (var j = 0; j < options.length; j++) {
                    await poll.react(emojiArray[j]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};
