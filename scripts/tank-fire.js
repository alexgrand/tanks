'use strict';
(function (exports) {
exports.tankFire = {
	start () {
		const {Tank} = exports.data;

		class Shot extends Tank {
			constructor (name, index) {
				super(name, index);
				this.velocity = 10;

			}
		}

		const createShot = () => {
			console.log('fire');
		};

		exports.tankFire = {createShot};
	}
};
})(window.exports);