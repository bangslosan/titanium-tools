var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	String : require("TiTools/TiTools.String"),
	Locate : require("TiTools/TiTools.Locate"),
	Filesystem : require("TiTools/TiTools.Filesystem"),
	Platform : require("TiTools/TiTools.Platform"),
	JSON : require("TiTools/TiTools.JSON"),
	XML : require("TiTools/TiTools.XML"),
	UI : {
		Controls : require("TiTools/TiTools.UI.Controls")
	}
};

//---------------------------------------------//

function load(params, parent)
{
	var controller = {};
	loadFromController(params, parent, controller);
	return controller;
}

//---------------------------------------------//

function loadFromController(params, parent, controller)
{
	if(TiTools.Object.isObject(params) == true)
	{
		var current = TiTools.Platform.appropriate(params);
		if(current == undefined)
		{
			throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
		}
		loadFromController(current, parent, controller);
	}
	else if(TiTools.Object.isArray(params) == true)
	{
		for(var i = 0; i < params.length; i++)
		{
			loadFromController(params[i], parent, controller);
		}
	}
	else if(TiTools.Object.isString(params) == true)
	{
		loadFromFilename(params, parent, controller);
	}
}

function loadFromFilename(filename, parent, controller)
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
				loadFromJSON(content, parent, controller);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					loadFromJSON(content[i], parent, controller);
				}
			}
		}
		else if(TiTools.String.isSuffix(filename, '.xml') == true)
		{
			var content = TiTools.XML.deserialize(blob.text);
			if(TiTools.Object.isObject(content) == true)
			{
				loadFromXMTiTools.Locate.getString(content, parent, controller);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					loadFromXMTiTools.Locate.getString(content[i], parent, controller);
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
	return controller;
}

function loadFromJSON(content, parent, controller)
{
	var outlet = undefined;
	switch(content.style.className)
	{
		case 'Ti.UI.ActivityIndicator':
			outlet = TiTools.UI.Controls.createActivityIndicator(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.hide();
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Window':
			outlet = TiTools.UI.Controls.createWindow(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.Ext.Tab':
						parent.push(outlet);
						outlet.parent = parent;
					break;
					case 'Ti.UI.Tab':
						parent.window = outlet;
						outlet.parent = parent;
					break;
				}
			}
		break;
		case 'Ti.UI.Ext.TabGroup':
			outlet = TiTools.UI.Controls.createTabGroupExt(content.style);
			if(content.tabs != undefined)
			{
				for(var i = 0; i < content.tabs.length; i++)
				{
					loadFromJSON(content.tabs[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.TabGroup':
			outlet = TiTools.UI.Controls.createTabGroup(content.style);
			if(content.tabs != undefined)
			{
				for(var i = 0; i < content.tabs.length; i++)
				{
					loadFromJSON(content.tabs[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.Ext.Tab':
			outlet = TiTools.UI.Controls.createTabExt(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.Ext.TabGroup':
						parent.addTab(outlet);
						outlet.parent = parent;
					break;
				}
			}
			if(content.root != undefined)
			{
				loadFromJSON(content.root, outlet, controller);
			}
		break;
		case 'Ti.UI.Tab':
			outlet = TiTools.UI.Controls.createTab(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.TabGroup':
						parent.addTab(outlet);
						outlet.parent = parent;
					break;
				}
			}
			if(content.root != undefined)
			{
				loadFromJSON(content.root, outlet, controller);
			}
		break;
		case 'Ti.UI.View':
			outlet = TiTools.UI.Controls.createView(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.ScrollableView':
						parent.addView(outlet);
						outlet.parent = parent;
					break;
					default:
						parent.add(outlet);
						outlet.parent = parent;
					break;
				}
			}
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.ScrollView':
			outlet = TiTools.UI.Controls.createScrollView(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.ScrollableView':
						parent.addView(outlet);
						outlet.parent = parent;
					break;
					default:
						parent.add(outlet);
						outlet.parent = parent;
					break;
				}
			}
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.ScrollableView':
			outlet = TiTools.UI.Controls.createScrollableView(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.ImageView':
			outlet = TiTools.UI.Controls.createImageView(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Button':
			outlet = TiTools.UI.Controls.createButton(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Label':
			outlet = TiTools.UI.Controls.createLabel(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Switch':
			outlet = TiTools.UI.Controls.createSwitch(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.ProgressBar':
			outlet = TiTools.UI.Controls.createProgressBar(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.TextField':
			outlet = TiTools.UI.Controls.createTextField(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.TextArea':
			outlet = TiTools.UI.Controls.createTextArea(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.TableView':
			outlet = TiTools.UI.Controls.createTableView(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
			if(content.sections != undefined)
			{
				for(var i = 0; i < content.sections.length; i++)
				{
					loadFromJSON(content.sections[i], outlet, controller);
				}
			}
			else if(content.rows != undefined)
			{
				for(var i = 0; i < content.rows.length; i++)
				{
					loadFromJSON(content.rows[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.TableViewSection':
			outlet = TiTools.UI.Controls.createTableViewSection(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.TableView':
						parent.add(outlet);
						outlet.parent = parent;
					break;
					default:
						throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_UNSUPPORTED_PARENT_CLASS'));
				}
			}
			if(content.rows != undefined)
			{
				for(var i = 0; i < content.rows.length; i++)
				{
					loadFromJSON(content.rows[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.TableViewRow':
			outlet = TiTools.UI.Controls.createTableViewRow(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.TableView':
						parent.appendRow(outlet);
						outlet.parent = parent;
					break;
					case 'Ti.UI.TableViewSection':
						parent.add(outlet);
						outlet.parent = parent;
					break;
					default:
						throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_UNSUPPORTED_PARENT_CLASS'));
				}
			}
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
			}
		break;
		case 'Ti.Facebook.LoginButton':
			outlet = TiTools.UI.Controls.Facebook.createLoginButton(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.PaintView':
			outlet = TiTools.UI.Controls.createPaintView(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		default:
			throw new Error(TiTools.Locate.getString('TI_TOOLS_THROW_UNKNOWN_CLASS_NAME') + '\n' + content.style.className);
	}
	if(content.outlet != undefined)
	{
		controller[content.outlet] = outlet;
	}
	return outlet;
}

function loadFromXML(content, parent, controller)
{
}

//---------------------------------------------//

module.exports = {
	load : load
};
