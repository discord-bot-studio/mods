module.exports = {
    name: "Calculator",
    author: ["NickG#9306"],
    version: "1.0.0",
    changelog: "Added Calculator Mod ~ NickG#9306",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function(data) {
        return `
        <div class="form-group">
          <b>Even if you don't change anything remember to click SAVE or this node will not work!!</b><br>
          <p>If you get: "Error: Cannot find module 'mathjs'", open your bot in CMD/Terminal & run "npm i mathjs".</p>
        </div>

        <div class="form-group">
        <label id="label">Set Embed Title</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputtitle"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputtitle">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label id="label">Set Embed Color</label>
            <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="outputcolor">
        </div>

        <div class="form-group">
        <label id="label">Set Embed Author</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputauthor"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputauthor">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
        <label id="label">Set Embed Author Icon URL</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputauthoricon"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputauthoricon">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label id="label">Set Embed Thumbnail URL</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputthumbnail"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputthumbnail">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label id="label">Set Embed Image URL</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputimage"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputimage">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label id="label">Set Embed Footer</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputfooter"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputfooter">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
        <label id="label">Set Embed Footer Icon URL</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputfootericon"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputfootericon">Insert Variable</a>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
        console.log("Loaded Calculator Mod ~ NickG#9306");
    },
    mod: async function(DBS, message, action, args, command, index) {
    const math = require('mathjs')
    const { MessageEmbed } = require('discord.js');
      
    if (!args[0]) return message.channel.send('Please input a equation! Example: 1+1');
    
    let resp;
    try {
      resp = math.evaluate(args.join(' '));
    } catch (e) {
      return message.channel.send('Please input a valid calculation! Example: 1+1');
    }

    const embed = new MessageEmbed()
      .setTitle(DBS.BetterMods.parseAction(action.outputtitle, message))
      .setColor(action.outputcolor)
      .setAuthor({
        name: DBS.BetterMods.parseAction(action.outputauthor, message),
        iconURL: DBS.BetterMods.parseAction(action.outputauthoricon, message)
      })
      .setImage(DBS.BetterMods.parseAction(action.outputimage, message))
      .setThumbnail(DBS.BetterMods.parseAction(action.outputthumbnail, message))
      .setFooter({
        text: DBS.BetterMods.parseAction(action.outputfooter, message),
        iconURL: DBS.BetterMods.parseAction(action.outputfootericon, message)
      })
      .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
      .addField('Output', `\`\`\`js\n${resp}\`\`\``)

    message.channel.send({ embeds: [embed] });
   
  DBS.callNextAction(command, message, args, index + 1);
}
};