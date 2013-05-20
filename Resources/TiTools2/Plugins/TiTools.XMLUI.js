var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:HOOK
//---------------------------------------------//

var xmluiHookVBox = xmluiDefaultHookVBox;
var xmluiHookHBox = xmluiDefaultHookHBox;
var xmluiHookTBox = xmluiDefaultHookTBox;
var xmluiHookLabel = xmluiDefaultHookLabel;
var xmluiHookDate = xmluiDefaultHookDate;
var xmluiHookTextField = xmluiDefaultHookTextField;
var xmluiHookCheckBox = xmluiDefaultHookCheckBox;
var xmluiHookListBox = xmluiDefaultHookListBox;
var xmluiHookDropDownList = xmluiDefaultHookDropDownList;

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:FASTCALL
//---------------------------------------------//

var coreIsBoolean = TiTools2.isBoolean;
var coreIsNumber = TiTools2.isNumber;
var coreIsString = TiTools2.isString;
var coreIsDate = TiTools2.isDate;
var coreIsArray = TiTools2.isArray;
var coreIsRegExp = TiTools2.isRegExp;
var coreIsFunction = TiTools2.isFunction;
var coreIsEqual = TiTools2.isEqual;
var coreIsEmpty = TiTools2.isEmpty;
var coreIsNaN = TiTools2.isNaN;

//---------------------------------------------//

var fileSystemGetFile = TiTools2.FileSystem.getFile;

//---------------------------------------------//

var xmlSerialize = TiTools2.XML.serialize;
var xmlDeserialize = TiTools2.XML.deserialize;
var xmlGetNode = TiTools2.XML.getNode;
var xmlFindNode = TiTools2.XML.findNode;
var xmlMergeNodeAttributes = TiTools2.XML.mergeNodeAttributes;

//---------------------------------------------//

var utilsInfo = TiTools2.Utils.info;
var utilsCombine = TiTools2.Utils.combine;

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:EXTENSION
//---------------------------------------------//

function formCacheLoad(data, format) {
	var result = undefined;
	if (format == "xmlui") {
		var xml = xmlDeserialize(data);
		if(xml != undefined) {
			result = convertNodeXMLUI(xml);
		}
	} else if (stringIsSuffix(data, ".xmlui") == true) {
		var file = fileSystemGetFile(data);
		if (file.exists() == true) {
			var blob = file.read();
			if(blob != undefined) {
				var xml = xmlDeserialize(blob.text);
				if(xml != undefined) {
					result = convertNodeXMLUI(xml);
				}
			}
		}
	}
	return result;
}

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:PRIVATE
//---------------------------------------------//

function convertNodeXMLUI(content) {
	var result = undefined;
	var atts = content.attributes;
	switch(content.name) {
		case "xmlui":
			var childs = content.childs;
			if(childs.length == 1) {
				result = convertNodeXMLUI(childs[0]);
			}
		break;
		case "vbox":
			result = xmluiHookVBox(content, {
				xmlui: {
					name: content.name
				},
				width: xmluiGetValue(atts.width, Ti.UI.FILL),
				height: xmluiGetValue(atts.height, Ti.UI.SIZE),
				layout: "vertical"
			});
		break;
		case "hbox":
			result = xmluiHookHBox(content, {
				xmlui: {
					name: content.name
				},
				width: xmluiGetValue(atts.width, Ti.UI.FILL),
				height: xmluiGetValue(atts.height, Ti.UI.SIZE),
				horizontalWrap: false,
				layout: "horizontal"
			});
		break;
		case "tbox":
			result = xmluiHookTBox(content, {
				xmlui: {
					name: content.name,
					columns: atts.columns
				},
				width: xmluiGetValue(atts.width, Ti.UI.FILL),
				height: xmluiGetValue(atts.height, Ti.UI.SIZE),
				layout: "vertical"
			});
		break;
		case "label":
			result = xmluiHookLabel(content, {
				xmlui: {
					name: content.name,
					interactive: content.interactive,
					required: content.required
				},
				width: xmluiGetValue(atts.width),
				height: xmluiGetValue(atts.height),
				touchEnabled: xmluiGetValue(atts.enabled, true),
				text: xmluiGetValue(atts.value),
				font: {
					color: xmluiGetColor(atts.color, "black")
				}
			});
		break;
		case "date":
			result = xmluiHookDate(content, {
				xmlui: {
					name: content.name,
					interactive: content.interactive,
					required: content.required
				},
				width: xmluiGetValue(atts.width),
				height: xmluiGetValue(atts.height),
				touchEnabled: xmluiGetValue(atts.enabled, true),
				hintText: xmluiGetValue(atts.tip),
				text: xmluiGetValue(atts.value),
				font: {
					color: xmluiGetColor(atts.color, "black")
				}
			});
		break;
		case "textField":
			result = xmluiHookTextField(content, {
				xmlui: {
					name: content.name,
					interactive: content.interactive,
					required: content.required
				},
				width: xmluiGetValue(atts.width),
				height: xmluiGetValue(atts.height),
				touchEnabled: xmluiGetValue(atts.enabled, true),
				maxLength: xmluiGetValue(atts.maxLength),
				hintText: xmluiGetValue(atts.tip),
				value: xmluiGetValue(atts.value),
				font: {
					color: xmluiGetColor(atts.color, "black")
				}
			});
		break;
		case "checkBox":
			result = xmluiHookCheckBox(content, {
				xmlui: {
					name: content.name,
					interactive: content.interactive,
					required: content.required
				},
				width: xmluiGetValue(atts.width),
				height: xmluiGetValue(atts.height),
				touchEnabled: xmluiGetValue(atts.enabled, true),
				title: xmluiGetValue(atts.tip, ""),
				value: xmluiGetBool(atts.value, false),
				font: {
					color: xmluiGetColor(atts.color, "black")
				}
			});
		break;
		case "listBox":
			result = xmluiHookListBox(content, {
				xmlui: {
					name: content.name,
					interactive: content.interactive,
					required: content.required,
					items: xmluiListChild(content)
				},
				width: xmluiGetValue(atts.width),
				height: xmluiGetValue(atts.height),
				touchEnabled: xmluiGetValue(atts.enabled, true),
				hintText: xmluiGetValue(atts.tip),
				items: xmluiListChild(content),
				font: {
					color: xmluiGetColor(atts.color, "black")
				}
			});
		break;
		case "dropDownList":
			result = xmluiHookDropDownList(content, {
				xmlui: {
					name: content.name,
					interactive: content.interactive,
					required: content.required,
					items: xmluiListChild(content)
				},
				width: xmluiGetValue(atts.width),
				height: xmluiGetValue(atts.height),
				touchEnabled: xmluiGetValue(atts.enabled, true),
				hintText: xmluiGetValue(atts.tip),
				items: xmluiListChild(content),
				font: {
					color: xmluiGetColor(atts.color, "black")
				}
			});
		break;
	}
	return result;
}

//---------------------------------------------//

function xmluiGetValue(value, def) {
	if(value != undefined) {
		return value;
	}
	return def;
}

function xmluiGetColor(value, def) {
	if(value != undefined) {
		return value;
	}
	return def;
}

function xmluiGetBool(value) {
	if(value == false) {
		return false;
	}
	return true;
}

//---------------------------------------------//

function xmluiContainerChild(container, content) {
	var childs = content.childs;
	var length = childs.length;
	for(var i = 0; i < length; i++) {
		var subview = convertNodeXMLUI(childs[i]);
		if(subview != undefined) {
			container.subviews.push(subview);
		}
	}
}

function xmluiContainerTableChild(container, content, columns) {
	var childs = content.childs;
	var length = childs.length;
	for(var i = 0; i < length; i += columns) {
		xmluiContainerTableRow(container, childs, i, i + columns);
	}
}

function xmluiContainerTableRow(container, items, index, length) {
	function validateSize(size) {
		if(coreIsNumber(size) == false) {
			return false;
		}
		if(coreIsNaN(size) == true) {
			return false;
		}
		return true;
	}
	
	var self = undefined;
	var row = {
		class: "View",
		preset: "xmlui::tbox::row",
		style: {
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			horizontalWrap: false,
			layout: "horizontal"
		},
		bind: {
			"titools::create": function(event) {
				self = event.source;
			},
			postlayout: function(event) {
				if(self == event.source) {
					var subviews = self.children;
					if(subviews != undefined) {
						var width = 0;
						var count = 0;
						for(var i in subviews) {
							var view = subviews[i];
							if(validateSize(view.width) == true) {
								width += view.width;
							} else {
								count++;
							}
						}
						if(count > 0) {
							var image = self.toImage();
							if(image != undefined) {
								var size = Number(image.width - width) / count;
								if(validateSize(size) == true) {
									for(var i in subviews) {
										var view = subviews[i];
										if(validateSize(view.width) == false) {
											view.applyProperties({
												width: size
											});
										}
									}
								}
							}
						}
					}
				}
			}
		},
		subviews: []
	};
	for(var i = index; i < length; i++) {
		var subview = convertNodeXMLUI(items[i]);
		if(subview != undefined) {
			row.subviews.push(subview);
		}
	}
	container.subviews.push(row);
}

function xmluiListChild(content) {
	var result = [];
	var items = xmlFindNode(content, "item");
	var length = items.length;
	for(var i = 0; i < length; i++) {
		var item = items[i];
		result.push({
			text: item.attributes.text,
			value: item.attributes.value
		});
	}
	return result;
}

//---------------------------------------------//

function xmluiDefaultHookVBox(content, style) {
	var container = {
		class: "View",
		name: style.xmlui.name,
		preset: "xmlui::vbox",
		style: style,
		subviews: []
	};
	xmluiContainerChild(container, content);
	return container;
}

function xmluiDefaultHookHBox(content, style) {
	var container = {
		class: "View",
		name: style.xmlui.name,
		preset: "xmlui::hbox",
		style: style,
		subviews: []
	};
	xmluiContainerChild(container, content);
	return container;
}

function xmluiDefaultHookTBox(content, style) {
	var container = {
		class: "View",
		name: style.xmlui.name,
		preset: "xmlui::tbox",
		style: style,
		subviews: []
	};
	xmluiContainerTableChild(container, content, Number(style.xmlui.columns));
	return container;
}

//---------------------------------------------//

function xmluiDefaultHookLabel(content, style) {
	return {
		class: "Label",
		name: style.xmlui.name,
		preset: "xmlui::label",
		style: style
	};
}

function xmluiDefaultHookDate(content, style) {
	return {
		class: "TextField",
		name: style.xmlui.name,
		preset: "xmlui::date",
		style: style
	};
}

function xmluiDefaultHookTextField(content, style) {
	var self = undefined;
	return {
		class: "TextField",
		name: style.xmlui.name,
		preset: "xmlui::textfield",
		style: utilsCombine(style, {
			validate: function() {
				var result = false;
				if(self != undefined) {
					var xmlui = style.xmlui;
					if(xmlui.regex != undefined) {
						var regexp = new RegExp(xmlui.regex, "g");
						if (regexp.test(self.value) == true) {
							result = true;
						}
					} else {
						result = true;
					}
				}
				return result;
			}
		}),
		bind: {
			"titools::create": function(event) {
				self = event.source;
			}
		}
	};
}

function xmluiDefaultHookCheckBox(content, style) {
	return {
		class: "Switch",
		name: style.xmlui.name,
		preset: "xmlui::checkbox",
		style: style
	};
}

function xmluiDefaultHookListBox(content, style) {
	var list = {
		class: "TextField",
		name: style.xmlui.name,
		preset: "xmlui::listbox",
		style: style
	};
	return list;
}

function xmluiDefaultHookDropDownList(content, style) {
	var list = {
		class: "TextField",
		name: style.xmlui.name,
		preset: "xmlui::dropdownlist",
		style: style
	};
	return list;
}

//---------------------------------------------//

module.exports = {
	Private: {
		containerChild: xmluiContainerChild,
		containerTableChild: xmluiContainerTableChild,
		containerTableRow: xmluiContainerTableRow,
		listChild: xmluiListChild,
		vbox: xmluiDefaultHookVBox,
		hbox: xmluiDefaultHookHBox,
		tbox: xmluiDefaultHookTBox,
		label: xmluiDefaultHookLabel,
		date: xmluiDefaultHookDate,
		textField: xmluiDefaultHookTextField,
		checkBox: xmluiDefaultHookCheckBox,
		listBox: xmluiDefaultHookListBox,
		dropDownList: xmluiDefaultHookDropDownList
	},
	Hook: {
		vbox: xmluiHookVBox,
		hbox: xmluiHookHBox,
		tbox: xmluiHookTBox,
		label: xmluiHookLabel,
		date: xmluiHookDate,
		textField: xmluiHookTextField,
		checkBox: xmluiHookCheckBox,
		listBox: xmluiHookListBox,
		dropDownList: xmluiHookDropDownList
	},
	formCacheLoad: formCacheLoad
};