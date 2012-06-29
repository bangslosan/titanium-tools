var online = function()
{
	return Ti.Network.online;
}

var responce = function(params)
{
	var http = Ti.Network.createHTTPClient(
		{
			enableKeepAlive : false,
			timeout : 30000
		}
	);
	if(params.header != undefined)
	{
		for(var i = 0; i < params.header.length; i++)
		{
			http.getdata.setRequestHeader(params.header[i].type, params.header[i].value);
		}
	}
	http.getdata.onload = function(event)
	{
		try
		{
			if(params.success != undefined)
			{
				params.success(http);
			}
		}
		catch(error)
		{
			params.failure(
				{
					status : 0,
					error : ''
				}
			);
		}
		http = null;
	};
	http.getdata.onerror = function(event)
	{
		if(params.failure != undefined)
		{
			params.failure(
				{
					status : http.status,
					error : event.error
				}
			);
		}
		else
		{
			var message = L('Tools.Error.HTTP');
			switch(this.status)
			{
				case 400: message = L('Tools.Error.HTTP.400'); break;
				case 401: message = L('Tools.Error.HTTP.401'); break;
				case 402: message = L('Tools.Error.HTTP.402'); break;
				case 403: message = L('Tools.Error.HTTP.403'); break;
				case 404: message = L('Tools.Error.HTTP.404'); break;
				case 405: message = L('Tools.Error.HTTP.405'); break;
				case 406: message = L('Tools.Error.HTTP.406'); break;
				case 407: message = L('Tools.Error.HTTP.407'); break;
				case 408: message = L('Tools.Error.HTTP.408'); break;
				case 409: message = L('Tools.Error.HTTP.409'); break;
				case 410: message = L('Tools.Error.HTTP.410'); break;
				case 411: message = L('Tools.Error.HTTP.411'); break;
				case 412: message = L('Tools.Error.HTTP.412'); break;
				case 413: message = L('Tools.Error.HTTP.413'); break;
				case 414: message = L('Tools.Error.HTTP.414'); break;
				case 415: message = L('Tools.Error.HTTP.415'); break;
				case 416: message = L('Tools.Error.HTTP.416'); break;
				case 417: message = L('Tools.Error.HTTP.417'); break;
				case 422: message = L('Tools.Error.HTTP.422'); break;
				case 423: message = L('Tools.Error.HTTP.423'); break;
				case 424: message = L('Tools.Error.HTTP.424'); break;
				case 425: message = L('Tools.Error.HTTP.425'); break;
				case 426: message = L('Tools.Error.HTTP.426'); break;
				case 449: message = L('Tools.Error.HTTP.449'); break;
				case 456: message = L('Tools.Error.HTTP.456'); break;
				case 500: message = L('Tools.Error.HTTP.500'); break;
				case 501: message = L('Tools.Error.HTTP.501'); break;
				case 502: message = L('Tools.Error.HTTP.502'); break;
				case 503: message = L('Tools.Error.HTTP.503'); break;
				case 504: message = L('Tools.Error.HTTP.504'); break;
				case 505: message = L('Tools.Error.HTTP.505'); break;
				case 506: message = L('Tools.Error.HTTP.506'); break;
				case 507: message = L('Tools.Error.HTTP.507'); break;
				case 508: message = L('Tools.Error.HTTP.508'); break;
				case 509: message = L('Tools.Error.HTTP.509'); break;
				case 510: message = L('Tools.Error.HTTP.510'); break;
			}
			var alert = Ti.UI.createAlertDialog(
				{
					title : L('Tools.Error.HTTP') + ': ' + http.status,
					message : message
				}
			);
			alert.show();
		}
		http = null;
	};
	http.getdata.open('GET', params.url, true);
	http.getdata.send();
};

//---------------------------------------------//
		
module.exports = {
	online : online,
	responce : responce
}