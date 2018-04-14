'use strict';
(function () {
	const {'renderCanvas': RENDER_CANVAS} = window.exports;
	const {'data': DATA} = window.exports;
	const {'blockSize': BLOCK_SIZE} = RENDER_CANVAS;
	const ctxBack = RENDER_CANVAS.canvasBack.getContext('2d');
	const ctxFront = RENDER_CANVAS.canvasFront.getContext('2d');

	DATA.ALL_OBSTACLES.forEach((it) => {
		if (it.name === 'border') {
			ctxBack.fillStyle = 'black';
		} else if (it.name === 'tree') {
			ctxBack.fillStyle = 'green';
		} else if (it.name === 'wall') {
			ctxBack.fillStyle = 'gray';
		} else {
			ctxBack.fillStyle = 'red';
		}
		ctxBack.fillRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
		ctxBack.strokeStyle = 'black';
		ctxBack.strokeRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
		if (it.name.indexOf('player') >= 0) {
			ctxFront.fillStyle = 'blue';
			ctxFront.fillRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
		} else if (it.name.indexOf('npc') >= 0) {
			ctxFront.fillStyle = 'orange';
			ctxFront.fillRect(it.posX, it.posY, BLOCK_SIZE, BLOCK_SIZE);
		}

	});
})();