var TiTools = {
	Object : require("TiTools/TiTools.Object"),
	Platform : require("TiTools/TiTools.Platform"),
	Locate : require("TiTools/TiTools.Locate"),
	JSON : require("TiTools/TiTools.JSON")
};

//---------------------------------------------//

function sleep(time)
{
	var start = new Date().getTime();
	while(true)
	{
		var delta = new Date().getTime() - start;
		if(delta >= time)
		{
			break;
		}
	}
}

function info(data)
{
	if(TiTools.Platform.isAndroid === true)
	{
		if(TiTools.Object.isArray(data) === true)
		{
			data = TiTools.JSON.serialize(data);
		}
		else if(TiTools.Object.isObject(data) === true)
		{
			data = TiTools.JSON.serialize(data);
		}
		Ti.API.info('[TiTools]: ' + data);
	}
	else if(TiTools.Platform.isIOS === true)
	{
		alert(data);
	}
}

function callPhone(phone)
{
	var alert = Ti.UI.createAlertDialog(
		{
			message : TiTools.Locate.getString('TITOOLS_ALERT_REQUEST_CALL') + '\n' + phone,
			buttonNames : [
				TiTools.Locate.getString('TITOOLS_ALERT_CALL'),
				TiTools.Locate.getString('TITOOLS_ALERT_NO')
			],
			cancel : 1
		}
	);
	alert.addEventListener('click',
		function(event)
		{
			if(event.index === 0)
			{
				var number = phone.replace(/([^0-9])+/g, '');
				if(number.length > 0)
				{
					Ti.Platform.openURL('tel:' + number);
				}
			}
		}
	);
	alert.show();
}

//---------------------------------------------//

module.exports = {
	sleep : sleep,
	info : info,
	callPhone : callPhone
};
