let ServerPacket = require("./ServerPacket");

function ShowBoard(html) {
	this._packet = new ServerPacket(1 + ServerPacket.strlen(html) + ServerPacket.strlen("") + ServerPacket.strlen("") + ServerPacket.strlen("") + ServerPacket.strlen("") + ServerPacket.strlen("") + ServerPacket.strlen(""));
	this._packet.writeC(0x86)
		.writeS("") // top
		.writeS("") // up
		.writeS("") // favorite
		.writeS("") // add favorite
		.writeS("") // region
		.writeS("") // clan
		.writeS(html);
		
	return this._packet.getBuffer();
}

module.exports = ShowBoard;