var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	String : require("TiTools/TiTools.String"),
	Filesystem : require("TiTools/TiTools.Filesystem"),
	Locate : require("TiTools/TiTools.Locate"),
	Platform : require("TiTools/TiTools.Platform"),
	Locate : require("TiTools/TiTools.Locate"),
	JSON : require("TiTools/TiTools.JSON"),
	XML : require("TiTools/TiTools.XML")
};

//---------------------------------------------//

if(Ti.App.TiToolsPrefabs == undefined)
{
	Ti.App.TiToolsPrefabs = [];
}

//---------------------------------------------//

function set(name, prefab)
{
	var list = Ti.App.TiToolsPrefabs;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			throw String(TiTools.Locate.getString('TITOOLS_THROW_OVERRIDE_PREFABS') + '\n' + name);
		}
	}
	list.push(
		{
			name : name,
			prefab : prefab
		}
	);
	Ti.App.TiToolsPrefabs = list;
}

function get(name)
{
	var list = Ti.App.TiToolsPrefabs;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			return list[i].prefab;
		}
	}
	return undefined;
}

function remove(name)
{
	var list = Ti.App.TiToolsPrefabs;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list.splice(i, 1);
			break;
		}
	}
	Ti.App.TiToolsPrefabs = list;
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
			throw String(TiTools.Locate.getString('TITOOLS_THROW_UNKNOWN_PLATFORM'));
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
	if(TiTools.String.isSuffix(filename, '.js') == true)
	{
		var module = TiTools.Filesystem.loadModule(filename);
		if(TiTools.Object.isArray(module) == true)
		{
			for(var j = 0; j < module.length; j++)
			{
				loadFromJSON(module[j]);
			}
		}
		else if(TiTools.Object.isObject(module) == true)
		{
			loadFromJSON(module);
		}
	}
	else if(TiTools.String.isSuffix(filename, '.json') == true)
	{
		var file = TiTools.Filesystem.getFile(filename);
		if(file.exists() == true)
		{
			var blob = file.read();
			var content = TiTools.JSON.deserialize(blob.text);
			if(TiTools.Object.isArray(content) == true)
			{
				for(var j = 0; j < content.length; j++)
				{
					loadFromJSON(content[j]);
				}
			}
			else if(TiTools.Object.isObject(content) == true)
			{
				loadFromJSON(content);
			}
		}
		else
		{
			throw String(TiTools.Locate.getString('TITOOLS_THROW_NOT_FOUND') + '\n' + filename);
		}
	}
	else if(TiTools.String.isSuffix(filename, '.xml') == true)
	{
		var file = TiTools.Filesystem.getFile(filename);
		if(file.exists() == true)
		{
			var content = TiTools.XML.deserialize(blob.text);
			if(TiTools.Object.isArray(content) == true)
			{
				for(var j = 0; j < content.length; j++)
				{
					loadFromXML(content[j]);
				}
			}
			else if(TiTools.Object.isObject(content) == true)
			{
				loadFromXML(content);
			}
		}
		else
		{
			throw String(TiTools.Locate.getString('TITOOLS_THROW_NOT_FOUND') + '\n' + filename);
		}
	}
	else
	{
		throw String(TiTools.Locate.getString('TITOOLS_THROW_UNKNOWN_EXTENSION') + '\n' + filename);
	}
}

function loadFromJSON(content)
{
	if((TiTools.Object.isString(content.name) == false) || (TiTools.Object.isObject(content.prefab) == false))
	{
		throw String(TiTools.Locate.getString('TITOOLS_THROW_UNSUPPORTED_PREFAB_FORMAT'));
	}
	set(content.name, content.prefab);
}

function loadFromXML(content)
{
}

//---------------------------------------------//

module.exports = {
	set : set,
	get : get,
	remove : remove,
	load : load
};
