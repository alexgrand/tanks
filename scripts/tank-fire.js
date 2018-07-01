'use strict';
(function (exports) {
exports.tankFire = {
	start () {
		const {Tank} = exports.data;
		const {ALL_OBSTACLES} = exports.data;
		const ALL_TANKS = ALL_OBSTACLES.get('ALL_TANKS');
		const ALL_SHOTS = new Map();

		class Shot extends Tank {
			constructor (name, index, id) {
				super(name, index, id);
				this.velocity = 5;
				this.id = id;
			}
		}
		const moveShot = (shot) => {
			shot[shot.direction + 'Move']();
			requestAnimationFrame(moveShot.bind(moveShot, shot));
		};
		const createShot = (tankName) => {
			const tank = ALL_TANKS.get(tankName);
			const time = Math.floor(Date.now() / 100).toString();
			const shotId = tankName + time.slice(time.length - 5, time.length);
			const newShot = new Shot('shot', tank.index, shotId);

			tank.findSides();
			newShot.posX = tank.left + (tank.right - tank.left) / 2;
			newShot.posY = tank.top + (tank.bottom - tank.top) / 2;
			newShot.direction = tank.direction;
			newShot.firepower = tank.firepower;

			if (newShot.direction === 'top') {
				newShot.posY = tank.top;
			} else if (newShot.direction === 'left') {
				newShot.posX = tank.left;
			} else if (newShot.direction === 'right') {
				newShot.posX = tank.right;
			} else {
				newShot.posY = tank.bottom;
			}

			moveShot(newShot);
			ALL_SHOTS.set(shotId, newShot);
		};

		ALL_OBSTACLES.set('ALL_SHOTS', ALL_SHOTS);
		exports.tankFire = {createShot, moveShot};
	}
};
})(window.exports);