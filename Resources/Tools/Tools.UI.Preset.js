var Tools = {
	Object : require("Tools/Tools.Object"),
	String : require("Tools/Tools.String"),
	Filesystem : require("Tools/Tools.Filesystem"),
	Platform : require("Tools/Tools.Platform"),
	JSON : require("Tools/Tools.JSON"),
	XML : require("Tools/Tools.XML")
};

//---------------------------------------------//

function set(name, style)
{
	var list = Ti.App.ToolsUIPreset;
	if(list != undefined)
	{
		var founded = false;
		var count = list.length;
		for(var i = 0; i < count; i++)
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
					style : style
				}
			);
			Ti.App.ToolsUIPreset = list;
		}
	}
	else
	{
		Ti.App.ToolsUIPreset = [
			{
				name : name,
				style : style
			}
		];
	}
}

function get(name)
{
	var list = Ti.App.ToolsUIPreset;
	if(list != undefined)
	{
		var count = list.length;
		for(var i = 0; i < count; i++)
		{
			if(list[i].name == name)
			{
				return list[i].style;
			}
		}
	}
	return undefined;
}

function remove(name)
{
	var list = Ti.App.ToolsUIPreset;
	if(list != undefined)
	{
		var count = list.length;
		for(var i = 0; i < count; i++)
		{
			if(list[i].name == name)
			{
				list.splice(i, 1);
				break;
			}
		}
		Ti.App.ToolsUIPreset = list;
	}
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

function loadFromFilename(params)
{
	if(Tools.Object.isArray(params) == false)
	{
		params = [
			params
		];
	}
	var count = params.length;
	for(var i = 0; i < count; i++)
	{
		var item = params[i];
		if(Tools.Object.isObject(item) == true)
		{
			item = Tools.Platform.appropriate(item);
			if(item == undefined)
			{
				throw new Error(L('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
			}
		}
		var file = Tools.Filesystem.getFile(item);
		if(file.exists() == true)
		{
			var blob = file.read();
			if(Tools.String.isSuffix(item, '.json') == true)
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
			else if(Tools.String.isSuffix(item, '.xml') == true)
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
				throw new Error(L('TI_TOOLS_THROW_UNKNOWN_EXTENSION') + '\n' + params);
			}
		}
		else
		{
			throw new Error(L('TI_TOOLS_THROW_NOT_FOUND') + '\n' + params);
		}
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
