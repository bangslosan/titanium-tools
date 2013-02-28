var TiTools2 = undefined;

//---------------------------------------------//

var wnd = undefined;
var form = undefined;

//---------------------------------------------//

function onInitController(window, params) {
	TiTools2 = require("TiTools2/TiTools");
	
	wnd = window;
	form = TiTools2.Form.load(window, "main/tutorial/components/form.js", {
		onSelectCategory: onSelectCategory
	});
}

//---------------------------------------------//

function onWindowOpen(window, event) {
}
function onWindowClose(window, event) {
}

//---------------------------------------------//

function onSelectCategory(event) {
	var row = event.row;
	if(row != undefined) {
		if(TiTools2.isString(row.category) == true) {
			var window = TiTools2.Project.createWindow("tutorial.components." + row.category);
			if(window != undefined) {
				TiTools2.UI.currentTab.open(window);
			}
		}
	}
}

//---------------------------------------------//

module.exports = {
	onInitController : onInitController,
	onWindowOpen : onWindowOpen,
	onWindowClose : onWindowClose
};