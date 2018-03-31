'use strict';
(function () {
	const ctx = window.renderCanvas.canvasBack.getContext('2d');

	window.data.allObs.forEach((it) => {
		if (it.name === 'border') {
			ctx.fillRect(it.posX, it.posY, window.renderCanvas.blockSize, window.renderCanvas.blockSize);
		}
	});
})();