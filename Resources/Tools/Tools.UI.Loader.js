var Tools = {
	Object : require("Tools/Tools.Object"),
	String : require("Tools/Tools.String"),
	Filesystem : require("Tools/Tools.Filesystem"),
	Platform : require("Tools/Tools.Platform"),
	JSON : require("Tools/Tools.JSON"),
	XML : require("Tools/Tools.XML"),
	UI : {
		Controls : require("Tools/Tools.UI.Controls")
	}
};

//---------------------------------------------//

function loadFromFilename(filename, parent)
{
	var controller = {};
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
				loadFromJSON(content, parent, controller);
			}
			else if(Tools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					loadFromJSON(content[i], parent, controller);
				}
			}
		}
		else if(ToolsString.isSuffix(filename, '.xml') == true)
		{
			var content = Tools.XML.deserialize(blob.text);
			if(Tools.Object.isObject(content) == true)
			{
				loadFromXML(content, parent, controller);
			}
			else if(Tools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					loadFromXML(content[i], parent, controller);
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
	return controller;
}

function loadFromJSON(content, parent, controller)
{
	var outlet = undefined;
	switch(content.style.className)
	{
		case 'Ti.UI.ActivityIndicator':
			outlet = Tools.UI.Controls.createWindow(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.hide();
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Window':
			outlet = Tools.UI.Controls.createWindow(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.Tab':
						parent.window = outlet;
						outlet.parent = parent;
					break;
				}
			}
		break;
		case 'Ti.UI.TabGroup':
			outlet = Tools.UI.Controls.createTabGroup(content.style);
			if(content.tabs != undefined)
			{
				for(var i = 0; i < content.tabs.length; i++)
				{
					loadFromJSON(content.tabs[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.Tab':
			outlet = Tools.UI.Controls.createTab(content.style);
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
			outlet = Tools.UI.Controls.createView(content.style);
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
			outlet = Tools.UI.Controls.createScrollView(content.style);
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
			outlet = Tools.UI.Controls.createScrollableView(content.style);
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
			outlet = Tools.UI.Controls.createImageView(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Button':
			outlet = Tools.UI.Controls.createButton(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Label':
			outlet = Tools.UI.Controls.createLabel(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.Switch':
			outlet = Tools.UI.Controls.createSwitch(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.ProgressBar':
			outlet = Tools.UI.Controls.createProgressBar(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.TextField':
			outlet = Tools.UI.Controls.createTextField(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.TextArea':
			outlet = Tools.UI.Controls.createTextArea(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.UI.TableView':
			outlet = Tools.UI.Controls.createTableView(content.style);
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
			outlet = Tools.UI.Controls.createTableViewSection(content.style);
			if(parent != undefined)
			{
				switch(parent.className)
				{
					case 'Ti.UI.TableView':
						parent.add(outlet);
						outlet.parent = parent;
					break;
					default:
						throw new Error(L('TI_TOOLS_THROW_UNSUPPORTED_PARENT_CLASS'));
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
			outlet = Tools.UI.Controls.createTableViewRow(content.style);
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
						throw new Error(L('TI_TOOLS_THROW_UNSUPPORTED_PARENT_CLASS'));
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
			outlet = Tools.UI.Controls.Facebook.createLoginButton(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		case 'Ti.PaintView':
			outlet = Tools.UI.Controls.createPaintView(content.style);
			if(parent != undefined)
			{
				parent.add(outlet);
				outlet.parent = parent;
			}
		break;
		default:
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_CLASS_NAME') + '\n' + content.style.className);
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
	loadFromFilename : loadFromFilename
};
