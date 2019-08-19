var ClientPacket = require("./ClientPacket.js");

function Action(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD()
		.readD()
		.readD()
		.readD()
		.readC();
}

Action.prototype.getObjectId = function() {
	return this._packet.getData()[1];
}

Action.prototype.getOriginX = function() {
	return this._packet.getData()[2];
}

Action.prototype.getOriginY = function() {
	return this._packet.getData()[3];
}

Action.prototype.getOriginZ = function() {
	return this._packet.getData()[4];
}

Action.prototype.getActionId = function() {
	return this._packet.getData()[5]; // 0 for simple click  1 for shift click
}

module.exports = Action;