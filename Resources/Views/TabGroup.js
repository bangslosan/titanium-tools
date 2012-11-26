module.exports = {
	outlet : "tabGroup",
	style : {
		className : "Ti.UI.TabGroup",
		preset : "Tabbar"
	},
	tabs : [
		{
			style : {
				className : "Ti.UI.Tab"
			},
			root : {
				style : {
					className : "Ti.UI.Window",
					preset : "Window",
					main : "Controllers/Tab1.js"
				}
			}
		},
		{
			style : {
				className : "Ti.UI.Tab"
			},
			root : {
				style : {
					className : "Ti.UI.Window",
					preset : "Window",
					main : "Controllers/Tab2.js"
				}
			}
		},
		{
			style : {
				className : "Ti.UI.Tab"
			},
			root : {
				style : {
					className : "Ti.UI.Window",
					preset : "Window",
					main : "Controllers/Tab3.js"
				}
			}
		}
	]
}