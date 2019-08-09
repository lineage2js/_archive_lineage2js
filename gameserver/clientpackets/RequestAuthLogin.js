var ClientPacket = require("./ClientPacket.js");

function RequestAuthLogin(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readS()
		.readD()
		.readD()
		.readD()
		.readD();
}

RequestAuthLogin.prototype.getLogin = function() {
	return this._packet.getData()[1];
}

RequestAuthLogin.prototype.getSessionKey1 = function() {
	var sessionKey1 = [];

	sessionKey1[0] = this._packet.getData()[4].toString(16);
	sessionKey1[1] = this._packet.getData()[5].toString(16);

	return sessionKey1;
}

RequestAuthLogin.prototype.getSessionKey2 = function() {
	var sessionKey2 = [];

	sessionKey2[0] = this._packet.getData()[3].toString(16);
	sessionKey2[1] = this._packet.getData()[2].toString(16);

	return sessionKey2;
}

module.exports = RequestAuthLogin;