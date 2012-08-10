var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	UI : {
		Preset : require("TiTools/TiTools.UI.Preset")
	}
};

//---------------------------------------------//

module.exports = {
	createAlertDialog : function(params)
	{
		return Ti.UI.createAlertDialog(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.AlertDialog'
				} 
			)
		);
	},
	createEmailDialog : function(params)
	{
		return Ti.UI.createEmailDialog(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.EmailDialog'
				} 
			)
		);
	},
	createActivityIndicator : function(params)
	{
		return Ti.UI.createActivityIndicator(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.ActivityIndicator'
				} 
			)
		);
	},
	createTabGroup : function(params)
	{
		return Ti.UI.createTabGroup(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.TabGroup'
				} 
			)
		);
	},
	createTab : function(params)
	{
		return Ti.UI.createTab(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.Tab'
				} 
			)
		);
	},
	createWindow : function(params)
	{
		return Ti.UI.createWindow(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.Window'
				} 
			)
		);
	},
	createView : function(params)
	{
		return Ti.UI.createView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.View'
				} 
			)
		);
	},
	createScrollView : function(params)
	{
		return Ti.UI.createScrollView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.ScrollView'
				} 
			)
		);
	},
	createScrollableView : function(params)
	{
		return Ti.UI.createScrollableView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.ScrollableView'
				} 
			)
		);
	},
	createImageView : function(params)
	{
		return Ti.UI.createImageView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.ImageView'
				} 
			)
		);
	},
	createButton : function(params)
	{
		return Ti.UI.createButton(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.Button'
				} 
			)
		);
	},
	createButtonBar : function(params)
	{
		return Ti.UI.createButtonBar(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.ButtonBar'
				} 
			)
		);
	},
	createLabel : function(params)
	{
		return Ti.UI.createLabel(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.Label'
				} 
			)
		);
	},
	createSwitch : function(params)
	{
		return Ti.UI.createSwitch(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.Switch'
				} 
			)
		);
	},
	createSlider : function(params)
	{
		return Ti.UI.createSlider(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.Slider'
				} 
			)
		);
	},
	createProgressBar : function(params)
	{
		return Ti.UI.createProgressBar(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.ProgressBar'
				} 
			)
		);
	},
	createTextField : function(params)
	{
		return Ti.UI.createTextField(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.TextField'
				} 
			)
		);
	},
	createTextArea : function(params)
	{
		return Ti.UI.createTextArea(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.TextArea'
				} 
			)
		);
	},
	createTableView : function(params)
	{
		return Ti.UI.createTableView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.TableView'
				} 
			)
		);
	},
	createTableViewSection : function(params)
	{
		return Ti.UI.createTableViewSection(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.TableViewSection'
				}
			)
		);
	},
	createTableViewRow : function(params)
	{
		return Ti.UI.createTableViewRow(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.TableViewRow'
				}
			)
		);
	},
	createPicker : function(params)
	{
		return Ti.UI.createPicker(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.Picker'
				} 
			)
		);
	},
	createPickerColumn : function(params)
	{
		return Ti.UI.createPickerColumn(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.PickerColumn'
				}
			)
		);
	},
	createPickerRow : function(params)
	{
		return Ti.UI.createPickerRow(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.PickerRow'
				}
			)
		);
	},
	createWebView : function(params)
	{
		return Ti.Map.createWebView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.WebView'
				}
			)
		);
	},
	createGoogleMapView : function(params)
	{
		return Ti.Map.createView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.GoogleMapView'
				}
			)
		);
	},
	createFacebookLoginButton : function(params)
	{
		return Ti.Facebook.createLoginButton(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.UI.FacebookLoginButton'
				}
			)
		);
	},
	createPaintView : function(params)
	{
		var TiPaint = require('ti.paint');
		return TiPaint.createPaintView(
			TiTools.UI.Preset.merge(
				params,
				{
					uid : TiTools.Object.unigueID(),
					className : 'Ti.PaintView'
				}
			)
		);
	}
};
