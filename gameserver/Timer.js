class Timer {
	tick(milliseconds, callback) {
		var time = 0;
		var position = "default";
		var start = 0;
		var end = milliseconds.length - 1;

		for(var i = 0; i < milliseconds.length; i++) {
			switch(i) {
				case start:
					position = "start";

					break;
				case end:
					position = "end";

					break;
				default:
					position = "default";

					break;
			}

			time += milliseconds[i];

			setTimeout(callback.bind(null, position), time);
		}
	}
}

module.exports = Timer;