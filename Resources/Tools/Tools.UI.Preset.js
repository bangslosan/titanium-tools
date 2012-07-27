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
		for(var i = 0; i < list.length; i++)
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
}

//---------------------------------------------//

function merge(params, defaults)
{
	if(Tools.Object.isArray(params.preset) == true)
	{
		for(var i = 0; i < params.preset.length; i++)
		{
			if(Tools.Object.isString(params.preset[i]) == true)
			{
				var preset = get(params.preset[i]);
				if(preset != undefined)
				{
					params = Tools.Object.combine(preset, params);
				}
			}
		}
	}
	else if(Tools.Object.isString(params.preset) == true)
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
	if(params.margin != undefined)
	{
		if(Tools.Object.isString(params.margin) == true)
		{
			var margins = params.margin.split(' ');
			if(margins.length > 0)
			{
				switch(margins.length)
				{
					case 2:
						params.top = Number(margins[0]);
						params.right = Number(margins[1]);
						params.bottom = Number(margins[0]);
						params.left = Number(margins[1]);
					break;
					case 3:
						params.top = Number(margins[0]);
						params.right = Number(margins[1]);
						params.bottom = Number(margins[2]);
						params.left = Number(margins[1]);
					break;
					case 4:
						params.top = Number(margins[0]);
						params.right = Number(margins[1]);
						params.bottom = Number(margins[2]);
						params.left = Number(margins[3]);
					break;
					default:
						params.top = Number(margins[0]);
						params.right = Number(margins[0]);
						params.bottom = Number(margins[0]);
						params.left = Number(margins[0]);
					break;
				}
			}
		}
		else if(Tools.Object.isNumber(params.margin) == true)
		{
			params.top = params.margin;
			params.right = params.margin;
			params.bottom = params.margin;
			params.left = params.margin;
		}
		delete params.margin;
	}
	return params;
}

function preprocessArgument(arg)
{
	arg = arg.replace(/LANG\(([A-Za-z0-9_\.]*)\)/g,
		function(str, p1, p2, offset, s)
		{
			var temp = Ti.Locale.getString(p1);
			if(temp != undefined)
			{
				return temp;
			}
			return p1;
		}
	);
	arg = arg.replace(/EVAL\(([A-Za-z0-9_\.]*)\)/g,
		function(str, p1, p2, offset, s)
		{
			var temp = eval(p1);
			if(temp != undefined)
			{
				return temp;
			}
			return p1;
		}
	);
	return Tools.Filesystem.preprocessPath(arg);
}

//---------------------------------------------//

function load(params)
{
	if(Tools.Object.isObject(params) == true)
	{
		var current = Tools.Platform.appropriate(params);
		if(current == undefined)
		{
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
		}
		load(current);
	}
	else if(Tools.Object.isArray(params) == true)
	{
		for(var i = 0; i < params.length; i++)
		{
			load(params[i]);
		}
	}
	else if(Tools.Object.isString(params) == true)
	{
		loadFromFilename(params);
	}
}

function loadFromFilename(filename)
{
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
				for(var j = 0; j < content.length; j++)
				{
					loadFromJSON(content[j]);
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
				for(var j = 0; j < content.length; j++)
				{
					loadFromXML(content[j]);
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
	load : load
};
