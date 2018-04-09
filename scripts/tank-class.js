'use strict';
(function () {
	class Tank extends window.data.Obstacle {
		test() {
			console.log(this.name);
		}
	};
	let tank = new Tank('player');
	console.log(tank);
})();