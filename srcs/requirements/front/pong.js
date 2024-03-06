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

	init : function()
	{
		// creer 3 layers superposes
		// optimise le temps de refresh
		this.groundLayer = pong.display.createLayer("ground", this.groundWidth, this.groundHeight, undefined, 0, this.groundColor, 0, 0); 
		pong.display.drawRecInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth / 2 - this.netWidth / 2, 0);
		this.scoreLayer = pong.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
		this.ballPaddlesLayer = pong.display.createLayer("ballPaddles", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0); 

		this.randomizeBallDirection();
		// render
		this.displayScore(this.scorePlayer1, this.scorePlayer2);
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
		// update
		pong.moveBall();
		pong.movePaddles();
		// check if there is a winner and update scores
		pong.winLoseSystem();
		// render
		pong.displayBall();
		pong.displayPaddles();
		// pause game
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
		pong.display.drawRecInLayer(this.ballPaddlesLayer, pong.ball.width, pong.ball.height, pong.ball.color, pong.ball.posX, pong.ball.posY);
	},
	displayPaddles : function()
	{
		pong.display.drawRecInLayer(this.ballPaddlesLayer, pong.paddleL.width, pong.paddleL.height, pong.paddleL.color, pong.paddleL.posX, pong.paddleL.posY);
		pong.display.drawRecInLayer(this.ballPaddlesLayer, pong.paddleR.width, pong.paddleR.height, pong.paddleR.color, pong.paddleR.posX, pong.paddleR.posY);
	},

	// supprime la trainee de la balle
	clearLayer : function(targetLayer)
	{
		targetLayer.clear();
	},

	randomizeBallDirection : function()
	{
		pong.ball.velocityX = pong.ball.speed;
		pong.ball.velocityY = 0;
		if ((Math.floor(Math.random() * 2)) % 2)
			pong.ball.velocityX *= -1;
		console.log("vel x = " + pong.ball.velocityX + "vel y = " + pong.ball.velocityY );
	},

	centerBall : function()
	{
		pong.ball.posX = this.groundWidth / 2;
		pong.ball.posY = this.groundHeight / 2;
	},

	winLoseSystem : function()
	{
		// left player gagne 1 point
		if (pong.ball.posX + pong.ball.width >= this.groundWidth)
		{
			this.scorePlayer1++;
			this.randomizeBallDirection();
			// ball se dirige vers le gagnant
			if (pong.ball.velocityX > 0)
				pong.ball.velocityX *= -1;
			this.centerBall();
			this.clearLayer(this.scoreLayer);
			this.displayScore();
		}
		else if (pong.ball.posX <= 0)
		{
			this.scorePlayer2++;
			this.randomizeBallDirection();
			if (pong.ball.velocityX < 0)
				pong.ball.velocityX *= -1;
			this.centerBall();
			this.clearLayer(this.scoreLayer);
			this.displayScore();
		}
		else
			;
	},

	moveBall : function()
	{
		pong.ball.move();
		pong.ball.bounceOffWall();
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
	/* 	if (pong.paddleL.detectCollision(pong.ball) */
	/* 		|| pong.paddleR.detectCollision(pong.ball)) */
	/* 	{ */
	/* 		console.log("paddle collision"); */
	/* 		return (true); */
	/* 	} */
	/* 	return false; */
	/* } */
};
