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
		// ERROR
		return;
	}
	var outlet = undefined;
	switch(content.style.className)
	{
		case 'Ti.UI.Window': outlet = Tools.UI.Controls.createWindow(content.style); break;
		case 'Ti.UI.View': outlet = Tools.UI.Controls.createView(content.style); break;
		case 'Ti.UI.ScrollView': outlet = Tools.UI.Controls.createScrollView(content.style); break;
		case 'Ti.UI.ScrollableView': outlet = Tools.UI.Controls.createScrollableView(content.style); break;
		case 'Ti.UI.ImageView': outlet = Tools.UI.Controls.createImageView(content.style); break;
		case 'Ti.UI.Button': outlet = Tools.UI.Controls.createButton(content.style); break;
		case 'Ti.UI.Label': outlet = Tools.UI.Controls.createLabel(content.style); break;
		case 'Ti.UI.Switch': outlet = Tools.UI.Controls.createSwitch(content.style); break;
		case 'Ti.UI.ProgressBar': outlet = Tools.UI.Controls.createProgressBar(content.style); break;
		case 'Ti.UI.TextField': outlet = Tools.UI.Controls.createTextField(content.style); break;
		case 'Ti.UI.TextArea': outlet = Tools.UI.Controls.createTextArea(content.style); break;
		case 'Ti.UI.TableView': outlet = Tools.UI.Controls.createTableView(content.style); break;
		case 'Ti.UI.TableViewSection': outlet = Tools.UI.Controls.createTableViewSection(content.style); break;
		case 'Ti.UI.TableViewRow': outlet = Tools.UI.Controls.createTableViewRow(content.style); break;
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
