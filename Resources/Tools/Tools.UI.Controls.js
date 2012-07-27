var Tools = {
	Object : require("Tools/Tools.Object"),
	UI : {
		Ext : {
			TabGroup : require("Tools/Tools.UI.Ext.TabGroup"),
			Tab : require("Tools/Tools.UI.Ext.Tab")
		},
		Preset : require("Tools/Tools.UI.Preset")
	}
};

//---------------------------------------------//

module.exports = {
	createActivityIndicator : function(params)
	{
		return Ti.UI.createActivityIndicator(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.ActivityIndicator'
				} 
			)
		);
	},
	createWindow : function(params)
	{
		return Ti.UI.createWindow(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.Window'
				} 
			)
		);
	},
	createView : function(params)
	{
		return Ti.UI.createView(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.View'
				} 
			)
		);
	},
	createTabGroup : function(params)
	{
		return Ti.UI.createTabGroup(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.TabGroup'
				} 
			)
		);
	},
	createTabGroupExt : function(params)
	{
		return Tools.UI.Ext.TabGroup.create(Tools.UI.Preset.merge(params));
	},
	createTab : function(params)
	{
		return Ti.UI.createTab(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.Tab'
				} 
			)
		);
	},
	createTabExt : function(params)
	{
		return Tools.UI.Ext.Tab.create(Tools.UI.Preset.merge(params));
	},
	createScrollView : function(params)
	{
		return Ti.UI.createScrollView(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.ScrollView'
				} 
			)
		);
	},
	createScrollableView : function(params)
	{
		return Ti.UI.createScrollableView(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.ScrollableView'
				} 
			)
		);
	},
	createImageView : function(params)
	{
		return Ti.UI.createImageView(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.ImageView'
				} 
			)
		);
	},
	createButton : function(params)
	{
		return Ti.UI.createButton(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.Button'
				} 
			)
		);
	},
	createLabel : function(params)
	{
		return Ti.UI.createLabel(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.Label'
				} 
			)
		);
	},
	createSwitch : function(params)
	{
		return Ti.UI.createSwitch(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.Switch',
					value : false
				} 
			)
		);
	},
	createProgressBar : function(params)
	{
		return Ti.UI.createProgressBar(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.ProgressBar'
				} 
			)
		);
	},
	createTextField : function(params)
	{
		return Ti.UI.createTextField(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.TextField'
				} 
			)
		);
	},
	createTextArea : function(params)
	{
		return Ti.UI.createTextArea(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.TextArea'
				} 
			)
		);
	},
	createTableView : function(params)
	{
		return Ti.UI.createTableView(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.TableView'
				} 
			)
		);
	},
	createTableViewSection : function(params)
	{
		return Ti.UI.createTableViewSection(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.TableViewSection'
				}
			)
		);
	},
	createTableViewRow : function(params)
	{
		return Ti.UI.createTableViewRow(
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.UI.TableViewRow'
				}
			)
		);
	},
	Facebook : {
		createLoginButton : function(params)
		{
			return Ti.Facebook.createLoginButton(
				Tools.UI.Preset.merge(params,
					{
						uid : Tools.Object.unigueID(),
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
			Tools.UI.Preset.merge(params,
				{
					uid : Tools.Object.unigueID(),
					className : 'Ti.PaintView'
				}
			)
		);
	}
};
