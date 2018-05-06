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
	}
};
})(window.exports);