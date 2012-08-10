var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	String : require("TiTools/TiTools.String"),
	Filesystem : require("TiTools/TiTools.Filesystem"),
	Platform : require("TiTools/TiTools.Platform"),
	JSON : require("TiTools/TiTools.JSON"),
	XML : require("TiTools/TiTools.XML"),
	UI : {
		Controls : require("TiTools/TiTools.UI.Controls"),
		Preset : require("TiTools/TiTools.UI.Preset")
	}
};

//---------------------------------------------//

if(Ti.App.TiToolsLoaders == undefined)
{
	Ti.App.TiToolsLoaders = [];
}

//---------------------------------------------//

function preloadSet(name, cache)
{
	var list = Ti.App.TiToolsLoaders;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			throw new Error(L('TI_TOOLS_THROW_OVERRIDE_PRESET') + '\n' + name);
		}
	}
	list.push(
		{
			name : name,
			cache : cache
		}
	);
	Ti.App.TiToolsLoaders = list;
}

function preloadGet(name)
{
	var list = Ti.App.TiToolsLoaders;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			return list[i].cache;
		}
	}
	return undefined;
}

function preloadRemove(name)
{
	var list = Ti.App.TiToolsLoaders;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list.splice(i, 1);
			break;
		}
	}
	Ti.App.TiToolsLoaders = list;
}

//---------------------------------------------//

function preload(params)
{
	if(TiTools.Object.isObject(params) == true)
	{
		var current = TiTools.Platform.appropriate(params);
		if(current == undefined)
		{
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
		}
		preload(current);
	}
	else if(TiTools.Object.isArray(params) == true)
	{
		for(var i = 0; i < params.length; i++)
		{
			preload(params[i]);
		}
	}
	else if(TiTools.Object.isString(params) == true)
	{
		preloadFromFilename(params);
	}
}

function preloadFromFilename(filename)
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
				preloadFromJSON(content);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					preloadFromJSON(content[i]);
				}
			}
			preloadSet(filename, content);
			return content;
		}
		else if(TiTools.String.isSuffix(filename, '.xml') == true)
		{
			var content = TiTools.XML.deserialize(blob.text);
			if(TiTools.Object.isObject(content) == true)
			{
				preloadFromXML(content);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					preloadFromXML(content[i]);
				}
			}
			preloadSet(filename, content);
			return content;
		}
		else
		{
			throw String(L('TI_TOOLS_THROW_UNKNOWN_EXTENSION') + '\n' + filename);
		}
	}
	else
	{
		throw String(L('TI_TOOLS_THROW_NOT_FOUND') + '\n' + filename);
	}
	return undefined;
}

function preloadFromJSON(content)
{
	if(content.style != undefined)
	{
		content.style = TiTools.UI.Preset.merge(content.style);
	}
	if(content.root != undefined)
	{
		preloadFromJSON(content.root);
	}
	if(content.header != undefined)
	{
		preloadFromJSON(content.header);
	}
	if(content.footer != undefined)
	{
		preloadFromJSON(content.footer);
	}
	if(content.tabs != undefined)
	{
		for(var i = 0; i < content.tabs.length; i++)
		{
			preloadFromJSON(content.tabs[i]);
		}
	}
	if(content.sections != undefined)
	{
		for(var i = 0; i < content.sections.length; i++)
		{
			preloadFromJSON(content.sections[i]);
		}
	}
	if(content.columns != undefined)
	{
		for(var i = 0; i < content.columns.length; i++)
		{
			preloadFromJSON(content.columns[i]);
		}
	}
	if(content.rows != undefined)
	{
		for(var i = 0; i < content.rows.length; i++)
		{
			preloadFromJSON(content.rows[i]);
		}
	}
	if(content.subviews != undefined)
	{
		for(var i = 0; i < content.subviews.length; i++)
		{
			preloadFromJSON(content.subviews[i]);
		}
	}
}

function preloadFromXML(content)
{
}

//---------------------------------------------//

function load(params, owner)
{
	var controller = {};
	var callback = undefined;
	switch(owner.className)
	{
		case 'Ti.UI.TabGroup':
			callback = function(child)
			{
				switch(child.className)
				{
					case 'Ti.UI.Tab':
						child.parent = owner;
						owner.addTab(child);
					break;
					default:
						child.parent = owner;
						owner.add(child);
					break;
				}
			};
		break;
		case 'Ti.UI.Tab':
			callback = function(child)
			{
				switch(child.className)
				{
					case 'Ti.UI.Window':
						child.parent = owner;
						child.window = owner;
					break;
					default:
						child.parent = owner;
						owner.add(child);
					break;
				}
			};
		break;
		case 'Ti.UI.Window':
			callback = function(child)
			{
				switch(child.className)
				{
					case 'Ti.UI.TabGroup':
					break;
					default:
						child.parent = owner;
						owner.add(child);
					break;
				}
			};
		break;
		case 'Ti.UI.ScrollableView':
			callback = function(child)
			{
				child.parent = owner;
				child.addView(owner);
			};
		break;
		case 'Ti.UI.TableView':
			callback = function(child)
			{
				switch(child.className)
				{
					case 'Ti.UI.TableViewSection':
						child.parent = owner;
						
						var sections = owner.data;
						sections.push(child);
						owner.data = sections;
					break;
					case 'Ti.UI.TableViewRow':
						child.parent = owner;
						owner.appendRow(child);
					break;
					default:
						throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME'));
				}
			};
		break;
		case 'Ti.UI.TableViewSection':
			callback = function(child)
			{
				switch(child.className)
				{
					case 'Ti.UI.TableViewRow':
						child.parent = owner;
						owner.add(child);
					break;
					default:
						throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME'));
				}
			};
		break;
		default:
			callback = function(child)
			{
				child.parent = owner;
				owner.add(child);
			};
		break;
	}
	loadFromController(params, controller, callback);
	return controller;
}

//---------------------------------------------//

function loadFromController(params, controller, callback)
{
	if(TiTools.Object.isObject(params) == true)
	{
		var current = TiTools.Platform.appropriate(params);
		if(current == undefined)
		{
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_PLATFORM'));
		}
		loadFromController(current, controller, callback);
	}
	else if(TiTools.Object.isArray(params) == true)
	{
		for(var i = 0; i < params.length; i++)
		{
			loadFromController(params[i], controller, callback);
		}
	}
	else if(TiTools.Object.isString(params) == true)
	{
		loadFromFilename(params, controller, callback);
	}
}

function loadFromFilename(filename, controller, callback)
{
	var content = preloadGet(filename);
	if(content == undefined)
	{
		content = preloadFromFilename(filename);
	}
	if(content != undefined)
	{
		if(TiTools.String.isSuffix(filename, '.json') == true)
		{
			if(TiTools.Object.isObject(content) == true)
			{
				loadFromJSON(content, controller, callback);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					loadFromJSON(content[i], controller, callback);
				}
			}
		}
		else if(TiTools.String.isSuffix(filename, '.xml') == true)
		{
			if(TiTools.Object.isObject(content) == true)
			{
				loadFromXML(content, controller, callback);
			}
			else if(TiTools.Object.isArray(content) == true)
			{
				for(var i = 0; i < content.length; i++)
				{
					loadFromXML(content[i], controller, callback);
				}
			}
		}
		else
		{
			throw String(L('TI_TOOLS_THROW_UNKNOWN_EXTENSION') + '\n' + filename);
		}
	}
	return controller;
}

function loadFromJSON(content, controller, callback)
{
	var outlet = undefined;
	switch(content.style.className)
	{
		case 'Ti.UI.AlertDialog':
			outlet = TiTools.UI.Controls.createAlertDialog(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.EmailDialog':
			outlet = TiTools.UI.Controls.createEmailDialog(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.ActivityIndicator':
			outlet = TiTools.UI.Controls.createActivityIndicator(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.TabGroup':
			outlet = TiTools.UI.Controls.createTabGroup(content.style);
			callback(outlet);
			
			if(content.tabs != undefined)
			{
				for(var i = 0; i < content.tabs.length; i++)
				{
					loadFromJSON(
						content.tabs[i],
						controller,
						function(child)
						{
							switch(child.className)
							{
								case 'Ti.UI.Tab':
									child.parent = outlet;
									outlet.addTab(child);
								break;
								default:
									throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
							}
						}
					);
				}
			}
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(
						content.subviews[i],
						controller,
						function(child)
						{
							child.parent = outlet;
							outlet.add(child);
						}
					);
				}
			}
		break;
		case 'Ti.UI.Tab':
			outlet = TiTools.UI.Controls.createTab(content.style);
			callback(outlet);
			
			if(content.root != undefined)
			{
				loadFromJSON(
					content.root,
					controller,
					function(child)
					{
						switch(child.className)
						{
							case 'Ti.UI.Window':
								child.parent = outlet;
								outlet.window = child;
							break;
							default:
								throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
						}
					}
				);
			}
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(
						content.subviews[i],
						controller,
						function(child)
						{
							child.parent = outlet;
							outlet.add(child);
						}
					);
				}
			}
		break;
		case 'Ti.UI.Window':
			outlet = TiTools.UI.Controls.createWindow(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.View':
			outlet = TiTools.UI.Controls.createView(content.style);
			callback(outlet);
			
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(
						content.subviews[i],
						controller,
						function(child)
						{
							child.parent = outlet;
							outlet.add(child);
						}
					);
				}
			}
		break;
		case 'Ti.UI.ScrollView':
			outlet = TiTools.UI.Controls.createScrollView(content.style);
			callback(outlet);
			
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(
						content.subviews[i],
						controller,
						function(child)
						{
							child.parent = outlet;
							outlet.add(child);
						}
					);
				}
			}
		break;
		case 'Ti.UI.ScrollableView':
			outlet = TiTools.UI.Controls.createScrollableView(content.style);
			callback(outlet);
			
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(
						content.subviews[i],
						controller,
						function(child)
						{
							child.parent = outlet;
							outlet.addView(child);
						}
					);
				}
			}
		break;
		case 'Ti.UI.ImageView':
			outlet = TiTools.UI.Controls.createImageView(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.Button':
			outlet = TiTools.UI.Controls.createButton(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.ButtonBar':
			outlet = TiTools.UI.Controls.createButtonBar(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.Label':
			outlet = TiTools.UI.Controls.createLabel(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.Switch':
			outlet = TiTools.UI.Controls.createSwitch(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.Slider':
			outlet = TiTools.UI.Controls.createSlider(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.ProgressBar':
			outlet = TiTools.UI.Controls.createProgressBar(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.TextField':
			outlet = TiTools.UI.Controls.createTextField(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.TextArea':
			outlet = TiTools.UI.Controls.createTextArea(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.TableView':
			outlet = TiTools.UI.Controls.createTableView(content.style);
			callback(outlet);
			
			if(content.header != undefined)
			{
				loadFromJSON(
					content.header,
					controller,
					function(child)
					{
						child.parent = outlet;
						outlet.headerView = child;
					}
				);
			}
			if(content.footer != undefined)
			{
				loadFromJSON(
					content.footer,
					controller,
					function(child)
					{
						child.parent = outlet;
						outlet.footerView = child;
					}
				);
			}
			if(content.sections != undefined)
			{
				var sections = outlet.data;
				for(var i = 0; i < content.sections.length; i++)
				{
					sections.push(
						loadFromJSON(
							content.sections[i],
							controller,
							function(child)
							{
								switch(child.className)
								{
									case 'Ti.UI.TableViewSection':
										child.parent = outlet;
									break;
									default:
										throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
								}
							}
						)
					);
				}
				outlet.data = sections;
			}
			else if(content.rows != undefined)
			{
				for(var i = 0; i < content.rows.length; i++)
				{
					loadFromJSON(
						content.rows[i],
						controller,
						function(child)
						{
							switch(child.className)
							{
								case 'Ti.UI.TableViewRow':
									child.parent = outlet;
									outlet.appendRow(child);
								break;
								default:
									throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
							}
						}
					);
				}
			}
		break;
		case 'Ti.UI.TableViewSection':
			outlet = TiTools.UI.Controls.createTableViewSection(content.style);
			callback(outlet);
			
			if(content.header != undefined)
			{
				loadFromJSON(
					content.header,
					controller,
					function(child)
					{
						child.parent = outlet;
						outlet.headerView = child;
					}
				);
			}
			if(content.footer != undefined)
			{
				loadFromJSON(
					content.footer,
					controller,
					function(child)
					{
						child.parent = outlet;
						outlet.footerView = child;
					}
				);
			}
			if(content.rows != undefined)
			{
				for(var i = 0; i < content.rows.length; i++)
				{
					loadFromJSON(
						content.rows[i],
						controller,
						function(child)
						{
							switch(child.className)
							{
								case 'Ti.UI.TableViewRow':
									child.parent = outlet;
									outlet.add(child);
								break;
								default:
									throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
							}
						}
					);
				}
			}
		break;
		case 'Ti.UI.TableViewRow':
			outlet = TiTools.UI.Controls.createTableViewRow(content.style);
			callback(outlet);
			
			if(content.subviews != undefined)
			{
				for(var i = 0; i < content.subviews.length; i++)
				{
					loadFromJSON(
						content.subviews[i],
						controller,
						function(child)
						{
							child.parent = outlet;
							outlet.add(child);
						}
					);
				}
			}
		break;
		case 'Ti.UI.Picker':
			outlet = TiTools.UI.Controls.createPicker(content.style);
			callback(outlet);
			
			if(content.columns != undefined)
			{
				for(var i = 0; i < content.columns.length; i++)
				{
					loadFromJSON(
						content.columns[i],
						controller,
						function(child)
						{
							switch(child.className)
							{
								case 'Ti.UI.PickerColumn':
									child.parent = outlet;
									outlet.add(child);
								break;
								default:
									throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
							}
						}
					);
				}
			}
			if(content.rows != undefined)
			{
				for(var i = 0; i < content.columns.length; i++)
				{
					loadFromJSON(
						content.columns[i],
						controller,
						function(child)
						{
							switch(child.className)
							{
								case 'Ti.UI.PickerRow':
									child.parent = outlet;
									outlet.add(child);
								break;
								default:
									throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
							}
						}
					);
				}
			}
		break;
		case 'Ti.UI.PickerColumn':
			outlet = TiTools.UI.Controls.createPickerColumn(content.style);
			callback(outlet);
			
			if(content.rows != undefined)
			{
				for(var i = 0; i < content.rows.length; i++)
				{
					loadFromJSON(
						content.rows[i],
						controller,
						function(child)
						{
							switch(child.className)
							{
								case 'Ti.UI.PickerRow':
									child.parent = outlet;
									outlet.addRow(child);
								break;
								default:
									throw String(L('TI_TOOLS_THROW_UNSUPPORTED_CLASS_NAME') + ': ' + child.className);
							}
						}
					);
				}
			}
		break;
		case 'Ti.UI.PickerRow':
			outlet = TiTools.UI.Controls.createPickerRow(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.WebView':
			outlet = TiTools.UI.Controls.createWebView(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.GoogleMapView':
			outlet = TiTools.UI.Controls.createGoogleMapView(content.style);
			callback(outlet);
		break;
		case 'Ti.UI.FacebookLoginButton':
			outlet = TiTools.UI.Controls.createFacebookLoginButton(content.style);
			callback(outlet);
		break;
		case 'Ti.PaintView':
			outlet = TiTools.UI.Controls.createPaintView(content.style);
			callback(outlet);
		break;
		default:
			throw String(L('TI_TOOLS_THROW_UNKNOWN_CLASS_NAME') + '\n' + content.style.className);
	}
	if(content.outlet != undefined)
	{
		controller[content.outlet] = outlet;
	}
	return outlet;
}

function loadFromXML(content, controller, callback)
{
}

//---------------------------------------------//

module.exports = {
	preload : preload,
	load : load
};
