var ToolsUITiImageView = require('Tools/Tools.UI.Ti.ImageView');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiImageView.create(params);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}