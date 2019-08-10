var ClientPacket = require("./ClientPacket.js");

function RequestQuestList(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC();
}

module.exports = RequestQuestList;