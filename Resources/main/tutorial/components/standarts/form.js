module.exports = {
	class: "View",
	preset: "Window",
	style: {
		layout: "vertical",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	},
	subviews: [
		{
			class: "View",
			style: {
				layout: "vertical",
				left: 20,
				right: 20,
				height: Ti.UI.SIZE
			},
			subviews: [
				{
					class: "Button",
					style: {
						layout: "vertical",
						top: 20,
						width: Ti.UI.FILL,
						height: 40,
						title: "Button title"
					}
				},
				{
					class: "Label",
					style: {
						layout: "vertical",
						top: 20,
						width: Ti.UI.FILL,
						height: 40,
						textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
						text: "Label text"
					}
				}
			]
		}
	]
};