var TiTools = {
	Locate : require("TiTools/TiTools.Locate")
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
			if(event.index == 0)
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
	callPhone : callPhone
};
