let ServerPacket = require("./ServerPacket");

function TargetSelected(objectId, color = 0) {
	this._packet = new ServerPacket(1);
	this._packet.writeC(0xbf)
		.writeD(objectId)
		.writeH(color);
		
	return this._packet.getBuffer();
}

module.exports = TargetSelected;