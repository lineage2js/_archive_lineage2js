var ServerPacket = require("./ServerPacket.js");

function ServerList(host, port, maxPlayer) {
	host = host.split(".");

	this._packet = new ServerPacket(40);
	this._packet.writeC(0x04)
		.writeC(2) // Number of servers
		.writeC(0) // LS Number
		.writeC(1) // Server ID
		.writeC(host[0]) // Server IP
		.writeC(host[1]) // Server IP
		.writeC(host[2]) // Server IP
		.writeC(host[3]) // Server IP
		.writeD(port) // Server port
		.writeC(100) // Age limit
		.writeC(0) // PVP ? YES - 1, NO - 0
		.writeH(0) // Current player
		.writeH(maxPlayer) // Max player
		.writeC(1); // 1 = UP, 0 - DOWN

	return this._packet.getBuffer();
}

module.exports = ServerList;