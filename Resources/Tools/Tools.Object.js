//---------------------------------------------//

if(Ti.App.ToolsUnigueID == undefined)
{
	Ti.App.ToolsUnigueID = 0;
}

//---------------------------------------------//

function unigueID()
{
	Ti.App.ToolsUnigueID = Ti.App.ToolsUnigueID + 1;
	return Ti.App.ToolsUnigueID;
}

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
	return (Object.prototype.toString.call(object) === '[object Array]');
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
	isFunction : isFunction,
	isObject : isObject,
	isArray : isArray,
	isNumber : isNumber,
	isString : isString
};
