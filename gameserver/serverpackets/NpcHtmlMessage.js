let ServerPacket = require("./ServerPacket");

function NpcHtmlMessage(html) {
	this._packet = new ServerPacket(5 + ServerPacket.strlen(html));
	this._packet.writeC(0x1b)
		.writeD(1) // message id
		.writeS(html);
		
	return this._packet.getBuffer();
}

module.exports = NpcHtmlMessage;