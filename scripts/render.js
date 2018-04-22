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
	const ctxMiddle = RENDER_CANVAS.canvasMiddle.getContext('2d');
	const ctxFront = RENDER_CANVAS.canvasFront.getContext('2d');

	const loop = () => {
		ctxMiddle.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		ALL_TANKS.forEach((tank) => {
			ctxMiddle.fillStyle = 'orange';
			if (tank.name === 'player') {
				ctxMiddle.fillStyle = 'blue';
			}
			ctxMiddle.fillRect(tank.posX, tank.posY, BLOCK_SIZE, BLOCK_SIZE);
		});

		requestAnimationFrame(loop);
	};
	const drawBlock = (block, ctx) => {
		ctx.fillRect(block.posX, block.posY, BLOCK_SIZE, BLOCK_SIZE);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(block.posX, block.posY, BLOCK_SIZE, BLOCK_SIZE);
	};

	ALL_OBSTACLES.forEach((it) => {
		if (it.name === 'border') {
			ctxBack.fillStyle = 'black';
			drawBlock(it, ctxBack);
		} else if (it.name === 'tree') {
			ctxFront.fillStyle = 'green';
			drawBlock(it, ctxFront);
		} else if (it.name === 'wall') {
			ctxBack.fillStyle = 'gray';
			drawBlock(it, ctxBack);
		} else if (it.name === 'brick') {
			ctxBack.fillStyle = 'red';
			drawBlock(it, ctxBack);
		}
	});

	loop();
})(window.exports);