var ClientPacket = require("./ClientPacket.js");

function RequestActionUse(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD()
		.readD()
		.readC()
}

RequestActionUse.prototype.getActionId = function() {
	return this._packet.getData()[1];
}

RequestActionUse.prototype.getCtrlStatus = function() {
	return this._packet.getData()[2];
}

RequestActionUse.prototype.getShiftStatus = function() {
	return this._packet.getData()[3];
}

module.exports = RequestActionUse;