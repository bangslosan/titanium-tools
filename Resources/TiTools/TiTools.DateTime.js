var betweenOfDays = function(a, b)
{
	return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function format(date, mask)
{
	return '';
};

//---------------------------------------------//

module.exports = {
	betweenOfDays : betweenOfDays,
	format : format
};
