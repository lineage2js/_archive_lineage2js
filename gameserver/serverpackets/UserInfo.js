var ServerPacket = require("./ServerPacket.js");

function UserInfo(character) {
	this._packet = new ServerPacket(600);
	this._packet.writeC(0x04)
		.writeD(character.getX())
		.writeD(character.getY())
		.writeD(character.getZ())
		.writeD(0x00) // getHeading
		.writeD(0x00) // getObjectId
		.writeS(character.getCharacterName())
		.writeD(character.getRaceId())
		.writeD(character.getGender())
		.writeD(character.getClassId())
		.writeD(character.getLevel())
		.writeD(character.getExp())
		.writeD(character.getStr())
		.writeD(character.getDex())
		.writeD(character.getCon())
		.writeD(character.getInt())
		.writeD(character.getWit())
		.writeD(character.getMen())
		.writeD(character.getMaximumHp())
		.writeD(character.getHp())
		.writeD(character.getMaximumMp())
		.writeD(character.getMp())
		.writeD(character.getSp())
		.writeD(0x00) // getLoad
		.writeD(character.getLoad()) // getMaximumLoad
		
		.writeD(0x28)
		
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)

		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)

		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)

		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x00)

		.writeD(character.getPatk())
		.writeD(character.getPspd())
		.writeD(character.getPdef())
		.writeD(character.getEvasion())
		.writeD(character.getAccuracy())
		.writeD(character.getCritical())

		.writeD(character.getMatk())
		.writeD(character.getMspd())
		.writeD(character.getPspd())
		.writeD(character.getMdef())

		.writeD(0x00) // pvp flag 0 - non pvp, 1 - pvp = violett name
		.writeD(0x00) // Karma

		.writeD(character.getMoveSpd()) // getRunSpeed
		.writeD(character.getMoveSpd()) // getWalkSpeed
		.writeD(0x32) // swimspeed
		.writeD(0x32) // swimspeed
		.writeD(character.getMoveSpd()) // getFloatingRunSpeed
		.writeD(character.getMoveSpd()) // getFloatingWalkSpeed
		.writeD(character.getMoveSpd()) // getFlyingRunSpeed
		.writeD(character.getMoveSpd()) // getFlyingWalkSpeed
		.writeF(1.1) // getMovementMultiplier
		.writeF(1.188) // getAttackSpeedMultiplier
		.writeF(9) // getCollisionRadius
		.writeF(23) // getCollisionHeight

		.writeD(character.getHairStyle())
		.writeD(character.getHairColor())
		.writeD(character.getFace())
		.writeD(0x00) // if GM - 0x01
		.writeS("test") // getTitle
		.writeD(character.getClanId()) // pledge id
		.writeD(character.getClanId()) // pledge crest id
		.writeD(0x00) // getAllyId - ally id
		.writeD(0x00) // ally crest id
		.writeD(0x00) // 0x60 ???
		.writeC(0x00)
		.writeC(0x00) // getPrivateStoreType
		.writeC(character.getCanCraft())
		.writeD(0x00) // getPkKills
		.writeD(0x00) // getPvpKills
		.writeH(0x00) // cubic count
//		.writeH(0x01) // 1-yellow 2-orange 3-yellow star  4-violett 5-blue cube  
//		.writeH(0x02) // 1-yellow 2-orange 3-yellollow star  4-violett 5-blue cube  w star  4-violett 5-blue cube  
//		.writeH(0x03) // 1-yellow 2-orange 3-ye
//		.writeH(0x04) // 1-yellow 2-orange 3-yellow star  4-violett 5-blue cube  
//		.writeH(0x05) // 1-yellow 2-orange 3-yellow star  4-violett 5-blue cube  
		.writeC(0x00); //1-find party members

	return this._packet.getBuffer();
}

module.exports = UserInfo;
