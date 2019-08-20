var ClientPacket = require("./ClientPacket.js");

function ValidatePosition(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD();
}

ValidatePosition.prototype.getX = function() {
	return this._packet.getData()[1];
}

ValidatePosition.prototype.getY = function() {
	return this._packet.getData()[2];
}

ValidatePosition.prototype.getZ = function() {
	return this._packet.getData()[3];
}

ValidatePosition.prototype.getHeading = function() {
	return this._packet.getData()[4];
}

module.exports = ValidatePosition;