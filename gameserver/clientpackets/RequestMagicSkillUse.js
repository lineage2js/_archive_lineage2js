var ClientPacket = require("./ClientPacket.js");

function RequestMagicSkillUse(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD()
		.readD()
		.readC();
}

RequestMagicSkillUse.prototype.getSkillId = function() {
	return this._packet.getData()[1];
}

module.exports = RequestMagicSkillUse;