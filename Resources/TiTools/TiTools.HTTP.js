var TiTools = {
	Locate : require("TiTools/TiTools.Locate")
};

//---------------------------------------------//

function online()
{
	return Ti.Network.online;
}

function response(params)
{
	if(params == undefined)
	{
		throw new String(TiTools.Locate.getString('TITOOLS_THROW_BAD_PARAMS'));
	}
	if(Ti.App.TiToolsHttpHandle != undefined)
	{
		throw new String(TiTools.Locate.getString('TITOOLS_THROW_HHTP_SINGLETON'));
	}
	switch(params.reguest.method)
	{
		case 'GET':
		case 'POST':
		break;
		default:
			throw String(TiTools.Locate.getString('TITOOLS_THROW_UNKNOWN_METHOD'));
	}
	var handle = Ti.Network.createHTTPClient(
		{
			timeout : 30000,
			enableKeepAlive : false,
			onload : function(event)
			{
				var handle = Ti.App.TiToolsHttpHandle;
				Ti.App.TiToolsHttpHandle = undefined;
				if(params.success != undefined)
				{
					params.success(handle);
				}
			},
			onsendstream : function(event)
			{
				if(params.sendProgress != undefined)
				{
					params.sendProgress(event.progress);
				}
			},
			ondatastream : function(event)
			{
				if(params.readProgress != undefined)
				{
					params.readProgress(event.progress);
				}
			},
			onerror : function(event)
			{
				var handle = Ti.App.TiToolsHttpHandle;
				Ti.App.TiToolsHttpHandle = undefined;
				if(params.failure != undefined)
				{
					params.failure(handle);
				}
			}
		}
	);
	var url = params.reguest.url;
	if(params.reguest.args != undefined)
	{
		var count = 0;
		for(var i in params.reguest.args)
		{
			var item = params.reguest.args[i];
			if(item != undefined)
			{
				url += (((count == 0) ? '?' : '&') + i + '=' + item);
				count++;
			}
		}
	}
	switch(params.reguest.method)
	{
		case 'GET': handle.open('GET', url); break;
		case 'POST': handle.open('POST', url); break;
	}
	if(params.reguest.header != undefined)
	{
		for(var i = 0; i < params.reguest.header.length; i++)
		{
			handle.setRequestHeader(params.reguest.header[i].type, params.reguest.header[i].value);
		}
	}
	switch(params.reguest.method)
	{
		case 'GET': handle.send(); break;
		case 'POST': handle.send(params.reguest.post); break;
	}
	Ti.App.TiToolsHttpHandle = handle;
	return Ti.App.TiToolsHttpHandle;
};

function abort()
{
	if(Ti.App.TiToolsHttpHandle != undefined)
	{
		Ti.App.TiToolsHttpHandle.abort();
		Ti.App.TiToolsHttpHandle = undefined;
	}
}

//---------------------------------------------//

module.exports = {
	online : online,
	response : response,
	abort : abort
};
