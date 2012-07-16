var ToolsUI = require("Tools/Tools.UI");
var ToolsUIPreset = require("Tools/Tools.UI.Preset");
var ToolsUILoader = require("Tools/Tools.UI.Loader");

//---------------------------------------------//

var win = Ti.UI.currentWindow;
var controller = {};

//---------------------------------------------//

ToolsUIPreset.loadFromFilename('Panel.Classic', '%ResourcesPath%Presets/Panel.Classic.json');

//---------------------------------------------//

ToolsUILoader.loadFromFilename('%ResourcesPath%Views/First.json', win, controller);

//---------------------------------------------//
