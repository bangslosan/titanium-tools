var ToolsFilesystem = require('Tools/Tools.Filesystem');
var ToolsObject = require('Tools/Tools.Object');
var ToolsString = require('Tools/Tools.String');
var ToolsJSON = require("Tools/Tools.JSON");
var ToolsXML = require("Tools/Tools.XML");
			
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

//---------------------------------------------//

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
	if(defaults != undefined)
	{
		params = ToolsObject.combine(defaults, params);
	}
	return preprocess(params);
}

function preprocess(params)
{
	for(var i in params)
	{
		if(ToolsObject.isObject(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(ToolsObject.isArray(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(ToolsObject.isString(params[i]) == true)
		{
			params[i] = ToolsFilesystem.preprocessPath(params[i]);
		}
	}
	return params;
}

//---------------------------------------------//

function loadFromFilename(name, filename)
{
	var file = ToolsFilesystem.getFile(filename);
	if(file.exists() == true)
	{
		var blob = file.read();
		if(ToolsString.isSuffix(filename, '.json') == true)
		{
			loadFromJSON(name, ToolsJSON.deserialize(blob.text));
		}
		else if(ToolsString.isSuffix(filename, '.xml') == true)
		{
			loadFromXML(name, ToolsXML.deserialize(blob.text));
		}
		else
		{
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_EXTENSION') + '\n' + filename);
		}
	}
	else
	{
		throw new Error(L('TI_TOOLS_THROW_NOT_FOUND') + '\n' + filename);
	}
}

function loadFromJSON(name, content)
{
	set(name, content);
}

function loadFromXML(name, content)
{
}

//---------------------------------------------//

module.exports = {
	set : set,
	get : get,
	remove : remove,
	merge : merge,
	loadFromFilename : loadFromFilename
};
