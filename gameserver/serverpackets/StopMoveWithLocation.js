var ServerPacket = require("./ServerPacket.js");
// fix, id => getObjectId ?
function StopMoveWithLocation(object) {
	this._packet = new ServerPacket(30);
	this._packet.writeC(0x5f)
		.writeD(object.id)
		.writeD(object.positions.x)
		.writeD(object.positions.y)
		.writeD(object.positions.z)
		
	return this._packet.getBuffer();
}

module.exports = StopMoveWithLocation;