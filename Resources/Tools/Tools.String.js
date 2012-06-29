function isInt(str)
{
	var regExp = /^\d+$/;
	return regExp.test(str);
}

function isFloat(str)
{
	var regExp = /^\d*\.\d+$|^\d+\.\d*$/
	return regExp.test(str);
}

function needsQuoting(str)
{
	var regExp = /^\s|\s$|,|"|\n/;
	return regExp.test(str);
}

function trim(str)
{
	if(typeof(str) == 'string')
	{
		var begin = 0;
		var end = str.length - 1;
		while((begin <= end) && (str.charCodeAt(begin) < 33))
		{
			++begin;
		}
		while((end > begin) && (str.charCodeAt(end) < 33))
		{
			--end;
		}
		return str.substr(begin, end - begin + 1);
	}
	return "";
}

function padding(str, length)
{
	str = String(str);
	while(str.length < length)
	{
		str = '0' + str;
	}
	return str;
};

function chomp(str)
{
	var last = str.length - 1;
	if(str.charAt(last) !== '\n')
	{
		return s;
	}
	else
	{
		return str.substring(0, last);
	}
}

//---------------------------------------------//

module.exports = {
	isInt : isInt,
	isFloat : isFloat,
	needsQuoting : needsQuoting,
	trim : trim
};