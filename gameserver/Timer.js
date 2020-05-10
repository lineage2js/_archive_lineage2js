class Timer {
	tick(milliseconds, callback) {
		let time = 0;
		let position = "default";
		let start = 0;
		let stop = milliseconds.length - 1;

		for(let i = 0; i < milliseconds.length; i++) {
			switch(i) {
				case start:
					position = "start";

					break;
				case stop:
					position = "stop";

					break;
				default:
					position = "default";

					break;
			}

			time += milliseconds[i];

			setTimeout(callback, time, position);
		}
	}
}

module.exports = new Timer();