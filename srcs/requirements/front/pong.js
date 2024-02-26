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

	ball : {
		width : 10,
		height : 10,
		color : "#0000FF",
		posX : 700 / 2,
		posY : 400 / 2,
		speed : 1,
		directionX : 1, // is 1 when goesRight, is -1 when goesLeft
		directionY : 1, // is 1 when goesDown, is -1 when goesUp
		velocityX : 5,
		velocityY : 5,
		move : function(angle)
		{
			this.posX += this.directionX * this.speed;
			this.posY += this.directionY * this.speed;
		},
		bounce : function()
		{
			if ( this.posX + this.width > pong.groundWidth || this.posX < 0 )
				this.directionX *= -1;
			if ( this.posY + this.height > pong.groundHeight || this.posY < 0  )
				this.directionY *= -1;  
		},

		detectCollision : function(anotherItem)
		{
			if (!(this.posX > anotherItem.posX + anotherItem.width
				|| this.posX + this.width < anotherItem.posX
				|| this.posY > anotherItem.posY + anotherItem.height
				|| this.posY + this.height < anotherItem.posY))
				return (true);
			return (false);
		}
	},

	paddle1 : {
		width : 10,
		height : 20,
		color : "#FFFFFF",
		posX : 10,
		posY : 200,
		moveDown : function()
		{
			if (pong.paddle1.posY < pong.groundHeight - pong.paddle1.height)
				pong.paddle1.posY += 5;
		},
		moveUp : function()
		{
			if (pong.paddle1.posY > 0)
				pong.paddle1.posY -= 5;
		}
	},

	paddle2 : {
		width : 10,
		height : 20,
		color : "#FFFFFF",
		posX : 700 - 30,
		posY : 200,
		moveDown : function()
		{
			if (pong.paddle2.posY < pong.groundHeight - pong.paddle2.height)
				pong.paddle2.posY += 5;
		},
		moveUp : function()
		{
			if (pong.paddle2.posY > 0)
				pong.paddle2.posY -= 5;
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
	},

	// key controls for paddles
	initKeyboard : function(onKeyDownFunction, onKeyUpFunction) 
	{
		window.onkeydown = onKeyDownFunction;
		window.onkeyup = onKeyUpFunction;
	},
	displayScore : function(scorePlayer1, scorePlayer2)
	{
		pong.display.drawTextInLayer(this.scoreLayer, this.scorePlayer1, "30px Arial", "#FF0000", this.groundWidth / 2 - 50, 70);
		pong.display.drawTextInLayer(this.scoreLayer, this.scorePlayer2 ,"30px Arial", "#FF0000", this.groundWidth / 2  + 15, 70);
	},
	displayBall : function()
	{
		pong.display.drawRecInLayer(this.ballPaddlesLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
	},
	displayPaddles : function()
	{
		pong.display.drawRecInLayer(this.ballPaddlesLayer, this.paddle1.width, this.paddle1.height, this.paddle1.color, this.paddle1.posX, this.paddle1.posY);
		pong.display.drawRecInLayer(this.ballPaddlesLayer, this.paddle2.width, this.paddle2.height, this.paddle2.color, this.paddle2.posX, this.paddle2.posY);
	},

	// supprime la trainee de la balle
	clearLayer : function(targetLayer)
	{
		targetLayer.clear();
	},
	randomizeBallDirection()
	{
		if ((Math.floor(Math.random() * 2)) % 2)
			this.ball.directionX = -1;
		else
			this.ball.directionX = 1;
	},
	centerBall : function()
	{
		this.ball.posX = this.groundWidth / 2;
		this.ball.posY = this.groundHeight / 2;
	},
	score : function()
	{
			// player1 gagne 1 point
		if (pong.ball.posX + pong.ball.width >= this.groundWidth)
		{
			this.scorePlayer1++;
			// ball se dirige vers le gagnant
			this.ball.directionX = -1;
			this.centerBall();
			this.clearLayer(this.scoreLayer);
			this.displayScore();
		}

		else if (pong.ball.posX == 0)
		{
			this.scorePlayer2++;
			this.ball.directionX = 1;
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
		this.ball.bounce();
	},
	movePaddles : function()
	{
		Object.keys(pong.keyCode).forEach(key => {
		pong.keyCode[key].pressed && pong.keyCode[key].func()
		});
	},
	detectCollisionWithBall : function()
	{
		if (this.ball.detectCollision(this.paddle1) || this.ball.detectCollision(this.paddle2))
		{
			console.log("paddle collision");
			this.ball.directionX *= -1;
		}
	}
};
