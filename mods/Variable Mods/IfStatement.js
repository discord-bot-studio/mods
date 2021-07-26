module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "If Statement",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["Discord Bot Studio"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "Created Play YouTube Video ~ Great Plains Modding",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Variable",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label>Variable 1 *</label>
                        <input class="form-control" name="variableOne" value="\${tempVars.var1}"></input><br>
                    </div>

                    <div class="col">
                        <label>Statement *</label>
                        <select name="statement" class="form-control">
                            <option value="==">==</option>
                            <option value="!=">!=</option>
                        </select><br>
                    </div>

                    <div class="col">
                        <label>Variable 2 *</label>
                        <input class="form-control" name="variableTwo" value="\${tempVars.var2}"></input><br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label>If True Jump To Node *</label>
                        <input class="form-control" name="ifTrueNodeID"></input><br>
                    </div>

                    <div class="col">
                        <label>If False Jump To Node *</label>
                        <input class="form-control" name="ifFalseNodeID"></input><br>
                    </div>
                </div>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function() {
        console.log("Loaded send message");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const var1 = DBS.BetterMods.parseAction(action.variableone, message);
        const var2 = DBS.BetterMods.parseAction(action.variabletwo, message);

        switch(action.statement) {
            case "==":
                if (var1 == var2) return DBS.callNextAction(command, message, args, action.iftruenodeid);
                DBS.callNextAction(command, message, args, parseInt(action.iftruenodeid));
            break
            case "!=":
                if (var1 != var2) return DBS.callNextAction(command, message, args, action.iftruenodeid);
                DBS.callNextAction(command, message, args, parseInt(action.iftruenodeid));
            break
        }
    }
};