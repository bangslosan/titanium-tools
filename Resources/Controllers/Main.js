var TiTools = undefined;

//---------------------------------------------//
// Глобальные переменные для окна
//---------------------------------------------//

var ui = undefined;

//---------------------------------------------//
// Обязательные функции
//---------------------------------------------//

// Инициализация контроллера окна
function onInitController(window, params)
{
	TiTools = require("TiTools/TiTools");
	
	// Загрузка контента окна
	ui = TiTools.UI.Loader.load("Views/Main.js", window);
	ui.createTabGroup.addEventListener("click", onCreateTabGroup);
}

//---------------------------------------------//
// Функции лентяйки
//---------------------------------------------//

// Обработчик при открытии окна
function onWindowOpen(window, event)
{
	alert("On open main window");
}

// Обработчик при закрытии окна
function onWindowClose(window, event)
{
	alert("On close main window");
}

//---------------------------------------------//
// Функции главного окна
//---------------------------------------------//

// Обработчик при открытии окна
function onCreateTabGroup(event)
{
	var cnt = TiTools.UI.Loader.load("Views/TabGroup.js");
	// Вызываем инициализацию контроллера TabGroup
	cnt.tabGroup.initialize(
		{
			message1 : "Tab 1", // Передаем дополнительные параметры
			message2 : "Tab 2",
			message3 : "Tab 3"
		}
	);
	// Показываем TabGroup
	cnt.tabGroup.open();
}

//---------------------------------------------//

module.exports = {
	onInitController : onInitController, // Обязательный параметр
	onWindowOpen : onWindowOpen,
	onWindowClose : onWindowClose
};