module.exports = {
	style : {
		className : "Ti.UI.View",
		layout : "vertical",
		margin : 20
	},
	subviews : [
		{
			outlet : "client",
			style : {
				className : "Ti.UI.View",
				layout : "vertical",
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE
			},
			subviews : [
				{
					outlet : "button1",
					style : {
						className : "Ti.UI.Button",
						width : Ti.UI.FILL,
						height : 100,
						title : "Кнопка тянется по горизонтали. 3 элемента"
					}
				},
				{
					outlet : "button2",
					style : {
						className : "Ti.UI.Button",
						width : Ti.UI.FILL,
						height : 100,
						title : "Кнопка тянется во все стороны. 9 элемента"
					}
				}
			]
			
		}
	]
};