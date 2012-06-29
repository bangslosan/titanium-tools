var ToolsUITiScrollable = require('Tools/Tools.UI.Ti.Scrollable');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiScrollable.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}