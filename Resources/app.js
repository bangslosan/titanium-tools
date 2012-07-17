var Tools = require('Tools/Tools');

//---------------------------------------------//

Tools.UI.Preset.loadFromFilename(
	{
		android : '%ResourcesPath%Presets/Android.json',
		ios : '%ResourcesPath%Presets/iOS.json'
	}
);

//---------------------------------------------//

var main = Tools.UI.Controls.createWindow(
	{
		backgroundColor : '#888888',
		backgroundImage : '%ResourcesPath%Images/Backgrounds/Dark.png',
		url : 'viewFirst.js'
	}
);
main.open();
