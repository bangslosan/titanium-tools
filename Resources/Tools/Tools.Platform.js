var isAndroid = (Ti.Platform.osname == 'android');
var isIPhone = (Ti.Platform.osname == 'iphone');
var isIPad = (Ti.Platform.osname == 'ipad');
var isIOS = (isIPhone == true) || (isIPad == true);

//---------------------------------------------//

function appropriate(params)
{
	if(isAndroid == true)
	{
		if(params.android != undefined)
		{
			return params.android;
		}
	}
	else if(isIOS == true)
	{
		if(isIPhone == true)
		{
			if(params.iphone != undefined)
			{
				return params.iphone;
			}
		}
		else if(isIPad == true)
		{
			if(params.ipad != undefined)
			{
				return params.ipad;
			}
		}
		if(params.ios != undefined)
		{
			return params.ios;
		}
	}
	if(params.any != undefined)
	{
		return params.any;
	}
	return undefined;
}

//---------------------------------------------//

module.exports = {
	isAndroid : isAndroid,
	isIPhone : isIPhone,
	isIPad : isIPad,
	isIOS : isIOS,
	appropriate : appropriate
};
