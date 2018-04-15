'use strict';
(function (exports) {
	const {ALL_OBSTACLES} = exports.data;
	const {ROW_SIZE} = exports.data;
	const ALL_TANKS = ALL_OBSTACLES[ALL_OBSTACLES.length - 1];
	const KEY_CODES = {
		'37': 'left',
		'38': 'top',
		'39': 'right',
		'40': 'bottom'
	};
	const DIRECTIONS = new Set(['left', 'right', 'top', 'bottom']);
	const PLAYER = ALL_TANKS.get('player1');

	const onDocumentKeydown = (evt) => {
		if (KEY_CODES[evt.which]) {
			const keyNum = evt.which;
			const keyName = KEY_CODES[keyNum];

			if (DIRECTIONS.has(keyName)) {
				PLAYER.direction = keyName;
			}
		}
	};

	document.addEventListener('keydown', onDocumentKeydown);

})(window.exports);