let ServerPacket = require("./ServerPacket");

function RadarControl(showRadar, type, x, y, z) {
	this._packet = new ServerPacket(21);
	this._packet.writeC(0xbd)
		.writeD(showRadar)
		.writeD(type)
		.writeD(x)
		.writeD(y)
		.writeD(z)
		
	return this._packet.getBuffer();
}

module.exports = RadarControl;