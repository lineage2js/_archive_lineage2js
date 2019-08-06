var ClientPacket = require("./ClientPacket.js");

function NewCharacter(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC();
}

NewCharacter.prototype.getStatus = function() {
	var status = this._packet.getData()[0];

	if(status === 0x0e) {
		return true;
	} else {
		return false;
	}
}

module.exports = NewCharacter;