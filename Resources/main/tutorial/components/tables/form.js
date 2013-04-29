module.exports = {
	class: "TableView",
	preset: "Window",
	style: {
	},
	sections: [
		{
			class: "TableViewSection",
			style: {
				headerTitle: "Section 1"
			},
			rows: [
				{
					class: "TableViewRow",
					style: {
						height: 48,
						title: "Row 1"
					}
				},
				{
					class: "TableViewRow",
					style: {
						height: 48,
						title: "Row 2"
					}
				},
				{
					class: "TableViewRow",
					style: {
						height: 48,
						title: "Row 3"
					}
				}
			]
		},
		{
			class: "TableViewSection",
			style: {
				headerTitle: "Section 2"
			},
			rows: [
				{
					class: "TableViewRow",
					style: {
						height: 48,
						title: "Row 1"
					}
				},
				{
					class: "TableViewRow",
					style: {
						height: 48,
						title: "Row 2"
					}
				}
			]
		}
	]
};