//---------------------------------------------//

if(Ti.App.ToolsHttpQueue == undefined)
{
	Ti.App.ToolsHttpQueue = [];
}

//---------------------------------------------//

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
	if(Ti.App.ToolsHttpHandle == undefined)
	{
		var handle = Ti.Network.createHTTPClient(
			{
				timeout : 30000,
				enableKeepAlive : false,
				onload : function(event)
				{
					if(params.success != undefined)
					{
						params.success(Ti.App.ToolsHttpHandle);
					}
					Ti.App.ToolsHttpQueue.splice(0, 1);
					Ti.App.ToolsHttpHandle = undefined;
					if(Ti.App.ToolsHttpQueue.length > 0)
					{
						response(Ti.App.ToolsHttpQueue[0]);
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
					if(params.failure != undefined)
					{
						params.failure(Ti.App.ToolsHttpHandle.status);
					}
					Ti.App.ToolsHttpQueue.splice(0, 1);
					Ti.App.ToolsHttpHandle = undefined;
					if(Ti.App.ToolsHttpQueue.length > 0)
					{
						response(Ti.App.ToolsHttpQueue[0]);
					}
				}
			}
		);
		if(params.header != undefined)
		{
			for(var i = 0; i < params.header.length; i++)
			{
				handle.setRequestHeader(params.header[i].type, params.header[i].value);
			}
		}
		var url = params.url;
		if(params.reguest != undefined)
		{
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
		}
		switch(params.method)
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
		Ti.App.ToolsHttpHandle = handle;
	}
	else
	{
		Ti.App.ToolsHttpQueue.push(params);
	}
};

//---------------------------------------------//
		
module.exports = {
	online : online,
	response : response
};
