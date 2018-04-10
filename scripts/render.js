'use strict';
(function () {
	const ctxBack = window.renderCanvas.canvasBack.getContext('2d');
	const ctxFront = window.renderCanvas.canvasFront.getContext('2d');
	const {blockSize} = window.renderCanvas;

	window.data.allObs.forEach((it) => {
		if (it.name === 'border') {
			ctxBack.fillStyle = 'black';
		} else if (it.name === 'tree') {
			ctxBack.fillStyle = 'green';
		} else if (it.name === 'wall') {
			ctxBack.fillStyle = 'gray';
		} else {
			ctxBack.fillStyle = 'red';
		}
		ctxBack.fillRect(it.posX, it.posY, blockSize, blockSize);
		ctxBack.strokeStyle = 'black';
		ctxBack.strokeRect(it.posX, it.posY, blockSize, blockSize);
		if (it.name.indexOf('player') >= 0) {
			ctxFront.fillStyle = 'blue';
			ctxFront.fillRect(it.posX, it.posY, blockSize, blockSize);
		}

	});
})();