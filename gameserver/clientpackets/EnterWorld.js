var ClientPacket = require("./ClientPacket.js");

function EnterWorld(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
}

module.exports = EnterWorld;