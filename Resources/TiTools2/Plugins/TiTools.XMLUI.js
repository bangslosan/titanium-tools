var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//
// TODO:NAMESPACE:FASTCALL
//---------------------------------------------//

var fileSystemGetFile = TiTools2.FileSystem.getFile;

//---------------------------------------------//

var xmlSerialize = TiTools2.XML.serialize;
var xmlDeserialize = TiTools2.XML.deserialize;
var xmlGetNode = TiTools2.XML.getNode;
var xmlFindNode = TiTools2.XML.findNode;
var xmlMergeNodeAttributes = TiTools2.XML.mergeNodeAttributes;

//---------------------------------------------//
// TODO:NAMESPACE:XMLUI:EXTENSION
//---------------------------------------------//

function formCacheLoadX(data, format) {
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
	function getValue(value, def) {
		if(value != undefined) {
			return value;
		}
		return def;
	}
	function getColor(value, def) {
		if(value != undefined) {
			return value;
		}
		return def;
	}

	var result = undefined;
	switch(content.name) {
		case "xmlui":
			var childs = content.childs;
			if(childs.length == 1) {
				result = convertNodeXMLUI(childs[0]);
			}
		break;
		case "vbox":
		case "hbox":
			var layout = "vertical";
			if(content.name == "hbox") {
				layout = "horizontal";
			}
			result = {
				class: "View",
				id: content.attributes.name,
				preset: "xmlui::container",
				style: {
					width: getValue(content.attributes.width, Ti.UI.FILL),
					height: getValue(content.attributes.height, Ti.UI.FILL),
					layout: layout
				},
				subviews: []
			};
			var childs = content.childs;
			var length = childs.length;
			for(var i = 0; i < length; i++) {
				var subview = convertNodeXMLUI(childs[i]);
				if(subview != undefined) {
					result.subview.push(subview);
				}
			}
		break;
		case "tbox":
		break;
		case "label":
			result = {
				class: "Label",
				id: content.attributes.name,
				preset: "xmlui::label",
				style: {
					width: getValue(content.attributes.width, Ti.UI.SIZE),
					height: getValue(content.attributes.height, Ti.UI.SIZE),
					text: getValue(content.attributes.value),
					touchEnabled: getValue(content.attributes.enabled),
					font: {
						color: getColor(content.attributes.color, "black")
					}
				}
			};
		break;
		case "date":
		break;
		case "textField":
			result = {
				class: "TextField",
				id: content.attributes.name,
				preset: "xmlui::textfield",
				style: {
					width: getValue(content.attributes.width, Ti.UI.SIZE),
					height: getValue(content.attributes.height, Ti.UI.SIZE),
					text: getValue(content.attributes.value),
					touchEnabled: getValue(content.attributes.enabled),
					font: {
						color: getColor(content.attributes.color, "black")
					}
				}
			};
		break;
		case "checkBox":
		break;
		case "listBox":
		break;
		case "dropDownList":
		break;
		case "item":
		break;
	}
	return result;
}

//---------------------------------------------//

module.exports = {
};