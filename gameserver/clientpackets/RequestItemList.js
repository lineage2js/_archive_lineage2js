var ClientPacket = require("./ClientPacket.js");

function RequestItemList(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC();
}

module.exports = RequestItemList;