'use strict';
(function () {
	const ctxBack = window.renderCanvas.canvasBack.getContext('2d');

	window.data.allObs.forEach((it) => {
		if (it.name === 'border') {
			ctxBack.fillRect(it.posX, it.posY, window.renderCanvas.blockSize, window.renderCanvas.blockSize);
		}
	});
})();