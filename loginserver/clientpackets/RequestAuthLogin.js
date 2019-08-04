var ClientPacket = require("./ClientPacket.js");

function RequestAuthLogin(buffer) {
	var packet = new ClientPacket(buffer);

	packet.readC()
		.readB(14) // login length
		.readB(16) // password length

	this._userName = packet._data[1].toString("ascii").replace(/\u0000/gi, "");
	this._password = packet._data[2].toString("ascii").replace(/\u0000/gi, "");
}

RequestAuthLogin.prototype.getUserName = function() {
	return this._userName;
}

RequestAuthLogin.prototype.getPassword = function() {
	return this._password;
}

module.exports = RequestAuthLogin;