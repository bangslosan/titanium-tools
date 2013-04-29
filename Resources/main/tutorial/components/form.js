module.exports = {
	class: "TableView",
	preset: "Window",
	style: {
		layout: "vertical"
	},
	bind: {
		click: "onSelectCategory"
	},
	rows: [
		{
			class: "TableViewRow",
			style: {
				height: 48,
				title: "Standarts",
				category: "standarts"
			}
		},
		{
			class: "TableViewRow",
			style: {
				height: 48,
				title: "Dialogs",
				category: "dialogs"
			}
		},
		{
			class: "TableViewRow",
			style: {
				height: 48,
				title: "Tables",
				category: "tables"
			}
		},
		{
			class: "TableViewRow",
			style: {
				height: 48,
				title: "Lists",
				category: "lists"
			}
		},
		{
			class: "TableViewRow",
			style: {
				height: 48,
				title: "XML",
				category: "xml"
			}
		}
	]
};