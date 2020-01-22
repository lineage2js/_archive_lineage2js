var ServerPacket = require("./ServerPacket");

function NpcInfo(npc, player) {
	this._packet = new ServerPacket(600); //
	this._packet.writeC(0x22)

			.writeD(0x02) // getObjectId npc
			.writeD(1000001) // npctype id 1000001;gremlin;L2Monster;10.0;15.0;

			//#id;name;class;collision_radius;collision_height
			//1000001;gremlin;L2Monster;10.0;15.0;

			.writeD(1) // can be attacked
			.writeD(-70880)
			.writeD(257360)
			.writeD(-3080)
			.writeD(0x00) // getHeading
			.writeD(0x00)
			.writeD(0x00) // getMagicalSpeed
			.writeD(0x00) // getPhysicalSpeed
			.writeD(100) // getRunSpeed
			.writeD(100) // getWalkSpeed
			.writeD(50)	// swimspeed
			.writeD(50)	// swimspeed
			.writeD(100) // getFloatingRunSpeed
			.writeD(100) // getFloatingWalkSpeed
			.writeD(100) // getFlyingRunSpeed
			.writeD(100) // getFlyingWalkSpeed
			
			.writeF(1) // getMovementMultiplier
			.writeF(1) // getAttackSpeedMultiplier
			.writeF(10.0) // getCollisionRadius
			.writeF(15.0) // getCollisionHeight
			.writeD(0x00) // getRightHandItem
			.writeD(0)
			.writeD(0x00) // getLeftHandItem
			.writeC(1) // name above char 1=true ... ??
			.writeC(0) // walking=0 
			.writeC(0) // attacking 1=true
			.writeC(0) // dead 1=true
			
			.writeC(0) // invisible ?? 0=false  1=true   2=summoned (only works if model has a summon animation)
			
			.writeS("gremlin")
			.writeS("yeah")
			.writeD(0)
			.writeD(0)
			.writeD(0)  // hmm karma ??

	return this._packet.getBuffer();
}

module.exports = NpcInfo;
