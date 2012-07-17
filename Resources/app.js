var Tools = require('Tools/Tools');

//---------------------------------------------//

var main = Tools.UI.Controls.createWindow(
	{
		backgroundColor : '#888888',
		backgroundImage : '%ResourcesPath%Images/Backgrounds/Dark.png',
		url : 'viewFirst.js'
	}
);
main.open();
