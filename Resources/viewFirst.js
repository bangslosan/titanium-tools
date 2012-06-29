var ToolsUI = require("Tools/Tools.UI");

var win = ToolsUI.currentWindowHandle();

var panel = ToolsUI.createView(
	{
		parent : win,
		preset : 'Panel.Classic',
		frame : {
			top : 2,
			bottom : 2,
			left : 2,
			right : 2
		}
	}
);


var lineEdit = ToolsUI.createLineEdit(
	{
		parent : panel,
		frame : {
			top : 8,
			left : 8,
			right : 8,
			height : 30
		}
	}
);

var textEdit = ToolsUI.createTextEdit(
	{
		parent : panel,
		frame : {
			top : 4,
			left : 8,
			right : 8,
			height : 90
		}
	}
);

var button = ToolsUI.createButton(
	{
		parent : panel,
		preset : 'Button.Classic',
		frame : {
			top : 4,
			left : 8,
			right : 8
		}
	}
);

var progressBar = ToolsUI.createProgressBar(
	{
		parent : panel,
		preset : 'ProgressBar',
		frame : {
			top : 4,
			left : 8,
			right : 8
		}
	}
);