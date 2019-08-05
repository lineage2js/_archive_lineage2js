var ClientPacket = require("./ClientPacket.js");

function RequestAuthLogin(buffer) {
	this._packet = new ClientPacket(buffer);
	//this._packet.readC()
		//.readD();
}

module.exports = RequestAuthLogin;