var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//

function googleMapCurrentLocation(params) {
	try {
		TiTools2.Network.createHTTPClient({
			reguest : {
				method : "GET",
				url : "http://maps.googleapis.com/maps/api/geocode/json",
				header : [
					{
						type : "Content-Type",
						value : "application/json; charset=utf-8"
					},
					{
						type : "Cache-Control",
						value : "no-cache, must-revalidate"
					}
				],
				args : {
					latlng : params.position.latitude + "," + params.position.longitude,
					sensor : "false",
					language : "ru"
				}
			},
			loading : params.loading,
			loaded : params.loaded,
			success : function(response) {
				try {
					json = TiTools2.JSON.deserialize(response.responseText);
					switch(json.status) {
						case "OK":
							var location = {};
							if(json.results != undefined) {
								if(json.results.length > 0) {
									location = {
										address : json.results[0].formatted_address,
										componet : {}
									};
									for(var i = 0; i < json.results[0].address_components.length; i++) {
										if(json.results[0].address_components[i].types.length > 0) {
											location.componet[json.results[0].address_components[i].types[0]] = json.results[0].address_components[i].long_name;
										}
									}
								}
							}
							if(params.success != undefined) {
								params.success(location);
							}
						break;
						default:
						break;
					}
				} catch(error) {
					if(params.except != undefined) {
						params.except(error);
					}
				}
			},
			failure : params.failure
		});
	} catch(error) {
		if(params.except != undefined) {
			params.except();
		}
	}
}
function googleMapPaveRoute(params) {
	try {
		TiTools2.Network.createHTTPClient({
			reguest : {
				method : "GET",
				url : "http://maps.google.com/",
				args : {
					saddr : params.a.latitude + "," + params.a.longitude,
					daddr : params.b.latitude + "," + params.b.longitude,
					output : "kml",
					doflg : "ptk",
					dirflg : "w",
					hl : "en"
				}
			},
			loading : params.loading,
			loaded : params.loaded,
			success : function(response) {
				try {
					var route = {
						name : params.name,
						points : []
					};
					var xml = response.responseXML;
					if(xml != undefined) {
						var coords = xml.documentElement.getElementsByTagName("LineString");
						for(var i = 0; i < coords.length; i++) {
							var lines = coords.item(i).firstChild.text.split(" ");
							for(var j = 0; j < lines.length; j++) {
								var points = lines[j].split(",");
								if((points[0] != undefined) && (points[1] != undefined)) {
									route.points.push({
										longitude : points[0],
										latitude : points[1]
									});
								}
							}
						}
					}
					if(params.success != undefined) {
						params.success(route);
					}
				} catch(error) {
					if(params.except != undefined) {
						params.except(error);
					}
				}
			},
			failure : params.failure
		});
	} catch(error) {
		if(params.except != undefined) {
			params.except();
		}
	}
}

//---------------------------------------------//

module.exports = {
	Map: {
		currentLocation : googleMapCurrentLocation,
		paveRoute : googleMapPaveRoute
	}
};
