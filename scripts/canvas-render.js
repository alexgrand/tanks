'use strict';
(function () {
	const DOCUMENT_WIDTH = document.documentElement.clientWidth;
	const DOCUMENT_HEIGHT = document.documentElement.clientHeight;
	const PADDING = 20;
	const BASIC_GAME_SIZE = 300;
	const MAX_GAME_WIDTH = 1500;
	const MAX_GAME_HEIGHT = 500;
	const MIN_GAME_WIDTH = 300;
	const MIN_GAME_HEIGHT = 300;
	const CANVAS_ELEMENTS = document.querySelectorAll('.game canvas');

	[].forEach.call(CANVAS_ELEMENTS, function (it) {
		it.width = BASIC_GAME_SIZE;
		it.height = BASIC_GAME_SIZE;
		if (DOCUMENT_WIDTH < MAX_GAME_WIDTH && DOCUMENT_WIDTH > MIN_GAME_WIDTH) {
			it.width = DOCUMENT_WIDTH;
		}
		if (DOCUMENT_HEIGHT < MAX_GAME_HEIGHT && DOCUMENT_HEIGHT > MIN_GAME_HEIGHT) {
			it.height = DOCUMENT_HEIGHT;
		}
		it.width -= PADDING;
		it.height -= PADDING;
		it.style = 'border: 1px solid black;';
	});
})();