var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//

TiTools2.Plugin.load("TiTools2/Plugins/TiTools.Google", "Google");

//---------------------------------------------//

TiTools2.Project.initialize(
	{
		presets: {
			iphone: [
				"presets/iphone/common.js"
			],
			ipad: [
				"presets/ipad/common.js"
			],
			android: {
				small: [
					"presets/small/common.js"
				],
				any: [
					"presets/common.js"
				]
			}
		},
		controllers: {
			"main": "main/cont.js",
			"tutorial.components": "main/tutorial/components/cont.js",
			"tutorial.components.standarts": "main/tutorial/components/standarts/cont.js",
			"tutorial.components.dialogs": "main/tutorial/components/dialogs/cont.js",
			"tutorial.components.tables": "main/tutorial/components/tables/cont.js",
			"tutorial.network": "main/tutorial/network/cont.js",
			"tutorial.more": "main/tutorial/more/cont.js"
		}
	}
);

//---------------------------------------------//

var window = TiTools2.Project.createWindow("main");
window.open();

//---------------------------------------------//