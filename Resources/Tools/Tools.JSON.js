var serialize = function(node)
{
	var result = '';
	try
	{
		result = JSON.stringify(node);
	}
	catch(error)
	{
	}
	return result;
}

var deserialize = function(string)
{
	var result = undefined;
	try
	{
		result = JSON.parse(string);
	}
	catch(error)
	{
	}
	return result;
}

//---------------------------------------------//

module.exports = {
	serialize : serialize,
	deserialize : deserialize
};
