'use strict';
(function () {
	const DOCUMENT_WIDTH = document.documentElement.clientWidth;
	const DOCUMENT_HEIGHT = document.documentElement.clientHeight;
	const {'blockSize': BLOCK_SIZE} = window.exports.gameSetup;
	const BASIC_GAME_SIZE = 300;
	const MAX_GAME_WIDTH = 1500;
	const MAX_GAME_HEIGHT = 800;
	const MIN_GAME_WIDTH = 300;
	const MIN_GAME_HEIGHT = 300;
	const CANVAS_ELEMENTS = document.querySelectorAll('.game canvas');
	const CANVAS_FRONT_ELEMENT = document.querySelector('.game-front');
	const CANVAS_BACK_ELEMENT = document.querySelector('.game-background');

	[].forEach.call(CANVAS_ELEMENTS, function (it) {
		it.width = BASIC_GAME_SIZE;
		it.height = BASIC_GAME_SIZE;
		if (DOCUMENT_WIDTH < MAX_GAME_WIDTH && DOCUMENT_WIDTH > MIN_GAME_WIDTH) {
			it.width = DOCUMENT_WIDTH;
		}
		if (DOCUMENT_HEIGHT > MIN_GAME_HEIGHT && DOCUMENT_HEIGHT < MAX_GAME_HEIGHT) {
			it.height = DOCUMENT_HEIGHT;
		}
		if (it.width % BLOCK_SIZE || it.height % BLOCK_SIZE) {
			it.width -= it.width % BLOCK_SIZE;
			it.height -= it.height % BLOCK_SIZE;
		}
		it.width -= BLOCK_SIZE;
		it.height -= BLOCK_SIZE;
	});
	window.exports.renderCanvas = {
		'blockSize': BLOCK_SIZE,
		'canvasBack': CANVAS_BACK_ELEMENT,
		'canvasFront': CANVAS_FRONT_ELEMENT
	};
})();