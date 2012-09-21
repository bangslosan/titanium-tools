//---------------------------------------------//

var SCREEN_MODE_UNKNOWN = 'unknown';
var SCREEN_MODE_SMALL = 'small';
var SCREEN_MODE_NORMAL = 'normal';
var SCREEN_MODE_LARGE = 'large';
var SCREEN_MODE_EXTRA_LARGE = 'extra large';

//---------------------------------------------//

var isSimulator = ((Ti.Platform.model === 'Simulator') || (Ti.Platform.model.indexOf('sdk') !== -1));
var isAndroid = (Ti.Platform.osname == 'android');
var isIPhone = (Ti.Platform.osname == 'iphone');
var isIPad = (Ti.Platform.osname == 'ipad');
var isIOS = (isIPhone == true) || (isIPad == true);

//---------------------------------------------//

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenResolution = screenWidth * screenHeight;
var screenMode = SCREEN_MODE_UNKNOWN;

//---------------------------------------------//

if(isAndroid == true)
{
	if(Ti.Platform.displayCaps.dpi <= 120)
	{
		if(screenResolution <= (240 * 320))
		{
			screenMode = SCREEN_MODE_SMALL;
		}
		else if((screenResolution >= (240 * 400)) && (screenResolution <= (240 * 432)))
		{
			screenMode = SCREEN_MODE_NORMAL;
		}
		else if((screenResolution >= (480 * 800)) && (screenResolution <= (480 * 854)))
		{
			screenMode = SCREEN_MODE_LARGE;
		}
		else if(screenResolution >= (1024 * 600))
		{
			screenMode = SCREEN_MODE_EXTRA_LARGE;
		}
	}
	else if(Ti.Platform.displayCaps.dpi <= 160)
	{
		if(screenResolution <= (320 * 480))
		{
			screenMode = SCREEN_MODE_NORMAL;
		}
		else if((screenResolution >= (480 * 800)) && (screenResolution <= (600 * 1024)))
		{
			screenMode = SCREEN_MODE_LARGE;
		}
		else if((screenResolution >= (1280 * 800)) && (screenResolution <= (1280 * 768)))
		{
			screenMode = SCREEN_MODE_EXTRA_LARGE;
		}
	}
	else if(Ti.Platform.displayCaps.dpi <= 240)
	{
		if(screenResolution <= (480 * 640))
		{
			screenMode = SCREEN_MODE_SMALL;
		}
		else if((screenResolution >= (480 * 800)) && (screenResolution <= (600 * 1024)))
		{
			screenMode = SCREEN_MODE_NORMAL;
		}
		else if((screenResolution >= (1536 * 1152)) && (screenResolution <= (1920 * 1200)))
		{
			screenMode = SCREEN_MODE_EXTRA_LARGE;
		}
	}
	else if(Ti.Platform.displayCaps.dpi <= 320)
	{
		if(screenResolution <= (640 * 960))
		{
			screenMode = SCREEN_MODE_NORMAL;
		}
		else if((screenResolution >= (2048 * 1536)) && (screenResolution <= (2560 * 1600)))
		{
			screenMode = SCREEN_MODE_EXTRA_LARGE;
		}
	}
}
else if(isIPhone == true)
{
	if((screenWidth == 320) && (screenHeight == 480))
	{
		screenMode = SCREEN_MODE_SMALL;
	}
	else if((screenWidth == 640) && (screenHeight == 960))
	{
		screenMode = SCREEN_MODE_NORMAL;
	}
	else if((screenWidth == 640) && (screenHeight == 1036))
	{
		screenMode = SCREEN_MODE_LARGE;
	}
}
else if(isIPad == true)
{
	if((screenWidth == 1024) && (screenHeight == 768))
	{
		screenMode = SCREEN_MODE_SMALL;
	}
	else if((screenWidth == 2048) && (screenHeight == 1536))
	{
		screenMode = SCREEN_MODE_NORMAL;
	}
}

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
	SCREEN_MODE : {
		UNKNOWN : SCREEN_MODE_UNKNOWN,
		SMALL : SCREEN_MODE_SMALL,
		NORMAL : SCREEN_MODE_NORMAL,
		LARGE : SCREEN_MODE_LARGE,
		EXTRA_LARGE : SCREEN_MODE_EXTRA_LARGE
	},
	isSimulator : isSimulator,
	isAndroid : isAndroid,
	isIPhone : isIPhone,
	isIPad : isIPad,
	isIOS : isIOS,
	screenWidth : screenWidth,
	screenHeight : screenHeight,
	screenResolution : screenResolution,
	screenMode : screenMode,
	appropriate : appropriate
};
