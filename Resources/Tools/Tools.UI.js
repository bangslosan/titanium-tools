function setPreset(name, preset)
{
	var ToolsUIPreset = require('Tools/Tools.UI.Preset');
	return ToolsUIPreset.set(name, preset);
}

function getPreset(name)
{
	var ToolsUIPreset = require('Tools/Tools.UI.Preset');
	return ToolsUIPreset.get(name);
}
	
//---------------------------------------------//

function createWindow(params)
{
	var ToolsUIWindow = require('Tools/Tools.UI.Window');
	return ToolsUIWindow.create(params);
}

function createView(params)
{
	var ToolsUIView = require('Tools/Tools.UI.View');
	return ToolsUIView.create(params);
}

function createNavbar(params)
{
	var ToolsUINavbar = require('Tools/Tools.UI.Navbar');
	return ToolsUINavbar.create(params);
}

function createTabbar(params, tabs)
{
	var ToolsUITabbar = require('Tools/Tools.UI.Tabbar');
	return ToolsUITabbar.create(params, tabs);
}

function createLabel(params)
{
	var ToolsUILabel = require('Tools/Tools.UI.Label');
	return ToolsUILabel.create(params);
}

function createImage(params)
{
	var ToolsUIImage = require('Tools/Tools.UI.Image');
	return ToolsUIImage.create(params);
}

function createButton(params)
{
	var ToolsUIButton = require('Tools/Tools.UI.Button');
	return ToolsUIButton.create(params);
}

function createScroll(params)
{
	var ToolsUIScroll = require('Tools/Tools.UI.Scroll');
	return ToolsUIScroll.create(params);
}

function createScrollable(params)
{
	var ToolsUIScrollable = require('Tools/Tools.UI.Scrollable');
	return ToolsUIScrollable.create(params);
}

function createProgressBar(params)
{
	var ToolsUIProgressBar = require('Tools/Tools.UI.ProgressBar');
	return ToolsUIProgressBar.create(params);
}

function createLineEdit(params)
{
	var ToolsUILineEdit = require('Tools/Tools.UI.LineEdit');
	return ToolsUILineEdit.create(params);
}

function createTextEdit(params)
{
	var ToolsUITextEdit = require('Tools/Tools.UI.TextEdit');
	return ToolsUITextEdit.create(params);
}

function createTable(params)
{
	var ToolsUITable = require('Tools/Tools.UI.Table');
	return ToolsUITable.create(params);
}

function createTableRow(params)
{
	var ToolsUITableRow = require('Tools/Tools.UI.TableRow');
	return ToolsUITableRow.create(params);
}

//---------------------------------------------//

function currentWindowHandle()
{
	return Ti.UI.currentWindow;
}

//---------------------------------------------//

module.exports = {
	setPreset : setPreset,
	getPreset : getPreset,
	createWindow : createWindow,
	createView : createView,
	createNavbar : createNavbar,
	createTabbar : createTabbar,
	createLabel : createLabel,
	createImage : createImage,
	createButton : createButton,
	createScroll : createScroll,
	createScrollable : createScrollable,
	createProgressBar : createProgressBar,
	createLineEdit : createLineEdit,
	createTextEdit : createTextEdit,
	createTable : createTable,
	createTableRow : createTableRow,
	currentWindowHandle : currentWindowHandle
}
