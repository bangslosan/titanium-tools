var ToolsUITiView = require('Tools/Tools.UI.Ti.View');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiView.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}