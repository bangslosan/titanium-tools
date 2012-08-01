var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	UI : {
		Ext : {
			TabGroup : require("TiTools/TiTools.UI.Ext.TabGroup"),
			Tab : require("TiTools/TiTools.UI.Ext.Tab")
		},
		Preset : require("TiTools/TiTools.UI.Preset")
	}
};

//---------------------------------------------//

module.exports = {
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
	createTabGroupExt : function(params)
	{
		return TiTools.UI.Ext.TabGroup.create(
			TiTools.UI.Preset.merge(
				params
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
	createTabExt : function(params)
	{
		return TiTools.UI.Ext.Tab.create(
			TiTools.UI.Preset.merge(
				params
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
					className : 'Ti.UI.Switch',
					value : false
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
	Facebook : {
		createLoginButton : function(params)
		{
			return Ti.Facebook.createLoginButton(
				TiTools.UI.Preset.merge(
					params,
					{
						uid : TiTools.Object.unigueID(),
						className : 'Ti.Facebook.LoginButton'
					}
				)
			);
		}
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
