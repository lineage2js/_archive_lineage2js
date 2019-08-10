var ServerPacket = require("./ServerPacket.js");

function CharacterSelected(character) {
	this._packet = new ServerPacket(400);
	this._packet.writeC(0x21)
		.writeS(character.getCharacterName())
		.writeD(0x01) // getObjectId
		.writeS("title") // getTitle
		.writeD(0x55555555)
		.writeD(character.getClanId())
		.writeD(0x00)
		.writeD(character.getGender())
		.writeD(character.getRaceId())
		.writeD(character.getClassId())
		.writeD(0x01)
		.writeD(character.getX())	
		.writeD(character.getY())	
		.writeD(character.getZ())
		.writeF(character.getHp())
		.writeF(character.getMp())
		.writeD(character.getSp())
		.writeD(character.getExp())
		.writeD(character.getLevel())
		.writeD(0x0)
		.writeD(0x0)
		.writeD(character.getInt())
		.writeD(character.getStr())
		.writeD(character.getCon())
		.writeD(character.getMen())
		.writeD(character.getDex())
		.writeD(character.getWit());

	for (var i = 0; i < 30; i++) {
		this._packet.writeD(0x00);
	}

	this._packet.writeD(0x00); // in-game time 
		
	return this._packet.getBuffer();
}

module.exports = CharacterSelected;