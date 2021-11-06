module.exports = {
  name: "DiscordToGether",
  author: ["aoe#9214"],
  version: "0.0.1",
  changelog: "Added DiscordToGether Mod ~ aoe#9214",
  isEvent: false,
  isResponse: true,
  isMod: true,
  isAddon: false,
  section: "Message",
  html: function (data) {
    return `
        <div class="form-group">
        <label>Game/Activity *</label>
        <select name="main" class="form-control">
            <option value="youtube">Youtube</option>
            <option value="poker">Poker</option>
            <option value="chess">Chess</option>
            <option value="betrayal">Betrayal</option>
            <option value="fishing">Fishington</option>
            <option value="lettertile">Letter Tile</option>
            <option value="wordsnack">Word Snack</option>
            <option value="doodlecrew">Doodle Crew</option>
            <option value="spellcast">SpellCast</option>
            <option value="awkword">Awkword</option>
        </select><br>
        </div>
    </div>
            </div>
                <label>Message to send(Use $$invite.code$$ to get the Link) *</label>
                <input class="form-control" name="msg" rows="2"></input><br>
            </div>
        </div>
        <p>Note: You have to click on the BLUE LINK, not the 'Play' button, in order to start the activity!</p>
    `;
  },
  init: async function (DBS) {
    DBS.BetterMods.requireModule("discord-together");
    console.log("Loaded DiscordToGether Mod ~ aoe#9214");
    process.send("[DiscordToGether] Loaded Mod ~ aoe#9214");
  },
  mod: async function (DBS, message, action, args, command, index) {
    const { DiscordTogether } = require("discord-together");
    const discordTogether = new DiscordTogether(DBS.Bot);
    if (message.member.voice.channel) {
      switch (action.main) {
        case "youtube":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "youtube")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "poker":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "poker")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "chess":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "chess")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "betrayal":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "betrayal")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "fishing":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "fishing")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "lettertile":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "lettertile")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "wordsnack":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "wordsnack")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "doodlecrew":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "doodlecrew")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "spellcast":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "spellcast")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "awkword":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "awkword")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
      }
    }
    DBS.callNextAction(command, message, args, index + 1);
  },
};
