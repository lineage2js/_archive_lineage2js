let ServerPacket = require("./ServerPacket");

function SkillList(player) {
	this._packet = new ServerPacket(5 + (12 * player.skills.length));
	this._packet.writeC(0x6d)
		.writeD(player.skills.length)

	for(let i = 0; i < player.skills.length; i++) {
		this._packet.writeD(player.skills[i].passive)
			.writeD(player.skills[i].level)
			.writeD(player.skills[i].id);
	}
		
	return this._packet.getBuffer();
}

module.exports = SkillList;