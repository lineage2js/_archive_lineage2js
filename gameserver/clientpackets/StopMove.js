var ClientPacket = require("./ClientPacket.js");

function StopMove(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD()
		.readD()
		.readD()
		.readD();
}

StopMove.prototype.getX = function() {
	return this._packet.getData()[1];
}

StopMove.prototype.getY = function() {
	return this._packet.getData()[2];
}

StopMove.prototype.getZ = function() {
	return this._packet.getData()[3];
}

StopMove.prototype.getHeading = function() {
	return this._packet.getData()[4];
}

module.exports = StopMove;