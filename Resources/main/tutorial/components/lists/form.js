module.exports = {
	class: "ListView",
	preset: "Window",
	style: {
		defaultItemTemplate: "template",
		templates: {
			template: {
				childTemplates: [
					{
						type: "Ti.UI.Label",
						bindId: "row_title",
						properties: {
							top: 0,
							left: "60dp",
							color: "black"
						}
					},
					{
						type: "Ti.UI.Label",
						bindId: "row_subtitle",
						properties: {
							left: "60dp",
							top: "25dp",
							color: "gray"
						}
					}
				]
			}
		}
	},
	sections: [
		{
			class: "ListSection",
			style: {
				headerTitle: "Section 1"
			},
			rows: [
				{
					row_title: {
						text: "Title 1"
					},
					row_subtitle: {
						text: "SubTitle 1"
					}
				},
				{
					row_title: {
						text: "Title 2"
					},
					row_subtitle: {
						text: "SubTitle 2"
					}
				},
				{
					row_title: {
						text: "Title 3"
					},
					row_subtitle: {
						text: "SubTitle 3"
					}
				}
			]
		},
		{
			class: "ListSection",
			style: {
				headerTitle: "Section 2"
			},
			rows: [
				{
					row_title: {
						text: "Title 1"
					},
					row_subtitle: {
						text: "SubTitle 1"
					}
				},
				{
					row_title: {
						text: "Title 2"
					},
					row_subtitle: {
						text: "SubTitle 2"
					}
				}
			]
		}
	]
};