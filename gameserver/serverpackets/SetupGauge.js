let ServerPacket = require("./ServerPacket");

function SetupGauge(color, time) {
	this._packet = new ServerPacket(9);
	this._packet.writeC(0x85)
		.writeD(color)
		.writeD(time);
		
	return this._packet.getBuffer();
}

module.exports = SetupGauge;