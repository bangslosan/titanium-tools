var TiTools2 = undefined;

//---------------------------------------------//

var wnd = undefined;
var form = undefined;

//---------------------------------------------//

function onInitController(window, params) {
	TiTools2 = require("TiTools2/TiTools");
	
	wnd = window;
	form = TiTools2.Form.load(window, "main/tutorial/components/xml/form.xml", {
	});
}

//---------------------------------------------//

function onWindowOpen(window, event) {
}
function onWindowClose(window, event) {
}

//---------------------------------------------//

module.exports = {
	onInitController : onInitController,
	onWindowOpen : onWindowOpen,
	onWindowClose : onWindowClose
};