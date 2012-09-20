var TiTools = {
	Platform : require("TiTools/TiTools.Platform")
};

//---------------------------------------------//

if(Ti.App.TiToolsFilesystemPath == undefined)
{
	var resourcesPath = TiTools.Platform.appropriate(
		{
			android : 'file:///android_asset/Resources/',
			ios : Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator
		}
	);
	Ti.App.TiToolsFilesystemPath = {
		resourcesPath : resourcesPath
	};
}

//---------------------------------------------//

function preprocessPath(path)
{
	var result = path.replace(/%([A-Za-z_]*)%/g,
		function(str, p1, p2, offset, s)
		{
			switch(p1)
			{
				case 'ResourcesPath': return Ti.App.TiToolsFilesystemPath.resourcesPath; 
			}
			return p1;
		}
	);
	if(result != path)
	{
		var file = Ti.Filesystem.getFile(result);
		if(file.exists() == false)
		{
			throw String(L('TITOOLS_THROW_FILE_NOT_FOUND') + ': ' + result);
		}
	}
	return result;
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
};
