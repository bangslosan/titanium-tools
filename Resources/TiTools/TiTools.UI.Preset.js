var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	String : require("TiTools/TiTools.String"),
	Locate : require("TiTools/TiTools.Locate"),
	Filesystem : require("TiTools/TiTools.Filesystem"),
	Platform : require("TiTools/TiTools.Platform"),
	JSON : require("TiTools/TiTools.JSON"),
	XML : require("TiTools/TiTools.XML")
};

//---------------------------------------------//

if(Ti.App.TiToolsPresets == undefined)
{
	Ti.App.TiToolsPresets = [];
}

//---------------------------------------------//

function set(name, style)
{
	var founded = false;
	var list = Ti.App.TiToolsPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_OVERRIDE_PRESET') + '\n' + name);
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
		Ti.App.TiToolsPresets = list;
	}
}

function get(name)
{
	var list = Ti.App.TiToolsPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			return list[i].style;
		}
	}
	return undefined;
}

function remove(name)
{
	var list = Ti.App.TiToolsPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list.splice(i, 1);
			break;
		}
	}
	Ti.App.TiToolsPresets = list;
}

//---------------------------------------------//

function merge(params, defaults)
{
	if(TiTools.Object.isArray(params.preset) == true)
	{
		for(var i = 0; i < params.preset.length; i++)
		{
			if(TiTools.Object.isString(params.preset[i]) == true)
			{
				var preset = get(params.preset[i]);
				if(preset != undefined)
				{
					params = TiTools.Object.combine(preset, params);
				}
			}
		}
	}
	else if(TiTools.Object.isString(params.preset) == true)
	{
		var preset = get(params.preset);
		if(preset != undefined)
		{
			params = TiTools.Object.combine(preset, params);
		}
	}
	if(defaults != undefined)
	{
		params = TiTools.Object.combine(defaults, params);
	}
	return preprocess(params);
}

function preprocess(params)
{
	for(var i in params)
	{
		if(TiTools.Object.isObject(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(TiTools.Object.isArray(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(TiTools.Object.isString(params[i]) == true)
		{
			params[i] = preprocessArgument(params[i]);
		}
	}
	if(params.margin != undefined)
	{
		if(TiTools.Object.isString(params.margin) == true)
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
		else if(TiTools.Object.isNumber(params.margin) == true)
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
			return TiTools.Locate.getString(p1, p1);
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
	return TiTools.Filesystem.preprocessPath(arg);
}

//---------------------------------------------//

function load(params)
{
	if(TiTools.Object.isArray(params) == true)
	{
		for(var i = 0; i < params.length; i++)
		{
			load(params[i]);
		}
	}
	else if(TiTools.Object.isObject(params) == true)
	{
		var current = TiTools.Platform.appropriate(params);
		if(current == undefined)
		{
			throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
		}
		load(current);
	}
	else if(TiTools.Object.isString(params) == true)
	{
		loadFromFilename(params);
	}
}

function loadFromFilename(filename)
{
	var file = TiTools.Filesystem.getFile(filename);
	if(file.exists() == true)
	{
		var blob = file.read();
		if(TiTools.String.isSuffix(filename, '.json') == true)
		{
			var content = TiTools.JSON.deserialize(blob.text);
			if(TiTools.Object.isObject(content) == true)
			{
				loadFromJSON(content);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var j = 0; j < content.length; j++)
				{
					loadFromJSON(content[j]);
				}
			}
		}
		else if(TiTools.String.isSuffix(filename, '.xml') == true)
		{
			var content = TiTools.XML.deserialize(blob.text);
			if(TiTools.Object.isObject(content) == true)
			{
				loadFromXMTiTools.Locate.getString(content);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var j = 0; j < content.length; j++)
				{
					loadFromXMTiTools.Locate.getString(content[j]);
				}
			}
		}
		else
		{
			throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_UNKNOWN_EXTENSION') + '\n' + filename);
		}
	}
	else
	{
		throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_NOT_FOUND') + '\n' + filename);
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
