var ToolsUI = require('Tools/Tools.UI');

//---------------------------------------------//

ToolsUI.loadPresetFromFilename('Panel.Classic', 'Presets/Panel.Classic.json');
ToolsUI.loadPresetFromFilename('Button.Classic', 'Presets/Button.Classic.json');
ToolsUI.loadPresetFromFilename('ProgressBar.Classic', 'Presets/ProgressBar.Classic.json');

//---------------------------------------------//

var main = ToolsUI.createWindow(
	{
		frame : {
			top : 0,
			right : 0,
			bottom : 0,
			left : 0
		},
		background : {
			color : '#888888'
		},
		main : 'viewFirst.js',
		root : true
	}
);
main.open();
