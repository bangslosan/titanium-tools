if(Ti.App.ToolsHTMLStyleSheet == undefined)
{
	Ti.App.ToolsHTMLStyleSheet = [];
}

//---------------------------------------------//

function setStyleSheet(name, style)
{
	var founded = false;
	var list = Ti.App.ToolsHTMLStyleSheet;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list[i].style = style;
			founded = true;
			break;
		}
	}
	if(founded == false)
	{
		list.push(
			{
				name : name,
				style : style
			}
		);
	}
	Ti.App.ToolsHTMLStyleSheet = list;
}

function getStyleSheet(name)
{
	var list = Ti.App.ToolsHTMLStyleSheet;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			return ' ' + list[i].params;
		}
	}
	return '';
}

function removeStyleSheet(name)
{
	var list = Ti.App.ToolsHTMLStyleSheet;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].name == name)
		{
			list.splice(i, 1);
			break;
		}
	}
	Ti.App.ToolsHTMLStyleSheet = list;
}

var createTable = function(style, content)
{
	var res = '<table' + getStyleSheet(style) + '>';
	for(var i = 0; i < content.length; i++)
	{
		res += createTableRow(content[i].style, content[i].content);
	}
   	res += '</table>';
   	return res;
};

var createTableRow = function(style, content)
{
	var res = '<tr' + getStyleSheet(style) + '>';
	for(var i = 0; i < content.length; i++)
	{
		res += createTableCell(content[i].style, content[i].content);
	}
   	res += '</tr>';
   	return res;
};

var createTableCell = function(style, content)
{
   	return '<td' + getStyleSheet(style) + '>' + content + '</td>';
};
		
//---------------------------------------------//

module.exports = {
	setStyleSheet : setStyleSheet,
	getStyleSheet : getStyleSheet,
	removeStyleSheet : removeStyleSheet,
	createTable : createTable,
	createTableRow : createTableRow,
	createTableCell : createTableCell
};
