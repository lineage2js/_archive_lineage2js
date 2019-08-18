var ServerPacket = require("./ServerPacket.js");

function CharacterInfo(character) {
	this._packet = new ServerPacket(600); //
	this._packet.writeC(0x03)
		.writeD(character.x)
		.writeD(character.y)
		.writeD(character.z)
		.writeD(character.heading)
		.writeD(character.objectId)
		.writeS(character.characterName)
		.writeD(character.raceId)
		.writeD(character.gender)
		.writeD(character.classId)
		
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
		.writeD(character.mSpd)
		.writeD(character.pSpd)
		
		.writeD(0x00) // pvp flag 0 - non pvp, 1 - pvp = violett name
		.writeD(character.karma)

		.writeD(character.moveSpd) // getRunSpeed
		.writeD(character.moveSpd) // getWalkSpeed
		.writeD(0x32) // swimspeed
		.writeD(0x32) // swimspeed
		.writeD(character.moveSpd) // getFloatingRunSpeed
		.writeD(character.moveSpd) // getFloatingWalkSpeed
		.writeD(character.moveSpd) // getFlyingRunSpeed
		.writeD(character.moveSpd) // getFlyingWalkSpeed

		// male
	if(character.gender === 0) {
		this._packet.writeF(character.maleMovementMultiplier)
			.writeF(character.maleAttackSpeedMultiplier)
			.writeF(character.maleCollisionRadius)
			.writeF(character.maleCollisionHeight)
	}

	// female
	if(character.gender === 1) {
		this._packet.writeF(character.femaleMovementMultiplier)
			.writeF(character.femaleAttackSpeedMultiplier)
			.writeF(character.femaleCollisionRadius)
			.writeF(character.femaleCollisionHeight)
	}

	this._packet.writeD(character.hairStyle)
		.writeD(character.hairColor)
		.writeD(character.face)

		.writeS(character.title)
		.writeD(character.clanId) // pledge id
		.writeD(character.clanId) // pledge crest id
		.writeD(0x10)

		.writeD(0x00)	// new in rev 417
		.writeD(0x00)	// new in rev 417   siege-flags)

		.writeC(character.waitType) // getWaitType
		.writeC(character.moveType) // getMoveType

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
