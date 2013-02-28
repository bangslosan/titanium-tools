TiTools
==============
		This project is a library for Titatium Appcelerator that solves different common problems and allows 
	to create real cross platform applications for iOs/Android. It uses only internal Titanium modules so you don't 
	need to install additional native modules.

1. Description
=============================
		In our library we implemented pattern called MVC. It allows us to use controllers to implement common logic 
	on all platforms. Also we implemented loader of interface from presets in JSON files so now it is possible to divide 
	business logic and GUI.
		In library we implemented loading of prefabs and presets for interface so it is possible to create custom 
	widgets like buttons and label. Also now you can use liquid design for Android.
		In addition we added functions to work with date, network and so on that works in the same mode both on 
	iOs and	Android.

2. Installation
=============================
		Just copy the project and import it as regular project.

3. Projects created with TiTools
=============================
	- VSK
	- yaCourier
	- Medarhive
	- Instablind
	- KrasnayPolayna-Mobile
	- Chelyabinsk Invest Bank
	
4. Description TiTools
=============================
	TiTools: {
		Object:
		String:
		DateTime:
		Storage:
		Locate:
		Filesystem:
		Platform:
		HTML:
		HTTP:
		JSON:
		XML:
		CSV:
		Utils:
		GeoLocation:
		UI: {
			Controls:
			Loader:
			Prefab:
			Preset:
		}
	}

5. Description TiTools2
=============================
	Need to do:
		1. HTTP request stack
		2. Improve XML view's pattern
		3. XMLUI parser
	
	Need this plugins:
		1. Parse
		2. itsbeta
	
	Module description:
		TiTools2: {
			tr:
			loadJS:
			isSimulator:
			isAndroid:
			isIOS:
			isIPhone:
			isIPad:
			isBoolean:
			isNumber:
			isString:
			isDate:
			isObject:
			isArray:
			isRegExp:
			isFunction:
			isEqual:
			isEmpty:
			isNaN:
			String: {
				isInt:
				isFloat:
				replace:
				isPrefix:
				isSuffix:
				trim:
				trimLeft:
				trimRight:
				paddingLeft:
				paddingRight:
				repeat:
				format:
				lines:
			},
			Date: {
				now:
				make:
				format:
			},
			Global: {
				set:
				get:
			},
			Screen: {
				UNKNOWN:
				SMALL:
				NORMAL:
				LARGE:
				EXTRA_LARGE:
				width:
				height:
				resolution:
				dpi:
				mode:
			},
			Geo: {
				configure:
				currentPosition:
				distance:
			},
			Path: {
				resources:
				controllers:
				preprocess:
			},
			FileSystem: {
				getFile:
			},
			Network: {
				isOnline:
				createClientHttp:
			},
			JSON: {
				serialize:
				deserialize:
			},
			XML: {
				Private: {
					deserializeNode:
				},
				serialize:
				deserialize:
				getNode:
				findNode:
				mergeNodeAttributes:
			},
			CSV: {
				serialize:
				deserialize:
			},
			UI: {
				Private: {
					createParams:
				},
				currentTab:
				createTabGroup:
				createTab:
				createNavigationGroup:
				createWindow:
				createView:
				createScrollView:
				createScrollableView:
				createImageView:
				createMaskedImage:
				createButton:
				createButtonBar:
				createLabel:
				createSwitch:
				createSlider:
				createSearchBar:
				createProgressBar:
				createTextField:
				createTextArea:
				createTableView:
				createTableViewSection:
				createTableViewRow:
				createPicker:
				createPickerColumn:
				createPickerRow:
				createWebView:
				createMapView:
				createMapViewAnnotation:
				createFacebookLoginButton:
				createAlertDialog:
				createEmailDialog:
				createOptionDialog:
				createPhoneCallDialog:
				createActivityIndicator:
				ThirdParty: {
					createPaintView:
				}
			},
			Loader: {
				Private: {
					withParams:
					withFileName:
				}
			},
			Preset: {
				Private: {
					loadJS:
					loadXML:
					loadItemXML:
					loadX:
				},
				set:
				get:
				remove:
				merge:
				applyByName:
				apply:
				load:
			},
			Prefab: {
				Private: {
					loadJS:
					loadXML:
					loadItemXML:
					loadX:
				},
				set:
				get:
				remove:
				load:
			},
			Form: {
				Private: {
					loadJS:
					loadItemJS:
					Control: {
						controlBindStyle:
						controlBindFunction:
						controlTabGroup:
						appendTabGroup:
						controlTab:
						appendTab:
						controlNavigationGroup:
						appendNavigationGroup:
						controlWindow:
						appendWindow:
						controlView:
						controlScrollView:
						controlScrollableView:
						appendScrollableView:
						controlTableView:
						appendTableView:
						appendTableViewHeader:
						appendTableViewFooter:
						controlTableViewSection:
						appendTableViewSection:
						appendTableViewSectionHeader:
						appendTableViewSectionFooter:
						controlTableViewRow:
						appendTableViewRow:
						controlPicker:
						appendPicker:
						controlPickerColumn:
						appendPickerColumn:
						controlOther:
						appendOther:
						controlHttpClient:
					}
				},
				Cache: {
					Private: {
						loadJS:
						loadItemJS:
						loadXML:
						loadItemXML:
						loadX:
					},
					set:
					get:
					remove:
					load:
				},
				load:
			},
			Project: {
				Private: {
					createWindowStyle:
				},
				initialize:
				loadPreset:
				loadPrefab:
				loadController:
				loadForm:
				createTabGroup:
				createNavigationGroup:
				createWindow:
			},
			Utils: {
				info:
				sleep:
				unigueID:
				combine:
				clone:
				appropriateAny:
				appropriatePlatform:
				appropriateScreen:
				stringToConst:
			},
			Plugin: {
				Private: {
					loadWithPath:
					invokeMethod:
				},
				isLoad:
				load:
			},
			Error: {
				notFound:
				unknownExtension:
				unsupportedPlatform:
				unknownPlatform:
				unsupportedScreen:
				unknownScreen:
				unsupportedClassName:
				unknownClassName:
				unknownMethod:
				presetNotFound:
				presetUnsupportedFormat:
				prefabNotFound:
				prefabUnsupportedFormat:
				thisNotValue:
				thisNotFunction:
			},
			ThirdParty: {
				underscore:
				underscoreString:
				moment:
			}
		}
	
	[Public] Function description:
		TiTools2.tr:
		TiTools2.loadJS:
		TiTools2.isSimulator:
		TiTools2.isAndroid:
		TiTools2.isIOS:
		TiTools2.isIPhone:
		TiTools2.isIPad:
		TiTools2.isBoolean:
		TiTools2.isNumber:
		TiTools2.isString:
		TiTools2.isDate:
		TiTools2.isObject:
		TiTools2.isArray:
		TiTools2.isRegExp:
		TiTools2.isFunction:
		TiTools2.isEqual:
		TiTools2.isEmpty:
		TiTools2.isNaN:
		TiTools2.String.isInt:
		TiTools2.String.isFloat:
		TiTools2.String.replace:
		TiTools2.String.isPrefix:
		TiTools2.String.isSuffix:
		TiTools2.String.trim:
		TiTools2.String.trimLeft:
		TiTools2.String.trimRight:
		TiTools2.String.paddingLeft:
		TiTools2.String.paddingRight:
		TiTools2.String.repeat:
		TiTools2.String.format:
		TiTools2.String.lines:
		TiTools2.Date.now:
		TiTools2.Date.make:
		TiTools2.Date.format:
		TiTools2.Global.set:
		TiTools2.Global.get:
		TiTools2.Screen.UNKNOWN:
		TiTools2.Screen.SMALL:
		TiTools2.Screen.NORMAL:
		TiTools2.Screen.LARGE:
		TiTools2.Screen.EXTRA_LARGE:
		TiTools2.Screen.width:
		TiTools2.Screen.height:
		TiTools2.Screen.resolution:
		TiTools2.Screen.dpi:
		TiTools2.Screen.mode:
		TiTools2.Geo.configure:
		TiTools2.Geo.currentPosition:
		TiTools2.Geo.distance:
		TiTools2.Path.resources:
		TiTools2.Path.controllers:
		TiTools2.Path.preprocess:
		TiTools2.FileSystem.getFile:
		TiTools2.Network.isOnline:
		TiTools2.Network.createClientHttp:
		TiTools2.JSON.serialize:
		TiTools2.JSON.deserialize:
		TiTools2.XML.serialize:
		TiTools2.XML.deserialize:
		TiTools2.XML.getNode:
		TiTools2.XML.findNode:
		TiTools2.XML.mergeNodeAttributes:
		TiTools2.SCV.serialize:
		TiTools2.SCV.deserialize:
		TiTools2.UI.currentTab:
		TiTools2.UI.createTabGroup:
		TiTools2.UI.createTab:
		TiTools2.UI.createNavigationGroup:
		TiTools2.UI.createWindow:
		TiTools2.UI.createView:
		TiTools2.UI.createScrollView:
		TiTools2.UI.createScrollableView:
		TiTools2.UI.createImageView:
		TiTools2.UI.createMaskedImage:
		TiTools2.UI.createButton:
		TiTools2.UI.createButtonBar:
		TiTools2.UI.createLabel:
		TiTools2.UI.createSwitch:
		TiTools2.UI.createSlider:
		TiTools2.UI.createSearchBar:
		TiTools2.UI.createProgressBar:
		TiTools2.UI.createTextField:
		TiTools2.UI.createTextArea:
		TiTools2.UI.createTableView:
		TiTools2.UI.createTableViewSection:
		TiTools2.UI.createTableViewRow:
		TiTools2.UI.createPicker:
		TiTools2.UI.createPickerColumn:
		TiTools2.UI.createPickerRow:
		TiTools2.UI.createWebView:
		TiTools2.UI.createMapView:
		TiTools2.UI.createMapViewAnnotation:
		TiTools2.UI.createFacebookLoginButton:
		TiTools2.UI.createAlertDialog:
		TiTools2.UI.createEmailDialog:
		TiTools2.UI.createOptionDialog:
		TiTools2.UI.createPhoneCallDialog:
		TiTools2.UI.createActivityIndicator:
		TiTools2.UI.ThirdParty.createPaintView:
		TiTools2.Preset.set:
		TiTools2.Preset.get:
		TiTools2.Preset.remove:
		TiTools2.Preset.merge:
		TiTools2.Preset.applyByName:
		TiTools2.Preset.apply:
		TiTools2.Preset.load:
		TiTools2.Prefab.set:
		TiTools2.Prefab.get:
		TiTools2.Prefab.remove:
		TiTools2.Prefab.load:
		TiTools2.Form.Cache.set:
		TiTools2.Form.Cache.get:
		TiTools2.Form.Cache.remove:
		TiTools2.Form.Cache.load:
		TiTools2.Form.load:
		TiTools2.Project.initialize:
		TiTools2.Project.loadPreset:
		TiTools2.Project.loadPrefab:
		TiTools2.Project.loadController:
		TiTools2.Project.loadForm:
		TiTools2.Project.createTabGroup:
		TiTools2.Project.createNavigationGroup:
		TiTools2.Project.createWindow:
		TiTools2.Utils.info:
		TiTools2.Utils.sleep:
		TiTools2.Utils.unigueID:
		TiTools2.Utils.combine:
		TiTools2.Utils.clone:
		TiTools2.Utils.appropriateAny:
		TiTools2.Utils.appropriatePlatform:
		TiTools2.Utils.appropriateScreen:
		TiTools2.Utils.stringToConst:
		TiTools2.Plugin.isLoad:
		TiTools2.Plugin.load:
		TiTools2.Error.notFound:
		TiTools2.Error.unknownExtension:
		TiTools2.Error.unsupportedPlatform:
		TiTools2.Error.unknownPlatform:
		TiTools2.Error.unsupportedScreen:
		TiTools2.Error.unknownScreen:
		TiTools2.Error.unsupportedClassName:
		TiTools2.Error.unknownClassName:
		TiTools2.Error.unknownMethod:
		TiTools2.Error.presetNotFound:
		TiTools2.Error.presetUnsupportedFormat:
		TiTools2.Error.prefabNotFound:
		TiTools2.Error.prefabUnsupportedFormat:
		TiTools2.Error.thisNotValue:
		TiTools2.Error.thisNotFunction:
		TiTools2.ThirdParty.underscore:
		TiTools2.ThirdParty.underscoreString:
		TiTools2.ThirdParty.moment:
	
	[Private] Function description:
		TiTools2.XML.Private.deserializeNode:
		TiTools2.UI.Private.createParams:
		TiTools2.Loader.Private.withParams:
		TiTools2.Loader.Private.withFileName:
		TiTools2.Preset.Private.loadJS:
		TiTools2.Preset.Private.loadXML:
		TiTools2.Preset.Private.loadItemXML:
		TiTools2.Preset.Private.loadX:
		TiTools2.Prefab.Private.loadJS:
		TiTools2.Prefab.Private.loadXML:
		TiTools2.Prefab.Private.loadItemXML:
		TiTools2.Prefab.Private.loadX:
		TiTools2.Form.Private.loadJS:
		TiTools2.Form.Private.loadItemJS:
		TiTools2.Form.Private.Control.controlBindStyle:
		TiTools2.Form.Private.Control.controlBindFunction:
		TiTools2.Form.Private.Control.controlTabGroup:
		TiTools2.Form.Private.Control.appendTabGroup:
		TiTools2.Form.Private.Control.controlTab:
		TiTools2.Form.Private.Control.appendTab:
		TiTools2.Form.Private.Control.controlNavigationGroup:
		TiTools2.Form.Private.Control.appendNavigationGroup:
		TiTools2.Form.Private.Control.controlWindow:
		TiTools2.Form.Private.Control.appendWindow:
		TiTools2.Form.Private.Control.controlView:
		TiTools2.Form.Private.Control.controlScrollView:
		TiTools2.Form.Private.Control.controlScrollableView:
		TiTools2.Form.Private.Control.appendScrollableView:
		TiTools2.Form.Private.Control.controlTableView:
		TiTools2.Form.Private.Control.appendTableView:
		TiTools2.Form.Private.Control.appendTableViewHeader:
		TiTools2.Form.Private.Control.appendTableViewFooter:
		TiTools2.Form.Private.Control.controlTableViewSection:
		TiTools2.Form.Private.Control.appendTableViewSection:
		TiTools2.Form.Private.Control.appendTableViewSectionHeader:
		TiTools2.Form.Private.Control.appendTableViewSectionFooter:
		TiTools2.Form.Private.Control.controlTableViewRow:
		TiTools2.Form.Private.Control.appendTableViewRow:
		TiTools2.Form.Private.Control.controlPicker:
		TiTools2.Form.Private.Control.appendPicker:
		TiTools2.Form.Private.Control.controlPickerColumn:
		TiTools2.Form.Private.Control.appendPickerColumn:
		TiTools2.Form.Private.Control.controlOther:
		TiTools2.Form.Private.Control.appendOther:
		TiTools2.Form.Private.Control.controlHttpClient:
		TiTools2.Form.Cache.Private.loadJS:
		TiTools2.Form.Cache.Private.loadItemJS:
		TiTools2.Form.Cache.Private.loadXML:
		TiTools2.Form.Cache.Private.loadItemXML:
		TiTools2.Form.Cache.Private.loadX:
		TiTools2.Project.Private.createWindowStyle:
		TiTools2.Plugin.Private.loadWithPath:
		TiTools2.Plugin.Private.invokeMethod:
	
