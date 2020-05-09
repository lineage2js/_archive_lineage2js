let ServerPacket = require("./ServerPacket");

function SocialAction(player, actionId) {
	this._packet = new ServerPacket(9);
	this._packet.writeC(0x3d)
		.writeD(player.objectId)
		.writeD(actionId);

	return this._packet.getBuffer();
}

module.exports = SocialAction;