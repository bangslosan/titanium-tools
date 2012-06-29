var ToolsUITiView = require('Tools/Tools.UI.Ti.View');

//---------------------------------------------//

function create(params)
{
	var self = ToolsUITiView.create(params);
	self.addEventListener('touchstart',
		function(event)
		{
			if(self.isTouched() == false)
			{
				self.setTouched(true)
			}
		}
	);
	self.addEventListener('touchcancel',
		function(event)
		{
			if(self.isTouched() == true)
			{
				self.setTouched(false)
			}
		}
	);
	self.addEventListener('touchend',
		function(event)
		{
			if(self.isTouched() == true)
			{
				self.setTouched(false)
			}
		}
	);
	return self;
}

//---------------------------------------------//

module.exports = {
	create : create
}