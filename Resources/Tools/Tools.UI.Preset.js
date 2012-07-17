var ToolsFilesystem = require('Tools/Tools.Filesystem');
var ToolsPlatform = require('Tools/Tools.Platform');
var ToolsObject = require('Tools/Tools.Object');
var ToolsString = require('Tools/Tools.String');
var ToolsJSON = require("Tools/Tools.JSON");
var ToolsXML = require("Tools/Tools.XML");
			
//---------------------------------------------//

if(Ti.App.ToolsUIPresets == undefined)
{
	Ti.App.ToolsUIPresets = [];
}

//---------------------------------------------//

function set(name, params)
{
	var founded = false;
	var list = Ti.App.ToolsUIPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			throw new Error(L('TI_TOOLS_THROW_OVERRIDE_PRESET') + '\n' + name);
		}
	}
	if(founded == false)
	{
		list.push(
			{
				name : name,
				params : params
			}
		);
	}
	Ti.App.ToolsUIPresets = list;
}

function get(name)
{
	var list = Ti.App.ToolsUIPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			return list[i].params;
		}
	}
	return undefined;
}

function remove(name)
{
	var list = Ti.App.ToolsUIPresets;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list.splice(i, 1);
			break;
		}
	}
	Ti.App.ToolsUIPresets = list;
}

//---------------------------------------------//

function merge(params, defaults)
{
	if(params.preset != undefined)
	{
		var preset = get(params.preset);
		if(preset != undefined)
		{
			params = ToolsObject.combine(preset, params);
		}
	}
	if(defaults != undefined)
	{
		params = ToolsObject.combine(defaults, params);
	}
	return preprocess(params);
}

function preprocess(params)
{
	for(var i in params)
	{
		if(ToolsObject.isObject(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(ToolsObject.isArray(params[i]) == true)
		{
			params[i] = preprocess(params[i]);
		}
		else if(ToolsObject.isString(params[i]) == true)
		{
			params[i] = preprocessArgument(params[i]);
		}
	}
	return params;
}

function preprocessArgument(arg)
{
	switch(arg)
	{
		case 'Ti.UI.ANIMATION_CURVE_EASE_IN': return Ti.UI.ANIMATION_CURVE_EASE_IN;
		case 'Ti.UI.ANIMATION_CURVE_EASE_IN_OUT': return Ti.UI.ANIMATION_CURVE_EASE_IN_OUT;
		case 'Ti.UI.ANIMATION_CURVE_EASE_OUT': return Ti.UI.ANIMATION_CURVE_EASE_OUT;
		case 'Ti.UI.ANIMATION_CURVE_LINEAR': return Ti.UI.ANIMATION_CURVE_LINEAR;
		case 'Ti.UI.FACE_DOWN': return Ti.UI.FACE_DOWN;
		case 'Ti.UI.FACE_UP': return Ti.UI.FACE_UP;
		case 'Ti.UI.FILL': return Ti.UI.FILL;
		case 'Ti.UI.INPUT_BORDERSTYLE_BEZEL': return Ti.UI.INPUT_BORDERSTYLE_BEZEL;
		case 'Ti.UI.INPUT_BORDERSTYLE_LINE': return Ti.UI.INPUT_BORDERSTYLE_LINE;
		case 'Ti.UI.INPUT_BORDERSTYLE_NONE': return Ti.UI.INPUT_BORDERSTYLE_NONE;
		case 'Ti.UI.INPUT_BORDERSTYLE_ROUNDED': return Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
		case 'Ti.UI.INPUT_BUTTONMODE_ALWAYS': return Ti.UI.INPUT_BUTTONMODE_ALWAYS ;
		case 'Ti.UI.INPUT_BUTTONMODE_NEVER': return Ti.UI.INPUT_BUTTONMODE_NEVER;
		case 'Ti.UI.INPUT_BUTTONMODE_ONBLUR': return Ti.UI.INPUT_BUTTONMODE_ONBLUR;
		case 'Ti.UI.INPUT_BUTTONMODE_ONFOCUS': return Ti.UI.INPUT_BUTTONMODE_ONFOCUS;
		case 'Ti.UI.KEYBOARD_APPEARANCE_ALERT': return Ti.UI.KEYBOARD_APPEARANCE_ALERT;
		case 'Ti.UI.KEYBOARD_APPEARANCE_DEFAULT': return Ti.UI.KEYBOARD_APPEARANCE_DEFAULT ;
		case 'Ti.UI.KEYBOARD_ASCII': return Ti.UI.KEYBOARD_ASCII;
		case 'Ti.UI.KEYBOARD_DECIMAL_PAD': return Ti.UI.KEYBOARD_DECIMAL_PAD;
		case 'Ti.UI.KEYBOARD_DEFAULT': return Ti.UI.KEYBOARD_DEFAULT ;
		case 'Ti.UI.KEYBOARD_EMAIL': return Ti.UI.KEYBOARD_EMAIL;
		case 'Ti.UI.KEYBOARD_NAMEPHONE_PAD': return Ti.UI.KEYBOARD_NAMEPHONE_PAD;
		case 'Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION': return Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION;
		case 'Ti.UI.KEYBOARD_NUMBER_PAD': return Ti.UI.KEYBOARD_NUMBER_PAD;
		case 'Ti.UI.KEYBOARD_PHONE_PAD': return Ti.UI.KEYBOARD_PHONE_PAD;
		case 'Ti.UI.KEYBOARD_URL': return Ti.UI.KEYBOARD_URL;
		case 'Ti.UI.LANDSCAPE_LEFT': return Ti.UI.LANDSCAPE_LEFT;
		case 'Ti.UI.LANDSCAPE_RIGHT': return Ti.UI.LANDSCAPE_RIGHT;
		case 'Ti.UI.NOTIFICATION_DURATION_LONG': return Ti.UI.NOTIFICATION_DURATION_LONG;
		case 'Ti.UI.NOTIFICATION_DURATION_SHORT': return Ti.UI.NOTIFICATION_DURATION_SHORT;
		case 'Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER': return Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER;
		case 'Ti.UI.PICKER_TYPE_DATE': return Ti.UI.PICKER_TYPE_DATE;
		case 'Ti.UI.PICKER_TYPE_DATE_AND_TIME': return Ti.UI.PICKER_TYPE_DATE_AND_TIME;
		case 'Ti.UI.PICKER_TYPE_PLAIN': return Ti.UI.PICKER_TYPE_PLAIN;
		case 'Ti.UI.PICKER_TYPE_TIME': return Ti.UI.PICKER_TYPE_TIME;
		case 'Ti.UI.PORTRAIT': return Ti.UI.PORTRAIT;
		case 'Ti.UI.RETURNKEY_DEFAULT': return Ti.UI.RETURNKEY_DEFAULT;
		case 'Ti.UI.RETURNKEY_DONE': return Ti.UI.RETURNKEY_DONE;
		case 'Ti.UI.RETURNKEY_EMERGENCY_CALL': return Ti.UI.RETURNKEY_EMERGENCY_CALL;
		case 'Ti.UI.RETURNKEY_GO': return Ti.UI.RETURNKEY_GO;
		case 'Ti.UI.RETURNKEY_GOOGLE': return Ti.UI.RETURNKEY_GOOGLE;
		case 'Ti.UI.RETURNKEY_JOIN': return Ti.UI.RETURNKEY_JOIN;
		case 'Ti.UI.RETURNKEY_NEXT': return Ti.UI.RETURNKEY_NEXT;
		case 'Ti.UI.RETURNKEY_ROUTE': return Ti.UI.RETURNKEY_ROUTE;
		case 'Ti.UI.RETURNKEY_SEARCH': return Ti.UI.RETURNKEY_SEARCH;
		case 'Ti.UI.RETURNKEY_SEND': return Ti.UI.RETURNKEY_SEND;
		case 'Ti.UI.RETURNKEY_YAHOO': return Ti.UI.RETURNKEY_YAHOO;
		case 'Ti.UI.SIZE': return Ti.UI.SIZE;
		case 'Ti.UI.TEXT_ALIGNMENT_CENTER': return Ti.UI.TEXT_ALIGNMENT_CENTER;
		case 'Ti.UI.TEXT_ALIGNMENT_LEFT': return Ti.UI.TEXT_ALIGNMENT_LEFT;
		case 'Ti.UI.TEXT_ALIGNMENT_RIGHT': return Ti.UI.TEXT_ALIGNMENT_RIGHT;
		case 'Ti.UI.TEXT_AUTOCAPITALIZATION_ALL': return Ti.UI.TEXT_AUTOCAPITALIZATION_ALL;
		case 'Ti.UI.TEXT_AUTOCAPITALIZATION_NONE': return Ti.UI.TEXT_AUTOCAPITALIZATION_NONE;
		case 'Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES': return Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES;
		case 'Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS': return Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS;
		case 'Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM': return Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
		case 'Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER': return Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
		case 'Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP': return Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
		case 'Ti.UI.UNIT_CM': return Ti.UI.UNIT_CM;
		case 'Ti.UI.UNIT_DIP': return Ti.UI.UNIT_DIP;
		case 'Ti.UI.UNIT_IN': return Ti.UI.UNIT_IN;
		case 'Ti.UI.UNIT_MM': return Ti.UI.UNIT_MM;
		case 'Ti.UI.UNIT_PX': return Ti.UI.UNIT_PX;
		case 'Ti.UI.UNKNOWN': return Ti.UI.UNKNOWN;
		case 'Ti.UI.UPSIDE_PORTRAIT': return Ti.UI.UPSIDE_PORTRAIT;
	}
	return ToolsFilesystem.preprocessPath(arg);
}

//---------------------------------------------//

function loadFromFilename(name, filename)
{
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
			loadFromJSON(name, ToolsJSON.deserialize(blob.text));
		}
		else if(ToolsString.isSuffix(filename, '.xml') == true)
		{
			loadFromXML(name, ToolsXML.deserialize(blob.text));
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
}

function loadFromJSON(name, content)
{
	set(name, content);
}

function loadFromXML(name, content)
{
}

//---------------------------------------------//

module.exports = {
	set : set,
	get : get,
	remove : remove,
	merge : merge,
	loadFromFilename : loadFromFilename
};
