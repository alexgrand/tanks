'use strict';
(function () {
	const gameWidth = window.renderCanvas.canvasBack.width;
	const gameHeight = window.renderCanvas.canvasBack.height;
	const block = window.renderCanvas.blockSize;
	const gameArea = gameWidth * gameHeight;
	const blockArea = block * block;
	const blocksAmount = gameArea / blockArea;
	const rowSize = gameWidth / block;
	const lifeSize = new Map([
	[
		'wall',
		0
		]
	]);
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

	class Wall extends Obstacle {
		constructor (index) {
			super('wall', false, lifeSize.get('wall'));
			this.index = index;
		}
	}

	const checkIsWall = (index) => {
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

	for (let i = 0; i < blocksAmount; i++) {
		if (!allObstacles[i]) {
			if (checkIsWall(i)) {
				const newWall = new Wall(i);

				newWall.findCoords();
				allObstacles[i] = newWall;
				ctx.fillRect(newWall.posX, newWall.posY, block, block);
			}
		}
	}
})();