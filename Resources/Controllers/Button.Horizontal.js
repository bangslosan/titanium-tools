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
	ui = TiTools.UI.Loader.load("Views/Button.Horizontal.js", window);

var control = TiTools.UI.Controls.createButtonExt(
		{
			type: "click",
			backgroundImage: 
			{
				normal:{
					leftImage: "media/Left.Normal.png",
					centerImage: "media/Center.Normal.png",
					rightImage: "media/Right.Normal.png"
				},
				select:{
					leftImage: "media/Left.Select.png",
					centerImage: "media/Center.Select.png",
					rightImage: "media/Right.Select.png"
				},
				disable:{
					leftImage: "media/Left.Disable.png",
					centerImage: "media/Center.Disable.png",
					rightImage: "media/Right.Disable.png"
				},
				height: 52,
				widthLeft: 12,
				widthRight: 12
			},
			content:
			{
				leftImage:{
					backgroundImage: "media/Deposit.png",
					height: 28,
					width: 28,
				},
				title:{
					text: "Helasdasdasdasdasdasdasdasdasdasdlo",
					height: Ti.UI.SIZE,
					width: Ti.UI.SIZE,
					color : "#71828c",
					textAlign : "center",
					font : {
						fontSize : 20,
					}
				},
				rightImage:{
					backgroundImage: "media/Deposit.png",
					height: 28,
					width: 28,
				}
			}
		}
	);
	var q = Ti.UI.createView({
		height: 30,
		width: 30,
		backgroundColor: "red",
	});
	
	var w = Ti.UI.createView({
		height: 30,
		width: 30,
		backgroundColor: "blue",
	});
	
	q.addEventListener("click",function(e){
		control.disableView(false);
	});
	
	w.addEventListener("click",function(e){
		control.disableView(true);
	});
	
	ui.client.add(q);
	ui.client.add(w);
	ui.client.add(control);
	
//---------------------------------------------//
// Функции лентяйки
//---------------------------------------------//

// Обработчик при открытии окна
function onWindowOpen(window, event)
{
	//alert("On open main window");
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

//---------------------------------------------//

module.exports = {
	onInitController : onInitController, // Обязательный параметр
	onWindowOpen : onWindowOpen,
	onWindowClose : onWindowClose
};