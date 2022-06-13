module.exports = {
    name: "Userinfo",
    author: ["NickG#9306 modified by Kayroz#2597"],
    version: "1.0.0",
    changelog: "Modified to Userinfo by Kayroz#2597",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function(data) {
        return `
            <div class="form-group">
            <label id="label">Set Embed Title</label>
            <div class="input-group mb-3">
                <input class="form-control" name="servertitle"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="servertitle">Insert Variable</a>
                </div>
            </div>
            </div>
            <div class="form-group">
            <label id="label">Set Embed Color</label>
                <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="servercolour">
            </div>
            <div class="form-group">
            <label id="label">Set Embed Description</label>
            <div class="input-group mb-3">
                <textarea class="form-control" name="serverdesc" rows="2"></textarea>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="serverdesc">Insert Variable</a>
                </div>
            </div>
            </div>
            <div class="form-group">
            <label id="label">Set Embed Author</label>
            <div class="input-group mb-3">
                <input class="form-control" name="serverauthor"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="serverauthor">Insert Variable</a>
                </div>
            </div>
            </div>
            <div class="form-group">
            <label id="label">Set Embed Footer</label>
            <div class="input-group mb-3">
                <input class="form-control" name="serverfooter"></input>
                <div class="input-group-append">
                <a class="btn btn-outline-primary" role="button" id="variables" forinput="serverfooter">Insert Variable</a>
                </div>
            </div>
            </div>
            <hr>
            <div class="row">
            <div class="col">
                <label>Field Name Emoji *</label>
                <input class="form-control" name="nameemoji"></input><br>
            </div>
            </div>
            <p>This can either be a copy & pasted unicode emoji or a custom emoji from a server your bot is in.<br>
            Copy & Paste Unicode Emojis: <a href="https://getemoji.com" target="_blank">getemoji.com</a> | How to use Custom Emojis: <a href="https://docs.discordbotstudio.org/misc/how-to-use-custom-emojis" target="_blank">DBS Docs</a><p>
            
            <hr>
            
            <p>User Info Mod ~ Version 1.0.0
      `;
    },
    init: function(DBS) {
        console.log("Loaded User Info Mod ~ NickG#9306 ~ Kayroz#2597");
    },
    mod: async function(DBS, message, action, args, command, index) {
    const { MessageEmbed } = require('discord.js');

    const fs = require('fs')
    const guild = message.guild;
    const nameEmoji = DBS.BetterMods.parseAction(action.nameemoji, message)
    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)
    //const warn = JSON.parse(fs.readFileSync('./BotData/user/user.json'))


    const ServerInfo = new MessageEmbed()
        .setColor(action.servercolour)
        .setTitle(DBS.BetterMods.parseAction(action.servertitle, message))
        .setAuthor(DBS.BetterMods.parseAction(action.serverauthor, message))
        .setDescription(DBS.BetterMods.parseAction(action.serverdesc, message))
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: `${nameEmoji} GENERAL\n`,
                value: [
                    `**Tag**: ${user.tag}`, 
                    `**ID**: ${user.id}`,
                    `**Username**: ${user.username}`,
                    `**Badges:** ${(await user.fetchFlags()).toArray().length >= 1 ? (await user.fetchFlags()).toArray().join(" ") : "No"}`,
                    `**Bot?** : ${user.bot ? "Yes" : "No"}`, 
                    `**Roles**: ${member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString())}`, 
                    `**Created Account:** <t:${Math.floor(user.createdAt / 1000)}:F>`,
                    `**Joined Server:** <t:${Math.floor(member.joinedAt / 1000)}:F>`,
                    
                    //`**Warns:** ${(warn[user.id].length, true)}`,
                
                    


                ].join('\n')
            },

        )
        .setTimestamp()
        .setFooter(DBS.BetterMods.parseAction(action.serverfooter, message))
    message.reply({ embeds: [ServerInfo] });

    DBS.callNextAction(command, message, args, index + 1);
  }
};
