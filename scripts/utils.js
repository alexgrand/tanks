'use strict';
(function (exports) {
	exports.utils = {
		getRandomNumber (max, min) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};
})(window.exports = {});