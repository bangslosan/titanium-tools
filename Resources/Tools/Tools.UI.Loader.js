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
}

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
			loadFromJSON(Tools.JSON.deserialize(blob.text), parent, controller);
		}
		else if(ToolsString.isSuffix(filename, '.xml') == true)
		{
			loadFromXML(Tools.XML.deserialize(blob.text), parent, controller);
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
	if(parent == undefined)
	{
		throw new Error(L('TI_TOOLS_THROW_PARENT_UNDEFINED'));
	}
	var outlet = undefined;
	switch(content.style.className)
	{
		case 'Ti.UI.Window':
			outlet = Tools.UI.Controls.createWindow(content.style);
			switch(parent.className)
			{
				case 'Ti.UI.Tab':
					parent.window = outlet;
				break;
				default:
					parent.add(outlet);
				break;
			}
		break;
		case 'Ti.UI.TabGroup':
			outlet = Tools.UI.Controls.createTabGroup(content.style);
			if(content.tabs != undefined)
			{
				var count = content.tabs.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.tabs[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.Tab':
			outlet = Tools.UI.Controls.createTab(content.style);
			switch(parent.className)
			{
				case 'Ti.UI.TabGroup':
					parent.addTab(outlet);
				break;
			}
			if(content.root != undefined)
			{
				loadFromJSON(content.root, outlet, controller);
			}
		break;
		case 'Ti.UI.View':
			outlet = Tools.UI.Controls.createView(content.style);
			switch(parent.className)
			{
				case 'Ti.UI.ScrollableView':
					parent.addView(outlet);
				break;
				default:
					parent.add(outlet);
				break;
			}
			if(content.subviews != undefined)
			{
				var count = content.subviews.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.ScrollView':
			outlet = Tools.UI.Controls.createScrollView(content.style);
			switch(parent.className)
			{
				case 'Ti.UI.ScrollableView':
					parent.addView(outlet);
				break;
				default:
					parent.add(outlet);
				break;
			}
			if(content.subviews != undefined)
			{
				var count = content.subviews.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.ScrollableView':
			outlet = Tools.UI.Controls.createScrollableView(content.style);
			parent.add(outlet);
			if(content.subviews != undefined)
			{
				var count = content.subviews.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.ImageView':
			outlet = Tools.UI.Controls.createImageView(content.style);
			parent.add(outlet);
		break;
		case 'Ti.UI.Button':
			outlet = Tools.UI.Controls.createButton(content.style);
			parent.add(outlet);
		break;
		case 'Ti.UI.Label':
			outlet = Tools.UI.Controls.createLabel(content.style);
			parent.add(outlet);
		break;
		case 'Ti.UI.Switch':
			outlet = Tools.UI.Controls.createSwitch(content.style);
			parent.add(outlet);
		break;
		case 'Ti.UI.ProgressBar':
			outlet = Tools.UI.Controls.createProgressBar(content.style);
			parent.add(outlet);
		break;
		case 'Ti.UI.TextField':
			outlet = Tools.UI.Controls.createTextField(content.style);
			parent.add(outlet);
		break;
		case 'Ti.UI.TextArea':
			outlet = Tools.UI.Controls.createTextArea(content.style);
			parent.add(outlet);
		break;
		case 'Ti.UI.TableView':
			outlet = Tools.UI.Controls.createTableView(content.style);
			parent.add(outlet);
			if(content.sections != undefined)
			{
				var count = content.sections.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.sections[i], outlet, controller);
				}
			}
			else if(content.rows != undefined)
			{
				var count = content.rows.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.rows[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.TableViewSection':
			outlet = Tools.UI.Controls.createTableViewSection(content.style);
			switch(parent.className)
			{
				case 'Ti.UI.TableView':
					parent.add(outlet);
				break;
				default:
					throw new Error(L('TI_TOOLS_THROW_UNSUPPORTED_PARENT_CLASS'));
			}
			if(content.rows != undefined)
			{
				var count = content.rows.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.rows[i], outlet, controller);
				}
			}
		break;
		case 'Ti.UI.TableViewRow':
			outlet = Tools.UI.Controls.createTableViewRow(content.style);
			switch(parent.className)
			{
				case 'Ti.UI.TableView':
					parent.appendRow(outlet);
				break;
				case 'Ti.UI.TableViewSection':
					parent.add(outlet);
				break;
				default:
					throw new Error(L('TI_TOOLS_THROW_UNSUPPORTED_PARENT_CLASS'));
			}
			if(content.subviews != undefined)
			{
				var count = content.subviews.length;
				for(var i = 0; i < count; i++)
				{
					loadFromJSON(content.subviews[i], outlet, controller);
				}
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
}
