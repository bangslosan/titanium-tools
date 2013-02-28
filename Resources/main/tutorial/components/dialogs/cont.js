var TiTools2 = undefined;

//---------------------------------------------//

var wnd = undefined;
var form = undefined;

//---------------------------------------------//

function onInitController(window, params) {
	TiTools2 = require("TiTools2/TiTools");
	
	wnd = window;
	form = TiTools2.Form.load(window, "main/tutorial/components/dialogs/form.js", {
		onOpenAlertDialog: onOpenAlertDialog,
		onOpenEmailDialog: onOpenEmailDialog,
		onOpenOptionDialog: onOpenOptionDialog
	});
}

//---------------------------------------------//

function onWindowOpen(window, event) {
}
function onWindowClose(window, event) {
}

//---------------------------------------------//

function onOpenAlertDialog(event) {
	form.alertDialog.show();
}
function onOpenEmailDialog(event) {
	form.emailDialog.open();
}
function onOpenOptionDialog(event) {
	form.optionDialog.show();
}

//---------------------------------------------//

module.exports = {
	onInitController : onInitController,
	onWindowOpen : onWindowOpen,
	onWindowClose : onWindowClose
};