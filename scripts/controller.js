'use strict';
(function (exports) {
	exports.controller = {
	start () {
		const {playerMove} = exports.tankMove;
		const {createShot} = exports.tankFire;
		const KEY_CODES = new Map([
			[37, 'left'],
			[38, 'top'],
			[39, 'right'],
			[40, 'bottom'],
			[17, 'fire']
		]);

		const onDocumentKeydown = (evt) => {
			if (KEY_CODES.has(evt.which)) {
				const keyNum = evt.which;
				const keyName = KEY_CODES.get(keyNum);

				if (keyName === 'fire') {
					createShot();
				} else {
					playerMove(keyName);
				}
			}
		};
		const startController = () => {
			document.addEventListener('keydown', onDocumentKeydown);
		};

		startController();
	}
};
})(window.exports);