var ClientPacket = require("./ClientPacket.js");

function RequestServerList(buffer) {
	this._packet = new ClientPacket(buffer);

	this._packet.readC()
		.readD() // sessionKey1 first part
		.readD() // sessionKey1 last part
}

RequestServerList.prototype.getSessionKey1 = function() {
	var sessionKey1 = [];

	sessionKey1[0] = this._packet._data[1].toString(16);
	sessionKey1[1] = this._packet._data[2].toString(16);

	return sessionKey1;
}

module.exports = RequestServerList;