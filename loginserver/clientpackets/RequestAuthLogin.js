var ClientPacket = require("./ClientPacket.js");

function RequestAuthLogin(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readB(14) // login length
		.readB(16) // password length

	this._login = this._packet.getData()[1].toString("ascii").replace(/\u0000/gi, "");
	this._password = this._packet.getData()[2].toString("ascii").replace(/\u0000/gi, "");
}

RequestAuthLogin.prototype.getLogin = function() {
	return this._login;
}

RequestAuthLogin.prototype.getPassword = function() {
	return this._password;
}

module.exports = RequestAuthLogin;