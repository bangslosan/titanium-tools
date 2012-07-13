var ToolsUIPreset = require('Tools/Tools.UI.Preset');

//---------------------------------------------//

var InstanceStyle = {
	frame : {
		top : undefined,
		right : undefined,
		bottom : undefined,
		left : undefined,
		width : undefined,
		height : undefined
	},
	background : {
		stretched : false,
		color : 'transparent',
		image : undefined
	},
	main : undefined,
	root : false
};

//---------------------------------------------//

function convertStyle(style)
{
	var result = {
		top : style.frame.top,
		bottom : style.frame.bottom,
		left : style.frame.left,
		right : style.frame.right,
		width : style.frame.width,
		height : style.frame.height,
		backgroundRepeat : (style.background.stretched == false),
		backgroundColor : style.background.color,
		backgroundImage : style.background.image,
		exitOnClose : style.root
	};
	if(style.main != undefined)
	{
		result.url = style.main;
	}
	return result;
}

//---------------------------------------------//

function Instance(params)
{
	this.style = ToolsUIPreset.merge(params, InstanceStyle);
	this.handle = Ti.UI.createWindow(convertStyle(this.style));
	this.handle.tools = this;
}

Instance.prototype.toString = function()
{
	return '[object ToolsWindow]';
}

Instance.prototype.open = function()
{
    this.handle.open();
};

Instance.prototype.close = function()
{
    this.handle.close();
};

Instance.prototype.add = function(view)
{
    this.handle.add(view);
};

Instance.prototype.remove = function(view)
{
    this.handle.remove(view);
};

Instance.prototype.removeAll = function()
{
	if(this.client.children != undefined)
	{
        var children = this.client.children.slice(0);
		for(var i = 0; i < children.length; i++)
		{
			this.client.remove(children[i]);
		}
    }
};

Instance.prototype.addEventListener = function(name, callback)
{
    this.handle.addEventListener(name, callback);
};

Instance.prototype.removeEventListener = function(name, callback)
{
    this.handle.removeEventListener(name, callback);
};

Instance.prototype.fireEvent = function(name, params)
{
    this.handle.fireEvent(name, params);
};

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Instance(params);
	}
}
