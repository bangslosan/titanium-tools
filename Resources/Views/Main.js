module.exports = {
	style : {
		className : "Ti.UI.View",
		layout : "vertical",
		margin : 20
	},
	subviews : [
		{
			outlet : "createTabGroup",
			style : {
				className : "Ti.UI.Button",
				width : 300,
				height : 100
			}
		},
		{
			outlet : "client",
			style : {
				className : "Ti.UI.View",
				layout : "vertical",
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE
			}
		}
	]
};