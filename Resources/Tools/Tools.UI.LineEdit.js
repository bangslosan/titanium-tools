var ToolsUITiLineEdit = require('Tools/Tools.UI.Ti.LineEdit');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiLineEdit.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}