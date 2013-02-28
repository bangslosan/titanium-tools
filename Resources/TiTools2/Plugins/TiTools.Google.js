var TiTools2 = require("TiTools2/TiTools");

//---------------------------------------------//

function googleMapCurrentLocation(params) {
	try {
		var http = TiTools2.Network.createClientHttp({
			options: {
				method: "GET",
				url: "http://maps.googleapis.com/maps/api/geocode/json",
				header: {
					"Content-Type": "application/json; charset=utf-8",
					"Cache-Control": "no-cache, must-revalidate"
				},
				args: {
					latlng: params.position.latitude + "," + params.position.longitude,
					sensor: "false",
					language: "ru"
				}
			},
			loading: params.loading,
			loaded: params.loaded,
			success: function(handle) {
				json = handle.response("json");
				switch(json.status) {
					case "OK":
						var location = {};
						if(json.results != undefined) {
							if(json.results.length > 0) {
								location = {
									address: json.results[0].formatted_address,
									componet: {}
								};
								for(var i = 0; i < json.results[0].address_components.length; i++) {
									if(json.results[0].address_components[i].types.length > 0) {
										location.componet[json.results[0].address_components[i].types[0]] = json.results[0].address_components[i].long_name;
									}
								}
							}
						}
						if(params.success != undefined) {
							params.success(json.status, location);
						}
					break;
					default:
						if(params.success != undefined) {
							params.success(json.status);
						}
					break;
				}
			},
			failure: params.failure
		});
	} catch(error) {
		if(params.except != undefined) {
			params.except();
		}
	}
	return http;
}
function googleMapPaveRoute(params) {
	try {
		var http = TiTools2.Network.createClientHttp({
			options: {
				method: "GET",
				url: "http://maps.google.com/",
				args: {
					saddr: params.a.latitude + "," + params.a.longitude,
					daddr: params.b.latitude + "," + params.b.longitude,
					output: "kml",
					doflg: "ptk",
					dirflg: "w",
					hl: "en"
				}
			},
			loading: params.loading,
			loaded: params.loaded,
			success: function(handle) {
				var route = {
					name: params.name,
					points: []
				};
				var xml = handle.response("raw:xml");
				if(xml != undefined) {
					var coords = xml.documentElement.getElementsByTagName("LineString");
					for(var i = 0; i < coords.length; i++) {
						var lines = coords.item(i).firstChild.text.split(" ");
						for(var j = 0; j < lines.length; j++) {
							var points = lines[j].split(",");
							if((points[0] != undefined) && (points[1] != undefined)) {
								route.points.push({
									longitude: points[0],
									latitude: points[1]
								});
							}
						}
					}
				}
				if(params.success != undefined) {
					params.success(route);
				}
			},
			failure: params.failure
		});
	} catch(error) {
		if(params.except != undefined) {
			params.except();
		}
	}
	return http;
}

//---------------------------------------------//

module.exports = {
	Map: {
		currentLocation: googleMapCurrentLocation,
		paveRoute: googleMapPaveRoute
	}
};
