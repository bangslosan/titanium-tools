var Tools = {
	Object : require("Tools/Tools.Object")
};

//---------------------------------------------//

function TabGroup(params)
{
	var mUID = Tools.Object.unigueID();
	var mClassName = 'Ti.UI.Ext.TabGroup';
	var mIsOpened = false;
	var mActiveTabIndex = 0;
	var mTabs = [];
	
	this.open = function()
	{
		if(mIsOpened == false)
		{
			for(var i = 0; i < mTabs.length; i++)
			{
				mTabs[i].open();
			}
			if((mActiveTabIndex >= 0) && (mActiveTabIndex < mTabs.length))
			{
				mTabs[mActiveTabIndex].active = true;
			}
			mIsOpened = true;
		}
	};
	this.close = function()
	{
		if(mIsOpened == true)
		{
			for(var i = 0; i < mTabs.length; i++)
			{
				mTabs[i].close();
			}
			mIsOpened = false;
		}
	};
	this.addTab = function(tab)
	{
		for(var i = 0; i < mTabs.length; i++)
		{
			if(mTabs[i].uid == tab.uid)
			{
				return;
			}
		}
		mTabs.push(tab);
	};
	this.removeTab = function(tab)
	{
		for(var i = 0; i < mTabs.length; i++)
		{
			if(mTabs[i].uid == tab.uid)
			{
				mTabs.splice(i, 1);
				mTabs[i].close();
				break;
			}
		}
	};
	this.getUID = function()
	{
		return mUID;
	};
	this.getClassName = function()
	{
		return mClassName;
	};
	this.getActiveTabIndex = function()
	{
	    return mActiveTabIndex;
	};
	this.setActiveTabIndex = function(value)
	{
		if(mActiveTabIndex != value)
		{
			if((mActiveTabIndex >= 0) && (mActiveTabIndex < mTabs.length))
			{
				mTabs[mActiveTabIndex].active = false;
			}
			mActiveTabIndex = value;
			if((mActiveTabIndex >= 0) && (mActiveTabIndex < mTabs.length))
			{
				mTabs[mActiveTabIndex].active = true;
			}
		}
	};
	this.getTabs = function()
	{
	    return mTabs;
	};
	
	Object.defineProperty(
		this,
		"uid",
		{
			get : this.getUID
		}
	);
	Object.defineProperty(
		this,
		"className",
		{
			get : this.getClassName
		}
	);
	Object.defineProperty(
		this,
		"activeTabIndex",
		{
			set : this.setActiveTabIndex,
			get : this.getActiveTabIndex
		}
	);
	Object.defineProperty(
		this,
		"tabs",
		{
			get : this.getTabs
		}
	);
}

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new TabGroup(params);
	}
};