var TiTools = require('TiTools/TiTools');
	TiTools.initLibraries();  //первичная загрузка всех библиотек
	
//---------------------------------------------//

if(TiTools.Platform.isAndroid == true)
{
	TiTools.UI.Preset.load("Presets/preset.js");
}
else
{
	TiTools.UI.Preset.load("Presets/preset.js");
}


//---------------------------------------------//

var main = TiTools.UI.Controls.createWindow(
	{
		main : 'viewFirst.js' //аналог url
	}
);
main.open();
