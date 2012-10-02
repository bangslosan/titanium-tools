var TiTools = {
	Platform : require("TiTools/TiTools.Platform"),
	Locate : require("TiTools/TiTools.Locate")
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

/**
	@brief
		Замена предопределенных путей на абсолютный путь.
		Если файла не сужествует до сработает исключение
	@param path
		Путь до файла
	@return
		Абсолютный путь до файла
**/
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
		if(TiTools.Platform.isSimulator == true)
		{
			var file = Ti.Filesystem.getFile(result);
			if(file.exists() == false)
			{
				throw String(TiTools.Locate.getString('TITOOLS_THROW_FILE_NOT_FOUND') + ': ' + result);
			}
		}
	}
	return result;
}

//---------------------------------------------//

/**
	@brief
		Получение указателя на файл.
		Если файла не сужествует до сработает исключение
	@param path
		Путь до файла
	@return
		Обьект Ti.Filesystem.File
**/
function getFile(path)
{
	return Ti.Filesystem.getFile(preprocessPath(path));
}

//---------------------------------------------//

module.exports = {
	preprocessPath : preprocessPath,
	getFile : getFile
};
