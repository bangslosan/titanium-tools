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
	
	/*var control = TiTools.UI.Controls.Ext.createButton3(
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
	

	 ui.client.add(control);*/
	//////
//}
	
	 //-------------------------------------------

	// var control = TiTools.UI.Controls.Ext.createButton9(
		// {
			// type: "click",
			// backgroundImage: 
			// {
				// normal:{
					// leftTopImage: "media/buttonNine/leftTopNormal.png",
					// leftCenterImage:"media/buttonNine/leftCenterNormal.png",
					// leftDownImage:"media/buttonNine/leftDownNormal.png",
					// centerTopImage: "media/buttonNine/centerTopNormal.png",
					// centerCenterImage:"media/buttonNine/centerCenterNormal.png",
					// centerDownImage:"media/buttonNine/centerDownNormal.png",
					// rightTopImage: "media/buttonNine/rightTopNormal.png",
					// rightCenterImage: "media/buttonNine/rightCenterNormal.png",
					// rightDownImage: "media/buttonNine/rightDownNormal.png",
				// },
				// select:{
					// leftTopImage: "media/buttonNine/leftTopSelect.png",
					// leftCenterImage:"media/buttonNine/leftCenterSelect.png",
					// leftDownImage:"media/buttonNine/leftDownSelect.png",
					// centerTopImage: "media/buttonNine/centerTopSelect.png",
					// centerCenterImage:"media/buttonNine/centerCenterSelect.png",
					// centerDownImage:"media/buttonNine/centerDownSelect.png",
					// rightTopImage: "media/buttonNine/rightTopSelect.png",
					// rightCenterImage: "media/buttonNine/rightCenterSelect.png",
					// rightDownImage: "media/buttonNine/rightDownSelect.png",
				// },
				// disable:{
					// leftTopImage: "media/buttonNine/leftTopDisable.png",
					// leftCenterImage:"media/buttonNine/leftCenterDisable.png",
					// leftDownImage:"media/buttonNine/leftDownDisable.png",
					// centerTopImage: "media/buttonNine/centerTopDisable.png",
					// centerCenterImage:"media/buttonNine/centerCenterDisable.png",
					// centerDownImage:"media/buttonNine/centerDownDisable.png",
					// rightTopImage: "media/buttonNine/rightTopDisable.png",
					// rightCenterImage: "media/buttonNine/rightCenterDisable.png",
					// rightDownImage: "media/buttonNine/rightDownDisable.png",
				// },
				// left: 0,
				// right: 0,
// 				
				// widthLeftTop: 36,
				// widthRightTop: 36,
				// widthLeftCenter: 28,
				// widthRightCenter: 28,
				// widthLeftDown: 36,
				// widthRightDown: 36,
// 				
				// heightLeftTop: 34,
				// heightRightTop: 34,
				// heightCenterTop: 28,
				// heightCenterDown: 28,
				// heightLeftDown: 34,
				// heightRightDown: 34,
			// },
			// content:
			// {
				// leftImage:{
					// backgroundImage: "media/Deposit.png",
					// height: 28,
					// width: 28,
				// },
				// title:{
					// text: "Helasdasdasdasdasdasdasdasdasdasdlo",
					// height: Ti.UI.SIZE,
					// width: Ti.UI.SIZE,
					// color : "#71828c",
					// textAlign : "center",
					// font : {
						// fontSize : 20,
					// }
				// },
				// rightImage:{
					// backgroundImage: "media/Deposit.png",
					// height: 28,
					// width: 28,
				// }
			// }
		// }
	// );
	// // ui.client.add(q);
	// // ui.client.add(w);
	// ui.client.add(control);
// }
		 //-------------------------------------------

	
	/////////
	// var control = TiTools.UI.Controls.Ext.createProgressBar(
		// {
			// value: 90,
			// backgroundImage:{
				// empty:{
					// leftImage: "media/ProgressBar/Regular/Empty.Left.png",
					// centerImage: "media/ProgressBar/Regular/Empty.Center.png",
					// rightImage: "media/ProgressBar/Regular/Empty.Right.png"
				// },
				// select:{
					// leftImage: "media/ProgressBar/Regular/Full.Left.png",
					// centerImage: "media/ProgressBar/Regular/Full.Center.png",
					// rightImage: "media/ProgressBar/Regular/Full.Right.png"
				// },
				// widthLeftView: 8,
				// widthRightView: 8,
				// height: 14
			// } 
		// }
	// );
// 	
	// var value = control.getValue();
// 	
	// var q = Ti.UI.createView({
		// height: 50,
		// width: 50,
		// backgroundColor: "red",
	// });
// 	
	// var w = Ti.UI.createView({
		// height: 50,
		// width: 50,
		// backgroundColor: "blue",
	// });
// 	
	// q.addEventListener("touchstart",function(e){
		// value += 1;
		// Ti.API.info(value);
		// control.setValue(value);
	// });
// 	
	// w.addEventListener("touchstart",function(e){
		// value -= 1;
		// Ti.API.info(value);
		// control.setValue(value);
	// });
// 	
// 	 
// 	 
	 // ui.client.add(q);
	 // ui.client.add(w);
	 // ui.client.add(control);
// }
	 //-------------------------------------------
	 // var qwe = Ti.UI.createView({
	 	// height : 100,
		// width : 100,
		// backgroundColor : "red"
	 // });
// 	 
	  // var qwe1 = Ti.UI.createView({
	 	// height : 100,
		// width : 100,
		// backgroundColor : "white"
	 // });
// 	 
	  // var qwe2 = Ti.UI.createView({
	 	// height : 100,
		// width : 100,
		// backgroundColor : "green"
	 // });
// 	 
	  // var qwe3 = Ti.UI.createView({
	 	// height : 100,
		// width : 100,
		// backgroundColor : "gray"
	 // });
// 	 
	// var control = TiTools.UI.Controls.Ext.createTabs(
		// {
			// height: 82,
			// scroll: true,
			// leftTab: {
				// height: 82,
				// width : 25,
				// backgroundImage: "media/Tabs/Left.png"
			// },
			// centerTab: {
				// height: 82,
				// width : 25,
				// backgroundImage: "media/Tabs/Center.png"
			// },
			// rightTab: {
				// height: 82,
				// width : 25,
				// backgroundImage: "media/Tabs/Right.png"
			// },
			// tabs:
			// [
				// {
					// height: 82,
					// width: 231,
					// leftImage: {
						// backgroundImageNormal: "media/ProgressBar/Regular/Empty.Left.png",
						// backgroundImageSelect: "media/ProgressBar/Regular/Full.Left.png",
						// height: 50,
						// width: 20,
					// },
					// centerImage: {
						// backgroundImageNormal: "media/ProgressBar/Regular/Empty.Center.png",
						// backgroundImageSelect: "media/ProgressBar/Regular/Full.Center.png",
						// height: 50,
					// },
					// rightImage: {
						// backgroundImageNormal: "media/ProgressBar/Regular/Empty.Right.png",
						// backgroundImageSelect: "media/ProgressBar/Regular/Full.Right.png",
						// height: 50,
						// width: 20,
					// },
				// },
				// {
					// height: 82,
					// width: 231,
					// backgroundImageNormal: "media/Tabs/Auto/Dsago.Normal.png",
					// backgroundImageSelect: "media/Tabs/Auto/Dsago.Select.png",
				// },
				// {
					// height: 82,
					// width: 231,
					// backgroundImageNormal: "media/Tabs/Auto/Dsago.Normal.png",
					// backgroundImageSelect: "media/Tabs/Auto/Dsago.Select.png",
				// },
				// {
					// height: 82,
					// width: 231,
					// backgroundImageNormal: "media/Tabs/Auto/Dsago.Normal.png",
					// backgroundImageSelect: "media/Tabs/Auto/Dsago.Select.png",
				// }
			// ]
		// }
	// );
// 	
	// var q = Ti.UI.createView({
		// height: 50,
		// width: 50,
		// backgroundColor: "red",
	// });
// 	
	// var w = Ti.UI.createView({
		// height: 50,
		// width: 50,
		// backgroundColor: "blue",
	// });
// 	
	// var r = Ti.UI.createView({
		// height: 50,
		// width: 50,
		// backgroundColor: "white",
	// });
// 	
	// var t = Ti.UI.createView({
		// height: 50,
		// width: 50,
		// backgroundColor: "green",
	// });
// 	
	// q.addEventListener("touchstart",function(e)
	// {
		// control.addContent(1,qwe);
	// });
// 	
	// w.addEventListener("touchstart",function(e){
		// control.setEnable(true);
		// Ti.API.info(control.getEnable());
	// });
// 	
	// r.addEventListener("touchstart",function(e){
		// control.setEnableChange(2,false);
		// Ti.API.info(control.getEnableChange(2));
	// });
// 	
	// t.addEventListener("touchstart",function(e){
		// control.setEnableChange(2,true);
		// Ti.API.info(control.getEnableChange(2));
	// });
// 	
	// ui.client.add(q);
	// ui.client.add(w);
	// ui.client.add(r);
	// ui.client.add(t);
// 	
	// ui.client.add(control);
// }
	
	//----------------------------------
	
	 // var control = TiTools.UI.Controls.Ext.createModalWindowList(
		// {
			// view:{
				// top: "5%",
				// left: '5%',
				// right: "5%",
				// bottom: "5%",
				// width: Ti.UI.FILL,
				// height: Ti.UI.FILL,
				// backgroundColor: "gray"
			// },
			// titleViewStyle:{
				// top: 0,
				// width : Ti.UI.FILL,
				// height : 60,
				// backgroundColor: "green"
			// },
			// titleStyle:{
				// width: Ti.UI.SIZE,
				// height: Ti.UI.SIZE,
				// color: "red",
				// text : "hello",
			// },
			// separatorTitle:{
				// width: Ti.UI.FILL,
				// height: 4,
				// backgroundColor: "red"
			// },
			// separatorRow:{
				// bottom: 0,
				// width: Ti.UI.FILL,
				// height: 2,
				// backgroundColor: "gray"
			// },
			// selectImage:{
				// height: 10,
				// width: 10,
				// backgroundColor: "red"
			// },
			// fieldPrint : "name",
			// list:[
				// {
					// name: "qwerty",
					// id: 0
				// },
				// {
					// name: "asdasd",
					// id: 1
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasd",
					// id: 1
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasd",
					// id: 1
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// },
				// {
					// name: "asdasda",
					// id: 2
				// }
			// ],
			// textStyle:{
				// left : 0,
				// textAling: "left",
				// width: Ti.UI.SIZE,
				// height: Ti.UI.SIZE,
				// color: "white"
			// },
			// rowStyle:{
				// height: 50,
				// width: Ti.UI.FILL,
				// backgroundColor: "blue",
			// },
			// buttonStyle:{
				// height: 50,
				// backgroundColor: "red"
			// }
		// }
	// );
	// Ti.App.addEventListener("modalListOk",function(event)
		// {
			// alert(event.data);
			// ui.client.remove(control);
			// ui.client.control = null;
		// }
	// );
	// ui.client.add(control);
// }
	
	/*var control = TiTools.UI.Controls.Ext.createModalWindowDateWith(
		{
			view:{
				top: "5%",
				left: '5%',
				right: "5%",
				bottom: "5%",
				width: Ti.UI.FILL,
				height: Ti.UI.FILL,
				backgroundColor: "gray"
			},
			titleViewStyle:{
				top: 0,
				width : Ti.UI.FILL,
				height : 60,
				backgroundColor: "green"
			},
			titleStyle:{
				width: Ti.UI.SIZE,
				height: Ti.UI.SIZE,
				color: "red",
				text : "hello",
			},
			separatorTitle:{
				width: Ti.UI.FILL,
				height: 4,
				backgroundColor: "blue"
			},
			separatorRow:{
				bottom: 0,
				width: Ti.UI.FILL,
				height: 2,
				backgroundColor: "gray"
			},
			buttonFromStyle:{
				backgroundColorNormal: "red",
				backgroundColorSelect: "blue",
			},
			buttonToStyle:{
				backgroundColorNormal: "red",
				backgroundColorSelect: "blue",
			},
			callBack1: function(pickerFrom,pickerTo)
				{
					var date = pickerFrom.value;
					date.setYear(date.getYear() + 1910);
					pickerTo.value = date;
				},
			pickerFrom:{
				typePicker:"date",
				top: "30%",
				minDate: new Date(),
				value:new Date(),
			},
			pickerTo:{
				top: "30%",
				minDate: new Date(),
				value:new Date(),
			},
			buttonStyle:{
				height: 50,
				backgroundColor: "red"
			}
		}
	);
	
ui.client.add(control)*/
	
//}

/*var control = TiTools.UI.Controls.Ext.createButtonBar(
		{
			view:{
				height: 52,
				width: Ti.UI.SIZE,
			},
			masButton:[
				{
					type: "toggle",
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
						title:{
							text: "Helasdasdasdasdasdasdasdasdasdasdlo",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE,
							color : "#71828c",
							textAlign : "center",
							font : {
								fontSize : 20,
							}
						}
					}
				},
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
						title:{
							text: "Helasdasdasdasdasdasdasdasdasdasdlo",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE,
							color : "#71828c",
							textAlign : "center",
							font : {
								fontSize : 20,
							}
						}
					}
				},
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
						title:{
							text: "Helasdasdasdasdasdasdasdasdasdasdlo",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE,
							color : "#71828c",
							textAlign : "center",
							font : {
								fontSize : 20,
							}
						}
					}
				},
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
						title:{
							text: "Helasdasdasdasdasdasdasdasdasdasdlo",
							height: Ti.UI.SIZE,
							width: Ti.UI.SIZE,
							color : "#71828c",
							textAlign : "center",
							font : {
								fontSize : 20,
							}
						}
					}
				},
				
			]
		}
	);
	
	ui.client.add(control);
	Ti.App.addEventListener("clickButtonBar",function(event){
		alert(event.index);
	});
	// control.enableAll(false);
	// Ti.API.info(control.isEnableAll());*/
 }
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