const pong = {
	groundWidth : 700,
	groundHeight : 400,
	groundColor: "#000000",
	netWidth : 6,
	netColor : "#565656",

	groundLayer : null,
	scoreLayer : null,
	ballPaddlesLayer : null,

	scorePlayer1 : 0,
	scorePlayer2 : 0,

	currentState : null,

	ball : {
		width : 10,
		height : 10,
		color : "#0000FF",
		posX : 700 / 2,
		posY : 400 / 2,
		speed : 1,
		velocityX : 3,
		velocityY : 3,
		bounceOffWall : function()
		{
			if ( this.posY + this.height > pong.groundHeight || this.posY < 0  )
				this.velocityY *= -1;  
			if ( this.posX + this.width > pong.groundWidth || this.posX < 0  )
				this.velocityX *= -1;  
		},
		move : function()
		{
			if (pong.paddleL.detectCollision(pong.ball)
				|| pong.paddleR.detectCollision(pong.ball))
			{
				this.velocityX *= -1;
			}
			// ball must never go through our paddles
			if (this.posX < pong.paddleL.posX + pong.paddleL.width + 10
				&& this.velocityX < 0
				|| this.posX + this.width > pong.paddleR.posX - 10
				&& this.velocityX > 0)
			{
				let i = 0;
				/* console.log("small increment"); */
				while (i++ < Math.abs(this.velocityX)
					&& !(pong.paddleL.detectCollision(pong.ball)
						|| pong.paddleR.detectCollision(pong.ball)))
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
			}
			else
			{
				this.posY += this.velocityY;
				this.posX += this.velocityX;

			}
		}
	},

	paddleL : {
		width : 5,
		height : 30,
		color : "#FFFFFF",
		posX : 10,
		posY : 200,
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

	},

	paddleR : {
		width : 5,
		height : 30,
		color : "#FFFFFF",
		posX : 700 - 10 - 5, // is = pong.groundwidth - paddleMarginFromRight - paddleWidth
		posY : 200,
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
	},

	init : function()
	{
		// creer 3 layers superposes
		// optimise le temps de refresh
		this.groundLayer = pong.display.createLayer("ground", this.groundWidth, this.groundHeight, undefined, 0, this.groundColor, 0, 0); 
		pong.display.drawRecInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth / 2 - this.netWidth / 2, 0);
		this.scoreLayer = pong.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
		this.ballPaddlesLayer = pong.display.createLayer("ballPaddles", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0); 

		this.displayScore(this.scorePlayer1, this.scorePlayer2);
		this.randomizeBallDirection();
		this.displayBall();
		this.displayPaddles();
		this.initKeyboard(pong.control.onKeyDown, pong.control.onKeyUp);
		this.currentState = pong.start;
	},
	start	: function()
	{
		// TODO draw a "Press Enter to start" layer
		if(pong.code["Enter"].pressed)
		{
			pong.code["Enter"].pressed = false;
			pong.currentState = pong.game;
		}
	},

	game : function()
	{
		pong.clearLayer(pong.ballPaddlesLayer);
		pong.moveBall();
		pong.movePaddles();
		pong.updateScore();
		pong.displayBall();
		pong.displayPaddles();
		if (pong.code["Space"].pressed)
		{
			console.log("pause game");
			pong.code["Space"].pressed = false;
			pong.currentState = pong.pause;
		}
	},
	pause : function()
	{
		console.log("do nothing");
		// TODO draw pause button on screen
		// resume game
		if (pong.code["Space"].pressed)
		{
			console.log("resume game");
			pong.code["Space"].pressed = false; // needed bcs otherwise the key up event registers after the state change
			pong.currentState = pong.game;
		}
	},

	// key controls for paddles
	initKeyboard : function(onKeyDownFunction, onKeyUpFunction) 
	{
		window.onkeydown = onKeyDownFunction;
		window.onkeyup = onKeyUpFunction;
	},
	displayScore : function(scorePlayer1, scorePlayer2)
	{
		pong.display.drawTextInLayer(this.scoreLayer, this.scorePlayer1, "30px Arial", "#FF0000", 40, 30);
		pong.display.drawTextInLayer(this.scoreLayer, this.scorePlayer2 ,"30px Arial", "#FF0000", this.groundWidth / 2 + this.netWidth + 40, 30);
	},
	displayBall : function()
	{
		pong.display.drawRecInLayer(this.ballPaddlesLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
	},
	displayPaddles : function()
	{
		pong.display.drawRecInLayer(this.ballPaddlesLayer, this.paddleL.width, this.paddleL.height, this.paddleL.color, this.paddleL.posX, this.paddleL.posY);
		pong.display.drawRecInLayer(this.ballPaddlesLayer, this.paddleR.width, this.paddleR.height, this.paddleR.color, this.paddleR.posX, this.paddleR.posY);
	},

	// supprime la trainee de la balle
	clearLayer : function(targetLayer)
	{
		targetLayer.clear();
	},
	randomizeBallDirection()
	{
		if ((Math.floor(Math.random() * 2)) % 2)
			this.ball.velocityX *= -1;
	},
	centerBall : function()
	{
		this.ball.posX = this.groundWidth / 2;
		this.ball.posY = this.groundHeight / 2;
	},
	updateScore : function()
	{
		// left player gagne 1 point
		if (pong.ball.posX + pong.ball.width >= this.groundWidth)
		{
			this.scorePlayer1++;
			// ball se dirige vers le gagnant
			if (this.ball.velocityX > 0)
				this.ball.velocityX *= -1;
			this.centerBall();
			this.clearLayer(this.scoreLayer);
			this.displayScore();
		}

		else if (pong.ball.posX <= 0)
		{
			this.scorePlayer2++;
			if (this.ball.velocityX < 0)
				this.ball.velocityX *= -1;
			this.centerBall();
			this.clearLayer(this.scoreLayer);
			this.displayScore();
		}
		else
			;
	},
	moveBall : function()
	{
		this.ball.move();
		this.ball.bounceOffWall();
	},
	movePaddles : function()
	{
		Object.keys(pong.code).forEach(key => {
			if (key != "Space"
				&& key != "Enter")
				pong.code[key].pressed && pong.code[key].func();
		});
	}
	/* collisionWithBall : function() */
	/* { */
	/* 	if (this.paddleL.detectCollision(this.ball) */
	/* 		|| this.paddleR.detectCollision(this.ball)) */
	/* 	{ */
	/* 		console.log("paddle collision"); */
	/* 		return (true); */
	/* 	} */
	/* 	return false; */
	/* } */
};
