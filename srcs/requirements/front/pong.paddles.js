pong.paddleL = {
	width : 5,
	height : 30,
	color : "#FFFFFF",
	posX : 10,
	posY : 0,
	moveDown : function()
	{
		if (pong.paddleL.posY < pong.groundHeight - pong.paddleL.height)
			pong.paddleL.posY += 5;
	},
	moveUp : function()
	{
		if (pong.paddleL.posY > 0)
			pong.paddleL.posY -= 5;
	},
	detectCollision : function(ball)
	{
		if (this.posX + this.width == ball.posX
			&& this.posY <= ball.posY + ball.height
			&& this.height + this.posY >= ball.posY)
			return (true);
		return (false);
	}
};

pong.paddleR = {
	width : 5,
	height : 30,
	color : "#FFFFFF",
	posX : 700 - 10 - 5, // is = pong.groundwidth - paddleMarginFromRight - paddleWidth
	posY : 0,
	moveDown : function()
	{
		if (pong.paddleR.posY < pong.groundHeight - pong.paddleR.height)
			pong.paddleR.posY += 5;
	},
	moveUp : function()
	{
		if (pong.paddleR.posY > 0)
			pong.paddleR.posY -= 5;
	},
	detectCollision : function(ball)
	{
		if (this.posX == ball.posX + ball.width
			&& this.posY <= ball.posY + ball.height
			&& this.height + this.posY >= ball.posY)
			return (true);
		return (false);
	}
};
