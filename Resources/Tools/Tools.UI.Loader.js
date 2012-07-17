var ToolsFilesystem = require('Tools/Tools.Filesystem');
var ToolsPlatform = require('Tools/Tools.Platform');
var ToolsObject = require('Tools/Tools.Object');
var ToolsString = require('Tools/Tools.String');
var ToolsJSON = require("Tools/Tools.JSON");
var ToolsXML = require("Tools/Tools.XML");
var ToolsUI = require('Tools/Tools.UI');

//---------------------------------------------//

function loadFromFilename(filename, parent)
{
	var controller = {};
	if(ToolsObject.isObject(filename) == true)
	{
		filename = ToolsPlatform.appropriate(filename);
		if(filename == undefined)
		{
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
		}
	}
	var file = ToolsFilesystem.getFile(filename);
	if(file.exists() == true)
	{
		var blob = file.read();
		if(ToolsString.isSuffix(filename, '.json') == true)
		{
			loadFromJSON(ToolsJSON.deserialize(blob.text), parent, controller);
		}
		else if(ToolsString.isSuffix(filename, '.xml') == true)
		{
			loadFromXML(ToolsXML.deserialize(blob.text), parent, controller);
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
		// ERROR
		return;
	}
	var outlet = undefined;
	switch(content.style.className)
	{
		case 'Ti.UI.Window': outlet = ToolsUI.createWindow(content.style); break;
		case 'Ti.UI.View': outlet = ToolsUI.createView(content.style); break;
		case 'Ti.UI.ScrollView': outlet = ToolsUI.createScrollView(content.style); break;
		case 'Ti.UI.ScrollableView': outlet = ToolsUI.createScrollableView(content.style); break;
		case 'Ti.UI.ImageView': outlet = ToolsUI.createImageView(content.style); break;
		case 'Ti.UI.Button': outlet = ToolsUI.createButton(content.style); break;
		case 'Ti.UI.Label': outlet = ToolsUI.createLabel(content.style); break;
		case 'Ti.UI.Switch': outlet = ToolsUI.createSwitch(content.style); break;
		case 'Ti.UI.ProgressBar': outlet = ToolsUI.createProgressBar(content.style); break;
		case 'Ti.UI.TextField': outlet = ToolsUI.createTextField(content.style); break;
		case 'Ti.UI.TextArea': outlet = ToolsUI.createTextArea(content.style); break;
		case 'Ti.UI.TableView': outlet = ToolsUI.createTableView(content.style); break;
		case 'Ti.UI.TableViewSection': outlet = ToolsUI.createTableViewSection(content.style); break;
		case 'Ti.UI.TableViewRow': outlet = ToolsUI.createTableViewRow(content.style); break;
		default:
			// ERROR
		return;
	}
	if(content.outlet != undefined)
	{
		controller[content.outlet] = outlet;
	}
	switch(outlet.className)
	{
		case 'Ti.UI.Window':
		case 'Ti.UI.View':
		case 'Ti.UI.ScrollView':
		case 'Ti.UI.ScrollableView':
		case 'Ti.UI.ImageView':
		case 'Ti.UI.Button':
		case 'Ti.UI.Label':
		case 'Ti.UI.Switch':
		case 'Ti.UI.ProgressBar':
		case 'Ti.UI.TextField':
		case 'Ti.UI.TextArea':
			switch(parent.className)
			{
				case 'Ti.UI.ScrollableView': parent.addView(outlet); break;
				default: parent.add(outlet); break;
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
		case 'Ti.UI.TableView':
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
			parent.add(outlet);
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
			switch(parent.className)
			{
				case 'Ti.UI.TableView': parent.appendRow(outlet); break;
				default: parent.add(outlet); break;
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
	}
}

function loadFromXML(content, parent, controller)
{
}

//---------------------------------------------//

module.exports = {
	loadFromFilename : loadFromFilename
}
