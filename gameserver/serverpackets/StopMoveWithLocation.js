let ServerPacket = require("./ServerPacket");
// fix, id => getObjectId ?
function StopMoveWithLocation(object) {
	this._packet = new ServerPacket(17);
	this._packet.writeC(0x5f)
		.writeD(object.objectId)
		.writeD(object.x)
		.writeD(object.y)
		.writeD(object.z)
		
	return this._packet.getBuffer();
}

module.exports = StopMoveWithLocation;