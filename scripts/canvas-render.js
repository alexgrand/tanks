'use strict';
(function () {
	const DOCUMENT_WIDTH = document.documentElement.clientWidth;
	const DOCUMENT_HEIGHT = document.documentElement.clientHeight;
	const padding = 20;
	const CANVAS_ELEMENTS = document.querySelectorAll('.game canvas');
	[].forEach.call(CANVAS_ELEMENTS, function (it) {
		it.width = DOCUMENT_WIDTH - padding;
		it.height = DOCUMENT_HEIGHT - padding;
		it.style = 'position: absolute; border: 1px solid black;';
	});
})();