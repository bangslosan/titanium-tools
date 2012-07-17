var ToolsUIPreset = require('Tools/Tools.UI.Preset');

//---------------------------------------------//

module.exports = {
	createWindow : function(params)
	{
		return Ti.UI.createWindow(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.Window'
				} 
			)
		);
	},
	createView : function(params)
	{
		return Ti.UI.createView(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.View'
				} 
			)
		);
	},
	createScrollView : function(params)
	{
		return Ti.UI.createScrollView(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.ScrollView'
				} 
			)
		);
	},
	createScrollableView : function(params)
	{
		return Ti.UI.createScrollableView(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.ScrollableView'
				} 
			)
		);
	},
	createLabel : function(params)
	{
		return Ti.UI.createLabel(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.Label'
				} 
			)
		);
	},
	createImageView : function(params)
	{
		return Ti.UI.createImageView(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.ImageView'
				} 
			)
		);
	},
	createButton : function(params)
	{
		return Ti.UI.createButton(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.Button'
				} 
			)
		);
	},
	createProgressBar : function(params)
	{
		return Ti.UI.createProgressBar(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.ProgressBar'
				} 
			)
		);
	},
	createTextField : function(params)
	{
		return Ti.UI.createTextField(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.TextField'
				} 
			)
		);
	},
	createTextArea : function(params)
	{
		return Ti.UI.createTextArea(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.TextArea'
				} 
			)
		);
	},
	createTableView : function(params)
	{
		return Ti.UI.createTableView(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.TableView'
				} 
			)
		);
	},
	createTableViewSection : function(params)
	{
		return Ti.UI.createTableViewSection(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.TableViewSection'
				} 
			)
		);
	},
	createTableViewRow : function(params)
	{
		return Ti.UI.createTableViewRow(
			ToolsUIPreset.merge(params,
				{
					className : 'Ti.UI.TableViewRow'
				} 
			)
		);
	}
}
