var TiTools = undefined;

//---------------------------------------------//

var wnd = undefined;
var form = undefined;

//---------------------------------------------//

function onInitController(window, params) {
	TiTools2 = require("TiTools2/TiTools");
	
	wnd = window;
	form = TiTools2.Form.load(window, "main/form.js", {
		onStartTutorial: onStartTutorial
	});
}

//---------------------------------------------//

function onWindowOpen(window, event) {
}
function onWindowClose(window, event) {
}

//---------------------------------------------//

function onStartTutorial(event) {
	var tabgroup = TiTools2.Project.createTabGroup({
		tabs: [
			{
				style: {
					title: "Component"
				},
				window: {
					controller: "tutorial.components",
					params: {
						style: {
							title: "Component"
						}
					}
				}
			},
			{
				style: {
					title: "Network"
				},
				window: {
					controller: "tutorial.network",
					params: {
						style: {
							title: "Network"
						}
					}
				}
			},
			{
				style: {
					title: "More"
				},
				window: {
					controller: "tutorial.more",
					params: {
						style: {
							title: "More"
						}
					}
				}
			}
		]
	});
	tabgroup.open();
}

//---------------------------------------------//

module.exports = {
	onInitController : onInitController,
	onWindowOpen : onWindowOpen,
	onWindowClose : onWindowClose
};