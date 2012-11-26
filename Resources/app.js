var TiTools = require('TiTools/TiTools');

//---------------------------------------------//

TiTools.initLibraries(); //Первичная загрузка всех библиотек
	
//---------------------------------------------//

if(TiTools.Platform.isAndroid == true)
{
	TiTools.UI.Preset.load("Presets/Common.js");
	switch(TiTools.Platform.screenMode) // Определение группы в которую входит экран
	{
		case TiTools.Platform.SCREEN_MODE_UNKNOWN: // Если не получилось определить группу экрана
		break;
		case TiTools.Platform.SCREEN_MODE_SMALL:
		break;
		case TiTools.Platform.SCREEN_MODE_NORMAL:
		break;
		case TiTools.Platform.SCREEN_MODE_LARGE:
		break;
		case TiTools.Platform.SCREEN_MODE_EXTRA_LARGE:
		break;
	}
}
else if(TiTools.Platform.isIOS == true)
{
	if(TiTools.Platform.isIPhone == true)
	{
		TiTools.UI.Preset.load("Presets/iPhone/Common.js");
	}
	else if(TiTools.Platform.isIPad == true)
	{
		TiTools.UI.Preset.load("Presets/iPad/Common.js");
	}
}

//---------------------------------------------//

// Создаем главное окно приложения
var main = TiTools.UI.Controls.createWindow(
	{
		main : "Controllers/Main.js" // Файл контроллера который отвечает за окно
	}
);
// Вызываем инициализацию контроллера окно
main.initialize();
// Показываем окно
main.open();

//---------------------------------------------//