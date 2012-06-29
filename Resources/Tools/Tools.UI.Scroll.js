var ToolsUITiScroll = require('Tools/Tools.UI.Ti.Scroll');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiScroll.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}