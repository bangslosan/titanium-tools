var ToolsUI = require("Tools/Tools.UI");

//---------------------------------------------//

var currentWindow = Ti.UI.currentWindow;
var controller = {};

//---------------------------------------------//

ToolsUI.loadInterfaceFromFilename('Views/First.json', currentWindow, controller);

//---------------------------------------------//
