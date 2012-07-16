var ToolsString = require('Tools/Tools.String');

//---------------------------------------------//

function preprocessPath(path)
{
	if(ToolsString.isPrefix(path, '%ResourcesPath%') == true)
	{
		path = ToolsString.replaceAll(path, '%ResourcesPath%', '');
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, path);
		if(file.exists() == true)
		{
			path = file.nativePath;
		}
	}
	return path;
}

//---------------------------------------------//

function getFile(path)
{
	return Ti.Filesystem.getFile(preprocessPath(path));
}

//---------------------------------------------//

module.exports = {
	preprocessPath : preprocessPath,
	getFile : getFile
}