var ClientPacket = require("./ClientPacket.js");

function RequestServerLogin(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD() // sessionKey1 first part
		.readD() // sessionKey1 last part
		.readC() // Server number
}

RequestServerLogin.prototype.getSessionKey1 = function() {
	var sessionKey1 = [];

	sessionKey1[0] = this._packet.getData()[1].toString(16);
	sessionKey1[1] = this._packet.getData()[2].toString(16);

	return sessionKey1;
}

RequestServerLogin.prototype.getServerNumber = function() {
	return this._packet.getData()[3];
}

module.exports = RequestServerLogin;