if(Ti.App.TiToolsLastUnigueID == undefined)
{
	Ti.App.TiToolsLastUnigueID = 0;
}

//---------------------------------------------//

function unigueID()
{
	Ti.App.TiToolsLastUnigueID = Ti.App.TiToolsLastUnigueID + 1;
	return Ti.App.TiToolsLastUnigueID;
}
function combine(objectA, objectB)
{
	if(objectB != undefined)
	{
		for(var i in objectB)
		{
			if(isArray(objectB[i]) == true)
			{
				if(objectA[i] == undefined)
				{
					objectA[i] = [];
				}
				objectA[i] = combine(objectA[i], objectB[i]);
			}
			else if(isObject(objectB[i]) == true)
			{
				if(objectA[i] == undefined)
				{
					objectA[i] = {};
				}
				objectA[i] = combine(objectA[i], objectB[i]);
			}
			else
			{
				objectA[i] = objectB[i];
			}
		}
	}
	return objectA;
}

function clone(object)
{
	if(object != undefined)
	{
		var result = undefined;
		if(isArray(object) == true)
		{
			result = [];
		}
		else if(isObject(object) == true)
		{
			result = {};
		}
		if(result != undefined)
		{
			for(var prop in object)
			{
				if(object[prop] != undefined)
				{
					var field = object[prop];
					if(isObject(field) == true)
					{
						result[prop] = clone(field);
					}
					else
					{
						result[prop] = field;
					}
				}
			}
			return result;
		}
	}
	return object;
}

function swap(object, paramA, paramB)
{
	var temp = object[paramA];
	object[paramA] = object[paramB];
	object[paramB] = temp;
}

function isFunction(object)
{
	return (typeof(object) == 'function');
}

function isObject(object)
{
	if(object == undefined)
	{
		return false;
	}
	return (Object.prototype.toString.call(object) == '[object Object]');
}

function isArray(object)
{
	if(object == undefined)
	{
		return false;
	}
	return (Object.prototype.toString.call(object) == '[object Array]');
}

function isNumber(object)
{
	return (typeof(object) == 'number');
}

function isString(object)
{
	return (typeof(object) == 'string');
}

//---------------------------------------------//

module.exports = {
	unigueID : unigueID,
	combine : combine,
	clone : clone,
	swap : swap,
	isFunction : isFunction,
	isObject : isObject,
	isArray : isArray,
	isNumber : isNumber,
	isString : isString
};
