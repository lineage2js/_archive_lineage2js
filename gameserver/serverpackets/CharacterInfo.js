var ServerPacket = require("./ServerPacket.js");

function CharacterInfo(character) {
	this._packet = new ServerPacket(600);
	this._packet.writeC(0x03)
		.writeD(character.getX())
		.writeD(character.getY())
		.writeD(character.getZ())
		.writeD(character.getHeading())
		.writeD(character.getObjectId())
		.writeS(character.getCharacterName())
		.writeD(character.getRaceId())
		.writeD(character.getGender())
		.writeD(character.getClassId())
		
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
		.writeD(character.getMspd())
		.writeD(character.getPspd())
		
		.writeD(0x00) // pvp flag 0 - non pvp, 1 - pvp = violett name
		.writeD(character.getKarma())

		.writeD(character.getMoveSpd()) // getRunSpeed
		.writeD(character.getMoveSpd()) // getWalkSpeed
		.writeD(0x32) // swimspeed
		.writeD(0x32) // swimspeed
		.writeD(character.getMoveSpd()) // getFloatingRunSpeed
		.writeD(character.getMoveSpd()) // getFloatingWalkSpeed
		.writeD(character.getMoveSpd()) // getFlyingRunSpeed
		.writeD(character.getMoveSpd()) // getFlyingWalkSpeed

		// male
	if(character.getGender() === 0) {
		this._packet.writeF(character.getMaleMovementMultiplier())
			.writeF(character.getMaleAttackSpeedMultiplier())
			.writeF(character.getMaleCollisionRadius())
			.writeF(character.getMaleCollisionHeight())
	}

	// female
	if(character.getGender() === 1) {
		this._packet.writeF(character.getFemaleMovementMultiplier())
			.writeF(character.getFemaleAttackSpeedMultiplier())
			.writeF(character.getFemaleCollisionRadius())
			.writeF(character.getFemaleCollisionHeight())
	}

	this._packet.writeD(character.getHairStyle())
		.writeD(character.getHairColor())
		.writeD(character.getFace())

		.writeS(character.getTitle())
		.writeD(character.getClanId()) // pledge id
		.writeD(character.getClanId()) // pledge crest id
		.writeD(0x10)

		.writeD(0x00)	// new in rev 417
		.writeD(0x00)	// new in rev 417   siege-flags)

		.writeC(1) // getWaitType
		.writeC(1) // getMoveType

		.writeC(0x00)
		.writeC(0x00)

		.writeC(0x00)	// invisible = 1  visible =0
		.writeC(0x00)	// 1 on strider   2 on wyfern   0 no mount
		.writeC(0x00)   //  1 - sellshop
		
		.writeH(0x00)  // cubic count
//		writeH(0x00);  // cubic 
		.writeC(0x00)	// find party members

		
	return this._packet.getBuffer();
}

module.exports = CharacterInfo;
