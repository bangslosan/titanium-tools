var ToolsUIPreset = require('Tools/Tools.UI.Preset');

//---------------------------------------------//

var InstanceStyle = {
	frame : {
		top : undefined,
		bottom : undefined,
		left : undefined,
		right : undefined,
		width : undefined,
		height : undefined
	},
	state : {
		disabled : false
	}
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
		backgroundColor : 'transparent'
	};
	return result;
}

//---------------------------------------------//

function Instance(params)
{
	this.style = ToolsUIPreset.merge(params, InstanceStyle);
	this.handle = Ti.UI.createTableViewRow(convertStyle(this.style));
	this.style.parent.appendRow(this.handle);
}

Instance.prototype.toString = function()
{
	return '[object ToolsTableRow]';
}

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

Instance.prototype.state = function()
{
	if(this.style.state.disabled == true)
	{
		return 'disable';
	}
	return 'normal';
}

Instance.prototype.isDisabled = function()
{
	return this.state.disabled;
};

Instance.prototype.setDisabled = function(state)
{
	if(this.style.state.disabled != state)
	{
		this.style.state.disabled = state;
		this.refresh();
	}
};

Instance.prototype.refresh = function()
{
};

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Instance(params);
	}
}