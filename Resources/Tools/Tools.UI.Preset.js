var ToolsObject = require('Tools/Tools.Object');
var ToolsPlatform = require('Tools/Tools.Platform');

//---------------------------------------------//

if(Ti.App.ToolsUIPresets == undefined)
{
	Ti.App.ToolsUIPresets = [];
}

//---------------------------------------------//

function set(name, params)
{
	var founded = false;
	var list = Ti.App.ToolsUIPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list[i].params = params;
			founded = true;
			break;
		}
	}
	if(founded == false)
	{
		list.push(
			{
				name : name,
				params : params
			}
		);
	}
	Ti.App.ToolsUIPresets = list;
}

function get(name)
{
	var list = Ti.App.ToolsUIPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			return list[i].params;
		}
	}
	return undefined;
}

function remove(name)
{
	var list = Ti.App.ToolsUIPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list.splice(i, 1);
			break;
		}
	}
	Ti.App.ToolsUIPresets = list;
}

function select(params)
{
	if(params != undefined)
	{
		if(params.platform != undefined)
		{
			if(ToolsPlatform.isAndroid == true)
			{
				if(params.platform.android != undefined)
				{
					return params.platform.android;
				}
			}
			else if(ToolsPlatform.iPhone == true)
			{
				if(params.platform.iphone != undefined)
				{
					return params.platform.ipad;
				}
				else if(params.platform.ios != undefined)
				{
					return params.platform.ios;
				}
			}
			else if(ToolsPlatform.iPad == true)
			{
				if(params.platform.ipad != undefined)
				{
					return params.platform.ipad;
				}
				else if(params.platform.ios != undefined)
				{
					return params.platform.ios;
				}
			}
			return params.platform.any;
		}
		return params;
	}
	return {};
}

function merge(params, defaults)
{
	if(params.preset != undefined)
	{
		var preset = get(params.preset);
		if(preset != undefined)
		{
			params = ToolsObject.combine(preset, params);
		}
	}
	params = select(params);
	if(defaults != undefined)
	{
		return ToolsObject.combine(select(defaults), params);
	}
	return params;
}

//---------------------------------------------//

module.exports = {
	set : set,
	get : get,
	remove : remove,
	select : select,
	merge : merge
};
