var ServerPacket = require("./ServerPacket.js");

function UserInfo(player) {
	this._packet = new ServerPacket(600); //
	this._packet.writeC(0x04)
		.writeD(player.x)
		.writeD(player.y)
		.writeD(player.z)
		.writeD(player.heading) 
		.writeD(player.objectId)
		.writeS(player.characterName)
		.writeD(player.raceId)
		.writeD(player.gender)
		.writeD(player.classId)
		.writeD(player.level)
		.writeD(player.exp)
		.writeD(player.str)
		.writeD(player.dex)
		.writeD(player.con)
		.writeD(player.int)
		.writeD(player.wit)
		.writeD(player.men)
		.writeD(player.maximumHp)
		.writeD(player.hp)
		.writeD(player.maximumMp)
		.writeD(player.mp)
		.writeD(player.sp)
		.writeD(player.getLoad()) // getLoad
		.writeD(player.maximumLoad)
		
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

		.writeD(player.pAtk)
		.writeD(player.pSpd)
		.writeD(player.pDef)
		.writeD(player.evasion)
		.writeD(player.accuracy)
		.writeD(player.critical)

		.writeD(player.mAtk)
		.writeD(player.mSpd)
		.writeD(player.pSpd)
		.writeD(player.mDef)

		.writeD(0x00) // pvp flag 0 - non pvp, 1 - pvp = violett name
		.writeD(player.karma)

		.writeD(player.moveSpd) // getRunSpeed
		.writeD(player.moveSpd) // getWalkSpeed
		.writeD(0x32) // swimspeed
		.writeD(0x32) // swimspeed
		.writeD(player.moveSpd) // getFloatingRunSpeed
		.writeD(player.moveSpd) // getFloatingWalkSpeed
		.writeD(player.moveSpd) // getFlyingRunSpeed
		.writeD(player.moveSpd) // getFlyingWalkSpeed
		
	// male
	if(player.gender === 0) {
		this._packet.writeF(player.maleMovementMultiplier)
			.writeF(player.maleAttackSpeedMultiplier)
			.writeF(player.maleCollisionRadius)
			.writeF(player.maleCollisionHeight)
	}

	// female
	if(player.gender === 1) {
		this._packet.writeF(player.femaleMovementMultiplier)
			.writeF(player.femaleAttackSpeedMultiplier)
			.writeF(player.femaleCollisionRadius)
			.writeF(player.femaleCollisionHeight)
	}

	this._packet.writeD(player.hairStyle)
		.writeD(player.hairColor)
		.writeD(player.face)
		.writeD(0x00) // if GM - 0x01
		.writeS(player.title)
		.writeD(player.clanId) // pledge id
		.writeD(player.clanId) // pledge crest id
		.writeD(0x00) // getAllyId - ally id
		.writeD(0x00) // getAllyId - ally crest id
		.writeD(0x00) // 0x60 ???
		.writeC(0x00)
		.writeC(0x00) // getPrivateStoreType
		.writeC(player.canCraft)
		.writeD(player.pk)
		.writeD(player.pvp)
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
