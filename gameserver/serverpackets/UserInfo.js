var ServerPacket = require("./ServerPacket.js");

function UserInfo(character) {
	this._packet = new ServerPacket(600); //
	this._packet.writeC(0x04)
		.writeD(character.x)
		.writeD(character.y)
		.writeD(character.z)
		.writeD(character.heading) 
		.writeD(character.objectId)
		.writeS(character.characterName)
		.writeD(character.raceId)
		.writeD(character.gender)
		.writeD(character.classId)
		.writeD(character.level)
		.writeD(character.exp)
		.writeD(character.str)
		.writeD(character.dex)
		.writeD(character.con)
		.writeD(character.int)
		.writeD(character.wit)
		.writeD(character.men)
		.writeD(character.maximumHp)
		.writeD(character.hp)
		.writeD(character.maximumMp)
		.writeD(character.mp)
		.writeD(character.sp)
		.writeD(0x00) // getLoad
		.writeD(character.maximumLoad)
		
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

		.writeD(character.pAtk)
		.writeD(character.pSpd)
		.writeD(character.pDef)
		.writeD(character.evasion)
		.writeD(character.accuracy)
		.writeD(character.critical)

		.writeD(character.mAtk)
		.writeD(character.mSpd)
		.writeD(character.pSpd)
		.writeD(character.mDef)

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
		.writeD(0x00) // if GM - 0x01
		.writeS(character.title)
		.writeD(character.clanId) // pledge id
		.writeD(character.clanId) // pledge crest id
		.writeD(0x00) // getAllyId - ally id
		.writeD(0x00) // getAllyId - ally crest id
		.writeD(0x00) // 0x60 ???
		.writeC(0x00)
		.writeC(0x00) // getPrivateStoreType
		.writeC(character.canCraft)
		.writeD(character.pk)
		.writeD(character.pvp)
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
