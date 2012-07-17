var serialize = function(node)
{
	return JSON.stringify(node);
}

var deserialize = function(string)
{
	return JSON.parse(string);
}

//---------------------------------------------//

module.exports = {
	serialize : serialize,
	deserialize : deserialize
};
