'use strict';
(function () {
	const gameWidth = window.renderCanvas.canvasBack.width;
	const gameHeight = window.renderCanvas.canvasBack.height;
	const block = window.renderCanvas.blockSize;
	const gameArea = gameWidth * gameHeight;
	const blockArea = block * block;
	const blocksAmount = gameArea / blockArea;
	const rowSize = gameWidth / block;
	const blockTypes = new Map();
	const gameElements = new Map();
	const allObstacles = [];

	class Obstacle {
		constructor (name, destroyable, life) {
			this.name = name;
			this.destroyable = destroyable;
			this.life = life;
		}

		findIndex () {
			this.index = Math.floor((this.posX + this.posY * rowSize) / block);

			return this.index;
		}

		findCoords () {
			this.posX = (this.index % rowSize) * block;
			if (this.index < rowSize) {
				this.posX = this.index * block;
			}
			this.posY = (this.index * block - this.posX) / rowSize;

			return {
				'posX': this.posX,
				'posY': this.posY
			};
		}

		findSides () {
			this.left = this.posX;
			this.right = this.posX + block;
			this.top = this.posY;
			this.bottom = this.posY + block;
		}
	}

	class Border extends Obstacle {
		constructor (index) {
			super('border', gameElements.get('border').destroyable);
			this.index = index;
			this.findCoords();
		}
	}

	const createGameElementsMap = function () {
		const names = ['border', 'brick', 'wall', 'tree', 'npc', 'player'];

		names.forEach((name) => {
			if (name === 'npc' || name === 'player' || name === 'brick') {
				gameElements.set(name, {'destroyable': true, 'life': 3});
			}
			gameElements.set(name, {'destroyable': false});
		});
	};





	const createBlockTypesMap = function (...args) {
		// blockTypes.set() 
		// сделать поиск по сету типов блоков, выбрать последний номер. добавить массив следующих
	};






	const getRandomNumber = function (max, min) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	const createBlock = function (index, name) {
		return new Obstacle(name);
	};
	const createObstacle = function (index, array) {
	};

	const checkIfWall = function (index) {
		let isWall = false;

		if (index >= 0 && index <= rowSize) {
			isWall = true;
		} else if (index % rowSize === 0) {
			isWall = true;
		} else if (index % rowSize === rowSize - 1) {
			isWall = true;
		} else if (index >= blocksAmount - rowSize) {
			isWall = true;
		}

		return isWall;
	};

	const ctx = window.renderCanvas.canvasFront.getContext('2d');

	createGameElementsMap();
	for (let i = 0; i < blocksAmount; i++) {
		if (!allObstacles[i]) {
			if (checkIfWall(i)) {
				const newWall = new Border(i);

				allObstacles[i] = newWall;
				ctx.fillRect(newWall.posX, newWall.posY, block, block);
			}
		}
	}
})();