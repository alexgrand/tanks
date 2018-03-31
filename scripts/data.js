'use strict';
(function () {
	const GAME_WIDTH = window.renderCanvas.canvasBack.width;
	const GAME_HEIGHT = window.renderCanvas.canvasBack.height;
	const BLOCK = window.renderCanvas.blockSize;
	const GAME_AREA = GAME_WIDTH * GAME_HEIGHT;
	const BLOCK_AREA = BLOCK * BLOCK;
	const BLOCKS_AMOUNT = GAME_AREA / BLOCK_AREA;
	const ROW_SIZE = GAME_WIDTH / BLOCK;
	const GAME_ELEMENTS = new Map();
	const ALL_OBSTALES = [];

	class Obstacle {
		constructor (name, index = '0') {
			this.name = name;
			this.index = index;
			this.destroyable = GAME_ELEMENTS.get(name).destroyable;
			if (GAME_ELEMENTS.get(name).life) {
				this.life = GAME_ELEMENTS.get(name).life;
			}
		}

		findIndex () {
			this.index = Math.floor((this.posX + this.posY * ROW_SIZE) / BLOCK);

			return this.index;
		}

		findCoords () {
			this.posX = (this.index % ROW_SIZE) * BLOCK;
			if (this.index < ROW_SIZE) {
				this.posX = this.index * BLOCK;
			}
			this.posY = (this.index * BLOCK - this.posX) / ROW_SIZE;

			return {
				'posX': this.posX,
				'posY': this.posY
			};
		}

		findSides () {
			this.left = this.posX;
			this.right = this.posX + BLOCK;
			this.top = this.posY;
			this.bottom = this.posY + BLOCK;
		}
	}

	const createGameElementsMap = function () {
		const names = ['border', 'brick', 'wall', 'tree', 'npc', 'player'];

		names.forEach((name) => {
			if (name === 'npc' || name === 'player' || name === 'brick') {
				GAME_ELEMENTS.set(name, {'destroyable': true, 'life': 3});
			}
			GAME_ELEMENTS.set(name, {'destroyable': false});
		});
	};

	const checkIfBorder = function (index) {
		let isBorder = false;

		if (index >= 0 && index <= ROW_SIZE) {
			isBorder = true;
		} else if (index % ROW_SIZE === 0) {
			isBorder = true;
		} else if (index % ROW_SIZE === ROW_SIZE - 1) {
			isBorder = true;
		} else if (index >= BLOCKS_AMOUNT - ROW_SIZE) {
			isBorder = true;
		}

		return isBorder;
	};

	const createBlock = function (name, index) {
		ALL_OBSTALES[index] = new Obstacle(name, index);
		ALL_OBSTALES[index].findCoords();
	};

	const createMapBorders = function () {
		for (let i = 0; i < BLOCKS_AMOUNT; i++) {
			if (!ALL_OBSTALES[i]) {
				if (checkIfBorder(i)) {
					createBlock('border', i);
				}
			}
		}
	};

	createGameElementsMap();
	createMapBorders();

	window.data = {'allObs': ALL_OBSTALES};
})();