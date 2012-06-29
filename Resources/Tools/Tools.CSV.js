var ToolsObject = require('Tools/Tools.Object');
var ToolsString = require('Tools/Tools.String');

//---------------------------------------------//

function save(csv)
{
	var out = "";
	for(var i = 0; i < csv.length; ++i)
	{
		var row = csv[i];
		for(var j = 0; j < row.length; ++j)
		{
			var cur = row[j];
			if(ToolsObject.isString(cur) == true)
			{
				cur = cur.replace(/"/g, '""');
				if((ToolsString.needsQuoting(cur) == true) || (ToolsString.isInt(cur) == true) || (ToolsString.isFloat(cur) == true))
				{
					cur = '"' + cur + '"';
				}
				else if(cur === '')
				{
					cur = '""';
				}
			}
			else if(ToolsObject.isNumber(cur) == true)
			{
				cur = cur.toString(10);
			}
			else if(cur === null)
			{
				cur = '';
			}
			else
			{
				cur = cur.toString();
			}
			out += (j < row.length - 1) ? cur + ',' : cur;
		}
		out += '\n';
	}
	return out;
}

function load(str, trim)
{
	var inQuote = false;
	var fieldQuoted = false;
	var field = '';
	var row = [];
	var out = [];
	
	function loadField(field)
	{
		if(fieldQuoted !== true)
		{
			if(field === '')
			{
				field = null;
			}
			else if(trim === true)
			{
				field = ToolsString.trim(field);
			}
			if(ToolsString.isInt(field) == true)
			{
				field = parseInt(field, 10);
			}
			else if(ToolsString.isFloat(field) == true)
			{
				field = parseFloat(field, 10);
			}
		}
		return field;
	};
	
	str = ToolsString.chomp(str);
	for(var i = 0; i < str.length; ++i)
	{
		var cur = str.charAt(i);
		if((inQuote === false) && ((cur === ',') || (cur === '\n')))
		{
			field = loadField(field);
			row.push(field);
			if(cur === '\n')
			{
				out.push(row);
				row = [];
			}
			field = '';
			fieldQuoted = false;
		}
		else
		{
			if(cur !== '"')
			{
				field += cur;
			}
			else
			{
				if(inQuote == false)
				{
					inQuote = true;
					fieldQuoted = true;
				}
				else
				{
					if(str.charAt(i + 1) === '"')
					{
						field += '"';
						i += 1;
					}
					else
					{
						inQuote = false;
					}
				}
			}
		}
	}
	field = loadField(field);
	row.push(field);
	out.push(row);
	return out;
}

//---------------------------------------------//

module.exports = {
	save : save,
	load : load
};
