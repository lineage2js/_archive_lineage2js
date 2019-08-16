var ServerPacket = require("./ServerPacket.js");

function SocialAction(playerId, actionId) {
	this._packet = new ServerPacket(10);
	this._packet.writeC(0x3d)
		.writeD(playerId)
		.writeD(actionId);

	return this._packet.getBuffer();
}

module.exports = SocialAction;