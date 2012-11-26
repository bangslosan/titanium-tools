function init(win) 
{
	var TiTools = require("TiTools/TiTools");

	//---------------------------------------------//
	
	var screen = TiTools.UI.Loader.load('Views/TabGroup.json', win);
	
	//---------------------------------------------//
	
	screen.tabbar.open();
	win.hide();
	
	//---------------------------------------------//
}

module.exports = init;