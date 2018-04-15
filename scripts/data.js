'use strict';
(function (exports) {
	const {renderCanvas} = exports;
	const {'width': GAME_WIDTH, 'height': GAME_HEIGHT} = renderCanvas.canvasBack;
	const {'blockSize': BLOCK} = renderCanvas;
	const {'gameSetup': GAME_SETUP} = exports;
	const GAME_AREA = GAME_WIDTH * GAME_HEIGHT;
	const BLOCKS_AMOUNT = GAME_AREA / (BLOCK * BLOCK);
	const ROW_SIZE = GAME_WIDTH / BLOCK;
	const GAME_ELEMENTS = new Map();
	const BLOCK_SHAPES = new Map();
	const ALL_OBSTACLES = [];
	const ALL_TANKS = new Map();

	class Obstacle {
		constructor (name, index = '0') {
			this.name = name;
			this.index = index;
			this.destroyable = GAME_ELEMENTS.get(name).destroyable;
			if (this.destroyable) {
				this.life = 3;
			}
		}

		findCoords () {
			this.posX = (this.index % ROW_SIZE) * BLOCK;
			if (this.index < ROW_SIZE) {
				this.posX = this.index * BLOCK;
			}
			this.posY = (this.index * BLOCK - this.posX) / ROW_SIZE;
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

		leftMove () {
			this.posX -= this.velocity;
		}

		rightMove () {
			this.posX += this.velocity;
		}

		topMove () {
			this.posY -= this.velocity;
		}

		bottomMove () {
			this.posY += this.velocity;
		}

		findIndex () {
			const posX = (Math.floor(this.posX / BLOCK)) * BLOCK;
			const posY = (Math.floor(this.posY / BLOCK)) * BLOCK;

			this.index = Math.floor((posX + posY * ROW_SIZE) / BLOCK);

			return this.index;
		}
	}

	const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
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
		ALL_OBSTACLES[index] = new ObjClass(name, index);
		ALL_OBSTACLES[index].findCoords();
	};
	const createBlockShape = (name, index, shape) => {
		createBlock(name, index, Obstacle);
		shape.forEach((it) => {
			if (!ALL_OBSTACLES[index + it]) {
				createBlock(name, (index + it), Obstacle);
			}
		});
	};
	const checkIfBorder = (index) => {
		const topBorder = index <= ROW_SIZE;
		const leftBorder = index % ROW_SIZE === 0;
		const rightBorder = index % ROW_SIZE === ROW_SIZE - 1;
		const bottomBorder = index >= BLOCKS_AMOUNT - ROW_SIZE;

		return topBorder || leftBorder || rightBorder || bottomBorder;
	};
	const createBorders = () => {
		for (let i = 0; i < BLOCKS_AMOUNT; i++) {
			if (!ALL_OBSTACLES[i] && checkIfBorder(i)) {
				createBlock('border', i, Obstacle);
			}
		}
	};
	const createObstacle = (element, blocks) => {
		let amount = blocks[element];
		let tankId = 1;

		if (element !== 'npc' && element !== 'player') {
			amount *= BLOCKS_AMOUNT;
		}

		while (Math.floor(amount) > 0) {
			const randomIndex = getRandomNumber(BLOCKS_AMOUNT, 0);

			if (!ALL_OBSTACLES[randomIndex]) {
				if (element !== 'npc' && element !== 'player') {
					const randomShape = BLOCK_SHAPES.get('shape' + getRandomNumber(BLOCK_SHAPES.size, 1));

					createBlockShape(element, randomIndex, randomShape);
					amount -= randomShape.length;
				} else {
					createBlock(element, randomIndex, Tank);
					const tankName = element + tankId;

					ALL_OBSTACLES[randomIndex].id = tankId;
					ALL_TANKS.set(tankName, ALL_OBSTACLES[randomIndex]);
					tankId++;
					amount--;
				}
			}
		}
	};
	const createAllObs = () => {
		const {blocks} = GAME_SETUP;

		setGameElementsMap();
		setBlockShapesMap();
		createBorders();
		for (const element in blocks) {
			createObstacle(element, blocks);
		}
		ALL_OBSTACLES.push(ALL_TANKS);
	};

	createAllObs();
	exports.data = {ALL_OBSTACLES, ROW_SIZE};
})(window.exports);