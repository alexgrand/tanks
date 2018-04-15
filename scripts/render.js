'use strict';
(function (exports) {
	const {'renderCanvas': RENDER_CANVAS} = exports;
	const {'blockSize': BLOCK_SIZE} = RENDER_CANVAS;
	const {canvasFront} = RENDER_CANVAS;
	const {ALL_OBSTACLES} = exports.data;
	const ALL_TANKS = ALL_OBSTACLES[ALL_OBSTACLES.length - 1];
	const CANVAS_WIDTH = canvasFront.width;
	const CANVAS_HEIGHT = canvasFront.height;
	const ctxBack = RENDER_CANVAS.canvasBack.getContext('2d');
	const ctxFront = RENDER_CANVAS.canvasFront.getContext('2d');

	const loop = () => {
		ctxFront.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		ALL_TANKS.forEach((tank) => {
			ctxFront.fillStyle = 'orange';
			if (tank.name === 'player') {
				ctxFront.fillStyle = 'blue';
			}
			ctxFront.fillRect(tank.posX, tank.posY, BLOCK_SIZE, BLOCK_SIZE);
		});

		requestAnimationFrame(loop);
	};

	ALL_OBSTACLES.forEach((it) => {
		if (it.name === 'border') {
			ctxBack.fillStyle = 'black';
		} else if (it.name === 'tree') {
			ctxBack.fillStyle = 'green';
		} else if (it.name === 'wall') {
			ctxBack.fillStyle = 'gray';
		} else {
			ctxBack.fillStyle = 'red';
		}
		if (it !== ALL_TANKS) {
			if (it.name !== 'player' && it.name !== 'npc') {
				ctxBack.fillRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
				ctxBack.strokeStyle = 'black';
				ctxBack.strokeRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
			}

			/*
			 * If (it.name.indexOf('player') >= 0) {
			 * 	ctxFront.fillStyle = 'blue';
			 * 	ctxFront.fillRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
			 * } else if (it.name.indexOf('npc') >= 0) {
			 * 	ctxFront.fillStyle = 'orange';
			 * 	ctxFront.fillRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
			 * }
			 */
		}
	});

	loop();
})(window.exports);