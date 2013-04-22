module.exports = {
	class: "View",
	preset: "Window",
	style: {
		layout: "vertical"
	},
	subviews: [
		{
			class: "Button",
			style: {
				width: 300,
				height: 48,
				title: "Start tutorial"
			},
			bind: {
				click: "onStartTutorial"
			}
		}
	]
};