//thank you strike for helping me fix the variables resetting ~Hectoliters
//No problem :D ~ STR1KE
var i = 0;
var times = 1;
module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Loop",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Hectoliters#7743", "STR1KE#6969"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Updated Loop ~ Hectoliters",

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
        <label>Loop Mode *</label>
        <select class="form-control" name="LoopMode">
            <option value="Infinite" selected>Infinite</option>
            <option value="Finite">Finite</option>
        </select>
    </div>
    <div class="form-group">
    <label>Ammount of times to loop it (Optional) </label>
    <textarea class="form-control field" name="ammount" rows="1" ></textarea>
</div>
            <div class="form-group">
                <label>Ammount of nodes to loop (Before this one) * </label>
                <textarea class="form-control needed-field" name="Nodes" rows="1" ></textarea>
            </div>
            <div class="form-group">
            <label>Delay between nodes (In Seconds) * </label>
            <textarea class="form-control needed-field" name="timedelay" rows="1" ></textarea>
        </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded Loop");
    },

    // Place your mod here.
    mod: function (DBS, message, action, args, command, index) {
        // counting each second as 1.1 because otherwise it stops itself
        var delay = action.timedelay * 1100;
         i = action.ammount;
switch (action.loopmode) {
    case "Infinite" :
        //Travel Back
setTimeout(function() {
    DBS.callNextAction(command, message, args, index - action.nodes);
    console.log("Traveled" + action.nodes + "nodes back")
}, delay);



break;



case "Finite":
    if (times > -2){
        times = times + 1;
      } else {
       times = 1;
      }
        i = i - times + 2;
    if (i > 0) {
        setTimeout(function() {
           //Travel Back
              DBS.callNextAction(command, message, args, index - action.nodes);
              console.log("Traveled" + action.nodes + "nodes back")
          }, delay);
     } else {
          //Stop Loop
            console.log("Stopped Looping")
         DBS.callNextAction(command, message, args, index + 1);
     }
break;
}

}
};
