module.exports = {
	class: "View",
	preset: "Window",
	style: {
		layout: "vertical"
	},
	subviews: [
		{
			class: "View",
			style: {
				top: 20,
				left: 20,
				right: 20,
				bottom: 20,
				height: Ti.UI.SIZE,
				layout: "vertical",
			},
			subviews: [
				{
					class: "Button",
					style: {
						top: 20,
						width: Ti.UI.FILL,
						height: 40,
						title: "Button title"
					}
				},
				{
					class: "Label",
					style: {
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