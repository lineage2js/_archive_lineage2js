var ServerPacket = require("./ServerPacket.js");

function ServerList() {
	this._packet = new ServerPacket(20);
	this._packet.writeC(0x04)
		.writeC(1) // Number of servers
		.writeC(0) // LS Number
		.writeC(1) // Server ID
		.writeC(192) // Server IP
		.writeC(168) // Server IP
		.writeC(0) // Server IP
		.writeC(1) // Server IP
		.writeD(7777) // Server port
		.writeC(100) // Age limit
		.writeC(0) // PVP ? YES - 1, NO - 0
		.writeH(0) // Current player
		.writeH(100) // Max player
		.writeC(1) // 1 = UP, 0 - DOWN

	return this._packet.getBuffer();
}

module.exports = ServerList;