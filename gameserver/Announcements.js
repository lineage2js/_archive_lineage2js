var file = require("fs");

function Announcements(filePath) {
	this._announcements = JSON.parse(file.readFileSync(filePath, "utf-8"));
}

Announcements.prototype.show = function(handler) {
	for(var i = 0; i < this._announcements.length; i++) {
		handler(this._announcements[i]);
	}
}

module.exports = Announcements;