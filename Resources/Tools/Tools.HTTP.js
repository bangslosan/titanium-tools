var online = function()
{
	return Ti.Network.online;
}

var response = function()
{
	var http = Ti.Network.createHTTPClient(
		{
			enableKeepAlive : false,
			timeout : 30000,
			onload : function(event)
			{
				if(params.success != undefined)
				{
					params.success(http);
				}
				http = null;
			},
			onerror : function(event)
			{
				if(params.failure != undefined)
				{
					params.failure(http.status);
				}
				http = null;
			}
		}
	);
	if(params.header != undefined)
	{
		for(var i = 0; i < params.header.length; i++)
		{
			http.getdata.setRequestHeader(params.header[i].type, params.header[i].value);
		}
	}
	switch(params.method)
	{
		case 'GET':
			var url = params.url;
			if(params.data != undefined)
			{
				var count = 0;
				for(var i in params.data)
				{
					if(params.data[i] != undefined)
					{
						if(count == 0)
						{
							url += '?' + i + '=' + params.data[i];
						}
						else
						{
							url += '&' + i + '=' + params.data[i];
						}
						count++;
					}
				}
			}
			http.getdata.open('GET', url);
			http.getdata.send();
		break;
		case 'POST':
			http.getdata.open('POST', params.url);
			http.getdata.send(params.data);
		break;
		default:
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_METHOD'));
	}
};

//---------------------------------------------//
		
module.exports = {
	online : online,
	response : response
};
