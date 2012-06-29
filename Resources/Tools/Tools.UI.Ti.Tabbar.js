var ToolsUIPreset = require('Tools/Tools.UI.Preset');
var ToolsUITiWindow = require('Tools/Tools.UI.Ti.Window');

//---------------------------------------------//

var InstanceStyle = {
	frame : {
		top : undefined,
		bottom : undefined,
		left : undefined,
		right : undefined,
		width : undefined,
		height : undefined
	},
	background : {
		stretched : false,
		color : 'transparent',
		image : undefined
	},
	state : {
		disabled : false
	}
};

//---------------------------------------------//

function convertStyle(style)
{
	var result = {
		top : style.frame.top,
		bottom : style.frame.bottom,
		left : style.frame.left,
		right : style.frame.right,
		width : style.frame.width,
		height : style.frame.height,
		backgroundRepeat : (style.background.stretched == false),
		backgroundColor : style.background.color,
		backgroundImage : style.background.image
	};
	return result;
}

//---------------------------------------------//

function Instance(params, tabs)
{
	this.style = ToolsUIPreset.merge(params, InstanceStyle);
	this.handle = Ti.UI.createWindow(convertStyle(this.style));
	this.selectedTab = undefined;
	this.lastTID = 0;
	this.tabs = [];
	
	if(tabs != undefined)
	{
		for(var i = 0; i < tabs.length; i++)
		{
			this.createTab(tabs[i]);
		}
	}
}

Instance.prototype.toString = function()
{
	return '[object ToolsTabbar]';
}

Instance.prototype.open = function()
{
    this.handle.open();
};

Instance.prototype.close = function()
{
    this.handle.close();
};

Instance.prototype.createTab = function(params)
{
	this.addTab(ToolsUITiWindow.create(params));
};

Instance.prototype.addTab = function(tab)
{
	tab.tid = this.lastTID++;
	tab.tabbar = this;
	
	this.tabs.push(tab);
	
	if(this.selectedTab == undefined)
	{
		this.selectedTab = tab;
		this.selectedTab.open();
	}
};

Instance.prototype.removeTab = function(tab)
{
	for(var i = 0; i < this.tabs.length; i++)
	{
		if(this.tabs[i].tid == tab.tid)
		{
			this.removeTabWithIndex(i);
			break;
		}
	}
};

Instance.prototype.removeTabWithIndex = function(index)
{
	if(this.selectedTab != undefined)
	{
		if(this.selectedTab.tid == this.tabs[index].tid)
		{
			var prev = index - 1;
			var next = index + 1;
			if(next < this.tabs.length)
			{
				this.selectTab(this.tabs[next]);
			}
			else if((prev >= 0) && (prev < this.tabs.length))
			{
				this.selectTab(this.tabs[prev]);
			}
			else
			{
				this.selectTab(undefined);
			}
		}
	}
	this.tabs[index].tabbar = undefined;
	this.tabs.splice(index, 1);
}

Instance.prototype.selectTab = function(tab)
{
	if(this.selectedTab != undefined)
	{
		this.fireEvent('deselect',
			{
				tab : this.selectedTab
			}
		);
		this.selectedTab.close();
	}
	this.selectedTab = tab;
	if(this.selectedTab != undefined)
	{
		this.fireEvent('select',
			{
				tab : this.selectedTab
			}
		);
		this.selectedTab.open();
	}
}

Instance.prototype.removeFromParent = function()
{
    this.parent.remove(this.handle);
};

Instance.prototype.addEventListener = function(name, callback)
{
    this.handle.addEventListener(name, callback);
};

Instance.prototype.removeEventListener = function(name, callback)
{
    this.handle.removeEventListener(name, callback);
};

Instance.prototype.fireEvent = function(name, params)
{
    this.handle.fireEvent(name, params);
};

Instance.prototype.state = function()
{
	if(this.style.state.disabled == true)
	{
		return 'disable';
	}
	return 'normal';
}

Instance.prototype.isDisabled = function()
{
	return this.state.disabled;
};

Instance.prototype.setDisabled = function(state)
{
	if(this.style.state.disabled != state)
	{
		this.style.state.disabled = state;
		this.refresh();
	}
};

//---------------------------------------------//

module.exports = {
	create : function(params, tabs)
	{
		return new Instance(params, tabs);
	}
}