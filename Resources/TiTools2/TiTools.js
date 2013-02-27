var underscore = require("TiTools2/ThirdParty/underscore")._;
var underscoreString = require("TiTools2/ThirdParty/underscore.string");
var moment = require("TiTools2/ThirdParty/moment");

//---------------------------------------------//

var SCREEN_UNKNOWN = "Unknown";
var SCREEN_SMALL = "Small";
var SCREEN_NORMAL = "Normal";
var SCREEN_LARGE = "Large";
var SCREEN_EXTRA_LARGE = "ExtraLarge";

//---------------------------------------------//

var coreIsSimulator = ((Ti.Platform.model == "Simulator") || (Ti.Platform.model.indexOf("sdk") != -1));
var coreIsAndroid = (Ti.Platform.osname == "android");
var coreIsIPhone = (Ti.Platform.osname == "iphone");
var coreIsIPad = (Ti.Platform.osname == "ipad");
var coreIsIOS = (coreIsIPhone == true) || (coreIsIPad == true);

//---------------------------------------------//

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenResolution = screenWidth * screenHeight;
var screenDpi = Ti.Platform.displayCaps.dpi;
var screenMode = SCREEN_UNKNOWN;

//---------------------------------------------//

if(coreIsIPhone == true) {
	if((screenWidth == 320) && (screenHeight == 480)) {
		screenMode = SCREEN_SMALL;
	} else if((screenWidth == 640) && (screenHeight == 960)) {
		screenMode = SCREEN_NORMAL;
	} else if((screenWidth == 640) && (screenHeight == 1036)) {
		screenMode = SCREEN_LARGE;
	}
} else if(coreIsIPad == true) {
	if((screenWidth == 1024) && (screenHeight == 768)) {
		screenMode = SCREEN_SMALL;
	} else if((screenWidth == 2048) && (screenHeight == 1536)) {
		screenMode = SCREEN_NORMAL;
	}
} else if(coreIsAndroid == true) {
	if(screenDpi <= 120) {
		screenMode = SCREEN_SMALL;
	} else if(screenDpi <= 160) {
		screenMode = SCREEN_NORMAL;
	} else if(screenDpi <= 240) {
		screenMode = SCREEN_LARGE;
	} else if(screenDpi <= 320) {
		screenMode = SCREEN_EXTRA_LARGE;
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:CORE
//---------------------------------------------//

var coreIsBoolean = underscore.isBoolean;
var coreIsNumber = underscore.isNumber;
var coreIsString = underscore.isString;
var coreIsDate = underscore.isDate;
var coreIsObject = underscore.isObject;
var coreIsArray = underscore.isArray;
var coreIsRegExp = underscore.isRegExp;
var coreIsFunction = underscore.isFunction;
var coreIsEqual = underscore.isEqual;
var coreIsEmpty = underscore.isEmpty;
var coreIsNaN = underscore.isNaN;

function coreTr(key, defaults) {
	if(coreIsFunction(L) == true) {
		return L(key, defaults);
	} else if(Ti.Locate != undefined) {
		if(coreIsFunction(Ti.Locate.getString) == true) {
			return Ti.Locate.getString(key, defaults);
		}
	}
	return defaults;
}
function coreLoadJS(filename) {
	return require(filename.replace(/\.js$/g, ""));
}

//---------------------------------------------//
// TODO:NAMESPACE:STRING
//---------------------------------------------//

var stringIsPrefix = underscoreString.startsWith;
var stringIsSuffix = underscoreString.endsWith;
var stringTrim = underscoreString.trim;
var stringTrimLeft = underscoreString.ltrim;
var stringTrimRight = underscoreString.rtrim;
var stringPaddingLeft = underscoreString.lpad;
var stringPaddingRight = underscoreString.rpad;
var stringRepeat = underscoreString.repeat;
var stringFormat = underscoreString.sprintf;

function stringIsInt(str) {
	return /^\d+$/.test(str);
}
function stringIsFloat(str) {
	return /^\d*\.\d+$|^\d+\.\d*$/.test(str);
}
function stringReplace(str, search, replace) {
	return str.split(search).join(replace);
}

//---------------------------------------------//
// TODO:NAMESPACE:DATE
//---------------------------------------------//

function dateNow(offset) {
	var date = moment();
	if(offset != undefined) {
		date.add(offset);
	}
	return date;
}
function dateMake(params) {
	var date = moment();
	if(params != undefined) {
		if(params.year != undefined) {
			date.year(params.year);
		}
		if(params.month != undefined) {
			date.month(params.month);
		}
		if(params.day != undefined) {
			date.date(params.day);
		}
		if(params.hour != undefined) {
			date.hour(params.hour);
		}
		if(params.minute != undefined) {
			date.minute(params.minute);
		}
		if(params.second != undefined) {
			date.second(params.second);
		}
	}
	return date;
}
function dateFormat(date, format) {
	if(date == undefined) {
		date = moment();
	}
	return date.format(String);
}

//---------------------------------------------//
// TODO:NAMESPACE:GLOBAL
//---------------------------------------------//

var _global = {};

//---------------------------------------------//

function globalSet(name, value) {
	_global[name] = value;
}
function globalGet(name) {
	return _global[name];
}

//---------------------------------------------//
// TODO:NAMESPACE:GEO
//---------------------------------------------//

function geoConfigure(params) {
	if(params.message != undefined) {
		Ti.Geolocation.purpose = params.message;
	}
	if(params.provider != undefined) {
		Ti.Geolocation.preferredProvider = params.provider;
	}
	if(params.accuracy != undefined) {
		Ti.Geolocation.accuracy = params.accuracy;
	}
	if(params.distanceFilter != undefined) {
		Ti.Geolocation.distanceFilter = params.distanceFilter;
	}
}
function geoCurrentPosition(params) {
	function geoCurrentPositionCallback(event) {
		try {
			if(event.success == true) {
				if(params.success != undefined) {
					params.success({
						longitude: event.coords.longitude,
						latitude: event.coords.latitude
					});
				}
			} else if(event.error != undefined) {
				if(params.failure != undefined) {
					params.failure({
						code: event.code,
						message: event.error
					});
				}
			}
		} catch(error) {
			if(params.except != undefined) {
				params.except(error);
			}
		}
		Ti.Geolocation.removeEventListener("location", geoCurrentPositionCallback);
	}
	if(Ti.Geolocation.locationServicesEnabled == true) {
		Ti.Geolocation.getCurrentPosition(geoCurrentPositionCallback);
	} else {
		geoCurrentPositionCallback();
	}
}
function geoDistance(a, b) {
	var radius = 6372795.0;
	var cl1 = Math.cos(a.latitude * Math.PI / 180.0);
	var sl1 = Math.sin(a.latitude * Math.PI / 180.0);
	var cl2 = Math.cos(b.latitude * Math.PI / 180.0);
	var sl2 = Math.sin(b.latitude * Math.PI / 180.0);
	var dc = Math.cos((b.longitude - a.longitude) * Math.PI / 180.0);
	var ds = Math.sin((b.longitude - a.longitude) * Math.PI / 180.0);
	var yy = Math.sqrt(Math.pow(cl2 * ds, 2.0) + Math.pow(cl1 * sl2 - sl1 * cl2 * dc, 2.0));
	var xx = sl1 * sl2 + cl1 * cl2 * dc;
	return Math.atan2(yy, xx) * radius;
}

//---------------------------------------------//
// TODO:NAMESPACE:PATH
//---------------------------------------------//

function pathResources() {
	var resourcesPath = utilsAppropriatePlatform({
		ios: Ti.Filesystem.resourcesDirectory,
		android: "file:///android_asset/Resources/"
	});
}
function pathControllers() {
	var resourcesPath = utilsAppropriatePlatform({
		ios: Ti.Filesystem.resourcesDirectory,
		android: ""
	});
}
function pathPreprocess(path) {
	return path.replace(/%([A-Za-z_]*)%/g,
		function(str, p1, p2, offset, s) {
			switch(p1) {
				case "ResourcesPath": return pathResources();
				case "ControllersPath": return pathControllers();
			}
			return p1;
		}
	);
}

//---------------------------------------------//
// TODO:NAMESPACE:FILESYSTEM
//---------------------------------------------//

function fileSystemGetFile(filename) {
	return Ti.Filesystem.getFile(pathPreprocess(filename));
}

//---------------------------------------------//
// TODO:NAMESPACE:NETWORK
//---------------------------------------------//

function TiToolsNetworkHttpClient(params) {
	this.handle = undefined;
	this.request = params.request;
	this.success = params.success;
	this.failure = params.failure;
	this.loading = params.loading;
	this.loaded = params.loaded;
	this.sendProgress = params.sendProgress;
	this.readProgress = params.readProgress;
}
TiToolsNetworkHttpClient.prototype.start = function() {
	if(this.handle != undefined) {
		var self = this;
		var request = this.reguest;
		var url = request.url;
		var args = reguest.args;
		var headers = reguest.headers;
		
		this.handle = Ti.Network.createHttpClient({
			cache: request.cache,
			timeout: request.timeout,
			tlsVersion: request.tlsVersion,
			autoEncodeUrl: request.autoEncodeUrl,
			autoRedirect: request.autoRedirect,
			bubbleParent: request.bubbleParent,
			enableKeepAlive: request.enableKeepAlive,
			validatesSecureCertificate: request.validatesSecureCertificate,
			withCredentials: request.withCredentials,
			username: request.username,
			password: request.password,
			onload: function(event) {
				try {
					if(coreIsFunction(self.success) == true) {
						self.success(self);
					}
				} catch(error) {
					if(coreIsFunction(self.loaded) == true) {
						self.loaded(self);
					}
				}
				this.handle = undefined;
			},
			onerror: function(event) {
				try {
					if(coreIsFunction(self.failure) == true) {
						self.failure(self);
					}
				} catch(error) {
					if(coreIsFunction(self.loaded) == true) {
						self.loaded(self);
					}
				}
				this.handle = undefined;
			},
			onsendstream: function(event) {
				if(coreIsFunction(self.sendProgress) == true) {
					self.sendProgress(self, event.progress);
				}
			},
			ondatastream: function(event) {
				if(coreIsFunction(self.readProgress) == true) {
					self.readProgress(self, event.progress);
				}
			}
		});
		if(args != undefined) {
			var count = 0;
			for(var i in args) {
				if(count == 0) {
					url += "?" + i + "=" + args[i];
				} else {
					url += "&" + i + "=" + args[i];
				}
				count++;
			}
		}
		switch(reguest.method) {
			case "GET": this.handle.open("GET", url); break;
			case "POST": this.handle.open("POST", url); break;
		}
		if(headers != undefined) {
			var count = headers.length;
			for(var i = 0; i < count; i++) {
				var header = headers[i];
				this.handle.setRequestHeader(header.type, header.value);
			}
		}
		switch(this.reguest.method) {
			case "GET": this.handle.send(); break;
			case "POST": this.handle.send(reguest.post); break;
		}
		if(coreIsFunction(this.loading) == true) {
			this.loading(this.handle);
		}
	}
}
TiToolsNetworkHttpClient.prototype.stop = function() {
	if(this.handle != undefined) {
		this.handle.abort();
		this.handle = undefined;
	}
}

//---------------------------------------------//

function networkCreateHttpClient(params) {
	var handle = undefined;
	if(Ti.Network.online == true) {
		if(coreIsObject(params.reguest) == true) {
			switch(params.reguest.method) {
				case "GET":
				case "POST":
				break;
				default:
					errorUnknownMethod("networkCreateHttpClient", params.reguest.method);
				return;
			}
			handle = new TiToolsNetworkHttpClient(params);
		}
	} else {
		if(params.failure != undefined) {
			params.failure();
		}
	}
	return handle;
}

//---------------------------------------------//
// TODO:NAMESPACE:JSON
//---------------------------------------------//

function jsonSerialize(node) {
	return JSON.stringify(node);
}
function jsonDeserialize(string) {
	return JSON.parse(string);
}

//---------------------------------------------//
// TODO:NAMESPACE:XML
//---------------------------------------------//

function xmlSerialize(node) {
	return "";
}
function xmlDeserialize(string) {
	var xml = Ti.XML.parseString(string);
	if(xml != undefined) {
		return xmlDeserializeNode(xml);
	}
	return undefined;
}
function xmlDeserializeNode(node) {
	var result = {
		name: node.nodeName,
		value: stringTrim(node.nodeValue),
		attributes: {},
		childs: []
	};
	switch(node.nodeType) {
		case node.ELEMENT_NODE:
			var attributes = node.attributes;
			for(var i = 0; i < attributes.length; i++) {
				var attribute = attributes.item(i);
				result.attributes[attribute.nodeName] = attribute.nodeValue;
			}
		break;
	}
	var child = node.firstChild;
	while(child != undefined) {
		switch(child.nodeType) {
			case child.TEXT_NODE: result.value += stringTrim(child.nodeValue); break;
			default: result.childs.push(xmlDeserializeNode(child)); break;
		}
		child = child.nextSibling;
	}
	return result;
}
function xmlGetNode(node, nodeName) {
	var childs = node.childs;
	var count = childs.length;
	for(var i = 0; i < count; i++) {
		var child = childs[i]
		if(child.name == nodeName) {
			return child;
		}
	}
	return undefined;
}
function xmlFindNode(node, nodeName) {
	var result = [];
	var childs = node.childs;
	var count = childs.length;
	for(var i = 0; i < count; i++) {
		var child = childs[i]
		if(child.name == nodeName) {
			result.push(child);
		}
	}
	return result;
}
function xmlMergeNodeAttributes(nodes) {
	var result = {};
	var count = nodes.length;
	for(var i = 0; i < count; i++) {
		var node = nodes[i];
		result = utilsCombine(node.attributes, result);
	}
	return result;
}

//---------------------------------------------//
// TODO:NAMESPACE:CSV
//---------------------------------------------//

function csvSerialize(csv) {
	function needsQuoting(str) {
		var regExp = /^\s|\s$|,|"|\n/;
		return regExp.test(str);
	}
	var out = "";
	for(var i = 0; i < csv.length; ++i) {
		var row = csv[i];
		for(var j = 0; j < row.length; ++j) {
			var cur = row[j];
			if(coreIsString(cur) == true) {
				cur = cur.replace(/"/g, "\"\"");
				if((needsQuoting(cur) == true) || (stringIsInt(cur) == true) || (stringIsFloat(cur) == true)) {
					cur = "\"" + cur + "\"";
				} else if(cur == "") {
					cur = "\"\"";
				}
			} else if(coreIsNumber(cur) == true) {
				cur = cur.toString(10);
			} else if(cur == null) {
				cur = "";
			} else {
				cur = cur.toString();
			}
			out += (j < row.length - 1) ? cur + ",": cur;
		}
		out += "\n";
	}
	return out;
}
function csvDeserialize(str, trim) {
	var inQuote = false;
	var fieldQuoted = false;
	var field = "";
	var row = [];
	var out = [];
	
	function csvDeserializeField(field) {
		if(fieldQuoted != true) {
			if(field == "") {
				field = null;
			} else if(trim == true) {
				field = stringTrim(field);
			}
			if(stringIsInt(field) == true) {
				field = parseInt(field, 10);
			} else if(stringIsFloat(field) == true) {
				field = parseFloat(field, 10);
			}
		}
		return field;
	}
	function chomp(str) {
		var last = str.length - 1;
		if(str.charAt(last) != "\n") {
			return str;
		} else {
			return str.substring(0, last);
		}
	}
	
	str = chomp(str);
	for(var i = 0; i < str.length; ++i) {
		var cur = str.charAt(i);
		if((inQuote == false) && ((cur == ",") || (cur == "\n"))) {
			field = csvDeserializeField(field);
			row.push(field);
			if(cur == "\n") {
				out.push(row);
				row = [];
			}
			field = "";
			fieldQuoted = false;
		} else {
			if(cur != "\"") {
				field += cur;
			} else {
				if(inQuote == false) {
					inQuote = true;
					fieldQuoted = true;
				} else {
					if(str.charAt(i + 1) == "\"") {
						field += "\"";
						i += 1;
					} else {
						inQuote = false;
					}
				}
			}
		}
	}
	field = csvDeserializeField(field);
	row.push(field);
	out.push(row);
	return out;
}

//---------------------------------------------//
// TODO:NAMESPACE:UI
//---------------------------------------------//

function uiCreateParams(preset, params, tiClassName) {
	var combined = {};
	if(coreIsArray(params) == true) {
		var count = params.length;
		for(var i = 0; i < count; i++) {
			var item = params[i];
			if(coreIsObject(item) == true) {
				combined = utilsCombine(item, combined);
			}
		}
	} else if(coreIsObject(params) == true) {
		combined = params;
	}
	return presetMerge(preset, combined, {
		uid: utilsUnigueID(),
		tiClassName: tiClassName
	});
}
function uiCreateTabGroup(preset, params) {
	var self = Ti.UI.createTabGroup(uiCreateParams(preset, params, "TabGroup"));
	self.addEventListener("focus", function(event) {
		TiTools.UI.currentTab = self.activeTab;
	});
	return self;
}
function uiCreateTab(preset, params, window) {
	var args = undefined;
	if(window != undefined) {
		args = [
			params,
			{
				window: window
			}
		]
	} else {
		args = params;
	}
	return Ti.UI.createTab(uiCreateParams(preset, args, "Tab"));
}
function uiCreateNavigationGroup(preset, params, window) {
	if(coreIsIPhone == true) {
		var args = [
			params,
			{
				window: window
			}
		];
		return Ti.UI.iPhone.createNavigationGroup(uiCreateParams(preset, args, "NavigationGroup"));
	} else {
		errorUnsupportedPlatform("uiCreateNavigationGroup", "only iOS");
	}
	return undefined;
}
function uiCreateWindow(preset, params) {
	var self = Ti.UI.createWindow(uiCreateParams(preset, params, "Window"));
	self.initialized = false;
	self.initialize = function(args) {
		if(self.initialized == false) {
			if(coreIsString(params.main) == true) {
				var controller = coreLoadJS(params.main);
				if(coreIsFunction(controller) == true) {
					controller(self, args);
				} else if(coreIsObject(controller) == true) {
					if(coreIsFunction(controller.onInitController) == true) {
						controller.onInitController(self, args);
					}
					if(coreIsFunction(controller.onWindowOpen) == true) {
						self.addEventListener("open", function(event) {
							controller.onWindowOpen(self, event);
						});
					}
					if(coreIsFunction(controller.onWindowClose) == true) {
						self.addEventListener("close", function(event) {
							controller.onWindowClose(self, event);
						});
					}
				}
			} else if(coreIsObject(params.main) == true) {
				if(coreIsFunction(params.main.onInitController) == true) {
					params.main.onInitController(self, args);
				}
				if(coreIsFunction(params.main.onWindowOpen) == true) {
					self.addEventListener("open", function(event) {
						params.main.onWindowOpen(self, event);
					});
				}
				if(coreIsFunction(params.main.onWindowClose) == true) {
					self.addEventListener("close", function(event) {
						params.main.onWindowClose(self, event);
					});
				}
			} else if(coreIsFunction(params.main) == true) {
				params.main(self, args);
			}
			self.initialized = true;
		}
	};
	return self;
}
function uiCreateView(preset, params) {
	return Ti.UI.createView(uiCreateParams(preset, params, "View"));
}
function uiCreateScrollView(preset, params) {
	return Ti.UI.createScrollView(uiCreateParams(preset, params, "ScrollView"));
}
function uiCreateScrollableView(preset, params) {
	return Ti.UI.createScrollableView(uiCreateParams(preset, params, "ScrollableView"));
}
function uiCreateImageView(preset, params) {
	return Ti.UI.createImageView(uiCreateParams(preset, params, "ImageView"));
}
function uiCreateMaskedImage() {
	return Ti.UI.createMaskedImage(uiCreateParams(preset, params, "MaskedImage"));
}
function uiCreateButton(preset, params) {
	return Ti.UI.createButton(uiCreateParams(preset, params, "Button"));
}
function uiCreateButtonBar(preset, params) {
	return Ti.UI.createButtonBar(uiCreateParams(preset, params, "ButtonBar"));
}
function uiCreateLabel(preset, params) {
	return Ti.UI.createLabel(uiCreateParams(preset, params, "Label"));
}
function uiCreateSwitch(preset, params) {
	return Ti.UI.createSwitch(uiCreateParams(preset, params, "Switch"));
}
function uiCreateSlider(preset, params) {
	return Ti.UI.createSlider(uiCreateParams(preset, params, "Slider"));
}
function uiCreateSearchBar(preset, params) {
	return Ti.UI.createSearchBar(uiCreateParams(preset, params, "SearchBar"));
}
function uiCreateProgressBar(preset, params) {
	return Ti.UI.createProgressBar(uiCreateParams(preset, params, "ProgressBar"));
}
function uiCreateTextField(preset, params) {
	return Ti.UI.createTextField(uiCreateParams(preset, params, "TextField"));
}
function uiCreateTextArea(preset, params) {
	return Ti.UI.createTextArea(uiCreateParams(preset, params, "TextArea"));
}
function uiCreateTableView(preset, params) {
	return Ti.UI.createTableView(uiCreateParams(preset, params, "TableView"));
}
function uiCreateTableViewSection(preset, params) {
	return Ti.UI.createTableViewSection(uiCreateParams(preset, params, "TableViewSection"));
}
function uiCreateTableViewRow(preset, params) {
	return Ti.UI.createTableViewRow(uiCreateParams(preset, params, "TableViewRow"));
}
function uiCreatePicker(preset, params) {
	return Ti.UI.createPicker(uiCreateParams(preset, params, "Picker"));
}
function uiCreatePickerColumn(preset, params) {
	return Ti.UI.createPickerColumn(uiCreateParams(preset, params, "PickerColumn"));
}
function uiCreatePickerRow(preset, params) {
	return Ti.UI.createPickerRow(uiCreateParams(preset, params, "PickerRow"));
}
function uiCreateWebView(preset, params) {
	return Ti.UI.createWebView(uiCreateParams(preset, params, "WebView"));
}
function uiCreateMapView(preset, params) {
	return Ti.Map.createView(uiCreateParams(preset, params, "MapView"));
}
function uiCreateMapViewAnnotation(preset, params) {
	return Ti.Map.createAnnotation(uiCreateParams(preset, params, "MapAnnotation"));
}
function uiCreateFacebookLoginButton(preset, params) {
	return Ti.Facebook.createLoginButton(uiCreateParams(preset, params, "FacebookLoginButton"));
}
function uiCreateAlertDialog(preset, params) {
	return Ti.UI.createAlertDialog(uiCreateParams(preset, params, "AlertDialog"));
}
function uiCreateEmailDialog(preset, params) {
	return Ti.UI.createEmailDialog(uiCreateParams(preset, params, "EmailDialog"));
}
function uiCreateOptionDialog(preset, params) {
	return Ti.UI.createOptionDialog(uiCreateParams(preset, params, "OptionDialog"));
}
function uiCreatePhoneCallDialog(phone) {
	var alert = uiCreateAlertDialog(undefined, {
		message: coreTr("TITOOLS_ALERT_REQUEST_CALL") + "\n" + phone,
		buttonNames: [
			coreTr("TITOOLS_ALERT_CALL"),
			coreTr("TITOOLS_ALERT_NO")
		],
		cancel: 1
	});
	alert.addEventListener("click", function(event) {
		if(event.index == 0) {
			var number = phone.replace(/([^0-9])+/g, "");
			if(number.length > 0) {
				Ti.Platform.openURL("tel:" + number);
			}
		}
	});
	alert.show();
}
function uiCreateActivityIndicator(preset, params) {
	return Ti.UI.createActivityIndicator(uiCreateParams(preset, params, "ActivityIndicator"));
}
function uiThirdPartyCreatePaintView(preset, params) {
	var module = coreLoadJS("ti.paint");
	if(module != undefined) {
		return TiPaint.createPaintView(createStdParams(preset, params, "PaintView"));
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:LOADER
//---------------------------------------------//

function loaderWithParams(params, callbackJs, callbackXml, callbackX) {
	function loadPlatformSingle(data) {
		if(coreIsObject(data) == true) {
			loadScreen(data);
		} else {
			loaderWithParams(data, callbackJs, callbackXml, callbackX);
		}
	}
	function loadPlatform(data) {
		var platform = utilsAppropriatePlatform(data);
		if(platform != undefined) {
			loadPlatformSingle(platform);
		}
		var any = utilsAppropriateAny(data);
		if(any != undefined) {
			loadPlatformSingle(any);
		}
	}
	function loadScreen(data) {
		var screen = utilsAppropriateScreen(data);
		if(screen != undefined) {
			loaderWithParams(screen, callbackJs, callbackXml, callbackX);
		}
		var any = utilsAppropriateAny(data);
		if(any != undefined) {
			loaderWithParams(any, callbackJs, callbackXml, callbackX);
		}
	}
	
	if(coreIsArray(params) == true) {
		for(var i = 0; i < params.length; i++) {
			loaderWithParams(params[i], callbackJs, callbackXml, callbackX);
		}
	} else if(coreIsObject(params) == true) {
		var platform = params.platform;
		var screen = params.screen;
		if((coreIsObject(platform) == true) || (coreIsObject(screen) == true)) {
			if(coreIsObject(platform) == true) {
				loadPlatform(platform);
			}
			if(coreIsObject(screen) == true) {
				loadScreen(screen);
			}
		} else {
			loadPlatform(params);
		}
	} else if(coreIsString(params) == true) {
		loaderWithFileName(params, callbackJs, callbackXml, callbackX);
	}
}
function loaderWithFileName(filename, callbackJs, callbackXml, callbackX) {
	if(stringIsSuffix(filename, ".js") == true) {
		var module = coreLoadJS(filename);
		if(callbackJs != undefined) {
			callbackJs(module);
		}
	} else if(stringIsSuffix(filename, ".json") == true) {
		var file = fileSystemGetFile(filename);
		if(file.exists() == true) {
			var blob = file.read();
			var content = jsonDeserialize(blob.text);
			if(callbackJs != undefined) {
				callbackJs(content);
			}
		} else {
			errorNotFound("loaderWithFileName", filename);
		}
	} else if(stringIsSuffix(filename, ".xml") == true) {
		var file = fileSystemGetFile(filename);
		if(file.exists() == true) {
			var blob = file.read();
			var content = xmlDeserialize(blob.text);
			if(callbackXml != undefined) {
				callbackXml(content);
			}
		} else {
			errorNotFound("loaderWithFileName", filename);
		}
	} else {
		if(callbackX != undefined) {
			callbackX(filename)
		} else {
			errorUnknownExtension("loaderWithFileName", filename);
		}
	}
}

//---------------------------------------------//
// TODO:NAMESPACE:PRESET
//---------------------------------------------//

var _preset = {};

//---------------------------------------------//

function presetSet(id, value) {
	_preset[id] = value;
}
function presetGet(id) {
	return _preset[id];
}
function presetRemove(id) {
	delete _preset[id];
}
function presetMerge(preset, paramsA, paramsB) {
	function preprocess(params) {
		function preprocessArgument(arg) {
			if(coreIsString(arg) == true) {
				arg = arg.replace(/TiTools.tr\(([A-Za-z0-9_\.]*)\)/g, function(str, p1, p2, offset, s) {
					return coreTr(p1, p1);
				});
				return utilsStringToConst(arg, pathPreprocess);
			}
			return arg;
		}
		
		for(var i in params) {
			var value = params[i];
			if(coreIsArray(value) == true) {
				params[i] = preprocess(value);
			} else if(coreIsObject(value) == true) {
				params[i] = preprocess(value);
			} else if(coreIsString(value) == true) {
				params[i] = preprocessArgument(value);
			}
		}
		return params;
	}
	
	var result = utilsClone(paramsA);
	if(preset != "") {
		if(coreIsArray(preset) == true) {
			var storage = {};
			var count = preset.length;
			for(var i = 0; i < count; i++) {
				var name = preset[i];
				if(coreIsString(name) == true) {
					var temp = presetGet(name);
					if(temp != undefined) {
						storage = utilsCombine(temp, storage);
					} else {
						errorPresetNotFound("presetMerge", name);
					}
				}
			}
			result = utilsCombine(storage, result);
		} else if(coreIsString(preset) == true) {
			var storage = presetGet(preset);
			if(storage != undefined) {
				result = utilsCombine(storage, result);
			} else {
				errorPresetNotFound("presetMerge", preset);
			}
		}
	}
	if(paramsB != undefined) {
		result = utilsCombine(paramsB, result);
	}
	return preprocess(result);
}
function presetApplyByName(object, name) {
	var params = {};
	if(coreIsArray(name) == true) {
		for(var i = 0; i < name.length; i++) {
			if(coreIsString(name[i]) == true) {
				params = utilsCombine(presetGet(name[i]), params);
			}
		}
	} else if(coreIsString(name) == true) {
		params = presetGet(name);
	}
	presetApply(object, presetPreprocess(params));
}
function presetApply(object, params) {
	for(var i in params) {
		if(coreIsArray(params[i]) == true) {
			presetApply(object[i], params[i]);
		} else if(coreIsObject(params[i]) == true) {
			presetApply(object[i], params[i]);
		} else {
			object[i] = params[i];
		}
	}
}
function presetLoad(params) {
	loaderWithParams(params, presetLoadJS, presetLoadXML, presetLoadX);
}
function presetLoadJS(content) {
	if(coreIsArray(content) == true) {
		for(var i = 0; i < content.length; i++) {
			presetLoadJS(content[i]);
		}
	} else if(coreIsObject(content) == true) {
		if((coreIsString(content.id) == false) || (coreIsObject(content.style) == false)) {
			errorPresetUnsupportedFormat("presetLoadJS", content);
		}
		presetSet(content.id, content.style);
	}
}
function presetLoadXML(content) {
	switch(content.name) {
		case "Presets":
			var items = xmlFindNode(content, "Preset");
			for(var i = 0; i < items.length; i++) {
				var item = presetLoadItemXML(items[i]);
				if(item != undefined) {
					presetLoadJS(item.id, item.style);
				}
			}
		break;
		case "Preset":
			var item = presetLoadItemXML(content);
			if(item != undefined) {
				presetLoadJS(item.id, item.style);
			}
		break;
	}
}
function presetLoadItemXML(content) {
	if(coreIsString(content.attributes.id) == true) {
		var styles = xmlFindNode(content, "Style");
		if(styles.length > 0) {
			return {
				id: content.attributes.id,
				style: xmlMergeNodeAttributes(styles)
			};
		} else {
			errorPresetUnsupportedFormat("presetLoadItemXML", preset);
		}
	} else {
		errorPresetUnsupportedFormat("presetLoadItemXML", preset);
	}
	return undefined;
}
function presetLoadX(filename) {
	pluginInvokeMethod("presetLoad", [ filename ]);
}

//---------------------------------------------//
// TODO:NAMESPACE:PREFAB
//---------------------------------------------//

var _prefab = {};

//---------------------------------------------//

function prefabSet(id, value) {
	_prefab[id] = value;
}
function prefabGet(id) {
	return _prefab[id];
}
function prefabRemove(id) {
	delete _prefab[id];
}
function prefabLoad(params) {
	loaderWithParams(params, prefabLoadJS, prefabLoadXML, prefabLoadX);
}
function prefabLoadJS(content) {
	if(coreIsArray(content) == true) {
		for(var i = 0; i < content.length; i++) {
			prefabLoadJS(content[i]);
		}
	} else if(coreIsObject(content) == true) {
		if((coreIsString(content.id) == false) || (coreIsObject(content.prefab) == false)) {
			errorPrefabUnsupportedFormat("prefabLoadJS", content);
		}
		prefabSet(content.id, content.prefab);
	}
}
function prefabLoadXML(content) {
	switch(content.name) {
		case "Prefabs":
			var items = xmlFindNode(content, "Prefab");
			for(var i = 0; i < items.length; i++) {
				var item = prefabLoadItemXML(items[i]);
				if(item != undefined) {
					prefabLoadJS(item.id, item.prefab);
				}
			}
		break;
		case "Prefab":
			var item = prefabLoadItemXML(content);
			if(item != undefined) {
				prefabLoadJS(item.id, item.prefab);
			}
		break;
	}
}
function prefabLoadItemXML(content) {
	if(coreIsString(content.attributes.id) == true) {
		var items = content.childs;
		if(items.length > 0) {
			var data = [];
			for(var i = 0; i < items.length; i++) {
				var item = formCacheLoadItemXML(items[i]);
				data.push(item);
			}
			return {
				id: content.attributes.id,
				prefab: data
			};
		} else {
			errorPresetUnsupportedFormat("prefabLoadItemXML", preset);
		}
	} else {
		errorPresetUnsupportedFormat("prefabLoadItemXML", preset);
	}
	return undefined;
}
function prefabLoadX(filename) {
	pluginInvokeMethod("prefabLoad", [ filename ]);
}

//---------------------------------------------//
// TODO:NAMESPACE:FORM:PRELOAD
//---------------------------------------------//

var _formPreload = {};

//---------------------------------------------//

function formCacheSet(id, value) {
	_formPreload[id] = value;
}
function formCacheGet(id) {
	return _formPreload[id];
}
function formCacheRemove(id) {
	delete _formPreload[id];
}
function formCacheLoad(filename) {
	var result = formCacheGet(filename);
	if(result == undefined) {
		loaderWithParams(filename, function(content) {
			result = formCacheLoadJS(content)
		}, function(content) {
			result = formCacheLoadXML(content);
		}, function(content) {
			result = formCacheLoadX(content);
		});
		if(result != undefined) {
			formCacheSet(filename, result);
		}
	}
	return result;
}
function formCacheLoadJS(content) {
	if(coreIsArray(content) == true) {
		var result = [];
		for(var i = 0; i < content.length; i++) {
			var item = formCacheLoadItemJS(content[i]);
			result.push(item);
		}
		return result;
	} else if(coreIsObject(content) == true) {
		return formCacheLoadItemJS(content);
	}
	return undefined;
}
function formCacheLoadItemJS(content) {
	if(coreIsObject(content) == true) {
		if(content.prefab != undefined) {
			if(coreIsString(content.prefab) == true) {
				var prefab = prefabGet(content.prefab);
				if(prefab != undefined) {
					content = utilsCombine(content, prefab);
				} else {
					errorPrefabNotFound("formCacheLoadItemJS", content.prefab);
				}
				delete content.prefab;
			} else {
				errorPrefabUnsupportedFormat("formCacheLoadItemJS", content.prefab);
			}
		}
		if(content.preset != undefined) {
			if(content.style != undefined) {
				content.style = presetMerge(content.preset, content.style);
			}
			delete content.preset;
		}
		if(content.root != undefined) {
			content.root = formCacheLoadItemJS(content.root);
		}
		if(content.header != undefined) {
			content.header = formCacheLoadItemJS(content.header);
		}
		if(content.footer != undefined) {
			content.footer = formCacheLoadItemJS(content.footer);
		}
		if(content.tabs != undefined) {
			for(var i = 0; i < content.tabs.length; i++) {
				content.tabs[i] = formCacheLoadItemJS(content.tabs[i]);
			}
		}
		if(content.sections != undefined) {
			for(var i = 0; i < content.sections.length; i++) {
				content.sections[i] = formCacheLoadItemJS(content.sections[i]);
			}
		}
		if(content.columns != undefined) {
			for(var i = 0; i < content.columns.length; i++) {
				content.columns[i] = formCacheLoadItemJS(content.columns[i]);
			}
		}
		if(content.rows != undefined) {
			for(var i = 0; i < content.rows.length; i++) {
				content.rows[i] = formCacheLoadItemJS(content.rows[i]);
			}
		}
		if(content.subviews != undefined) {
			for(var i = 0; i < content.subviews.length; i++) {
				content.subviews[i] = formCacheLoadItemJS(content.subviews[i]);
			}
		}
		pluginInvokeMethod("formCacheItem", [ content ]);
	}
	return content;
}
function formCacheLoadXML(content) {
	var result = {};
	switch(content.name) {
		case "Form":
			var presets = xmlFindNode(content, "Presets");
			if(presets.length == 1) {
				var items = xmlFindNode(content, "Preset");
				if(items.length > 0) {
					result.presets = [];
					for(var i = 0; i < items.length; i++) {
						var item = presetLoadItemXML(items[i]);
						if(item != undefined) {
							result.presets.push(item);
						}
					}
				}
			}
			var prefabs = xmlFindNode(content, "Prefabs");
			if(prefabs.length == 1) {
				var items = xmlFindNode(content, "Prefab");
				if(items.length > 0) {
					result.prefabs = [];
					for(var i = 0; i < items.length; i++) {
						var item = prefabLoadItemXML(items[i]);
						if(item != undefined) {
							result.prefabs.push(item);
						}
					}
				}
			}
			var views = xmlFindNode(content, "Views");
			if(views.length == 1) {
				var items = xmlFindNode(content, "Item");
				if(items.length == 1) {
					result.views = formCacheLoadItemXML(items[0]);
				} else if(items.length > 1) {
					result.views = [];
					for(var i = 0; i < items.length; i++) {
						var item = formCacheLoadItemXML(items[i]);
						if(item != undefined) {
							result.views.push(item);
						}
					}
				}
			}
		break;
		case "Item":
			result = formCacheLoadItemXML(content);
		break;
		default:
			var temp = pluginInvokeMethod("formLoadXML", [ content ]);
			if(temp != undefined) {
				result = temp;
			}
		break;
	}
	return result;
}
function formCacheLoadItemXML(content) {
	function getItems(node, name) {
		var result = [];
		var list = xmlFindNode(node, name);
		var count = list.length;
		for(var i = 0; i < count; i++) {
			result.push(formCacheLoadItemXML(list[i]));
		}
		return result;
	}
	function getItemsWithGroup(node, group, name) {
		var item = xmlGetNode(node, group);
		if(item != undefined) {
			return getItems(item, name);
		}
		return [];
	}
	function getItem(node, name) {
		var item = xmlGetNode(node, name);
		if(item != undefined) {
			return formCacheLoadItemXML(item)
		}
		return undefined;
	}
	
	var result = {};
	switch(content.name) {
		case "View":
		case "Item":
			if(coreIsString(content.attributes.class) == true) {
				result.class = content.attributes.class;
			}
			if(coreIsString(content.attributes.id) == true) {
				result.id = content.attributes.id;
			}
			if(coreIsString(content.attributes.preset) == true) {
				result.preset = content.attributes.preset;
			}
			var styles = xmlFindNode(content, "Style");
			if(styles.length > 0) {
				result.style = xmlMergeNodeAttributes(styles);
			} else {
				result.style = {};
			}
			var binds = xmlFindNode(content, "Bind");
			if(binds.length > 0) {
				result.bind = xmlMergeNodeAttributes(binds);
			} else {
				result.bind = {};
			}
			switch(result.class) {
				case "TabGroup":
					result.tabs = getItemsWithGroup(content, "Tabs", "View");
				break;
				case "Tab":
					result.window = getItem(content, "Window");
					result.subviews = getItems(content, "Views", "View");
				break;
				case "NavigationGroup":
					result.window = getItem(content, "Window");
					result.windows = getItemsWithGroup(content, "Windows", "View");
				break;
				case "TableView":
					result.header = getItem(content, "Header");
					result.footer = getItem(content, "Footer");
					result.search = getItem(content, "Search");
					result.sections = getItemsWithGroup(content, "Sections", "View");
					result.rows = getItemsWithGroup(content, "Rows", "View");
				break;
				case "TableViewSection":
					result.header = getItem(content, "Header");
					result.footer = getItem(content, "Footer");
					result.rows = getItemsWithGroup(content, "Rows", "View");
				break;
				case "Picker":
					result.columns = getItemsWithGroup(content, "Columns", "View");
					result.rows = getItemsWithGroup(content, "Rows", "View");
				break;
				case "PickerColumn":
					result.rows = getItemsWithGroup(content, "Rows", "View");
				break;
				default:
					result.subviews = getItems(content, "View");
				break;
			}
			result.items = getItems(content, "Item");
		break;
		default:
			var temp = pluginInvokeMethod("formCacheLoadItemXML", [ content ]);
			if(temp != undefined) {
				result = temp;
			}
		break;
	}
	return result;
}
function formCacheLoadX(filename) {
	return pluginInvokeMethod("formCacheLoad", [ filename ]);
}

//---------------------------------------------//
// TODO:NAMESPACE:FORM
//---------------------------------------------//

function formLoad(parent, filename, params) {
	var controller = {};
	var callback = undefined;
	if(parent != undefined) {
		switch(parent.tiClassName) {
			case "TabGroup": callback = formAppendTabGroup; break;
			case "Tab": callback = formAppendTab; break;
			case "NavigationGroup": callback = formAppendNavigationGroup; break;
			case "Window": callback = formAppendWindow; break;
			case "ScrollableView": callback = formAppendScrollableView; break;
			case "TableView": callback = formAppendTableView; break;
			case "TableViewSection": callback = formAppendTableViewSection; break;
			case "PickerColumn": callback = formAppendTableViewRow; break;
			case "HttpClient": break;
			default:
				var temp = pluginInvokeMethod("formLoad", [ parent, filename, params ]);
				if(coreIsFunction(temp) == true) {
					control = temp;
				} else {
					callback = formAppendOther;
				}
			break;
		}
	}
	var content = formCacheLoad(filename);
	if(content != undefined) {
		formLoadJS(content, params, controller, parent, callback);
	} else {
		errorNotFound("formLoad", filename);
	}
	return controller;
}
function formLoadJS(content, params, controller, parent, callback) {
	if(coreIsArray(content) == true) {
		for(var i = 0; i < content.length; i++) {
			formLoadJS(content[i], params, controller, parent, callback);
		}
	} else if(coreIsObject(content) == true) {
		if(content.views != undefined) {
			if(content.presets != undefined) {
				presetLoadJS(content.presets);
			}
			if(content.prefabs != undefined) {
				prefabLoadJS(content.prefabs);
			}
			formLoadItemJS(content.views, params, controller, parent, callback);
		} else {
			formLoadItemJS(content, params, controller, parent, callback);
		}
	}
}
function formLoadItemJS(content, params, controller, parent, callback) {
	function storeControl(store, id, control) {
		if(store[id] == undefined) {
			store[id] = control;
		} else if(coreIsArray(store[id]) == true) {
			store[id].push(control);
		} else {
			store[id] = [
				controller[id],
				control
			];
		}
	}
	function storeControlInTarget(store, targetId, id, control) {
		if(store[targetId] != undefined) {
			storeControl(store[targetId], id, control);
		}
	}
	
	var control = undefined;
	switch(content.class) {
		case "TabGroup": control = formControlTabGroup(content, params, controller, parent, callback); break;
		case "Tab": control = formControlTab(content, params, controller, parent, callback); break;
		case "NavigationGroup": control = formControlNavigationGroup(content, params, controller, parent, callback); break;
		case "Window": control = formControlWindow(content, params, controller, parent, callback); break;
		case "View": control = formControlView(content, params, controller, parent, callback); break;
		case "ScrollView": control = formControlScrollView(content, params, controller, parent, callback); break;
		case "ScrollableView": control = formControlScrollableView(content, params, controller, parent, callback); break;
		case "TableView": control = formControlTableView(content, params, controller, parent, callback); break;
		case "TableViewSection": control = formControlTableViewSection(content, params, controller, parent, callback); break;
		case "TableViewRow": control = formControlTableViewRow(content, params, controller, parent, callback); break;
		case "Picker": control = formControlPicker(content, params, controller, parent, callback); break;
		case "PickerColumn": control = formControlPickerColumn(content, params, controller, parent, callback); break;
		case "PickerRow": control = formControlOther(uiCreatePickerRow, content, params, controller, parent, callback); break;
		case "Label": control = formControlOther(uiCreateLabel, content, params, controller, parent, callback); break;
		case "TextField": control = formControlOther(uiCreateTextField, content, params, controller, parent, callback); break;
		case "TextArea": control = formControlOther(uiCreateTextArea, content, params, controller, parent, callback); break;
		case "ImageView": control = formControlOther(uiCreateImageView, content, params, controller, parent, callback); break;
		case "MaskedImage": control = formControlOther(uiCreateMaskedImage, content, params, controller, parent, callback); break;
		case "Button": control = formControlOther(uiCreateButton, content, params, controller, parent, callback); break;
		case "ButtonBar": control = formControlOther(uiCreateButtonBar, content, params, controller, parent, callback); break;
		case "Switch": control = formControlOther(uiCreateSwitch, content, params, controller, parent, callback); break;
		case "Slider": control = formControlOther(uiCreateSlider, content, params, controller, parent, callback); break;
		case "SearchBar": control = formControlOther(uiCreateSearchBar, content, params, controller, parent, callback); break;
		case "ProgressBar": control = formControlOther(uiCreateProgressBar, content, params, controller, parent, callback); break;
		case "WebView": control = formControlOther(uiCreateWebView, content, params, controller, parent, callback); break;
		case "MapView": control = formControlOther(uiCreateMapView, content, params, controller, parent, callback); break;
		case "ActivityIndicator": control = formControlOther(uiCreateActivityIndicator, content, params, controller, parent, callback); break;
		case "FacebookLoginButton": control = formControlOther(uiCreateFacebookLoginButton, content, params, controller, parent, callback); break;
		case "PaintView": control = formControlOther(uiThirdPartyCreatePaintView, content, params, controller, parent, callback); break;
		case "AlertDialog": control = formControlOther(uiCreateAlertDialog, content, params, controller, parent, callback); break;
		case "EmailDialog": control = formControlOther(uiCreateEmailDialog, content, params, controller, parent, callback); break;
		case "OptionDialog": control = formControlOther(uiCreateOptionDialog, content, params, controller, parent, callback); break;
		case "HttpClient": control = formControlHttpClient(content, params, controller, parent); break;
		default:
			var temp = pluginInvokeMethod("formLoadItem", [ content, params, controller, parent, callback ]);
			if(temp != undefined) {
				control = temp;
			} else {
				errorUnknownClassName("formLoadItemJS", content.class);
			}
		break;
	}
	var items = content.items;
	if(coreIsArray(items) == true) {
		var count = items.length;
		for(var i = 0; i < count; i++) {
			formLoadItemJS(items[i], params, controller, control);
		}
	}
	var id = content.id;
	if(id != undefined) {
		storeControl(controller, id, control);
		var target = content.target;
		if(target != "") {
			switch(target) {
				case "parent": storeControl(parent, id, control); break;
				default: storeControlInTarget(controller, target, id, control); break;
			}
		}
	}
	return control;
}

//---------------------------------------------//
// TODO:NAMESPACE:FORM:CONTROL
//---------------------------------------------//

function formControlBindStyle(styles, params) {
	var result = styles;
	if(coreIsObject(params) == true) {
		if(coreIsEmpty(styles) == false) {
			result = {};
			for(var i in styles) {
				var style = styles[i];
				if(coreIsString(style) == true) {
					result[i] = style.replace(/<%\s*([A-Za-z0-9_\.]*)\s*%>/g, function(str, p1, p2, offset, s) {
						var value = params[p1];
						if(value != undefined) {
							if(coreIsFunction(value) == true) {
								return value(params);
							}
							return value;
						} else {
							errorThisNotValue("formControlBindStyle", p1);
						}
						return p1;
					});
				} else {
					result[i] = style;
				}
			}
		}
	}
	return result;
}
function formControlBindFunction(binds, params, control) {
	if(coreIsObject(params) == true) {
		if(coreIsEmpty(binds) == false) {
			for(var i in binds) {
				var bind = params[binds[i]];
				if(coreIsFunction(bind) == true) {
					control.addEventListener(i, bind);
				} else {
					errorThisNotFunction("formControlBindFunction", bind);
				}
			}
		}
	}
}
function formControlTabGroup(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateTabGroup(content.preset, style);
	if(control != undefined) {
		var tabs = content.tabs;
		if(coreIsArray(tabs) == true) {
			var count = tabs.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(tabs[i], params, controller, control, formAppendTabGroup);
			}
		}
		var subviews = content.subviews;
		if(coreIsArray(subviews) == true) {
			var count = subviews.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, control, formAppendOther);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendTabGroup(parent, child) {
	switch(child.tiClassName) {
		case "Tab":
			child.superview = parent;
			parent.addTab(child);
		break;
		default:
			child.superview = parent;
			parent.add(child);
		break;
	}
}
function formControlTab(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var window = content.window;
	if(coreIsObject(window) == true) {
		window = formLoadItemJS(root, params, controller, control);
	}
	var control = uiCreateTab(content.preset, style, window);
	if(control != undefined) {
		var subviews = content.subviews;
		if(coreIsArray(subviews) == true) {
			var count = subviews.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, control, formAppendTab);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendTab(parent, child) {
	switch(child.tiClassName) {
		case "Window":
			child.superview = parent;
			child.window = parent;
		break;
		default:
			child.superview = parent;
			parent.add(child);
		break;
	}
}
function formControlNavigationGroup(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var window = content.window;
	if(coreIsObject(window) == true) {
		window = formLoadItemJS(root, params, controller, control);
	}
	var control = uiCreateNavigationGroup(content.preset, style, window);
	if(control != undefined) {
		var windows = content.windows;
		if(coreIsArray(windows) == true) {
			var count = windows.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(windows[i], params, controller, control, formAppendNavigationGroup);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendNavigationGroup(parent, child) {
	switch(child.tiClassName) {
		case "Window":
			child.superview = parent;
			parent.open(child);
		break;
	}
}
function formControlWindow(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateWindow(content.preset, style);
	if(control != undefined) {
		var subviews = content.subviews;
		if(coreIsArray(subviews) == true) {
			var count = subviews.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, control, formAppendWindow);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendWindow(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.add(child);
		break;
	}
}
function formControlView(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateView(content.preset, style);
	if(control != undefined) {
		var subviews = content.subviews;
		if(coreIsArray(subviews) == true) {
			var count = subviews.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, control, formAppendOther);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formControlScrollView(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateScrollView(content.preset, style);
	if(control != undefined) {
		var subviews = content.subviews;
		if(coreIsArray(subviews) == true) {
			var count = subviews.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, control, formAppendOther);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formControlScrollableView(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateScrollableView(content.preset, style);
	if(control != undefined) {
		var subviews = content.subviews;
		if(coreIsArray(subviews) == true) {
			var count = subviews.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, control, formAppendScrollableView);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendScrollableView(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.addView(child);
		break;
	}
}
function formControlTableView(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateTableView(content.preset, style);
	if(control != undefined) {
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var header = content.header;
		if(coreIsObject(header) == true) {
			formLoadItemJS(header, params, controller, control, formAppendTableViewHeader);
		}
		var footer = content.footer;
		if(coreIsObject(footer) == true) {
			formLoadItemJS(footer, params, controller, control, formAppendTableViewFooter);
		}
		var search = content.search;
		if(coreIsObject(search) == true) {
			formLoadItemJS(search, params, controller, control, formAppendTableView);
		}
		var sections = content.sections;
		var rows = content.rows;
		if(coreIsArray(sections) == true) {
			var data = control.data;
			var count = sections.length;
			for(var i = 0; i < count; i++) {
				data.push(formLoadItemJS(sections[i], params, controller, control));
			}
			control.data = data;
		} else if(coreIsArray(rows) == true) {
			var data = [];
			var count = rows.length;
			for(var i = 0; i < count; i++) {
				data.push(formLoadItemJS(rows[i], params, controller, control));
			}
			control.appendRow(data);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendTableView(parent, child) {
	switch(child.tiClassName) {
		case "SearchBar":
			child.superview = parent;
			parent.search = child;
		break;
		case "TableViewSection":
			child.superview = parent;
			var sections = parent.data;
			sections.push(child);
			parent.data = sections;
		break;
		case "TableViewRow":
			child.superview = parent;
			parent.appendRow(child);
		break;
		default:
			errorUnsupportedClassName("formAppendTableView", child.tiClassName);
		break;
	}
}
function formAppendTableViewHeader(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.headerView = child;
		break;
	}
}
function formAppendTableViewFooter(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.footerView = child;
		break;
	}
}
function formControlTableViewSection(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateTableViewSection(content.preset, style);
	if(control != undefined) {
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var header = content.header;
		if(coreIsObject(header) == true) {
			formLoadItemJS(header, params, controller, control, formAppendTableViewSectionHeader);
		}
		var footer = content.footer;
		if(coreIsObject(footer) == true) {
			formLoadItemJS(footer, params, controller, control, formAppendTableViewSectionFooter);
		}
		var rows = content.rows;
		if(coreIsArray(rows) == true) {
			var count = rows.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(rows[i], params, controller, control, formAppendTableViewSection);
			}
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendTableViewSection(parent, child) {
	switch(child.tiClassName) {
		case "TableViewRow":
			child.superview = parent;
			parent.add(child);
		break;
		default:
			errorUnsupportedClassName("formAppendTableViewSection", child.tiClassName);
		break;
	}
}
function formAppendTableViewSectionHeader(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.headerView = child;
		break;
	}
}
function formAppendTableViewSectionFooter(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.footerView = child;
		break;
	}
}
function formControlTableViewRow(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreateTableViewRow(content.preset, style);
	if(control != undefined) {
		var subviews = content.rows;
		if(coreIsArray(subviews) == true) {
			var count = subviews.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(subviews[i], params, controller, control, formAppendTableViewRow);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendTableViewRow(parent, child) {
	switch(child.tiClassName) {
		case "PickerRow":
			child.superview = parent;
			parent.addRow(child);
		break;
		default:
			errorUnsupportedClassName("formAppendTableViewRow", child.tiClassName);
		break;
	}
}
function formControlPicker(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreatePicker(content.preset, style);
	if(control != undefined) {
		var columns = content.columns;
		var rows = content.rows;
		if(coreIsArray(columns) == true) {
			var count = columns.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(columns[i], params, controller, control, formAppendPicker);
			}
		} else if(coreIsArray(rows) == true) {
			var count = rows.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(rows[i], params, controller, control, formAppendPicker);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendPicker(parent, child) {
	switch(child.tiClassName) {
		case "PickerColumn":
			child.superview = parent;
			parent.add(child);
		break;
		case "PickerRow":
			child.superview = parent;
			parent.add(child);
		break;
		default:
			errorUnsupportedClassName("formAppendPicker", child.tiClassName);
		break;
	}
}
function formControlPickerColumn(content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = uiCreatePickerColumn(content.preset, style);
	if(control != undefined) {
		var rows = content.rows;
		if(coreIsArray(rows) == true) {
			var count = rows.length;
			for(var i = 0; i < count; i++) {
				formLoadItemJS(rows[i], params, controller, control, formAppendPickerColumn);
			}
		}
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendPickerColumn(parent, child) {
	switch(child.tiClassName) {
		case "PickerRow":
			child.superview = parent;
			parent.addRow(child);
		break;
		default:
			errorUnsupportedClassName("formAppendPickerColumn", child.tiClassName);
		break;
	}
}
function formControlOther(createFunction, content, params, controller, parent, callback) {
	var style = formControlBindStyle(content.style, params);
	var control = createFunction(content.preset, style);
	if(control != undefined) {
		if(coreIsFunction(callback) == true) {
			callback(parent, control);
		}
		var bind = content.bind;
		if(coreIsObject(bind) == true) {
			formControlBindFunction(bind, params, control);
		}
	}
	return control;
}
function formAppendOther(parent, child) {
	switch(child.tiClassName) {
		default:
			child.superview = parent;
			parent.add(child);
		break;
	}
}
function formControlHttpClient(content, params, controller, parent) {
	function formControlHttpClientBind(name) {
		if(coreIsFunction(binds[name]) == true) {
			args[name] = params[name];
		} else {
			errorThisNotFunction("formControlHttpClientBind", name);
		}
	}
	
	var args = {
		request: content.request
	}
	var binds = content.bind;
	if(coreIsObject(binds) == true) {
		formControlHttpClientBind("success");
		formControlHttpClientBind("failure");
		formControlHttpClientBind("loading");
		formControlHttpClientBind("loaded");
		formControlHttpClientBind("sendProgress");
		formControlHttpClientBind("readProgress");
	}
	return networkCreateHttpClient(args);
}

//---------------------------------------------//
// TODO:NAMESPACE:PROJECT
//---------------------------------------------//

var _project = {
	controllers: {}
};

//---------------------------------------------//

function projectInitialize(params) {
	if(params != undefined) {
		projectLoadPreset(params.presets);
		projectLoadPrefab(params.prefabs);
		projectLoadController(params.controllers);
		projectLoadForm(params.forms);
		if(params.geo != undefined) {
			geoConfigure(params.geo);
		}
	}
}
function projectLoadPreset(presets) {
	if(presets != undefined) {
		presetLoad(presets);
	}
}
function projectLoadPrefab(prefabs) {
	if(prefabs != undefined) {
		prefabLoad(prefabs);
	}
}
function projectLoadController(controllers) {
	function initControllers(list) {
		if(coreIsArray(list) == true) {
			var count = list.length;
			for(var i = 0; i < count; i++) {
				var item = list[i];
				_project.controllers[item.name] = item.controller;
			}
		} else if(coreIsObject(list) == true) {
			_project.controllers = list;
		}
	}
	
	if(controllers != undefined) {
		if(coreIsObject(controllers) == true) {
			var temp = utilsAppropriatePlatform(controllers, controllers);
			if(temp != undefined) {
				initControllers(temp);
			} else {
				errorUnknownPlatform("projectLoadController", controllers);
			}
		} else if(coreIsArray(controllers) == true) {
			initControllers(controllers);
		}
	}
}
function projectLoadForm(forms) {
	function initForms(list) {
		var count = list.length;
		for(var i = 0; i < count; i++) {
			formCacheLoad(list[i]);
		}
	}
	
	if(forms != undefined) {
		if(coreIsObject(forms) == true) {
			var temp = utilsAppropriatePlatform(forms, forms);
			if(coreIsArray(temp) == true) {
				initForms(temp);
			} else {
				errorUnknownPlatform("projectLoadForm", forms);
			}
		} else if(coreIsArray(forms) == true) {
			initForms(forms);
		}
	}
}
function projectCreateTabGroup(params) {
	var preset = undefined;
	var style = {};
	var tabs = [];
	var args = undefined;
	if(coreIsObject(params) == true) {
		if(params.preset != undefined) {
			preset = params.preset;
		}
		if(coreIsObject(params.style) == true) {
			style = params.style;
		}
		if(coreIsArray(params.tabs) != undefined) {
			tabs = params.tabs;
		}
		if(params.args != undefined) {
			args = params.args;
		}
	}
	var tabgroup = uiCreateTabGroup(preset, style);
	var count = tabs.length;
	for(var i = 0; i < count; i++) {
		var tab = tabs[i];
		var window = undefined;
		if(coreIsObject(tab.window) == true) {
			window = projectCreateWindow(tab.window.controller, tab.window.params);
		}
		tabgroup.addTab(uiCreateTab(tab.preset, tab.style, window));
	}
	return tabgroup;
}
function projectCreateNavigationGroup(params) {
	var preset = undefined;
	var style = {};
	var window = undefined;
	var args = undefined;
	if(coreIsObject(params) == true) {
		if(params.preset != undefined) {
			preset = params.preset;
		}
		if(coreIsObject(params.style) == true) {
			style = params.style;
		}
		if(coreIsObject(params.window) == true) {
			window = projectCreateWindow(params.window.controller, params.window.params)
		}
		if(params.args != undefined) {
			args = params.args;
		}
	}
	return uiCreateNavigationGroup(preset, style, window);
}
function projectCreateWindowStyle(controller, params) {
	var result = {};
	var style = undefined;
	if(params != undefined) {
		if(params.style != undefined) {
			style = params.style;
		}
	}
	if(coreIsString(controller) == true) {
		var cnt = _project.controllers[controller];
		if(coreIsString(cnt) == true) {
			result = presetMerge(undefined, style, {
				main: cnt
			});
		} else {
			projectCreateWindowStyle(cnt, params);
		}
	} else if(coreIsObject(controller) == true) {
		result = presetMerge(undefined, style, {
			main: controller
		});
	} else if(coreIsFunction(controller) == true) {
		result = presetMerge(undefined, style, {
			main: controller
		});
	}
	return result;
}
function projectCreateWindow(controller, params) {
	var style = projectCreateWindowStyle(controller, params);
	if(coreIsEmpty(style) == false) {
		var preset = undefined;
		var args = undefined;
		if(params != undefined) {
			if(params.preset != undefined) {
				preset = params.preset;
			}
			if(params.args != undefined) {
				args = params.args;
			}
		}
		var window = uiCreateWindow(preset, style);
		window.initialize(args);
		return window;
	}
	return undefined;
}

//---------------------------------------------//
// TODO:NAMESPACE:UTILS
//---------------------------------------------//

var utilsUnigueID = underscore.uniqueId;
var utilsCombine = underscore.extend;
var utilsClone = underscore.clone;

function utilsSleep(ms) {
	var start = new Date().getTime();
	while(true) {
		var delta = new Date().getTime() - start;
		if(delta >= ms) {
			break;
		}
	}
}
function utilsInfo(message, list) {
	function printList(name, value, pad, inc) {
		function printPad(name, value, end) {
			var empty = stringRepeat(" ", pad);
			if(name != undefined) {
				return empty + name + " = " + value + end;
			}
			return empty + value + end;
		}
		
		var text = "";
		if(coreIsArray(value) == true) {
			text += printPad(name, "[", "\n");
			for(var i = 0; i < value.length; i++) {
				text += printList(undefined, value[i], pad + inc, inc);
			}
			text += printPad(undefined, "]", "\n");
		} else if(coreIsFunction(value) == true) {
			text += printPad(name, "\"Function\"", "\n");
		} else if(coreIsObject(value) == true) {
			text += printPad(name, "{", "\n");
			for(var i in value) {
				text += printList(i, value[i], pad + inc, inc);
			}
			text += printPad(undefined, "}", "\n");
		} else {
			text += printPad(name, "\"" + value + "\"", "\n");
		}
		return text;
	}
	
	if(coreIsArray(message) == true) {
		Ti.API.info("[TiTools]: " + jsonSerialize(message));
	} else if(coreIsObject(message) == true) {
		Ti.API.info("[TiTools]: " + jsonSerialize(message));
	} else {
		Ti.API.info("[TiTools]: " + message);
	}
	if(list != undefined) {
		Ti.API.info(printList(undefined, list, 0, 2));
	}
}
function utilsAppropriateAny(params, defaults) {
	if(params.any != undefined) {
		return params.any;
	}
	return defaults;
}
function utilsAppropriatePlatform(params, defaults) {
	if(coreIsIOS == true) {
		if(params.ios != undefined) {
			return params.ios;
		} else {
			if(coreIsIPhone == true) {
				if(params.iphone != undefined) {
					return params.iphone;
				}
			} else if(coreIsIPad == true) {
				if(params.ipad != undefined) {
					return params.ipad;
				}
			}
		}
	} else if(coreIsAndroid == true) {
		if(params.android != undefined) {
			return params.android;
		}
	}
	return defaults;
}
function utilsAppropriateScreen(params, defaults) {
	if(params != undefined) {
		switch(screenMode) {
			case SCREEN_SMALL:
				if(params.small != undefined) {
					return params.small;
				}
			break;
			case SCREEN_NORMAL:
				if(params.normal != undefined) {
					return params.normal;
				}
			break;
			case SCREEN_LARGE:
				if(params.large != undefined) {
					return params.large;
				}
			break;
			case SCREEN_EXTRA_LARGE:
				if(params.extraLarge != undefined) {
					return params.extraLarge;
				}
			break;
			default:
				if(params.unknown != undefined) {
					return params.unknown;
				}
			break;
		}
	}
	return defaults;
}
function utilsStringToConst(string, callbackDefault) {
	if(stringIsPrefix(string, "Ti.UI.") == true) {
		switch(string) {
			case "Ti.UI.FILL": return Ti.UI.FILL;
			case "Ti.UI.SIZE": return Ti.UI.SIZE;
			case "Ti.UI.PORTRAIT": return Ti.UI.PORTRAIT;
			case "Ti.UI.UPSIDE_PORTRAIT": return Ti.UI.UPSIDE_PORTRAIT;
			case "Ti.UI.LANDSCAPE_LEFT": return Ti.UI.LANDSCAPE_LEFT;
			case "Ti.UI.LANDSCAPE_RIGHT": return Ti.UI.LANDSCAPE_RIGHT;
			case "Ti.UI.INPUT_BORDERSTYLE_NONE": return Ti.UI.INPUT_BORDERSTYLE_NONE;
			case "Ti.UI.INPUT_BORDERSTYLE_BEZEL": return Ti.UI.INPUT_BORDERSTYLE_BEZEL;
			case "Ti.UI.INPUT_BORDERSTYLE_LINE": return Ti.UI.INPUT_BORDERSTYLE_LINE;
			case "Ti.UI.INPUT_BORDERSTYLE_ROUNDED": return Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
			case "Ti.UI.INPUT_BUTTONMODE_ALWAYS": return Ti.UI.INPUT_BUTTONMODE_ALWAYS;
			case "Ti.UI.INPUT_BUTTONMODE_NEVER": return Ti.UI.INPUT_BUTTONMODE_NEVER;
			case "Ti.UI.INPUT_BUTTONMODE_ONBLUR": return Ti.UI.INPUT_BUTTONMODE_ONBLUR;
			case "Ti.UI.INPUT_BUTTONMODE_ONFOCUS": return Ti.UI.INPUT_BUTTONMODE_ONFOCUS;
			case "Ti.UI.PICKER_TYPE_PLAIN": return Ti.UI.PICKER_TYPE_PLAIN;
			case "Ti.UI.PICKER_TYPE_DATE": return Ti.UI.PICKER_TYPE_DATE;
			case "Ti.UI.PICKER_TYPE_TIME": return Ti.UI.PICKER_TYPE_TIME;
			case "Ti.UI.PICKER_TYPE_DATE_AND_TIME": return Ti.UI.PICKER_TYPE_DATE_AND_TIME;
			case "Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER": return Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER;
			case "Ti.UI.TEXT_ALIGNMENT_LEFT": return Ti.UI.TEXT_ALIGNMENT_LEFT;
			case "Ti.UI.TEXT_ALIGNMENT_CENTER": return Ti.UI.TEXT_ALIGNMENT_CENTER;
			case "Ti.UI.TEXT_ALIGNMENT_RIGHT": return Ti.UI.TEXT_ALIGNMENT_RIGHT;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_NONE": return Ti.UI.TEXT_AUTOCAPITALIZATION_NONE;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES": return Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS": return Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS;
			case "Ti.UI.TEXT_AUTOCAPITALIZATION_ALL": return Ti.UI.TEXT_AUTOCAPITALIZATION_ALL;
			case "Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP": return Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
			case "Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER": return Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
			case "Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM": return Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM;
			case "Ti.UI.KEYBOARD_DEFAULT": return Ti.UI.KEYBOARD_DEFAULT;
			case "Ti.UI.KEYBOARD_ASCII": return Ti.UI.KEYBOARD_ASCII;
			case "Ti.UI.KEYBOARD_EMAIL": return Ti.UI.KEYBOARD_EMAIL;
			case "Ti.UI.KEYBOARD_URL": return Ti.UI.KEYBOARD_URL;
			case "Ti.UI.KEYBOARD_APPEARANCE_ALERT": return Ti.UI.KEYBOARD_APPEARANCE_ALERT;
			case "Ti.UI.KEYBOARD_APPEARANCE_DEFAULT": return Ti.UI.KEYBOARD_APPEARANCE_DEFAULT;
			case "Ti.UI.KEYBOARD_NAMEPHONE_PAD": return Ti.UI.KEYBOARD_NAMEPHONE_PAD;
			case "Ti.UI.KEYBOARD_NUMBER_PAD": return Ti.UI.KEYBOARD_NUMBER_PAD;
			case "Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION": return Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION;
			case "Ti.UI.KEYBOARD_DECIMAL_PAD": return Ti.UI.KEYBOARD_DECIMAL_PAD;
			case "Ti.UI.KEYBOARD_PHONE_PAD": return Ti.UI.KEYBOARD_PHONE_PAD;
			case "Ti.UI.ActivityIndicatorStyle.PLAIN": return Ti.UI.ActivityIndicatorStyle.PLAIN;
			case "Ti.UI.ActivityIndicatorStyle.DARK": return Ti.UI.ActivityIndicatorStyle.DARK;
			case "Ti.UI.ActivityIndicatorStyle.BIG": return Ti.UI.ActivityIndicatorStyle.BIG;
			case "Ti.UI.ActivityIndicatorStyle.BIG_DARK": return Ti.UI.ActivityIndicatorStyle.BIG_DARK;
		}
		if(stringIsPrefix(string, "Ti.UI.iOS.") == true) {
			switch(string) {
				case "Ti.UI.iOS.AD_SIZE_LANDSCAPE": return Ti.UI.iOS.AD_SIZE_LANDSCAPE;
				case "Ti.UI.iOS.AD_SIZE_PORTRAIT": return Ti.UI.iOS.AD_SIZE_PORTRAIT;
				case "Ti.UI.iOS.AUTODETECT_ADDRESS": return Ti.UI.iOS.AUTODETECT_ADDRESS;
				case "Ti.UI.iOS.AUTODETECT_ALL": return Ti.UI.iOS.AUTODETECT_ALL;
				case "Ti.UI.iOS.AUTODETECT_CALENDAR": return Ti.UI.iOS.AUTODETECT_CALENDAR;
				case "Ti.UI.iOS.AUTODETECT_LINK": return Ti.UI.iOS.AUTODETECT_LINK;
				case "Ti.UI.iOS.AUTODETECT_NONE": return Ti.UI.iOS.AUTODETECT_NONE;
				case "Ti.UI.iOS.AUTODETECT_PHONE": return Ti.UI.iOS.AUTODETECT_PHONE;
				case "Ti.UI.iOS.BLEND_MODE_CLEAR": return Ti.UI.iOS.BLEND_MODE_CLEAR;
				case "Ti.UI.iOS.BLEND_MODE_COLOR": return Ti.UI.iOS.BLEND_MODE_COLOR;
				case "Ti.UI.iOS.BLEND_MODE_COLOR_BURN": return Ti.UI.iOS.BLEND_MODE_COLOR_BURN;
				case "Ti.UI.iOS.BLEND_MODE_COLOR_DODGE": return Ti.UI.iOS.BLEND_MODE_COLOR_DODGE;
				case "Ti.UI.iOS.BLEND_MODE_COPY": return Ti.UI.iOS.BLEND_MODE_COPY;
				case "Ti.UI.iOS.BLEND_MODE_DARKEN": return Ti.UI.iOS.BLEND_MODE_DARKEN;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_ATOP": return Ti.UI.iOS.BLEND_MODE_DESTINATION_ATOP;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_IN": return Ti.UI.iOS.BLEND_MODE_DESTINATION_IN;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_OUT": return Ti.UI.iOS.BLEND_MODE_DESTINATION_OUT;
				case "Ti.UI.iOS.BLEND_MODE_DESTINATION_OVER": return Ti.UI.iOS.BLEND_MODE_DESTINATION_OVER;
				case "Ti.UI.iOS.BLEND_MODE_DIFFERENCE": return Ti.UI.iOS.BLEND_MODE_DIFFERENCE;
				case "Ti.UI.iOS.BLEND_MODE_EXCLUSION": return Ti.UI.iOS.BLEND_MODE_EXCLUSION;
				case "Ti.UI.iOS.BLEND_MODE_HARD_LIGHT": return Ti.UI.iOS.BLEND_MODE_HARD_LIGHT;
				case "Ti.UI.iOS.BLEND_MODE_HUE": return Ti.UI.iOS.BLEND_MODE_HUE;
				case "Ti.UI.iOS.BLEND_MODE_LIGHTEN": return Ti.UI.iOS.BLEND_MODE_LIGHTEN;
				case "Ti.UI.iOS.BLEND_MODE_LUMINOSITY": return Ti.UI.iOS.BLEND_MODE_LUMINOSITY;
				case "Ti.UI.iOS.BLEND_MODE_MULTIPLY": return Ti.UI.iOS.BLEND_MODE_MULTIPLY;
				case "Ti.UI.iOS.BLEND_MODE_NORMAL": return Ti.UI.iOS.BLEND_MODE_NORMAL;
				case "Ti.UI.iOS.BLEND_MODE_OVERLAY": return Ti.UI.iOS.BLEND_MODE_OVERLAY;
				case "Ti.UI.iOS.BLEND_MODE_PLUS_DARKER": return Ti.UI.iOS.BLEND_MODE_PLUS_DARKER;
				case "Ti.UI.iOS.BLEND_MODE_PLUS_LIGHTER": return Ti.UI.iOS.BLEND_MODE_PLUS_LIGHTER;
				case "Ti.UI.iOS.BLEND_MODE_SATURATION": return Ti.UI.iOS.BLEND_MODE_SATURATION;
				case "Ti.UI.iOS.BLEND_MODE_SCREEN": return Ti.UI.iOS.BLEND_MODE_SCREEN;
				case "Ti.UI.iOS.BLEND_MODE_SOFT_LIGHT": return Ti.UI.iOS.BLEND_MODE_SOFT_LIGHT;
				case "Ti.UI.iOS.BLEND_MODE_SOURCE_ATOP": return Ti.UI.iOS.BLEND_MODE_SOURCE_ATOP;
				case "Ti.UI.iOS.BLEND_MODE_SOURCE_IN": return Ti.UI.iOS.BLEND_MODE_SOURCE_IN;
				case "Ti.UI.iOS.BLEND_MODE_SOURCE_OUT": return Ti.UI.iOS.BLEND_MODE_SOURCE_OUT;
				case "Ti.UI.iOS.BLEND_MODE_XOR": return Ti.UI.iOS.BLEND_MODE_XOR;
				case "Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND": return Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND;
				case "Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND": return Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND;
				case "Ti.UI.iOS.COLOR_UNDER_PAGE_BACKGROUND": return Ti.UI.iOS.COLOR_UNDER_PAGE_BACKGROUND;
				case "Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND": return Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND;
			}
		}
		if(stringIsPrefix(string, "Ti.UI.iPad.") == true) {
			switch(string) {
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UNKNOWN": return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UNKNOWN;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP": return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_UP;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT": return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN": return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_DOWN;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT": return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT;
				case "Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY": return Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY;
			}
		}
		if(stringIsPrefix(string, "Ti.UI.iPhone.") == true) {
			switch(string) {
				case "Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT": return Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT;
				case "Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET": return Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET;
				case "Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN": return Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN;
				case "Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET": return Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL": return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE": return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL": return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL;
				case "Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL": return Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL;
				case "Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN": return Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
				case "Ti.UI.iPhone.ActivityIndicatorStyle.DARK": return Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
				case "Ti.UI.iPhone.ActivityIndicatorStyle.BIG": return Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
				case "Ti.UI.iPhone.AnimationStyle.NONE": return Ti.UI.iPhone.AnimationStyle.NONE;
				case "Ti.UI.iPhone.AnimationStyle.CURL_UP": return Ti.UI.iPhone.AnimationStyle.CURL_UP;
				case "Ti.UI.iPhone.AnimationStyle.CURL_DOWN": return Ti.UI.iPhone.AnimationStyle.CURL_DOWN;
				case "Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT": return Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
				case "Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT": return Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT;
				case "Ti.UI.iPhone.ProgressBarStyle.DEFAULT": return Ti.UI.iPhone.TableViewSeparatorStyle.DEFAULT;
				case "Ti.UI.iPhone.ProgressBarStyle.PLAIN": return Ti.UI.iPhone.TableViewSeparatorStyle.PLAIN;
				case "Ti.UI.iPhone.ProgressBarStyle.BAR": return Ti.UI.iPhone.TableViewSeparatorStyle.BAR;
				case "Ti.UI.iPhone.RowAnimationStyle.NONE": return Ti.UI.iPhone.RowAnimationStyle.NONE;
				case "Ti.UI.iPhone.RowAnimationStyle.FADE": return Ti.UI.iPhone.RowAnimationStyle.FADE;
				case "Ti.UI.iPhone.RowAnimationStyle.TOP": return Ti.UI.iPhone.RowAnimationStyle.TOP;
				case "Ti.UI.iPhone.RowAnimationStyle.RIGHT": return Ti.UI.iPhone.RowAnimationStyle.RIGHT;
				case "Ti.UI.iPhone.RowAnimationStyle.BOTTOM": return Ti.UI.iPhone.RowAnimationStyle.BOTTOM;
				case "Ti.UI.iPhone.RowAnimationStyle.LEFT": return Ti.UI.iPhone.RowAnimationStyle.LEFT;
				case "Ti.UI.iPhone.ScrollIndicatorStyle.DEFAULT": return Ti.UI.iPhone.ScrollIndicatorStyle.DEFAULT;
				case "Ti.UI.iPhone.ScrollIndicatorStyle.BLACK": return Ti.UI.iPhone.ScrollIndicatorStyle.BLACK;
				case "Ti.UI.iPhone.ScrollIndicatorStyle.WHITE": return Ti.UI.iPhone.ScrollIndicatorStyle.WHITE;
				case "Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE": return Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE;
				case "Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE": return Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE;
				case "Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_SLIDE": return Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_SLIDE;
				case "Ti.UI.iPhone.StatusBar.DEFAULT": return Ti.UI.iPhone.StatusBar.DEFAULT;
				case "Ti.UI.iPhone.StatusBar.GRAY": return Ti.UI.iPhone.StatusBar.GRAY;
				case "Ti.UI.iPhone.StatusBar.GREY": return Ti.UI.iPhone.StatusBar.GREY;
				case "Ti.UI.iPhone.StatusBar.OPAQUE_BLACK": return Ti.UI.iPhone.StatusBar.OPAQUE_BLACK;
				case "Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK": return Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;
				case "Ti.UI.iPhone.SystemButton.ACTION": return Ti.UI.iPhone.SystemButton.ACTION;
				case "Ti.UI.iPhone.SystemButton.ACTIVITY": return Ti.UI.iPhone.SystemButton.ACTIVITY;
				case "Ti.UI.iPhone.SystemButton.ADD": return Ti.UI.iPhone.SystemButton.ADD;
				case "Ti.UI.iPhone.SystemButton.BOOKMARKS": return Ti.UI.iPhone.SystemButton.BOOKMARKS;
				case "Ti.UI.iPhone.SystemButton.CAMERA": return Ti.UI.iPhone.SystemButton.CAMERA;
				case "Ti.UI.iPhone.SystemButton.CANCEL": return Ti.UI.iPhone.SystemButton.CANCEL;
				case "Ti.UI.iPhone.SystemButton.COMPOSE": return Ti.UI.iPhone.SystemButton.COMPOSE;
				case "Ti.UI.iPhone.SystemButton.CONTACT_ADD": return Ti.UI.iPhone.SystemButton.CONTACT_ADD;
				case "Ti.UI.iPhone.SystemButton.DISCLOSURE": return Ti.UI.iPhone.SystemButton.DISCLOSURE;
				case "Ti.UI.iPhone.SystemButton.DONE": return Ti.UI.iPhone.SystemButton.DONE;
				case "Ti.UI.iPhone.SystemButton.EDIT": return Ti.UI.iPhone.SystemButton.EDIT;
				case "Ti.UI.iPhone.SystemButton.FAST_FORWARD": return Ti.UI.iPhone.SystemButton.FAST_FORWARD;
				case "Ti.UI.iPhone.SystemButton.FIXED_SPACE": return Ti.UI.iPhone.SystemButton.FIXED_SPACE;
				case "Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE": return Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE;
				case "Ti.UI.iPhone.SystemButton.INFO_DARK": return Ti.UI.iPhone.SystemButton.INFO_DARK;
				case "Ti.UI.iPhone.SystemButton.INFO_LIGHT": return Ti.UI.iPhone.SystemButton.INFO_LIGHT;
				case "Ti.UI.iPhone.SystemButton.ORGANIZE": return Ti.UI.iPhone.SystemButton.ORGANIZE;
				case "Ti.UI.iPhone.SystemButton.PAUSE": return Ti.UI.iPhone.SystemButton.PAUSE;
				case "Ti.UI.iPhone.SystemButton.PLAY": return Ti.UI.iPhone.SystemButton.PLAY;
				case "Ti.UI.iPhone.SystemButton.REFRESH": return Ti.UI.iPhone.SystemButton.REFRESH;
				case "Ti.UI.iPhone.SystemButton.REPLY": return Ti.UI.iPhone.SystemButton.REPLY;
				case "Ti.UI.iPhone.SystemButton.REWIND": return Ti.UI.iPhone.SystemButton.REWIND;
				case "Ti.UI.iPhone.SystemButton.SAVE": return Ti.UI.iPhone.SystemButton.SAVE;
				case "Ti.UI.iPhone.SystemButton.SPINNER": return Ti.UI.iPhone.SystemButton.SPINNER;
				case "Ti.UI.iPhone.SystemButton.STOP": return Ti.UI.iPhone.SystemButton.STOP;
				case "Ti.UI.iPhone.SystemButton.TRASH": return Ti.UI.iPhone.SystemButton.TRASH;
				case "Ti.UI.iPhone.SystemButtonStyle.PLAIN": return Ti.UI.iPhone.SystemButtonStyle.PLAIN;
				case "Ti.UI.iPhone.SystemButtonStyle.DONE": return Ti.UI.iPhone.SystemButtonStyle.DONE;
				case "Ti.UI.iPhone.SystemButtonStyle.BAR": return Ti.UI.iPhone.SystemButtonStyle.BAR;
				case "Ti.UI.iPhone.SystemButtonStyle.BORDERED": return Ti.UI.iPhone.SystemButtonStyle.BORDERED;
				case "Ti.UI.iPhone.TableViewScrollPosition.NONE": return Ti.UI.iPhone.TableViewScrollPosition.NONE;
				case "Ti.UI.iPhone.TableViewScrollPosition.TOP": return Ti.UI.iPhone.TableViewScrollPosition.TOP;
				case "Ti.UI.iPhone.TableViewScrollPosition.MIDDLE": return Ti.UI.iPhone.TableViewScrollPosition.MIDDLE;
				case "Ti.UI.iPhone.TableViewScrollPosition.BOTTOM": return Ti.UI.iPhone.TableViewScrollPosition.BOTTOM;
				case "Ti.UI.iPhone.TableViewStyle.GROUPED": return Ti.UI.iPhone.TableViewStyle.GROUPED;
				case "Ti.UI.iPhone.TableViewStyle.PLAIN": return Ti.UI.iPhone.TableViewStyle.PLAIN;
				case "Ti.UI.iPhone.TableViewSeparatorStyle.NONE": return Ti.UI.iPhone.TableViewSeparatorStyle.NONE;
				case "Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE": return Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE;
			}
		}
		if(stringIsPrefix(string, "Ti.UI.Android.") == true) {
			switch(string) {
				case "Ti.UI.Android.LINKIFY_ALL": return Ti.UI.Android.LINKIFY_ALL;
				case "Ti.UI.Android.LINKIFY_EMAIL_ADDRESSES": return Ti.UI.Android.LINKIFY_EMAIL_ADDRESSES;
				case "Ti.UI.Android.LINKIFY_MAP_ADDRESSES": return Ti.UI.Android.LINKIFY_MAP_ADDRESSES;
				case "Ti.UI.Android.LINKIFY_PHONE_NUMBERS": return Ti.UI.Android.LINKIFY_PHONE_NUMBERS;
				case "Ti.UI.Android.LINKIFY_WEB_URLS": return Ti.UI.Android.LINKIFY_WEB_URLS;
				case "Ti.UI.Android.PIXEL_FORMAT_A_8": return Ti.UI.Android.PIXEL_FORMAT_A_8;
				case "Ti.UI.Android.PIXEL_FORMAT_LA_88": return Ti.UI.Android.PIXEL_FORMAT_LA_88;
				case "Ti.UI.Android.PIXEL_FORMAT_L_8": return Ti.UI.Android.PIXEL_FORMAT_L_8;
				case "Ti.UI.Android.PIXEL_FORMAT_OPAQUE": return Ti.UI.Android.PIXEL_FORMAT_OPAQUE;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBA_4444": return Ti.UI.Android.PIXEL_FORMAT_RGBA_4444;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBA_5551": return Ti.UI.Android.PIXEL_FORMAT_RGBA_5551;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBA_8888": return Ti.UI.Android.PIXEL_FORMAT_RGBA_8888;
				case "Ti.UI.Android.PIXEL_FORMAT_RGBX_8888": return Ti.UI.Android.PIXEL_FORMAT_RGBX_8888;
				case "Ti.UI.Android.PIXEL_FORMAT_RGB_332": return Ti.UI.Android.PIXEL_FORMAT_RGB_332;
				case "Ti.UI.Android.PIXEL_FORMAT_RGB_565": return Ti.UI.Android.PIXEL_FORMAT_RGB_565;
				case "Ti.UI.Android.PIXEL_FORMAT_RGB_888": return Ti.UI.Android.PIXEL_FORMAT_RGB_888;
				case "Ti.UI.Android.PIXEL_FORMAT_TRANSLUCENT": return Ti.UI.Android.PIXEL_FORMAT_TRANSLUCENT;
				case "Ti.UI.Android.PIXEL_FORMAT_TRANSPARENT": return Ti.UI.Android.PIXEL_FORMAT_TRANSPARENT;
				case "Ti.UI.Android.PIXEL_FORMAT_UNKNOWN": return Ti.UI.Android.PIXEL_FORMAT_UNKNOWN;
				case "Ti.UI.Android.SOFT_INPUT_ADJUST_PAN": return Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
				case "Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE": return Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE;
				case "Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED": return Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED;
				case "Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN": return Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN;
				case "Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_VISIBLE": return Ti.UI.Android.SOFT_INPUT_STATE_ALWAYS_VISIBLE;
				case "Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN": return Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN;
				case "Ti.UI.Android.SOFT_INPUT_STATE_UNSPECIFIED": return Ti.UI.Android.SOFT_INPUT_STATE_UNSPECIFIED;
				case "Ti.UI.Android.SOFT_INPUT_STATE_VISIBLE": return Ti.UI.Android.SOFT_INPUT_STATE_VISIBLE;
				case "Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS": return Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS;
				case "Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS": return Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
				case "Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS": return Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
				case "Ti.UI.Android.SWITCH_STYLE_CHECKBOX": return Ti.UI.Android.SWITCH_STYLE_CHECKBOX;
				case "Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON": return Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON;
				case "Ti.UI.Android.WEBVIEW_PLUGINS_OFF": return Ti.UI.Android.WEBVIEW_PLUGINS_OFF;
				case "Ti.UI.Android.WEBVIEW_PLUGINS_ON": return Ti.UI.Android.WEBVIEW_PLUGINS_ON;
				case "Ti.UI.Android.WEBVIEW_PLUGINS_ON_DEMAND": return Ti.UI.Android.WEBVIEW_PLUGINS_ON_DEMAND;
			}
		}
	} else if(stringIsPrefix(string, "TiTools2.") == true) {
		if(stringIsPrefix(string, "TiTools2.Screen.") == true) {
			switch(string) {
				case "TiTools.Screen.UNKNOWN": return SCREEN_UNKNOWN;
				case "TiTools.Screen.SMALL": return SCREEN_SMALL;
				case "TiTools.Screen.NORMAL": return SCREEN_NORMAL;
				case "TiTools.Screen.LARGE": return SCREEN_LARGE;
				case "TiTools.Screen.EXTRA_LARGE": return SCREEN_EXTRA_LARGE;
			}
		}
	}
	var temp = pluginInvokeMethod("stringToConst", [ string ]);
	if(temp != undefined) {
		return temp;
	}
	return callbackDefault(string);
}

//---------------------------------------------//
// TODO:NAMESPACE:PLUGINS
//---------------------------------------------//

var _plugin = {};

//---------------------------------------------//

function pluginIsLoad(name) {
	if(_plugin[name] != undefined) {
		return true;
	}
	return false;
}
function pluginLoad(plugin, namespace) {
	var path = namespace.split(".");
	if(path.length > 0) {
		if(pluginIsLoad(path) == false) {
			pluginLoadWithPath(plugin, path);
		}
	}
}
function pluginLoadWithPath(plugin, path) {
	var instance = TiTools;
	var count = path.length - 1;
	for(var i = 1; i < count; i++) {
		if(instance[path[i]] == undefined) {
			instance[path[i]] = {};
		}
		instance = instance[path[i]];
	}
	var module = coreLoadJS(plugin);
	if(module != undefined) {
		utilsInfo("Plugin loaded: \"" + plugin + "\"", module);
		instance[path[count]] = module;
		_plugin[plugin] = module;
	}
}
function pluginInvokeMethod(name, args, defaults) {
	var has = "Has" + name;
	for(var i = 0; i < _plugin.length; i++) {
		var plugin = _plugin[i];
		if(coreIsFunction(plugin[has]) == false) {
			var hasMethod = plugin[has];
			if(hasMethod.apply(this, args) == true) {
				if(coreIsFunction(plugin[name]) == false) {
					var callMethod = plugin[name];
					return callMethod.apply(this, args);
				}
			}
		}
	}
	return defaults;
}

//---------------------------------------------//
// TODO:NAMESPACE:ERROR
//---------------------------------------------//

function errorNotFound(func, file) {
	utilsInfo(coreTr("TITOOLS_ERROR_NOT_FOUND"), stringFormat(" - In %s\n - File %s\n", func, file));
}
function errorUnknownExtension(func, file) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_EXTENSION"), stringFormat(" - In %s\n - File %s\n", func, file));
}
function errorUnknownPlatform(func, platform) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_PLATFORM"), stringFormat(" - In %s\n - Platform %s\n", func, jsonSerialize(platform)));
}
function errorUnknownScreen(func, screen) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_SCREEN"), stringFormat(" - In %s\n - Screen %s\n", func, jsonSerialize(screen)));
}
function errorUnknownMethod(func, method) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_METHOD"), stringFormat(" - In %s\n - Method %s\n", func, method));
}
function errorPresetNotFound(func, preset) {
	utilsInfo(coreTr("TITOOLS_ERROR_PRESET_NOT_FOUND"), stringFormat(" - In %s\n - Preset %s\n", func, preset));
}
function errorPresetUnsupportedFormat(func, preset) {
	utilsInfo(coreTr("TITOOLS_ERROR_PRESET_UNSUPPORTED_FORMAT"), stringFormat(" - In %s\n - Preset %s\n", func, jsonSerialize(preset)));
}
function errorPrefabNotFound(func, prefab) {
	utilsInfo(coreTr("TITOOLS_ERROR_PREFAB_NOT_FOUND"), stringFormat(" - In %s\n - Prefab %s\n", func, prefab));
}
function errorPrefabUnsupportedFormat(func, prefab) {
	utilsInfo(coreTr("TITOOLS_ERROR_PREFAB_UNSUPPORTED_FORMAT"), stringFormat(" - In %s\n - File %s\n", Prefab, jsonSerialize(prefab)));
}
function errorUnsupportedPlatform(func, platform) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNSUPPORTED_PLATFORM"), stringFormat(" - In %s\n - Platform %s\n", func, platform));
}
function errorUnsupportedClassName(func, tiClassName) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNSUPPORTED_CLASS_NAME"), stringFormat(" - In %s\n - ClassName %s\n", func, tiClassName));
}
function errorUnknownClassName(func, tiClassName) {
	utilsInfo(coreTr("TITOOLS_ERROR_UNKNOWN_CLASS_NAME"), stringFormat(" - In %s\n - ClassName %s\n", func, tiClassName));
}
function errorThisNotValue(func, name) {
	utilsInfo(coreTr("TITOOLS_ERROR_THIS_NOT_VALUE"), stringFormat(" - In %s\n - Value name %s\n", func, name));
}
function errorThisNotFunction(func, name) {
	utilsInfo(coreTr("TITOOLS_ERROR_THIS_NOT_FUNCTION"), stringFormat(" - In %s\n - Function name %s\n", func, name));
}

//---------------------------------------------//
// TODO:NAMESPACE:RESULT
//---------------------------------------------//

var TiTools = {
	tr: coreTr,
	loadJS: coreLoadJS,
	isSimulator: coreIsSimulator,
	isAndroid: coreIsAndroid,
	isIOS: coreIsIOS,
	isIPhone: coreIsIPhone,
	isIPad: coreIsIPad,
	isBoolean: coreIsBoolean,
	isNumber: coreIsNumber,
	isString: coreIsString,
	isDate: coreIsDate,
	isObject: coreIsObject,
	isArray: coreIsArray,
	isRegExp: coreIsRegExp,
	isFunction: coreIsFunction,
	isEqual: coreIsEqual,
	isEmpty: coreIsEmpty,
	isNaN: coreIsNaN,
	String: {
		isInt: stringIsInt,
		isFloat: stringIsFloat,
		replace: stringReplace,
		isPrefix: stringIsPrefix,
		isSuffix: stringIsSuffix,
		trim: stringTrim,
		trimLeft: stringTrimLeft,
		trimRight: stringTrimRight,
		paddingLeft: stringPaddingLeft,
		paddingRight: stringPaddingRight,
		repeat: stringRepeat,
		format: stringFormat
	},
	Date: {
		now: dateNow,
		make: dateMake,
		format: dateFormat
	},
	Global: {
		set: globalSet,
		get: globalGet
	},
	Screen: {
		UNKNOWN: SCREEN_UNKNOWN,
		SMALL: SCREEN_SMALL,
		NORMAL: SCREEN_NORMAL,
		LARGE: SCREEN_LARGE,
		EXTRA_LARGE: SCREEN_EXTRA_LARGE,
		width: screenWidth,
		height: screenHeight,
		resolution: screenResolution,
		dpi: screenDpi,
		mode: screenMode
	},
	Geo: {
		configure: geoConfigure,
		currentPosition: geoCurrentPosition,
		distance: geoDistance
	},
	Path: {
		resources: pathResources(),
		controllers: pathControllers(),
		preprocess: pathPreprocess
	},
	FileSystem: {
		getFile: fileSystemGetFile
	},
	Network: {
		isOnline: Ti.Network.online,
		createClientHttp: networkCreateHttpClient
	},
	JSON: {
		serialize: jsonSerialize,
		deserialize: jsonDeserialize
	},
	XML: {
		Private: {
			deserializeNode: xmlDeserializeNode
		},
		serialize: xmlSerialize,
		deserialize: xmlDeserialize,
		getNode: xmlGetNode,
		findNode: xmlFindNode,
		mergeNodeAttributes: xmlMergeNodeAttributes
	},
	CSV: {
		serialize: csvSerialize,
		deserialize: csvDeserialize
	},
	UI: {
		Private: {
			createParams: uiCreateParams
		},
		currentTab: undefined,
		createTabGroup: uiCreateTabGroup,
		createTab: uiCreateTab,
		createNavigationGroup: uiCreateNavigationGroup,
		createWindow: uiCreateWindow,
		createView: uiCreateView,
		createScrollView: uiCreateScrollView,
		createScrollableView: uiCreateScrollableView,
		createImageView: uiCreateImageView,
		createMaskedImage: uiCreateMaskedImage,
		createButton: uiCreateButton,
		createButtonBar: uiCreateButtonBar,
		createLabel: uiCreateLabel,
		createSwitch: uiCreateSwitch,
		createSlider: uiCreateSlider,
		createSearchBar: uiCreateSearchBar,
		createProgressBar: uiCreateProgressBar,
		createTextField: uiCreateTextField,
		createTextArea: uiCreateTextArea,
		createTableView: uiCreateTableView,
		createTableViewSection: uiCreateTableViewSection,
		createTableViewRow: uiCreateTableViewRow,
		createPicker: uiCreatePicker,
		createPickerColumn: uiCreatePicker,
		createPickerRow: uiCreatePicker,
		createWebView: uiCreateWebView,
		createMapView: uiCreateMapView,
		createMapViewAnnotation: uiCreateMapViewAnnotation,
		createFacebookLoginButton: uiCreateFacebookLoginButton,
		createAlertDialog: uiCreateAlertDialog,
		createEmailDialog: uiCreateEmailDialog,
		createOptionDialog: uiCreateOptionDialog,
		createPhoneCallDialog: uiCreatePhoneCallDialog,
		createActivityIndicator: uiCreateActivityIndicator,
		ThirdParty: {
			ceatePaintView: uiThirdPartyCreatePaintView
		}
	},
	Loader: {
		Private: {
			withParams: loaderWithParams,
			withFileName: loaderWithFileName
		}
	},
	Preset: {
		Private: {
			loadJS: presetLoadJS,
			loadXML: presetLoadXML,
			loadItemXML: presetLoadItemXML,
			loadX: presetLoadX
		},
		set: presetSet,
		get: presetGet,
		remove: presetRemove,
		merge: presetMerge,
		applyByName: presetApplyByName,
		apply: presetApply,
		load: presetLoad
	},
	Prefab: {
		Private: {
			loadJS: prefabLoadJS,
			loadXML: prefabLoadXML,
			loadItemXML: prefabLoadItemXML,
			loadX: prefabLoadX
		},
		set: prefabSet,
		get: prefabGet,
		remove: prefabRemove,
		load: prefabLoad
	},
	Form: {
		Private: {
			loadJS: formLoadJS,
			loadItemJS: formLoadItemJS,
			Control: {
				controlBindStyle: formControlBindStyle,
				controlBindFunction: formControlBindFunction,
				controlTabGroup: formControlTabGroup,
				appendTabGroup: formAppendTabGroup,
				controlTab: formControlTab,
				appendTab: formAppendTab,
				controlNavigationGroup: formControlNavigationGroup,
				appendNavigationGroup: formAppendNavigationGroup,
				controlWindow: formControlWindow,
				appendWindow: formAppendWindow,
				controlView: formControlView,
				controlScrollView: formControlScrollView,
				controlScrollableView: formControlScrollableView,
				appendScrollableView: formAppendScrollableView,
				controlTableView: formControlTableView,
				appendTableView: formAppendTableView,
				appendTableViewHeader: formAppendTableViewHeader,
				appendTableViewFooter: formAppendTableViewFooter,
				controlTableViewSection: formControlTableViewSection,
				appendTableViewSection: formAppendTableViewSection,
				appendTableViewSectionHeader: formAppendTableViewSectionHeader,
				appendTableViewSectionFooter: formAppendTableViewSectionFooter,
				controlTableViewRow: formControlTableViewRow,
				appendTableViewRow: formAppendTableViewRow,
				controlPicker: formControlPicker,
				appendPicker: formAppendPicker,
				controlPickerColumn: formControlPickerColumn,
				appendPickerColumn: formAppendPickerColumn,
				controlOther: formControlOther,
				appendOther: formAppendOther,
				controlHttpClient: formControlHttpClient
			}
		},
		Cache: {
			Private: {
				loadJS: formCacheLoadJS,
				loadItemJS: formCacheLoadItemJS,
				loadXML: formCacheLoadXML,
				loadItemXML: formCacheLoadItemXML,
				loadX: formCacheLoadX
			},
			set: formCacheSet,
			get: formCacheGet,
			remove: formCacheRemove,
			load: formCacheLoad
		},
		load: formLoad
	},
	Project: {
		Private: {
			createWindowStyle: projectCreateWindowStyle
		},
		initialize: projectInitialize,
		loadPreset: projectLoadPreset,
		loadPrefab: projectLoadPrefab,
		loadController: projectLoadController,
		loadForm: projectLoadForm,
		createTabGroup: projectCreateTabGroup,
		createWindow: projectCreateWindow
	},
	Utils: {
		info: utilsInfo,
		sleep: utilsSleep,
		unigueID: utilsUnigueID,
		combine: utilsCombine,
		clone: utilsClone,
		appropriateAny: utilsAppropriateAny,
		appropriatePlatform: utilsAppropriatePlatform,
		appropriateScreen: utilsAppropriateScreen,
		stringToConst: utilsStringToConst
	},
	Plugin: {
		Private: {
			loadWithPath: pluginLoadWithPath,
			invokeMethod: pluginInvokeMethod
		},
		isLoad: pluginIsLoad,
		load: pluginLoad
	},
	Error: {
		notFound: errorNotFound,
		unknownExtension: errorUnknownExtension,
		unknownPlatform: errorUnknownPlatform,
		unknownScreen: errorUnknownScreen,
		unknownMethod: errorUnknownMethod,
		presetNotFound: errorPresetNotFound,
		presetUnsupportedFormat: errorPresetUnsupportedFormat,
		prefabNotFound: errorPrefabNotFound,
		prefabUnsupportedFormat: errorPrefabUnsupportedFormat,
		unsupportedPlatform: errorUnsupportedPlatform,
		unsupportedClassName: errorUnsupportedClassName,
		unknownClassName: errorUnknownClassName,
		thisNotValue: errorThisNotValue,
		thisNotFunction: errorThisNotFunction
	},
	ThirdParty: {
		underscore: underscore,
		underscoreString: underscoreString,
		moment: moment
	}
};

//---------------------------------------------//

module.exports = TiTools;

//---------------------------------------------//