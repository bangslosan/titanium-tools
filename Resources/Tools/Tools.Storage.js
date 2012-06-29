function Instance(name)
{
	this.name = 'storage.' + name + '.local';
	this.content = undefined;
	this.reload();
}

Instance.prototype.toString = function()
{
	return '[object ToolsStorage]';
}

Instance.prototype.reload = function()
{
	if(Ti.App.Properties.hasProperty(this.name) == true)
	{
		this.content = JSON.parse(Ti.App.Properties.getString(this.name));
	}
	else
	{
		this.content = undefined;
	}
};

Instance.prototype.clear = function()
{
	Ti.App.Properties.removeProperty(this.name);
};

Instance.prototype.flush = function()
{
	Ti.App.Properties.setString(this.name, JSON.stringify(this.content));
};

//---------------------------------------------//

module.exports = {
	create : function(params)
	{
		return new Instance(params);
	}
}