var ServerPacket = require("./ServerPacket.js");

function MagicSkillLaunched(player, skill) {
	this._packet = new ServerPacket(21);
	this._packet.writeC(0x8e)
		.writeD(player.objectId)
		.writeD(skill.id)
		.writeD(skill.level)
		.writeD(1) // data ???
		.writeD(player.target)
		
	return this._packet.getBuffer();
}

module.exports = MagicSkillLaunched;