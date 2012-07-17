var Tools = {
	String : require("Tools/Tools.String")
}

//---------------------------------------------//

function preprocessPath(path)
{
	if(Tools.String.isPrefix(path, '%ResourcesPath%') == true)
	{
		path = Tools.String.replaceAll(path, '%ResourcesPath%', '');
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