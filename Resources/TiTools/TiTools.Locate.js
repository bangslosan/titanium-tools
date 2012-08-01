var TiTools = {
	Object : require("TiTools/TiTools.Object")
};

//---------------------------------------------//

var getStringProc = undefined;
if(Ti.Locate != undefined)
{
	getStringProc = Ti.Locate.getString;
}
if(TiTools.Object.isFunction(getStringProc) == false)
{
	getStringProc = L;
}

//---------------------------------------------//

function getString(key, defaults)
{
	if(TiTools.Object.isFunction(getStringProc) == true)
	{
		return getStringProc(key, defaults);
	}
	return defaults;
}

//---------------------------------------------//

module.exports = {
	getString : getString
};
