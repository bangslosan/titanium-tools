var ToolsUITiTabbar = require('Tools/Tools.UI.Ti.Tabbar');

//---------------------------------------------//

function create(params, tabs)
{
	var self = ToolsUITiTabbar.create(params, tabs);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}