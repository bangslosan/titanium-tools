//---------------------------------------------//

if(Ti.App.ToolsHttp == undefined)
{
	Ti.App.ToolsHttp = {
		handle : undefined,
		queue : []
	};
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
	if(Ti.App.ToolsHttp.handle == undefined)
	{
		Ti.App.ToolsHttp.handle = Ti.Network.createHTTPClient(
			{
				enableKeepAlive : false,
				timeout : 30000,
				onload : function()
				{
					if(params.success != undefined)
					{
						params.success(http);
					}
					Ti.App.ToolsHttp.queue.splice(0, 1);
					Ti.App.ToolsHttp.handle = undefined;
					if(Ti.App.ToolsHttp.queue.length > 0)
					{
						response(Ti.App.ToolsHttp.queue[0]);
					}
				},
				onerror : function()
				{
					if(params.failure != undefined)
					{
						params.failure(http.status);
					}
					Ti.App.ToolsHttp.queue.splice(0, 1);
					Ti.App.ToolsHttp.handle = undefined;
					if(Ti.App.ToolsHttp.queue.length > 0)
					{
						response(Ti.App.ToolsHttp.queue[0]);
					}
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
	}
	else
	{
		Ti.App.ToolsHttp.queue.push(params);
	}
};

//---------------------------------------------//
		
module.exports = {
	online : online,
	response : response
};
