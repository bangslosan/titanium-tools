var ToolsUITiTable = require('Tools/Tools.UI.Ti.Table');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiTable.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}