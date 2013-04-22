var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//

TiTools2.Plugin.load("TiTools2/Plugins/TiTools.Google", "Google");

//---------------------------------------------//

TiTools2.Project.initialize(
	{
		presets: {
			iphone: [
				"presets/iphone/standart.js"
			],
			ipad: [
				"presets/ipad/standart.js"
			],
			android: {
				small: [
					"presets/small/standart.js"
				],
				any: [
					"presets/standart.js"
				]
			}
		},
		controllers: {
			"main": "main/cont.js",
			"tutorial.components": "main/tutorial/components/cont.js",
			"tutorial.components.standarts": "main/tutorial/components/standarts/cont.js",
			"tutorial.components.dialogs": "main/tutorial/components/dialogs/cont.js",
			"tutorial.components.tables": "main/tutorial/components/tables/cont.js",
			"tutorial.components.xml": "main/tutorial/components/xml/cont.js",
			"tutorial.network": "main/tutorial/network/cont.js",
			"tutorial.more": "main/tutorial/more/cont.js"
		}
	}
);

//---------------------------------------------//

TiTools2.Google.Map.currentLocation({
	position: {
		latitude: 0,
		longitude: 0
	},
	success: function(status, response) {
		TiTools2.Utils.info("currentLocation:success", status, response);
	},
	failure: function(handle) {
		TiTools2.Utils.info("currentLocation:failure");
	}
});

//---------------------------------------------//

var window = TiTools2.Project.createWindow("main");
window.open();

//---------------------------------------------//