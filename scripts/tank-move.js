'use strict';
(function (exports) {
	const {ALL_OBSTACLES} = exports.data;
	const {ROW_SIZE} = exports.data;
	const ALL_TANKS = ALL_OBSTACLES[ALL_OBSTACLES.length - 1];
	const KEY_CODES = {
		'37': 'left',
		'38': 'top',
		'39': 'right',
		'40': 'bottom',
		'17': 'fire'
	};
	const DIRECTIONS = new Set(['left', 'right', 'top', 'bottom']);
	const PLAYER = ALL_TANKS.get('player1');
	const DIRECTION_INDEXES = {
		'left': {
			'index1': -ROW_SIZE - 1,
			'index2': -1,
			'index3': ROW_SIZE - 1
		},
		'right': {
			'index1': -ROW_SIZE + 1,
			'index2': 1,
			'index3': ROW_SIZE + 1
		},
		'top': {
			'index1': -ROW_SIZE - 1,
			'index2': -ROW_SIZE,
			'index3': -ROW_SIZE + 1
		},
		'bottom': {
			'index1': ROW_SIZE - 1,
			'index2': ROW_SIZE,
			'index3': ROW_SIZE + 1
		}
	};

	const checkCollision = (tank, obs) => {
		let cantMove = true;

		tank.findSides();
		obs.findSides();
		if (tank.direction === 'left') {
			cantMove = tank.top + 1 <= obs.bottom && tank.bottom - 1 >= obs.top && tank.left <= obs.right;
		} else if (tank.direction === 'right') {
			cantMove = tank.top + 1 <= obs.bottom && tank.bottom - 1 >= obs.top && tank.right >= obs.left;
		} else if (tank.direction === 'top') {
			cantMove = tank.top <= obs.bottom && tank.left + 1 <= obs.right && tank.right - 1 >= obs.left;
		} else if (tank.direction === 'bottom') {
			cantMove = tank.bottom >= obs.top && tank.left + 1 <= obs.right && tank.right - 1 >= obs.left;
		}

		return cantMove;
	};
	const checkMove = (tank) => {
		const canMove = {'index1': true, 'index2': true, 'index3': true};
		const sideIndexes = DIRECTION_INDEXES[tank.direction];

		for (const i in sideIndexes) {
			const index = tank.index + sideIndexes[i];
			const isObstacle = ALL_OBSTACLES[index];

			if (isObstacle) {
				canMove[i] = !checkCollision(tank, isObstacle);
			}
		}

return canMove.index1 && canMove.index2 && canMove.index3;
	};
	const move = (tank) => {
		const currentIndex = tank.index;

		if (checkMove(tank)) {
			tank[tank.direction + 'Move']();
			tank.findIndex();
			if (currentIndex !== tank.index) {
				ALL_OBSTACLES[tank.index] = tank;
				ALL_OBSTACLES[currentIndex] = false;
			}
		}
	};
	const onDocumentKeydown = (evt) => {
		if (KEY_CODES[evt.which]) {
			const keyNum = evt.which;
			const keyName = KEY_CODES[keyNum];

			if (DIRECTIONS.has(keyName)) {
				PLAYER.direction = keyName;
				move(PLAYER);
			}
		}
	};

	document.addEventListener('keydown', onDocumentKeydown);

})(window.exports);