var isAndroid = (Ti.Platform.osname == 'android');
var isIPhone = (Ti.Platform.osname == 'iphone');
var isIPad = (Ti.Platform.osname == 'ipad');

//---------------------------------------------//

module.exports = {
	isAndroid : isAndroid,
	isIPhone : isIPhone,
	isIPad : isIPad
}