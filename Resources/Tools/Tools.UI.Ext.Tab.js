var Tools = {
	Object : require("Tools/Tools.Object")
};

//---------------------------------------------//

function Tab(params)
{
	var mUID = Tools.Object.unigueID();
	var mClassName = 'Ti.UI.Ext.Tab';
	var mActiveIndex = -1;
	var mStack = [];
	var mIsOpened = false;
	var mActive = false;
	
	this.push = function(view)
	{
		if(view != undefined)
		{
			var openned = false;
			if(mIsOpened == true)
			{
				if(mActive == true)
				{
					openned = true;
					view.open();
				}
				if(mActiveIndex != -1)
				{
					if(mStack[mActiveIndex].openned == true)
					{
						mStack[mActiveIndex].handle.hide();
					}
				}
			}
		    mStack.push(
		    	{
		    		openned : openned,
		    		handle : view
		    	}
		    );
			mActiveIndex = mStack.length - 1;
		}
	};
	this.pop = function()
	{
		if(mStack.length > 0)
		{
			if(mIsOpened == true)
			{
				if(mActiveIndex != -1)
				{
					if(mStack[mActiveIndex].openned == true)
					{
						mStack[mActiveIndex].handle.close();
					}
				}
			}
			mStack.pop();
			mActiveIndex = mStack.length - 1;
			if(mIsOpened == true)
			{
				if(mActive == true)
				{
					if(mActiveIndex != -1)
					{
						if(mStack[mActiveIndex].openned == false)
						{
							mStack[mActiveIndex].handle.open();
						}
						else
						{
							mStack[mActiveIndex].handle.show();
						}
					}
				}
			}
		}
	};
	
	this.open = function(active)
	{
		if(mIsOpened == false)
		{
			mActiveIndex = mStack.length - 1;
			mActive = active;
			mIsOpened = true;
		}
	};
	this.close = function()
	{
		if(mIsOpened == true)
		{
			for(var i = mStack.length - 1; i > -1; i++)
			{
				mStack[i].handle.close();
			}
			mActiveIndex = -1;
			mStack = [];
			mActive = false;
			mIsOpened = false;
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
	this.getActive = function()
	{
	    return mActive;
	};
	this.setActive = function(active)
	{
		if(mActive != active)
		{
			mActive = active;
			if(mActiveIndex != -1)
			{
				if(mActive == true)
				{
					if(mStack[mActiveIndex].openned == false)
					{
						mStack[mActiveIndex].openned = true;
						mStack[mActiveIndex].handle.open();
					}
					else
					{
						mStack[mActiveIndex].handle.show();
					}
				}
				else
				{
					mStack[mActiveIndex].handle.hide();
				}
			}
		}
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
		"active",
		{
			get : this.getActive,
			set : this.setActive
		}
	);
}

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Tab(params);
	}
};