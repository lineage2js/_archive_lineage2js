var ClientPacket = require("./ClientPacket.js");

function RequestTargetCanceled(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC();
}

module.exports = RequestTargetCanceled;