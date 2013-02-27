module.exports = {
	class: "View",
	style: {
		layout: "vertical",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor: "#fafafa"
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
						title: "Open AlertDialog"
					},
					bind: {
						click: "onOpenAlertDialog"
					}
				},
				{
					class: "Button",
					style: {
						layout: "vertical",
						top: 20,
						width: Ti.UI.FILL,
						height: 40,
						title: "Open EmailDialog"
					},
					bind: {
						click: "onOpenEmailDialog"
					}
				},
				{
					class: "Button",
					style: {
						layout: "vertical",
						top: 20,
						width: Ti.UI.FILL,
						height: 40,
						title: "Open OptionDialog"
					},
					bind: {
						click: "onOpenOptionDialog"
					}
				}
			]
		}
	],
	items: [
		{
			class: "AlertDialog",
			id: "alertDialog",
			style: {
				title: "AlertDialog",
				message: "AlertDialog Text",
				ok: "Ok"
			}
		},
		{
			class: "EmailDialog",
			id: "emailDialog",
			style: {
				subject: "Hello from TiTools",
				messageBody: "<b>EmailDialog Message Body</b>"
			}
		},
		{
			class: "OptionDialog",
			id: "optionDialog",
			style: {
				title: "OptionDialog",
				options: ["Confirm", "Cancel"],
				selectedIndex: 2,
				destructive: 0,
				cancel: 2
			}
		}
	]
};