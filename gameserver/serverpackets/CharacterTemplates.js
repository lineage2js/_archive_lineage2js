let ServerPacket = require("./ServerPacket");

function CharacterTemplates(characters) {
	this._packet = new ServerPacket(85 * characters.length);
	this._packet.writeC(0x23)
		.writeD(characters.length)

	for(let i = 0; i < characters.length; i++) {
		this._packet.writeD(characters[i].raceId)
			.writeD(characters[i].classId)
			.writeD(0x46)
			.writeD(characters[i].str)
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(characters[i].dex)
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(characters[i].con)
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(characters[i].int)
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(characters[i].wit)
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(characters[i].men)
			.writeD(0x0a);
	}

	return this._packet.getBuffer();
}

module.exports = CharacterTemplates;