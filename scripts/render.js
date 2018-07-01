'use strict';
(function (exports) {
exports.render = {
	start () {
		const {'renderCanvas': RENDER_CANVAS} = exports;
		const {'blockSize': BLOCK_SIZE} = RENDER_CANVAS;
		const {ALL_OBSTACLES} = exports.data;
		const OBSTACLES = ALL_OBSTACLES.get('OBSTACLES');
		const ALL_TANKS = ALL_OBSTACLES.get('ALL_TANKS');
		const ALL_SHOTS = ALL_OBSTACLES.get('ALL_SHOTS');
		const {canvasFront} = RENDER_CANVAS;
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

			ALL_SHOTS.forEach((shot) => {
				let shotHeight = BLOCK_SIZE;
				let shotWidth = BLOCK_SIZE;

				if (shot.direction === 'top' || shot.direction === 'bottom') {
					shotWidth = 1;
				} else if (shot.direction === 'left' || shot.direction === 'right') {
					shotHeight = 1;
				}

				ctxMiddle.fillStyle = 'red';
				ctxMiddle.fillRect(shot.posX, shot.posY, shotWidth, shotHeight);
			});

			requestAnimationFrame(loop);
		};
		const drawBlock = (block, ctx) => {
			ctx.fillRect(block.posX, block.posY, BLOCK_SIZE, BLOCK_SIZE);
			ctx.strokeStyle = 'black';
			ctx.strokeRect(block.posX, block.posY, BLOCK_SIZE, BLOCK_SIZE);
		};
		const drawAllObstacles = () => {
			OBSTACLES.forEach((it) => {
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
		};

		drawAllObstacles();
		loop();
	}
};
})(window.exports);