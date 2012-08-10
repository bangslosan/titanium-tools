var TiTools = require("TiTools/TiTools");

//---------------------------------------------//

var window = Ti.UI.currentWindow;

//---------------------------------------------//

var screen = TiTools.UI.Loader.load('%ResourcesPath%Views/TabGroup.json', window);

//---------------------------------------------//

screen.tabbar.open();
window.hide();

//---------------------------------------------//
