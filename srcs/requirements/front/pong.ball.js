pong.ball = {
	width : 10,
	height : 10, // must be equal to width
	color : "#0000FF",
	posX : 700 / 2,
	posY : 400 / 2,

	speed : 5,
	normal : 0,
	relative : 0,
	angle : 0,

	diff : 0,
	largestAbsVel : 0,

	velocityX : 0,
	velocityY : 0,

	cooldown : false,

	bounceOffWall : function()
	{
		if (this.posY + this.height >= pong.groundHeight || this.posY <= 0)
			this.velocityY *= -1;  
		if (this.posX + this.width >= pong.groundWidth || this.posX <= 0)
			this.velocityX *= -1;  
	},

	move : function()
	{
		if (this.cooldown == true)
			return ;
		if (pong.paddleL.detectCollision(pong.ball))
		{
			this.relative = (pong.paddleL.posY + (pong.paddleL.height / 2) - (this.posY + this.height/2)) ; // values between (-paddleHeight/2) and paddleHeight/2
			this.normal = this.relative / (pong.paddleL.height / 2); // values between -1 and 1
			this.angle = this.normal * 0.25 * Math.PI; // 0.25 * PI rad is equal to 45 degrees, it is the max bounce angle
			this.velocityX = Math.round(this.speed * Math.cos(this.angle));
			this.velocityY = Math.round(this.speed * Math.sin(this.angle) * (-1));
		}
		else if (pong.paddleR.detectCollision(pong.ball))
		{
			this.relative = (pong.paddleR.posY + (pong.paddleR.height / 2) - (this.posY + this.height / 2)) ;
			this.normal = this.relative / (pong.paddleR.height / 2);
			this.angle = this.normal * 0.25 * Math.PI;
			this.velocityX = Math.round(this.speed * Math.cos(this.angle) * (-1));
			this.velocityY = Math.round(this.speed * Math.sin(this.angle) * (-1));
		}
		else
			;

		// small increments bcs
		// ball must never pass through our paddles
		if (this.posX < pong.paddleL.posX + pong.paddleL.width + 10
			&& this.velocityX < 0
			|| this.posX + this.width > pong.paddleR.posX - 10
			&& this.velocityX > 0)
		{
			largestAbsVel = Math.abs(this.velocityY);
			diff = (Math.abs(this.velocityX) - Math.abs(this.velocityY));
			if (diff > 0)
				largestAbsVel = Math.abs(this.velocityX);
			/* console.log(this.velocityX + ","  + this.velocityY + " = velx vely"); */
			/* console.log("before loop, ballx=" + this.posX + "bally=" + this.posY + ", diff = " + diff); */
			while (largestAbsVel-- > 0
				&& (!(pong.paddleL.detectCollision(pong.ball)
					|| pong.paddleR.detectCollision(pong.ball))))
			{
				if (diff == 0) // posX and posY increment at the same speed 
				{
					if (this.velocityX > 0)
						this.posX++;
					else
						this.posX--;
					if (this.velocityY > 0)
						this.posY++;
					else
						this.posY--;
				}
				else if (diff > 0) // posX increments faster than posY
				{
					if (this.velocityX > 0)
						this.posX++;
					else
						this.posX--;
					diff--;
				}
				else
				{
					if (this.velocityY > 0)
						this.posY++;
					else 
						this.posY--;
					diff++;
				}
				/* console.log("inside loop, ballx=" + this.posX + "bally=" + this.posY + ", diff = " + diff); */
			}
		}
		else
		{
			this.posY += this.velocityY;
			this.posX += this.velocityX;
		}
	}
};
