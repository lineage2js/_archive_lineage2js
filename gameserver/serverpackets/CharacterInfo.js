let ServerPacket = require("./ServerPacket");

function CharacterInfo(player) {
	this._packet = new ServerPacket(600); //
	this._packet.writeC(0x03)
		.writeD(player.x)
		.writeD(player.y)
		.writeD(player.z)
		.writeD(player.heading)
		.writeD(player.objectId)
		.writeS(player.name)
		.writeD(player.raceId)
		.writeD(player.gender)
		.writeD(player.classId)
		
		.writeD(0x00)

		.writeD(player.head.itemId)
		.writeD(player.hand.right.itemId)
		.writeD(player.hand.left.itemId)
		.writeD(player.gloves.itemId)
		.writeD(player.chest.itemId)
		.writeD(player.legs.itemId)
		.writeD(player.feet.itemId)
		.writeD(player.back.itemId)
		.writeD(player.hand.leftAndRight.itemId)
		.writeD(player.underwear.itemId)

		.writeD(0x00)
		.writeD(player.mSpd)
		.writeD(player.pSpd)
		
		.writeD(player.getFlagDisplay())
		.writeD(player.karma)

		.writeD(player.runSpeed)
		.writeD(player.walkSpeed)
		.writeD(player.swimSpeed)
		.writeD(player.swimSpeed)
		.writeD(player.runSpeed) // getFloatingRunSpeed
		.writeD(player.walkSpeed) // getFloatingWalkSpeed
		.writeD(player.runSpeed) // getFlyingRunSpeed
		.writeD(player.walkSpeed) // getFlyingWalkSpeed

	// male
	if(player.gender === 0) {
		this._packet.writeF(player.maleMovementMultiplier)
			.writeF((player.pSpd / 500) / 0.555)
			.writeF(player.maleCollisionRadius)
			.writeF(player.maleCollisionHeight)
	}

	// female
	if(player.gender === 1) {
		this._packet.writeF(player.femaleMovementMultiplier)
			.writeF((player.pSpd / 500) / 0.555)
			.writeF(player.femaleCollisionRadius)
			.writeF(player.femaleCollisionHeight)
	}

	this._packet.writeD(player.hairStyle)
		.writeD(player.hairColor)
		.writeD(player.face)

		.writeS(player.title)
		.writeD(player.clanId) // pledge id
		.writeD(player.clanCrestId) // pledge crest id
		.writeD(0x10)

		.writeD(0x00)	// getAllyId new in rev 417
		.writeD(0x00)	// new in rev 417   siege-flags

		.writeC(player.getWaitType())
		.writeC(player.getMoveType())

		.writeC(player.getCombatState())
		.writeC(0x00) // isDead dead = 1  alive = 0

		.writeC(0x00)	// invisible = 1  visible =0
		.writeC(0x00)	// 1 on strider   2 on wyfern   0 no mount
		.writeC(0x00)   // 1 - sellshop
		
		.writeH(0x00)  // cubic count
//		writeH(0x00);  // cubic 
		.writeC(0x00)	// find party members

		
	return this._packet.getBuffer();
}

module.exports = CharacterInfo;
