var TiTools = require("TiTools/TiTools");

//---------------------------------------------//

var win = Ti.UI.currentWindow;

//---------------------------------------------//

var controller = TiTools.UI.Loader.load(
	{
		any : '%ResourcesPath%Views/First.json'
	},
	win
);

//---------------------------------------------//
