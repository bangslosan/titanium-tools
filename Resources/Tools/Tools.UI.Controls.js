var Tools = {
	UI : {
		Preset : require("Tools/Tools.UI.Preset")
	}
}

//---------------------------------------------//

module.exports = {
	createWindow : function(params)
	{
		return Ti.UI.createWindow(
			Tools.UI.Preset.merge(params,
				{
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
					className : 'Ti.UI.View'
				} 
			)
		);
	},
	createScrollView : function(params)
	{
		return Ti.UI.createScrollView(
			Tools.UI.Preset.merge(params,
				{
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
					className : 'Ti.UI.Switch'
				} 
			)
		);
	},
	createProgressBar : function(params)
	{
		return Ti.UI.createProgressBar(
			Tools.UI.Preset.merge(params,
				{
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
					className : 'Ti.UI.TableViewRow'
				} 
			)
		);
	}
}
