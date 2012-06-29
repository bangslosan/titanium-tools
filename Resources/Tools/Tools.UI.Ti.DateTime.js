var ToolsUIPreset = require('Tools/Tools.UI.Preset');

//---------------------------------------------//

var DATETIME = 'datetime';
var DATE = 'date';
var TIME = 'time';

//---------------------------------------------//

var InstanceStyle = {
	type : DATETIME,
	frame : {
		top : undefined,
		bottom : undefined,
		left : undefined,
		right : undefined,
		width : undefined,
		height : undefined
	},
	datetime : {
		current : undefined,
		min : undefined,
		max : undefined
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
		value : style.datetime.current,
		minDate : style.datetime.min,
		maxDate : style.datetime.max
	};
	switch(style.type)
	{
		case DATETIME:
			result.type = Ti.UI.PICKER_TYPE_DATE_AND_TIME;
		break;
		case DATE:
			result.type = Ti.UI.PICKER_TYPE_DATE;
		break;
		case TIME:
			result.type = Ti.UI.PICKER_TYPE_TIME;
		break;
	}
	return result;
}

//---------------------------------------------//

function Instance(params)
{
	this.style = ToolsUIPreset.merge(params, InstanceStyle);
	this.handle = Ti.UI.createPicker(convertStyle(this.style));
	this.style.parent.add(this.handle);
}

Instance.prototype.toString = function()
{
	return '[object ToolsDateTime]';
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

Instance.prototype.value = function()
{
	return this.style.datetime.current;
};

Instance.prototype.setValue = function(value)
{
	if(this.style.datetime.current != value)
	{
		this.style.datetime.current = value;
		this.handle.value = value;
	}
};

Instance.prototype.valueMin = function()
{
	return this.style.datetime.min;
};

Instance.prototype.setValueMin = function(valueMin)
{
	if(this.style.datetime.min != valueMin)
	{
		this.style.datetime.min = valueMin;
		this.handle.minDate = valueMin;
	}
};

Instance.prototype.valueMax = function()
{
	return this.style.datetime.max;
};

Instance.prototype.setValueMax = function(valueMax)
{
	if(this.style.datetime.max != valueMax)
	{
		this.style.datetime.max = valueMax;
		this.handle.maxDate = valueMax;
	}
};

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Instance(params);
	}
}