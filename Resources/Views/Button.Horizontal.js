module.exports = {
	outlet : "Horizontal",
	style : {
		className : "Ti.UI.View",
		backgroundColor : "blue"
	},
	subviews : [
		{
			outlet : "client",
			style : {
				className : "Ti.UI.View",
				layout : "vertical",
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE,
				backgroundColor : "green"
			}
		}
	]
};