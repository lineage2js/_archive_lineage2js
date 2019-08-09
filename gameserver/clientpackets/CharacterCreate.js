var ClientPacket = require("./ClientPacket.js");

function CharacterCreate(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readS()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD()
		.readD();
}

CharacterCreate.prototype.getCharacterName = function() {
	return this._packet.getData()[1];
}

CharacterCreate.prototype.getRace = function() {
	return this._packet.getData()[2];
}

CharacterCreate.prototype.getGender = function() {
	return this._packet.getData()[3];
}

CharacterCreate.prototype.getClassId = function() {
	return this._packet.getData()[4];
}

CharacterCreate.prototype.getHairStyle = function() {
	return this._packet.getData()[11];
}

CharacterCreate.prototype.getHairColor = function() {
	return this._packet.getData()[12];
}

CharacterCreate.prototype.getFace = function() {
	return this._packet.getData()[13];
}

module.exports = CharacterCreate;