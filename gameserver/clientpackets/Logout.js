var ClientPacket = require("./ClientPacket.js");

function Logout(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC();
}

module.exports = Logout;