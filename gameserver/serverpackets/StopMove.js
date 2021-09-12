let ServerPacket = require("./ServerPacket");

function StopMove(object) {
	this._packet = new ServerPacket(17);
	this._packet.writeC(0x5f)
		.writeD(object.x)
		.writeD(object.y)
		.writeD(object.z)
		.writeD(0) // heading
		
	return this._packet.getBuffer();
}

module.exports = StopMove;