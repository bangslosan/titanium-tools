var ToolsUITiDateTime = require('Tools/Tools.UI.Ti.DateTime');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiDateTime.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}