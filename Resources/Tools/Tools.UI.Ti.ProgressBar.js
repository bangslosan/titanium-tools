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
	background : {
		stretched : false,
		color : {
			empty : {
				normal : {
					left : '#ffffff',
					center : '#fafafa',
					right : '#f0f0f0'
				},
				select : {
					left : '#ffffff',
					center : '#fafafa',
					right : '#f0f0f0'
				},
				disable : {
					left : '#ffffff',
					center : '#fafafa',
					right : '#f0f0f0'
				}
			},
			full : {
				normal : {
					left : '#ffffff',
					center : '#fafafa',
					right : '#f0f0f0'
				},
				select : {
					left : '#ffffff',
					center : '#fafafa',
					right : '#f0f0f0'
				},
				disable : {
					left : '#ffffff',
					center : '#fafafa',
					right : '#f0f0f0'
				}
			}
		},
		image : {
			empty : {
				normal : {
					left : undefined,
					center : undefined,
					right : undefined
				},
				select : {
					left : undefined,
					center : undefined,
					right : undefined
				},
				disable : {
					left : undefined,
					center : undefined,
					right : undefined
				}
			},
			full : {
				normal : {
					left : undefined,
					center : undefined,
					right : undefined
				},
				select : {
					left : undefined,
					center : undefined,
					right : undefined
				},
				disable : {
					left : undefined,
					center : undefined,
					right : undefined
				}
			}
		},
		caps : {
			left : 4,
			center : 4,
			right : 4
		}
	},
	value : {
		current : 50,
		min : 0,
		max : 100
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
		backgroundColor : 'transparent',
		backgroundRepeat : (style.frame.stretched === false)
	};
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
	return result;
}

//---------------------------------------------//

function Instance(params)
{
	this.style = ToolsUIPreset.merge(params, InstanceStyle);
	this.handle = Ti.UI.createView(convertStyle(this.style));
	this.style.parent.add(this.handle);
	this.compound = {};
	
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
	this.compound.progress = Ti.UI.createView(
		{
			top : 0,
			bottom : 0,
			left : 0,
			width : '20%',
			backgroundRepeat : (this.style.background.stretched == false)
		}
	);
	this.compound.center.add(this.compound.progress);
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
}

Instance.prototype.toString = function()
{
	return '[object ToolsProgressBar]';
}

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
	return this.state.selected;
};

Instance.prototype.setSelected = function(state)
{
	if(this.style.state.selected != state)
	{
		this.style.state.selected = state;
		this.refresh();
	}
};

Instance.prototype.valueMin = function()
{
	return this.style.value.min;
};

Instance.prototype.setValueMin = function(valueMin)
{
	if(this.style.value.min != valueMax)
	{
		this.style.value.min = valueMax;
		this.refresh();
	}
};

Instance.prototype.valueMax = function()
{
	return this.style.value.max;
};

Instance.prototype.setValueMax = function(valueMax)
{
	if(this.style.value.max != valueMax)
	{
		this.style.value.max = valueMax;
		this.refresh();
	}
};

Instance.prototype.value = function()
{
	return this.style.value.current;
};

Instance.prototype.setValue = function(value)
{
	if(this.style.value.current != value)
	{
		this.style.value.current = value;
		this.refresh();
	}
};

Instance.prototype.refresh = function()
{
	var state = this.state();
	if(this.style.background.image.empty[state] != undefined)
	{
		this.compound.center.backgroundImage = this.style.background.image.empty[state].center;
	}
	if(this.style.background.image.full[state] != undefined)
	{
		this.compound.progress.backgroundImage = this.style.background.image.full[state].center;
	}
	var min = (this.style.value.current <= this.style.value.min) ? 'empty' : 'full';
	if(this.style.background.image[min] != undefined)
	{
		if(this.style.background.image[min][state] != undefined)
		{
			this.compound.left.backgroundImage = this.style.background.image[min][state].left;
		}
	}
	var max = (this.style.value.current >= this.style.value.max) ? 'full' : 'empty';
	if(this.style.background.image[max] != undefined)
	{
		if(this.style.background.image[max][state] != undefined)
		{
			this.compound.right.backgroundImage = this.style.background.image[max][state].right;
		}
	}
	this.compound.progress.width = String(((this.style.value.current - this.style.value.min) / (this.style.value.max - this.style.value.min)) * 100) + '%';
}

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Instance(params);
	}
}