var ToolsHTTP = require('Tools/Tools.HTTP');

//---------------------------------------------//

function configure(params)
{
	if(params.message != undefined)
	{
		Ti.Geolocation.purpose = params.message;
	}
	if(params.provider != undefined)
	{
		Ti.Geolocation.preferredProvider = params.provider;
	}
	if(params.accuracy != undefined)
	{
		Ti.Geolocation.accuracy = params.accuracy;
	}
	if(params.distanceFilter != undefined)
	{
		Ti.Geolocation.distanceFilter = params.distanceFilter;
	}
}

function currentPosition(params)
{
	var callback = function(result)
	{
		if(result != undefined)
		{
			if(position.success == true)
			{
				if(params.success != undefined)
				{
					params.success(
						{
							longitude : result.coords.longitude,
							latitude : result.coords.latitude
						}
					);
				}
			}
			else
			{
				if(params.failure != undefined)
				{
					params.failure();
				}
			}
		}
		else
		{
			if(params.failure != undefined)
			{
				params.failure();
			}
		}
		Ti.Geolocation.removeEventListener('location', callback);
	};
	
	if(Ti.Geolocation.locationServicesEnabled == true)
	{
		Ti.Geolocation.getCurrentPosition(callback);
	}
	else
	{
		callback();
	}
};

function currentLocation(params)
{
	ToolsHTTP.responce(
		{
			url : 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + params.position.latitude + ',' + params.position.longitude + '&language=ru&sensor=false',
			header : [
				{
					type : 'Content-Type',
					value : 'application/json; charset=utf-8'
				},
				{
					type : 'Cache-Control',
					value : 'no-cache, must-revalidate'
				}
			],
			success : function(result)
			{
				try
				{
					json = JSON.parse(result.responseData);
					switch(json.status)
					{
						case 'OK':
							if(json.results != undefined)
							{
								if(json.results.length > 0)
								{
									var location = {
										address : json.results[0].formatted_address,
										componet : {}
									};
									for(var i = 0; i < json.results[0].address_components.length; i++)
									{
										if(json.results[0].address_components[i].types.length > 0)
										{
											location.componet[json.results[0].address_components[i].types[0]] = json.results[0].address_components[i].long_name;
										}
									}
									if(params.success != undefined)
									{
										params.success(location);
									}
									return;
								}
							}
						break;
					}
				}
				catch(error)
				{
				}
				if(params.failure != undefined)
				{
					params.failure();
				}
			},
			failure : function(result)
			{
				if(params.failure != undefined)
				{
					params.failure();
				}
			}
		}
	);
}

function paveRoute(params)
{
	ToolsHTTP.responce(
		{
			url : 'http://maps.google.com/?saddr=' + params.a.latitude + ',' + params.a.longitude + '&daddr=' + params.b.latitude + ',' + params.b.longitude + '&output=kml&doflg=ptk&hl=en&dirflg=w',
			success : function(result)
			{
				try
				{
					var xml = result.responseXML;
					if(xml != undefined)
					{
						var route = {
							name : params.name,
							points : []
						};
						var coords = xml.documentElement.getElementsByTagName('LineString');
						for(var i = 0; i < coords.length; i++)
						{
							var lines = coords.item(i).firstChild.text.split(' ');
							for(var j = 0; j < lines.length; j++)
							{
								var points = lines[j].split(',');
								if((points[0] != undefined) && (points[1] != undefined))
								{
									route.points.push(
										{
											longitude : points[0],
											latitude : points[1]
										}
									);
								}
							}
						}
						if(params.success != undefined)
						{
							params.success(route);
						}
						return;
					}
				}
				catch(error)
				{
				}
				if(params.failure != undefined)
				{
					params.failure();
				}
			},
			failure : function(result)
			{
				if(params.failure != undefined)
				{
					params.failure();
				}
			}
		}
	);
}

function distance(a, b)
{
	var radius = 6372795.0;
	var cl1 = Math.cos(a.latitude * Math.PI / 180.0);
	var sl1 = Math.sin(a.latitude * Math.PI / 180.0);
	var cl2 = Math.cos(b.latitude * Math.PI / 180.0);
	var sl2 = Math.sin(b.latitude * Math.PI / 180.0);
	var dc = Math.cos((b.longitude - a.longitude) * Math.PI / 180.0);
	var ds = Math.sin((b.longitude - a.longitude) * Math.PI / 180.0);
	var yy = Math.sqrt(Math.pow(cl2 * ds, 2.0) + Math.pow(cl1 * sl2 - sl1 * cl2 * dc, 2.0));
	var xx = sl1 * sl2 + cl1 * cl2 * dc;
	return Math.atan2(yy, xx) * radius;
}

//---------------------------------------------//

module.exports = {
	configure : configure,
	currentPosition : currentPosition,
	currentLocation : currentLocation,
	paveRoute : paveRoute,
	distance : distance
}