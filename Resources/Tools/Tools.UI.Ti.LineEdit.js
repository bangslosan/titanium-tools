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
	text : {
		normal : undefined,
		select : undefined,
		disable : undefined
	},
	state : {
		disabled : false,
		selected : false
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
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor : 'transparent'
	};
	var state = 'normal';
	if(style.state.disabled == true)
	{
		state = 'disable';
	}
	if(style.text[state] != undefined)
	{
		result.value = style.text[state];
	}
	return result;
}

//---------------------------------------------//

function Instance(params)
{
	this.style = ToolsUIPreset.merge(params, InstanceStyle);
	this.handle = Ti.UI.createTextField(convertStyle(this.style));
	this.style.parent.add(this.handle);
}

Instance.prototype.toString = function()
{
	return '[object ToolsLineEdit]';
}

Instance.prototype.removeFromParent = function()
{
    this.parent.remove(this.handle);
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
	else if(this.style.state.selected == true)
	{
		return 'select';
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

Instance.prototype.isSelected = function()
{
	return this.style.state.selected;
};

Instance.prototype.setSelected = function(state)
{
	if(this.style.state.selected != state)
	{
		this.style.state.selected = state;
		this.refresh();
	}
};

Instance.prototype.text = function(state)
{
	return this.style.state.text[state];
};

Instance.prototype.setText = function(state, text)
{
	if(this.style.state.text[state] != text)
	{
		this.style.state.text[state] = text;
		this.refresh();
	}
};

Instance.prototype.refresh = function()
{
	var state = this.state();
	if(this.style.text[state] != undefined)
	{
		this.handle.value = this.style.text[state];
	}
}

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Instance(params);
	}
}