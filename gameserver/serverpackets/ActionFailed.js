let ServerPacket = require("./ServerPacket");

function ActionFailed() {
	this._packet = new ServerPacket(1);
	this._packet.writeC(0x35);
		
	return this._packet.getBuffer();
}

module.exports = ActionFailed;