module.exports = {
	class: "ListView",
	preset: "Window",
	style: {
	},
	sections: [
		{
			class: "ListSection",
			style: {
				headerTitle: "Section 1"
			},
			rows: [
				{
					class: "ListRow",
					style: {
						height: 48,
						title: "Row 1"
					}
				},
				{
					class: "ListRow",
					style: {
						height: 48,
						title: "Row 2"
					}
				},
				{
					class: "ListRow",
					style: {
						height: 48,
						title: "Row 3"
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
					class: "ListRow",
					style: {
						height: 48,
						title: "Row 1"
					}
				},
				{
					class: "ListRow",
					style: {
						height: 48,
						title: "Row 2"
					}
				}
			]
		}
	]
};