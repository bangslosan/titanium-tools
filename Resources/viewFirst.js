var Tools = require("Tools/Tools");

//---------------------------------------------//

var win = Ti.UI.currentWindow;

//---------------------------------------------//

var controller = Tools.UI.Loader.loadFromFilename(
	{
		any : '%ResourcesPath%Views/First.json'
	},
	win
);

//---------------------------------------------//
