let ServerPacket = require("./ServerPacket");
let hit = 0;
let typesHits = {
	soulshot: 16,
	critical: 32,
	miss: 128
}

function Attack(player, hits) {
	this._packet = new ServerPacket(23);
	this._packet.writeC(0x06)
		.writeD(player.objectId)
		.writeD(player.target)
		.writeD(1) // damage
		
		hit = 0;

		if(hits.soulshot) {
			hit += typesHits.soulshot;
		}
		if(hits.critical) {
			hit += typesHits.critical;
		}
		if(hits.miss) {
			hit += typesHits.miss;
		}

	this._packet.writeC(hit)
		.writeD(player.x)
		.writeD(player.y)
		.writeD(player.z)
		.writeH(0) // if this is 01 then 3 more values are transmitted. but it does not seem to have any effect
		
	return this._packet.getBuffer();
}

module.exports = Attack;