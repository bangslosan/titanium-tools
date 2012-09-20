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
			message : L('TITOOLS_ALERT_REQUEST_CALL') + '\n' + phone,
			buttonNames : [
				L('TITOOLS_ALERT_CALL'),
				L('TITOOLS_ALERT_NO')
			],
			cancel : 1
		}
	);
	alert.addEventListener('click',
		function(event)
		{
			if(event.index == 0)
			{
				Ti.Platform.openURL('tel:' + phone.replace(/([^0-9])+/g, ''));
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
