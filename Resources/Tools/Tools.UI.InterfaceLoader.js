var ToolsObject = require('Tools/Tools.Object');
var ToolsString = require('Tools/Tools.String');
var ToolsJSON = require("Tools/Tools.JSON");
var ToolsXML = require("Tools/Tools.XML");
var ToolsUI = require('Tools/Tools.UI');

//---------------------------------------------//

var TOOLS_WINDOW = 'Tools.Panel';
var TOOLS_NAVBAR = 'Tools.Navbar';
var TOOLS_TABBAR = 'Tools.Tabbar';
var TOOLS_VIEW = 'Tools.View';
var TOOLS_BUTTON = 'Tools.Button';
var TOOLS_IMAGE = 'Tools.Image';
var TOOLS_SCROLL = 'Tools.Scroll';
var TOOLS_SCROLLABLE = 'Tools.Scrollable';
var TOOLS_PROGRESS_BAR = 'Tools.ProgressBar';
var TOOLS_LINE_EDIT = 'Tools.LineEdit';
var TOOLS_TEXT_EDIT = 'Tools.TextEdit';
var TOOLS_TABLE = 'Tools.Table';
var TOOLS_TABLE_ROW = 'Tools.TableRow';

//---------------------------------------------//

function loadFromFilename(filename, parent, controller)
{
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
	if(file == undefined)
	{
		// ERROR
		return;
	}
	var blob = file.read();
	if(blob == undefined)
	{
		// ERROR
		return;
	}
	var text = blob.text;
	if(text == undefined)
	{
		// ERROR
		return;
	}
	if(ToolsString.isSuffix(filename, '.json') == true)
	{
		loadFromJSON(ToolsJSON.deserialize(text), parent, controller);
	}
	else if(ToolsString.isSuffix(filename, '.xml') == true)
	{
		loadFromXML(ToolsXML.deserialize(text), parent, controller);
	}
}

function loadFromJSON(content, parent, controller)
{
	if(parent == undefined)
	{
		// ERROR
		return;
	}
	var style = ToolsObject.combine(content.style,
		{
			parent : parent
		}
	);
	var outlet = undefined;
	switch(content.class)
	{
		case TOOLS_WINDOW: outlet = ToolsUI.createWindow(style); break;
		case TOOLS_NAVBAR: outlet = ToolsUI.createNavbar(style); break;
		case TOOLS_TABBAR: outlet = ToolsUI.createTabbar(style); break;
		case TOOLS_VIEW: outlet = ToolsUI.createView(style); break;
		case TOOLS_BUTTON: outlet = ToolsUI.createButton(style); break;
		case TOOLS_IMAGE: outlet = ToolsUI.createImage(style); break;
		case TOOLS_SCROLL: outlet = ToolsUI.createScroll(style); break;
		case TOOLS_SCROLLABLE: outlet = ToolsUI.createScrollable(style); break;
		case TOOLS_PROGRESS_BAR: outlet = ToolsUI.createProgressBar(style); break;
		case TOOLS_LINE_EDIT: outlet = ToolsUI.createLineEdit(style); break;
		case TOOLS_TEXT_EDIT: outlet = ToolsUI.createTextEdit(style); break;
		case TOOLS_TABLE: outlet = ToolsUI.createTable(style); break;
		case TOOLS_TABLE_ROW: outlet = ToolsUI.createTableRow(style); break;
	}
	if(outlet == undefined)
	{
		// ERROR
		return;
	}
	if(content.outlet != undefined)
	{
		controller[content.outlet] = outlet;
	}
	if(content.subviews != undefined)
	{
		for(var i = 0; i < content.subviews.length; i++)
		{
			loadFromJSON(content.subviews[i], outlet, controller);
		}
	}
}

function loadFromXML(content, parent, controller)
{
}

//---------------------------------------------//

module.exports = {
	loadFromFilename : loadFromFilename,
	loadFromJSON : loadFromJSON,
	loadFromXML : loadFromXML
}
