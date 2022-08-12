module.exports = {
  name: "DiscordToGether",
  author: ["aoe#9214"],
  version: "0.0.2",
  changelog: "Added DiscordToGether Mod ~ aoe#9214 updated by ~ cedrou#0881",
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
            <option value="checkersinthepark">Checkers in the Park</option>
            <option value="betrayal">Betrayal</option>
            <option value="fishing">Fishington</option>
            <option value="lettertile">Letter Tile</option>
            <option value="wordsnack">Word Snack</option>
            <option value="doodlecrew">Doodle Crew</option>
            <option value="spellcast">SpellCast</option>
            <option value="awkword">Awkword</option>
            <option value="puttparty">Puttparty</option>
            <option value="sketchheads">Sketchheads</option>
            <option value="ocho">Ocho</option>
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
    if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

    DBS.BetterMods.requireModule("discord-together");
    console.log("Loaded DiscordToGether Mod ~ aoe#9214 updated by ~ cedrou#0881");
  },
  mod: async function (DBS, message, action, args, command, index) {
    if (!DBS.BetterMods) return console.log(`\x1b[36m [${this.name}.JS] \x1b[0m\x1b[31mBetterMods.js is not loaded. BetterMods.js is required to use this mod. \x1b[0m`);

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
        case "checkersinthepark":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "checkers")
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
        case "puttparty":
          discordTogether
            .createTogetherCode(message.member.voice.channel.id, "puttparty")
            .then(async (invite) => {
              var invitemsg = action.msg;
              invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
              return message.channel.send(invitemsg);
            });
          DBS.callNextAction(command, message, args, index + 1);
          break;
        case "sketchheads":
            discordTogether
              .createTogetherCode(message.member.voice.channel.id, "sketchheads")
              .then(async (invite) => {
                var invitemsg = action.msg;
                invitemsg = invitemsg.replace("$$invite.code$$", invite.code);
                return message.channel.send(invitemsg);
              });
            DBS.callNextAction(command, message, args, index + 1);
            break;
        case "ocho":
              discordTogether
                .createTogetherCode(message.member.voice.channel.id, "ocho")
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
