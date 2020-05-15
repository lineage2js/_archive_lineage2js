let ServerPacket = require("./ServerPacket");

function CharacterSelected(character) {
	this._packet = new ServerPacket(230 + ServerPacket.strlen(character.name) + ServerPacket.strlen(character.title));
	this._packet.writeC(0x21)
		.writeS(character.name)
		.writeD(character.objectId)
		.writeS(character.title)
		.writeD(0x55555555)
		.writeD(character.clanId)
		.writeD(0x00)
		.writeD(character.gender)
		.writeD(character.raceId)
		.writeD(character.classId)
		.writeD(0x01)
		.writeD(character.x)	
		.writeD(character.y)	
		.writeD(character.z)
		.writeF(character.hp)
		.writeF(character.mp)
		.writeD(character.sp)
		.writeD(character.exp)
		.writeD(character.level)
		.writeD(0x0)
		.writeD(0x0)
		.writeD(character.int)
		.writeD(character.str)
		.writeD(character.con)
		.writeD(character.men)
		.writeD(character.dex)
		.writeD(character.wit);

	for (let i = 0; i < 30; i++) {
		this._packet.writeD(0x00);
	}

	this._packet.writeD(0x00); // in-game time 
	
	return this._packet.getBuffer();
}

module.exports = CharacterSelected;