pong.ball = {
	width : 10,
	height : 10, // must be equal to width
	color : "#0000FF",
	posX : 700 / 2,
	posY : 400 / 2,

	speed : 5,
	offset : 0,
	angle : 0,

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
			// calcul de la trajectoire de la balle
			this.offset = (this.posY + this.width - pong.paddleL.posY) / (pong.paddleL.height + this.width);
			this.angle = 0.25 * Math.PI * (2 * this.offset - 1);
			this.velocityY = this.speed * Math.sin(this.angle);
			this.velocityX *= -1;
		}
		else if (pong.paddleR.detectCollision(pong.ball))
		{
			this.offset = (this.posY + this.width - pong.paddleR.posY) / (pong.paddleR.height + this.width);
			this.angle = 0.25 * Math.PI * (2 * this.offset - 1);
			this.velocityY = this.speed * Math.sin(this.angle);
			this.velocityX *= -1;
		}
		else
			;
		// ball must never go through our paddles
		if (this.posX < pong.paddleL.posX + pong.paddleL.width + 10
			&& this.velocityX < 0
			|| this.posX + this.width > pong.paddleR.posX - 10
			&& this.velocityX > 0)
		{
			console.log(this.velocityX + ","  + this.velocityY + " = velx vely");
			let i = 0;
			let higherVel = Math.abs(this.velocityY);
			let diff = (Math.abs(this.velocityX) - Math.abs(this.velocityY));
			if (diff > 0)
				higherVel = Math.abs(this.velocityX);
			console.log("diff = " + diff);
			let buf = (diff);
			while (i++ < higherVel
				&& (!(pong.paddleL.detectCollision(pong.ball)
					|| pong.paddleR.detectCollision(pong.ball))))
			{
				if (buf == 0) // posX and posY increment at the same speed 
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
				else if (buf > 0) // posX increments faster than posY
				{
					if (this.velocityX > 0)
					{
						this.posX++;
					}
					else
					{
						this.posX--;
					}
					if (this.velocityY > 0 && buf == 1)
						this.posY++;
					else if (this.velocityY < 0 && buf == 1)
						this.posY--;
					else
						;
					buf--;
				}
				else
				{
					if (this.velocityX > 0 && buf == -1)
					{
						this.posX++;
					}
					else if (this.velocityX < 0 && buf == -1)
						this.posX--;
					else
						;
					if (this.velocityY > 0)
						this.posY++;
					else
						this.posY--;
					buf++;
				}
			}
		}
		else
		{
			this.posY += this.velocityY;
			this.posX += this.velocityX;
		}
	}
};
