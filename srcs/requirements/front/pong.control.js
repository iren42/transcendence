pong.control = {
	onKeyDown : function(event)
	{
		if(pong.keyCode[event.keyCode])
		{
			pong.keyCode[event.keyCode].pressed = true
		}
	},  

	onKeyUp : function(event)
	{
		if(pong.keyCode[event.keyCode])
		{
			pong.keyCode[event.keyCode].pressed = false
		}
	}
};
