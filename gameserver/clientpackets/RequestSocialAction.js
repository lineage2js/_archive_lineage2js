var ClientPacket = require("./ClientPacket.js");

function RequestSocialAction(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD();

}

RequestSocialAction.prototype.getActionId = function() {
	return this._packet.getData()[1];
}

module.exports = RequestSocialAction;