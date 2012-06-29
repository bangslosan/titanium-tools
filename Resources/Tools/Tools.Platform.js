var isAndroin = (Ti.Platform.osname == 'androin');
var isIPhone = (Ti.Platform.osname == 'iphone');
var isIPad = (Ti.Platform.osname == 'ipad');

//---------------------------------------------//

module.exports = {
	isAndroin : isAndroin,
	isIPhone : isIPhone,
	isIPad : isIPad
}