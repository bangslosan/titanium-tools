function combine(objectA, objectB)
{
	if(objectB != undefined)
    {
        for(var i in objectB)
        {
        	if(isObject(objectB[i]) == true)
			{
				if(objectA[i] == undefined)
				{
					objectA[i] = {};
				}
				objectA[i] = combine(objectA[i], objectB[i]);
			}
			else if(isArray(objectB[i]) == true)
			{
				if(objectA[i] == undefined)
				{
					objectA[i] = [];
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
};

function clone(object)
{
	if(object != undefined)
	{
		var result = undefined;
		if(typeof(object.pop) == 'function')
		{
			result = [];
		}
		else
		{
			result = {};
		}
		if(result != undefined)
		{
			for(var prop in object)
			{
				if(object.hasOwnProperty(prop) == true)
				{
					var field = object[prop];
					if(typeof(field) == 'object')
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

function isFunction(object)
{
	if(object == undefined)
	{
		return false;
	}
	(typeof(object) == 'function');
}

function isObject(object)
{
	if(object == undefined)
	{
		return false;
	}
	return (object.toString() == '[object Object]');
}

function isArray(object)
{
	if(object == undefined)
	{
		return false;
	}
	return (Object.prototype.toString.call(object) === '[object Array]');
}

function isNumber(object)
{
	if(object == undefined)
	{
		return false;
	}
	return (typeof(object) == 'number');
}

function isString(object)
{
	if(object == undefined)
	{
		return false;
	}
	return (typeof(object) == 'string');
}

//---------------------------------------------//

module.exports = {
	combine : combine,
	clone : clone,
	isFunction : isFunction,
	isObject : isObject,
	isArray : isArray,
	isNumber : isNumber,
	isString : isString
};
