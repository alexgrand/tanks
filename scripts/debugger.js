'use strict';
(function (exports) {
	const GAME_ELEMENT = document.querySelector('.game-front');

	GAME_ELEMENT.addEventListener('click', function (evt) {
		const {renderCanvas} = exports;
		const {'width': GAME_WIDTH} = renderCanvas.canvasBack;
		const {'blockSize': BLOCK} = renderCanvas;
		const ROW_SIZE = GAME_WIDTH / BLOCK;
		const posX = (Math.floor((evt.clientX - 8) / BLOCK)) * BLOCK;
		const posY = (Math.floor((evt.clientY - 8) / BLOCK)) * BLOCK;
		const index = Math.floor((posX + posY * ROW_SIZE) / BLOCK);

		console.log(posX, posY, 'index = ' + index);
	});
})(window.exports);