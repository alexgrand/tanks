'use strict';
(function () {
	const ctxBack = window.renderCanvas.canvasBack.getContext('2d');

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
		ctxBack.fillRect(it.posX, it.posY, window.renderCanvas.blockSize, window.renderCanvas.blockSize);
		ctxBack.strokeStyle = 'black';
		ctxBack.strokeRect(it.posX, it.posY, window.renderCanvas.blockSize, window.renderCanvas.blockSize);
	});
})();