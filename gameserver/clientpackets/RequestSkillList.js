var ClientPacket = require("./ClientPacket.js");

function RequestSkillList(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC();
}

module.exports = RequestSkillList;