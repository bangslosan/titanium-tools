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
				unknownPlatform:
				unknownScreen:
				unknownMethod:
				presetNotFound:
				presetUnsupportedFormat:
				prefabNotFound:
				prefabUnsupportedFormat:
				unsupportedPlatform:
				unsupportedClassName:
				unknownClassName:
				thisNotValue:
				thisNotFunction:
			},
			ThirdParty: {
				underscore:
				underscoreString:
				moment:
			}
		}
