var TiTools = require('TiTools/TiTools');

//---------------------------------------------//

TiTools.UI.Preset.load(
	[
		{
			android : '%ResourcesPath%Presets/Android.json',
			ios : '%ResourcesPath%Presets/iOS.json'
		}
	]
);

//---------------------------------------------//

var main = TiTools.UI.Controls.createWindow(
	{
		backgroundColor : '#888888',
		backgroundImage : '%ResourcesPath%Images/Backgrounds/Dark.png',
		url : 'viewFirst.js'
	}
);
main.open();
