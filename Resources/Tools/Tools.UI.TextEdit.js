var ToolsUITiTextEdit = require('Tools/Tools.UI.Ti.TextEdit');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiTextEdit.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}