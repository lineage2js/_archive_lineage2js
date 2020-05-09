let ServerPacket = require("./ServerPacket");

function TutorialShowHtml(html) {
	this._packet = new ServerPacket(1 + ServerPacket.strlen(html));
	this._packet.writeC(0xb9)
		.writeS(html);
		
	return this._packet.getBuffer();
}

module.exports = TutorialShowHtml;