var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	String : require("TiTools/TiTools.String"),
	Filesystem : require("TiTools/TiTools.Filesystem"),
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
			throw String(L('TITOOLS_THROW_OVERRIDE_PREFABS') + '\n' + name);
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
			throw String(L('TITOOLS_THROW_UNKNOWN_PLATFORM'));
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
				loadFromXML(content);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var j = 0; j < content.length; j++)
				{
					loadFromXML(content[j]);
				}
			}
		}
		else
		{
			throw String(L('TITOOLS_THROW_UNKNOWN_EXTENSION') + '\n' + filename);
		}
	}
	else
	{
		throw String(L('TITOOLS_THROW_NOT_FOUND') + '\n' + filename);
	}
}

function loadFromJSON(content)
{
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
