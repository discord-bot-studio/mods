# Mods
This repo serves to house mods for DBS. Please see example_mod.js to see how modding works in DBS. DBS does not hold responsibility for the content and effects of 3rd party mods you install.

# To install mods:
1. Download this repository by pressing "Code" then "Download ZIP" on the repo home page.
![download](https://i.imgur.com/qitbaBP.png)
2. Locate the javascript (.js) file for the mod(s) you want to add inside the mods folder of this repo. 
3. Copy that file(s).
4. Open the BotFiles folder for the bot you want to add the mods to. This folder will be located in the location you chose to create the bot in.
5. Paste the js files inside the "mods" folder inside BotFiles (/BotFiles/mods).
6. Now open DBS (restart it if it was open already), and you will now be able to add responses of the type of mod(s) you added, just like any other response in DBS. 
7. Done!


# Development
## Variables
How can I use variables in mods? Note this only works if you have BetterMods.js installed.
```js
// Saving Data
// types ("temp", "server", "global")
DBS.saveVar("varType", "varName", "your data here", guild);

// Fetching Data
// types ("temp", "server", "global")
DBS.BetterMods.getVar("types", "varName", guild)

// Parsing Data
// types ("temp", "server", "global")
DBS.BetterMods.parseAction(string, message) // replaces stuff like ${tempVars.myVar} with the data
```

## Responses
```js
mod: async function(DBS, message, action, args, command, index) {
    // your mods code here

    // This will move onto the next node. Without this the command will stop after this node is finished running.
    // You can also change the index to something like 0 to start the command from the beginning.
    DBS.callNextAction(command, message, args, index + 1);
}
```

## FAQ
- Why is my mod not showing up in DBS? Make sure you have "isMod" set to true and that your mod file mates your mod name. For an example if my mod was called "Example Mod" my mod file name would be "ExampleMod.js".

## Events
Note events wont show in Discord Bot Studio but the mod function is still called.
