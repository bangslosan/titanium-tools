var ToolsUITiWindow = require('Tools/Tools.UI.Ti.Window');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiWindow.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}