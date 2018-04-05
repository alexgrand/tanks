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
	const BLOCK_SHAPES = new Map();
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

	const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
	const checkIfBorder = (index) => {
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
	const setGameElementsMap = () => {
		const names = ['border', 'brick', 'wall', 'tree', 'npc', 'player'];

		names.forEach((name) => {
			if (name === 'npc' || name === 'player' || name === 'brick') {
				GAME_ELEMENTS.set(name, {'destroyable': true, 'life': 3});
			}
			GAME_ELEMENTS.set(name, {'destroyable': false});
		});
	};

	const setBlockShapesMap = () => {
		// BLOCK_SHAPES.set('shape1', [1, 2, 3, ROW_SIZE, ROW_SIZE + 1]);
		const shape1 = [1, 2, 3, ROW_SIZE, ROW_SIZE + 1, ROW_SIZE + 2, ROW_SIZE + 3, ROW_SIZE * 2, ROW_SIZE * 2 + 1, ROW_SIZE * 2 + 2, ROW_SIZE * 2 + 3];

		BLOCK_SHAPES.set('shape1', shape1);
	};
	const createBlock = (name, index) => {
		ALL_OBSTALES[index] = new Obstacle(name, index);
		ALL_OBSTALES[index].findCoords();
	};
	const createBlockShape = (name, index, shape) => {
		createBlock(name, index);
		shape.forEach((it) => {
			if (!ALL_OBSTALES[index + it]) {
				createBlock(name, (index + it));
			}
		});
	};
	const createMapBorders = () => {
		for (let i = 0; i < BLOCKS_AMOUNT; i++) {
			if (!ALL_OBSTALES[i]) {
				if (checkIfBorder(i)) {
					createBlock('border', i);
				}
			}
		}
	};
	const createAllObs = function () {
		const totalBlocksAmount = window.gameSetup.amount;

		for (const element in totalBlocksAmount) {
			let amount = Math.floor(window.gameSetup.amount[element] * BLOCKS_AMOUNT);

			while (amount > 0) {
				const randomIndex = getRandomNumber(BLOCKS_AMOUNT, 0);
				const randomShape = BLOCK_SHAPES.get('shape' + getRandomNumber(BLOCK_SHAPES.size, 1));

				if (!ALL_OBSTALES[randomIndex]) {
					createBlockShape(element, randomIndex, randomShape);
					amount -= randomShape.length;
				}
			}
		}
	};

	setGameElementsMap();
	setBlockShapesMap();
	createMapBorders();
	createAllObs();

	window.data = {'allObs': ALL_OBSTALES};
})();