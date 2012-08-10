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
		url : 'viewFirst.js'
	}
);
main.open();
