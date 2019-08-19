var ClientPacket = require("./ClientPacket.js");

function UseItem(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD();
}

UseItem.prototype.getObjectId = function() {
	return this._packet.getData()[1]
}

module.exports = UseItem;