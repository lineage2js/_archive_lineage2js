var ClientPacket = require("./ClientPacket.js");
var ALL = 0;
var SHOUT = 1;
var TELL = 2;
var PARTY = 3;
var CLAN = 4;
var PRIVATE_CHAT_PLAYER = 6; // used for petition
var PRIVATE_CHAT_GM = 7; // used for petition
var TRADE = 8;
var GM_MESSAGE = 9;
var ANNOUNCEMENT = 10;

function Say2(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readS()
		.readD();

	// if(this._packet.getData()[2] === TELL) { // fix
	// 	this._packet.readS();
	// }
}

Say2.prototype.getText = function() {
	return this._packet.getData()[1];
}

Say2.prototype.getType = function() {
	return this._packet.getData()[2];
}

Say2.prototype.getTarget = function() {
	return this._packet.getData()[3];
}

module.exports = Say2;