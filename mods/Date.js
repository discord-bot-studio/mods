module.exports = {
    name: "Date",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Control",

    html: function (data) {
        return `
        <label for="datetime">Date and time</label>
        <input type="datetime-local" name="datetime" id="datetime" class="form-control">
        `
        ;
    },

    init: function () {
        console.log("Loaded Date");
    },

    mod: async function (DBS, message, action, args, command, index) {

        a = new Date(action.datetime)
        b = a.getTime()
        c = "false"
        interval = setInterval(() => {
            if(Date.now() > b) {
                if(c == "false"){
                    clearInterval(interval)
                    DBS.callNextAction(command, message, args, index + 1);
                    c = "true"
                }
            }
        }, 1000);
    }
};
