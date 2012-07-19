function sleep(time)
{
    var start = new Date().getTime();
    while(true)
    {
    	var delta = new Date().getTime() - start;
    	if(delta >= time)
    	{
    		break;
    	}
    }
}

//---------------------------------------------//

module.exports = {
	sleep : sleep
};
