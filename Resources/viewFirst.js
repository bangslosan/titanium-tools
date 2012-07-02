var ToolsUI = require("Tools/Tools.UI");

//---------------------------------------------//

var win = ToolsUI.currentWindowHandle();
var controller = {};

//---------------------------------------------//

ToolsUI.loadInterfaceFromFilename('Views/First.json', win, controller);