var ToolsFilesystem = require('Tools/Tools.Filesystem');
var ToolsObject = require('Tools/Tools.Object');
var ToolsString = require('Tools/Tools.String');
var ToolsJSON = require("Tools/Tools.JSON");
var ToolsXML = require("Tools/Tools.XML");
var ToolsUI = require('Tools/Tools.UI');

//---------------------------------------------//

function loadFromFilename(filename, parent)
{
	var controller = {};
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
		case 'Ti.UI.Window':
		case 'Titanium.UI.Window':
			outlet = ToolsUI.createWindow(content.style);
		break;
		case 'Ti.UI.View':
		case 'Titanium.UI.View':
			outlet = ToolsUI.createView(content.style);
		break;
		case 'Ti.UI.ScrollView':
		case 'Titanium.UI.ScrollView':
			outlet = ToolsUI.createScrollView(content.style);
		break;
		case 'Ti.UI.ScrollableView':
		case 'Titanium.UI.ScrollableView':
			outlet = ToolsUI.createScrollableView(content.style);
		break;
		case 'Ti.UI.Label':
		case 'Titanium.UI.Label':
			outlet = ToolsUI.createLabel(content.style);
		break;
		case 'Ti.UI.Button':
		case 'Titanium.UI.Button':
			outlet = ToolsUI.createButton(content.style);
		break;
		case 'Ti.UI.ImageView':
		case 'Titanium.UI.ImageView':
			outlet = ToolsUI.createImageView(content.style);
		break;
		case 'Ti.UI.ProgressBar':
		case 'Titanium.UI.ProgressBar':
			outlet = ToolsUI.createProgressBar(content.style);
		break;
		case 'Ti.UI.TextField':
		case 'Titanium.UI.TextField':
			outlet = ToolsUI.createTextField(content.style);
		break;
		case 'Ti.UI.TextArea':
		case 'Titanium.UI.TextArea':
			outlet = ToolsUI.createTextArea(content.style);
		break;
		case 'Ti.UI.TableView':
		case 'Titanium.UI.TableView':
			outlet = ToolsUI.createTableView(content.style);
		break;
		case 'Ti.UI.TableViewSection':
		case 'Titanium.UI.TableViewSection':
			outlet = ToolsUI.createTableViewSection(content.style);
		break;
		case 'Ti.UI.TableViewRow':
		case 'Titanium.UI.TableViewRow':
			outlet = ToolsUI.createTableViewRow(content.style);
		break;
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
		case 'Titanium.UI.Window':
		case 'Ti.UI.View':
		case 'Titanium.UI.View':
		case 'Ti.UI.ScrollView':
		case 'Titanium.UI.ScrollView':
		case 'Ti.UI.ScrollableView':
		case 'Titanium.UI.ScrollableView':
		case 'Ti.UI.Label':
		case 'Titanium.UI.Label':
		case 'Ti.UI.Button':
		case 'Titanium.UI.Button':
		case 'Ti.UI.ImageView':
		case 'Titanium.UI.ImageView':
		case 'Ti.UI.ProgressBar':
		case 'Titanium.UI.ProgressBar':
		case 'Ti.UI.TextField':
		case 'Titanium.UI.TextField':
		case 'Ti.UI.TextArea':
		case 'Titanium.UI.TextArea':
			switch(parent.className)
			{
				case 'Ti.UI.ScrollableView':
				case 'Titanium.UI.ScrollableView':
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
		case 'Ti.UI.TableView':
		case 'Titanium.UI.TableView':
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
		case 'Titanium.UI.TableViewSection':
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
		case 'Titanium.UI.TableViewRow':
			switch(parent.className)
			{
				case 'Ti.UI.TableView':
				case 'Titanium.UI.TableView':
					parent.appendRow(outlet);
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
	}
}

function loadFromXML(content, parent, controller)
{
}

//---------------------------------------------//

module.exports = {
	loadFromFilename : loadFromFilename
}
