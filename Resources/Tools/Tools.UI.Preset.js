var Tools = {
	Object : require("Tools/Tools.Object"),
	String : require("Tools/Tools.String"),
	Filesystem : require("Tools/Tools.Filesystem"),
	Platform : require("Tools/Tools.Platform"),
	JSON : require("Tools/Tools.JSON"),
	XML : require("Tools/Tools.XML")
}

//---------------------------------------------//

if(Ti.App.ToolsUIPreset == undefined)
{
	Ti.App.ToolsUIPreset = [];
}

//---------------------------------------------//

function set(name, params)
{
	var founded = false;
	var list = Ti.App.ToolsUIPreset;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			throw new Error(L('TI_TOOLS_THROW_OVERRIDE_PRESET') + '\n' + name);
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
	Ti.App.ToolsUIPreset = list;
}

function get(name)
{
	var list = Ti.App.ToolsUIPreset;
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
	var list = Ti.App.ToolsUIPreset;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list.splice(i, 1);
			break;
		}
	}
	Ti.App.ToolsUIPreset = list;
}

//---------------------------------------------//

function merge(params, defaults)
{
	if(params.preset != undefined)
	{
		var preset = get(params.preset);
		if(preset != undefined)
		{
			params = Tools.Object.combine(preset, params);
		}
	}
	if(defaults != undefined)
	{
		params = Tools.Object.combine(defaults, params);
	}
	return preprocess(params);
}

function preprocess(params)
{
	for(var i in params)
	{
		if(Tools.Object.isObject(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(Tools.Object.isArray(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(Tools.Object.isString(params[i]) == true)
		{
			params[i] = preprocessArgument(params[i]);
		}
	}
	return params;
}

function preprocessArgument(arg)
{
	arg = arg.replace(/LANG\(([A-Za-z0-9_\.]*)\)/g,
		function(str, p1, p2, offset, s)
		{
			var replaced = L(p1);
			if(replaced != undefined)
			{
				return replaced;
			}
			return p1;
		}
	);
	arg = arg.replace(/EVAL\(([A-Za-z0-9_\.]*)\)/g,
		function(str, p1, p2, offset, s)
		{
			var replaced = eval(p1);
			if(replaced != undefined)
			{
				return replaced;
			}
			return p1;
		}
	);
	return Tools.Filesystem.preprocessPath(arg);
}

//---------------------------------------------//

function loadFromFilename(filename)
{
	if(Tools.Object.isObject(filename) == true)
	{
		filename = Tools.Platform.appropriate(filename);
		if(filename == undefined)
		{
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
		}
	}
	var file = Tools.Filesystem.getFile(filename);
	if(file.exists() == true)
	{
		var blob = file.read();
		if(Tools.String.isSuffix(filename, '.json') == true)
		{
			var content = Tools.JSON.deserialize(blob.text);
			if(Tools.Object.isObject(content) == true)
			{
				loadFromJSON(content);
			}
			else if(Tools.Object.isArray(content) == true)
			{
				var count = content.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content[i]);
				}
			}
		}
		else if(Tools.String.isSuffix(filename, '.xml') == true)
		{
			var content = Tools.XML.deserialize(blob.text);
			if(Tools.Object.isObject(content) == true)
			{
				loadFromXML(content);
			}
			else if(Tools.Object.isArray(content) == true)
			{
				var count = content.length;
				for(var i = 0; i < count; i++)
				{
					loadFromXML(content[i]);
				}
			}
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

function loadFromJSON(content)
{
	set(content.name, content.style);
}

function loadFromXML(content)
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
