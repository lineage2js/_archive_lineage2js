var ClientPacket = require("./ClientPacket.js");

function Logout(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC();
}

Logout.prototype.getStatus = function() {
	var status = this._packet.getData()[0];

	if(status === 0x09) {
		return true;
	} else {
		return false;
	}
}

module.exports = Logout;