pong.code = { 
	// j
	KeyJ : {
		pressed: false,
		func: pong.paddleL.moveDown
	},
	// k
	KeyK : {
		pressed: false,
		func: pong.paddleL.moveUp
	},
	// l
	KeyL : {
		pressed: false,
		func: pong.paddleR.moveDown
	},
	// ;
	Semicolon : {
		pressed: false,
		func: pong.paddleR.moveUp
	},
	// space
	Space : {
		pressed: false,
		/* func: pong.pause */
	}
	/* // Enter */
	/* 13 : { */
	/* 	pressed:false, */
	/* 	func: pong.startGame */
	/* } */
};
