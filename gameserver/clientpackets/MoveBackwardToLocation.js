var ClientPacket = require("./ClientPacket.js");

function MoveBackwardToLocation(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD();
}

MoveBackwardToLocation.prototype.getTargetX = function() {
	return this._packet.getData()[1];
}

MoveBackwardToLocation.prototype.getTargetY = function() {
	return this._packet.getData()[2];
}

MoveBackwardToLocation.prototype.getTargetZ = function() {
	return this._packet.getData()[3];
}

MoveBackwardToLocation.prototype.getOriginX= function() {
	return this._packet.getData()[4];
}

MoveBackwardToLocation.prototype.getOriginY = function() {
	return this._packet.getData()[5];
}

MoveBackwardToLocation.prototype.getOriginZ = function() {
	return this._packet.getData()[6];
}


module.exports = MoveBackwardToLocation;