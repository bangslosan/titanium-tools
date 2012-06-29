var ToolsUI = require('Tools/Tools.UI');

ToolsUI.setPreset('Panel.Classic',
	{
		compound : 'COMPOUND_FULL',
		client : {
			layout : 'vertical'
		},
		background : {
			image : {
				normal : {
					topRight : 'Images/Panel/Classic/Normal.TopRight.png',
					topLeft : 'Images/Panel/Classic/Normal.TopLeft.png',
					bottomLeft : 'Images/Panel/Classic/Normal.BottomLeft.png',
					bottomRight : 'Images/Panel/Classic/Normal.BottomRight.png',
					top : 'Images/Panel/Classic/Normal.Top.png',
					bottom : 'Images/Panel/Classic/Normal.Bottom.png',
					left : 'Images/Panel/Classic/Normal.Left.png',
					right : 'Images/Panel/Classic/Normal.Right.png',
					center : 'Images/Panel/Classic/Normal.Center.png'
				}
			},
			caps : {
				top : 14,
				bottom : 14,
				left : 14,
				right : 14
			}
		}
	}
);

ToolsUI.setPreset('Button.Classic',
	{
		compound : 'COMPOUND_HOR',
		frame : {
			height : 64
		},
		background : {
			color : {
				normal : {
					left : '#ffffff',
					center : '#ffffff',
					right : '#ffffff'
				},
				select : {
					left : '#fafafa',
					center : '#fafafa',
					right : '#fafafa'
				},
				disable : {
					left : '#f0f0f0',
					center : '#f0f0f0',
					right : '#f0f0f0'
				}
			},
			image : {
				normal : {
					left : 'Images/Button/Classic/Normal.Left.png',
					center : 'Images/Button/Classic/Normal.Center.png',
					right : 'Images/Button/Classic/Normal.Right.png'
				},
				select : {
					left : 'Images/Button/Classic/Select.Left.png',
					center : 'Images/Button/Classic/Select.Center.png',
					right : 'Images/Button/Classic/Select.Right.png'
				}
			},
			caps : {
				left : 16,
				right : 16,
				center : 11
			}
		}
	}
);

ToolsUI.setPreset('ProgressBar',
	{
		frame : {
			height : 14
		},
		background : {
			image : {
				empty : {
					normal : {
						left : 'Images/ProgressBar/Empty.Left.png',
						center : 'Images/ProgressBar/Empty.Center.png',
						right : 'Images/ProgressBar/Empty.Right.png'
					}
				},
				full : {
					normal : {
						left : 'Images/ProgressBar/Full.Left.png',
						center : 'Images/ProgressBar/Full.Center.png',
						right : 'Images/ProgressBar/Full.Right.png'
					}
				}
			},
			caps : {
				left : 8,
				center : 18,
				right : 8
			}
		}
	}
);

var tabbar = ToolsUI.createTabbar(
	{
		frame : {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0
		},
		background : {
			color : '#ffaaff'
		}
	},
	[
		{
			frame : {
				top : 0,
				right : 0,
				bottom : 50,
				left : 0
			},
			background : {
				color : '#888888'
			},
			main : 'viewFirst.js'
		},
		{
			frame : {
				top : 0,
				right : 0,
				bottom : 50,
				left : 0
			},
			background : {
				color : '#444444'
			},
			main : 'viewFirst.js'
		}
	]
);
tabbar.open();
