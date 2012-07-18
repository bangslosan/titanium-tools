var Tools = {
	String : require("Tools/Tools.String"),
	Platform : require("Tools/Tools.Platform")
}

//---------------------------------------------//

if(Ti.App.ToolsFilesystemPath == undefined)
{
	var resources = Tools.Platform.appropriate(
		{
			android : 'file:///android_asset/Resources/',
			ios : Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator
		}
	);
	Ti.App.ToolsFilesystemPath = {
		resources : resources
	};
}

//---------------------------------------------//

function preprocessPath(path)
{
	path = path.replace(/%([A-Za-z_]*)%/g,
		function(str, p1, p2, offset, s)
		{
			switch(p1)
			{
				case 'ResourcesPath': return Ti.App.ToolsFilesystemPath.resources; 
			}
			return p1;
		}
	);
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