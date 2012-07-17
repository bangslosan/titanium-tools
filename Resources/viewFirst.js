var Tools = require("Tools/Tools");

//---------------------------------------------//

var win = Ti.UI.currentWindow;

//---------------------------------------------//

Tools.UI.Preset.loadFromFilename('Panel.Classic', '%ResourcesPath%Presets/Panel.Classic.json');

//---------------------------------------------//

var controller = Tools.UI.Loader.loadFromFilename('%ResourcesPath%Views/First.json', win);

//---------------------------------------------//
