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
			if(ToolsString.isPrefix(params[i], '%ResourcesPath%') == true)
			{
				var path = ToolsString.replaceAll(params[i], '%ResourcesPath%', '');
				var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, path);
				params[i] = (file.exists() == true) ? file.nativePath : path;
			}
		}
	}
	return params;
}

//---------------------------------------------//

function loadFromFilename(name, filename)
{
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
	if(file == undefined)
	{
		// ERROR
		return;
	}
	var blob = file.read();
	if(blob == undefined)
	{
		// ERROR
		return;
	}
	var text = blob.text;
	if(text == undefined)
	{
		// ERROR
		return;
	}
	if(ToolsString.isSuffix(filename, '.json') == true)
	{
		loadFromJSON(name, ToolsJSON.deserialize(text));
	}
	else if(ToolsString.isSuffix(filename, '.xml') == true)
	{
		loadFromXML(name, ToolsXML.deserialize(text));
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
	loadFromFilename : loadFromFilename,
	loadFromJSON : loadFromJSON,
	loadFromXML : loadFromXML
};
