var ClientPacket = require("./ClientPacket.js");

function ProtocolVersion(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD();
}

ProtocolVersion.prototype.getVersion = function() {
	return this._packet.getData()[1];
}

module.exports = ProtocolVersion;