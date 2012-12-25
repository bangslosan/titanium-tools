var TiTools = undefined;

//---------------------------------------------//
// Обязательные функции
//---------------------------------------------//

// Инициализация контроллера окна
function onInitController(window, params)
{
	TiTools = require("TiTools/TiTools");
	//alert(params.message1);
	ui = TiTools.UI.Loader.load("Views/Tab1.js", window);
	ui.button1.addEventListener("click",
		function(event)
		{
			var cnt = TiTools.UI.Loader.load("Views/Button.Horizontal.js");
			cnt.Horizontal.open();
		});
}

//---------------------------------------------//
// Функции лентяйки
//---------------------------------------------//

// Обработчик при открытии окна
function onWindowOpen(window, event)
{
	//alert("On open tab 1");
}

// Обработчик при закрытии окна
function onWindowClose(window, event)
{
	//alert("On close tab 1");
}

//---------------------------------------------//

module.exports = {
	onInitController : onInitController, // Обязательный параметр
	onWindowOpen : onWindowOpen,
	onWindowClose : onWindowClose
};