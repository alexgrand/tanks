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
	const {'gameSetup': GAME_SETUP} = window;

	class Obstacle {
		constructor (name, index = '0') {
			this.name = name;
			this.index = index;
			this.destroyable = GAME_ELEMENTS.get(name).destroyable;
			if (this.destroyable) {
				this.life = 3;
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

	class Tank extends Obstacle {
		constructor (name, index) {
			super(name, index);
			this.canMove = true;
			this.direction = 'top';
			this.firepower = 1;
			this.velocity = 1;
			this.id = 0;
		}
	}

	const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
	const checkIfBorder = (index) => {
		const topBorder = index <= ROW_SIZE;
		const leftBorder = index % ROW_SIZE === 0;
		const rightBorder = index % ROW_SIZE === ROW_SIZE - 1;
		const bottomBorder = index >= BLOCKS_AMOUNT - ROW_SIZE;

		return topBorder || leftBorder || rightBorder || bottomBorder;
	};
	const setGameElementsMap = () => {
		for (const blockName in GAME_SETUP.blocks) {
			GAME_ELEMENTS.set(blockName, {'destroyable': 'npcplayerbrick'.indexOf(blockName) >= 0});
		}
	};
	const setShape = (xLine, yLine) => {
		const shapeSize = xLine * yLine;
		const shapeIndexes = [];

		for (let i = 1; i < shapeSize; i++) {
			shapeIndexes.push(ROW_SIZE * Math.floor(i / xLine) + Math.floor(i % xLine));
		}

		return shapeIndexes;
	};
	const setBlockShapesMap = () => {
		BLOCK_SHAPES.set('shape1', setShape(4, 3));
		BLOCK_SHAPES.set('shape2', setShape(3, 4));
		BLOCK_SHAPES.set('shape3', setShape(4, 4));
	};
	const createBlock = (name, index, ObjClass) => {
		ALL_OBSTALES[index] = new ObjClass(name, index);
		ALL_OBSTALES[index].findCoords();
	};
	const createBlockShape = (name, index, shape) => {
		createBlock(name, index, Obstacle);
		shape.forEach((it) => {
			if (!ALL_OBSTALES[index + it]) {
				createBlock(name, (index + it), Obstacle);
			}
		});
	};
	const createBorders = () => {
		for (let i = 0; i < BLOCKS_AMOUNT; i++) {
			if (!ALL_OBSTALES[i] && checkIfBorder(i)) {
				createBlock('border', i, Obstacle);
			}
		}
	};
	const createTanks = (tankType) => {
		let tanksAmount = GAME_SETUP.blocks[tankType];
		let tankId = 1;

		while (tanksAmount > 0) {
			const randomIndex = getRandomNumber(BLOCKS_AMOUNT, ROW_SIZE);

			if (!ALL_OBSTALES[randomIndex]) {
				createBlock(tankType, randomIndex, Tank);
				ALL_OBSTALES[randomIndex].id = tankId;
				tankId++;
				tanksAmount--;
			}
		}
	};
	const createAllObs = function () {
		setGameElementsMap();
		setBlockShapesMap();
		createBorders();

		const totalBlocksAmount = GAME_SETUP.blocks;

		for (const element in totalBlocksAmount) {
			if (element !== 'npc' && element !== 'player') {
				let amount = Math.floor(totalBlocksAmount[element] * BLOCKS_AMOUNT);

				while (amount > 0) {
					const randomIndex = getRandomNumber(BLOCKS_AMOUNT, 0);
					const randomShape = BLOCK_SHAPES.get('shape' + getRandomNumber(BLOCK_SHAPES.size, 1));

					if (!ALL_OBSTALES[randomIndex]) {
						createBlockShape(element, randomIndex, randomShape);
						amount -= randomShape.length;
					}
				}
			}
		}
		createTanks('player');
		createTanks('npc');
	};

	createAllObs();
	window.data = {ALL_OBSTALES};
})();