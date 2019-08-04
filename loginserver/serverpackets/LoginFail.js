var ServerPacket = require("./ServerPacket.js");

function LoginFail(reason) {
	var packet = new ServerPacket(16);

	packet.writeC(0x01)
		.writeC(reason)

	return packet._buffer;
}

module.exports = LoginFail;