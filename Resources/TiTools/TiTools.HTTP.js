function online()
{
	return Ti.Network.online;
}

function response(params)
{
	if(params == undefined)
	{
		throw new Error(L('TI_TOOLS_THROW_BAD_PARAMS'));
	}
	if(Ti.App.TiToolsHttpHandle != undefined)
	{
		throw new Error(L('TI_TOOLS_THROW_HHTP_SINGLETON'));
	}
	var handle = Ti.Network.createHTTPClient(
		{
			timeout : 30000,
			enableKeepAlive : false,
			onload : function(event)
			{
				if(params.success != undefined)
				{
					params.success(Ti.App.TiToolsHttpHandle);
				}
				Ti.App.TiToolsHttpHandle = undefined;
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
				if(params.failure != undefined)
				{
					params.failure(Ti.App.TiToolsHttpHandle.status);
				}
				Ti.App.TiToolsHttpHandle = undefined;
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
				if(count == 0)
				{
					url += '?' + i + '=' + item;
				}
				else
				{
					url += '&' + i + '=' + item;
				}
				count++;
			}
		}
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
		case 'GET':
			handle.open('GET', url);
			handle.send();
		break;
		case 'POST':
			handle.open('POST', url);
			handle.send(params.reguest.post);
		break;
		default:
			throw new Error(L('TI_TOOLS_THROW_UNKNOWN_METHOD'));
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
