let ServerPacket = require("./ServerPacket");

function MagicSkillUse(player, skill) {
	this._packet = new ServerPacket(39);
	this._packet.writeC(0x5a)
		.writeD(player.objectId)
		.writeD(player.target)
		.writeD(skill.id)
		.writeD(skill.level)
		.writeD(skill.hitTime)
		.writeD(skill.reuseDelay)
		.writeD(player.x)
		.writeD(player.y)
		.writeD(player.z)
		.writeH(0x00);
		
	return this._packet.getBuffer();
}

module.exports = MagicSkillUse;