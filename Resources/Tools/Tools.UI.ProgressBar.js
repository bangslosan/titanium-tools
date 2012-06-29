var ToolsUITiProgressBar = require('Tools/Tools.UI.Ti.ProgressBar');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiProgressBar.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}