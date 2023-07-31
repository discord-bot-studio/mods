module.exports = {
  // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
  // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
  name: "Server Info",

  // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
  author: ["amankoushal"],

  // Place the version of the mod here.
  version: "1.0.1",

  // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
  changelog: "Added humans and bots count to Members field ~ amankoushal",

  // Set this to true if this will be an event. Note events wont show up in DBS.
  isEvent: false,

  isResponse: true,

  // Set this to true if this will be a response mod.
  isMod: true,

  // If you want to modify a core feature, set this to true.
  isAddon: false,

  // Here you can define where you want your mod to show up inside of Discord Bot Studio
  section: "Server Action",

  // Place your html to show inside of Discord Bot Studio when they select your mod.
  html: function (data) {
    return `
          <div class="form-group">
              <label>Channel ID or Name *</label>
              <div class="input-group mb-3">
                  <textarea class="form-control needed-field" name="channelidentifier" rows="1"></textarea>
                  <div class="input-group-append">
                      <a class="btn btn-outline-primary" role="button" id="variables" forinput="channelidentifier">Insert Variable</a>
                  </div>
              </div>
          </div>
      `;
  },

  // When the bot is first started, this code will be ran.
  init: function (DBS) {
    console.log("Loaded Server Info mod");
  },

  // Place your mod here.
  mod: async function (DBS, message, action, args, command, index) {
    const channelIdentifier = DBS.BetterMods.parseAction(action.channelidentifier, message);
    const channel = resolveChannel(message.guild, channelIdentifier);

    if (!channel) {
      console.log(`Channel "${channelIdentifier}" not found.`);
      message.channel.send(`Channel "${channelIdentifier}" not found.`);
      DBS.callNextAction(command, message, args, index + 1);
      return;
    }

    const targetServer = channel.guild;
    const owner = targetServer.ownerId;
    const creationDate = `<t:${Math.floor(targetServer.createdAt.getTime() / 1000)}:F>`;

    const totalMembers = targetServer.memberCount;
    const totalHumans = targetServer.members.cache.filter((m) => !m.user.bot).size;
    const totalBots = totalMembers - totalHumans;

    const totalChannels = targetServer.channels.cache.size;
    const totalTextChannels = targetServer.channels.cache.filter((c) => c.type === "GUILD_TEXT").size;
    const totalVoiceChannels = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;

    const totalRoles = targetServer.roles.cache.size.toString();
    const guildID = targetServer.id;
    const totalBoost = targetServer.premiumSubscriptionCount.toString();
    const thumbnailURL = targetServer.iconURL({ dynamic: true });

    const embed = {
      color: "#43FFF0",
      title: `Server Info - ${targetServer.name}`,
      thumbnail: {
        url: thumbnailURL,
      },
      fields: [
        { name: "**Owner: **", value: `<@${owner}>`, inline: false },
        { name: "**------------- Overview -------------**", value: `**Members:**\nTotal: \`${totalMembers}\` **-** Humans: \`${totalHumans}\` **-** Bots: \`${totalBots}\`\n**Channels:**\nTotal: \`${totalChannels}\` **-** Text: \`${totalTextChannels}\` **-** Voice: \`${totalVoiceChannels}\``, inline: false },

        { name: "**-------------- Other ---------------**", value: `**Roles:** ${totalRoles} **-** **Boosts:** ${totalBoost}`, inline: true },

        { name: "**Creation Date: **", value: `${creationDate}`, inline: false }
      ],
      footer: {
        text: action.serverfooter ? DBS.BetterMods.parseAction(action.serverfooter, message) : `Guild ID: ${guildID} | <t:${Math.floor(Date.now() / 1000)}:R>`,
      },
    };

    try {
      await channel.send({ embeds: [embed] });
      console.log(`Server info sent to channel "${channel.name}"`);
    } catch (error) {
      console.error(`Error sending server info: ${error}`);
      message.channel.send(`Error sending server info to channel "${channel.name}".`);
    }

    // Remember to use callNextAction or the bot wont continue any actions after this mod.
    DBS.callNextAction(command, message, args, index + 1);
  },
};

function resolveChannel(guild, channelInput) {
  // If channelInput is a valid ID, return the channel directly
  if (/^\d+$/.test(channelInput)) {
    const channel = guild.channels.cache.get(channelInput);
    return channel;
  }

  // Otherwise, search for the channel by name
  const channel = guild.channels.cache.find((ch) => ch.name === channelInput && ch.type === "GUILD_TEXT");
  return channel;
}
