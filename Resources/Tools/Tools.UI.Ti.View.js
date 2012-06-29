var ToolsUIPreset = require('Tools/Tools.UI.Preset');

//---------------------------------------------//

var COMPOUND_NONE = 'COMPOUND_NONE';
var COMPOUND_HOR = 'COMPOUND_HOR';
var COMPOUND_VER = 'COMPOUND_VER';
var COMPOUND_FULL = 'COMPOUND_FULL';

//---------------------------------------------//

var InstanceStyle = {
	compound : COMPOUND_NONE,
	frame : {
		top : undefined,
		bottom : undefined,
		left : undefined,
		right : undefined,
		width : undefined,
		height : undefined
	},
	client : {
		top : 0,
		bottom : 0,
		left : 0,
		right : 0,
		width : undefined,
		height : undefined,
		layout : undefined
	},
	background : {
		stretched : false,
		color : {
			normal : '#ffffff',
			select : '#fafafa',
			disable : '#f0f0f0'
		},
		image : {
			normal : undefined,
			select : undefined,
			disable : undefined
		},
		caps : {
			top : 4,
			bottom : 4,
			left : 4,
			right : 4,
			center : 4
		}
	},
	state : {
		disabled : false,
		selected : false,
		touched : false
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
		backgroundColor : 'transparent',
		backgroundRepeat : (style.frame.stretched === false)
	};
	switch(style.compound)
	{
		case COMPOUND_NONE:
			var state = 'normal';
			if(style.state.disabled == true)
			{
				state = 'disable';
			}
			else if((style.state.selected == true) || (style.state.touched == true))
			{
				state = 'select';
			}
			result.backgroundColor = style.background.color[state];
			result.backgroundImage = style.background.image[state];
		break;
		case COMPOUND_HOR:
			var border = style.background.caps.left + style.background.caps.right;
			if(result.width != undefined)
			{
				var size = result.width - border;
				result.width = (Math.round(size / style.background.caps.center) * style.background.caps.center) + border; 
			}
			else if(result.right == undefined)
			{
				result.width = style.background.caps.center + border;
			}
		break;
		case COMPOUND_VER:
			var border = style.background.caps.top + style.background.caps.bottom;
			if(result.height != undefined)
			{
				var size = result.width - (style.background.caps.top + style.background.caps.bottom);
				result.height = (Math.round(size / style.background.caps.center) * style.background.caps.center) + border; 
			}
			else if(result.bottom == undefined)
			{
				result.height = style.background.caps.center + border;
			}
		break;
	}
	return result;
}

//---------------------------------------------//

// 89109616244 - Алик

//---------------------------------------------//

function Instance(params)
{
	this.style = ToolsUIPreset.merge(params, InstanceStyle);
	this.handle = Ti.UI.createView(convertStyle(this.style));
	this.style.parent.add(this.handle);
	this.client = Ti.UI.createView(
		{
			top : this.style.client.top,
			bottom : this.style.client.bottom,
			left : this.style.client.left,
			right : this.style.client.right,
			width : this.style.client.width,
			height : this.style.client.height,
			layout : this.style.client.layout,
			backgroundColor : 'transparent',
			zIndex : 1
		}
	);
	this.handle.add(this.client);
	this.compound = {};
	
	switch(this.style.compound)
	{
		case COMPOUND_HOR:
			this.compound.left = Ti.UI.createView(
				{
					top : 0,
					bottom : 0,
					left : 0,
					width : this.style.background.caps.left,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.left);
			this.compound.center = Ti.UI.createView(
				{
					top : 0,
					bottom : 0,
					left : this.style.background.caps.left,
					right : this.style.background.caps.right,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.center);
			this.compound.right = Ti.UI.createView(
				{
					top : 0,
					bottom : 0,
					right : 0,
					width : this.style.background.caps.left,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.right);
			this.refresh();
		break;
		case COMPOUND_VER:
			this.compound.top = Ti.UI.createView(
				{
					top : 0,
					left : 0,
					right : 0,
					height : this.style.background.caps.top,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.top);
			this.compound.center = Ti.UI.createView(
				{
					top : this.style.background.caps.top,
					bottom : this.style.background.caps.bottom,
					left : 0,
					right : 0,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.center);
			this.compound.bottom = Ti.UI.createView(
				{
					bottom : 0,
					left : 0,
					right : 0,
					height : this.style.background.caps.bottom,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.bottom);
			this.refresh();
		break;
		case COMPOUND_FULL:
			this.compound.topRight = Ti.UI.createView(
				{
					top : 0,
					right : 0,
					width : this.style.background.caps.right,
					height : this.style.background.caps.top,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.topRight);
			this.compound.bottomRight = Ti.UI.createView(
				{
					bottom : 0,
					right : 0,
					width : this.style.background.caps.right,
					height : this.style.background.caps.bottom,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.bottomRight);
			this.compound.bottomLeft = Ti.UI.createView(
				{
					bottom : 0,
					left : 0,
					width : this.style.background.caps.left,
					height : this.style.background.caps.bottom,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.bottomLeft);
			this.compound.topLeft = Ti.UI.createView(
				{
					top : 0,
					left : 0,
					width : this.style.background.caps.left,
					height : this.style.background.caps.top,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.topLeft);
			this.compound.top = Ti.UI.createView(
				{
					top : 0,
					left : this.style.background.caps.left,
					right : this.style.background.caps.right,
					height : this.style.background.caps.top,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.top);
			this.compound.right = Ti.UI.createView(
				{
					top : this.style.background.caps.top,
					bottom : this.style.background.caps.bottom,
					right : 0,
					width : this.style.background.caps.right,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.right);
			this.compound.bottom = Ti.UI.createView(
				{
					bottom : 0,
					left : this.style.background.caps.left,
					right : this.style.background.caps.right,
					height : this.style.background.caps.bottom,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.bottom);
			this.compound.left = Ti.UI.createView(
				{
					top : this.style.background.caps.top,
					bottom : this.style.background.caps.bottom,
					left : 0,
					width : this.style.background.caps.left,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.left);
			this.compound.center = Ti.UI.createView(
				{
					top : this.style.background.caps.top,
					bottom : this.style.background.caps.bottom,
					left : this.style.background.caps.left,
					right : this.style.background.caps.right,
					backgroundRepeat : (this.style.background.stretched == false)
				}
			);
			this.handle.add(this.compound.center);
			this.refresh();
		break;
	}
}

Instance.prototype.toString = function()
{
	return '[object ToolsView]';
}

Instance.prototype.add = function(view)
{
    this.client.add(view);
};

Instance.prototype.remove = function(view)
{
    this.client.remove(view);
};

Instance.prototype.removeFromParent = function()
{
    this.parent.remove(this.handle);
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
	else if((this.style.state.selected == true) || (this.style.state.touched == true))
	{
		return 'select';
	}
	return 'normal';
}

Instance.prototype.isDisabled = function()
{
	return this.style.state.disabled;
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

Instance.prototype.isTouched = function()
{
	return this.style.state.touched;
};

Instance.prototype.setTouched = function(state)
{
	if(this.style.state.touched != state)
	{
		this.style.state.touched = state;
		this.refresh();
	}
};

Instance.prototype.refresh = function()
{
	var state = this.state();
	switch(this.style.compound)
	{
		case COMPOUND_NONE:
			this.handle.backgroundColor = this.style.background.color[state];
			this.handle.backgroundImage = this.style.background.image[state];
		break;
		case COMPOUND_HOR:
		case COMPOUND_VER:
		case COMPOUND_FULL:
			if(this.style.background.color[state] != undefined)
			{
				for(var i in this.compound)
				{
					this.compound[i].backgroundColor = this.style.background.color[state][i];
				}
			}
			if(this.style.background.image[state] != undefined)
			{
				for(var i in this.compound)
				{
					this.compound[i].backgroundImage = this.style.background.image[state][i];
				}
			}
		break;
	}
}

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Instance(params);
	}
}