var ServerPacket = require("./ServerPacket.js");

function CharTemplates(data) {
	this._packet = new ServerPacket(80 * data.length);
	this._packet.writeC(0x23)
		.writeD(data.length)

	for(var i = 0; i < data.length; i++) {
		this._packet.writeD(data[i].getRaceId())
			.writeD(data[i].getClassId())
			.writeD(0x46)
			.writeD(data[i].getStr())
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(data[i].getDex())
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(data[i].getCon())
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(data[i].getInt())
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(data[i].getWit())
			.writeD(0x0a)
			.writeD(0x46)
			.writeD(data[i].getMen())
			.writeD(0x0a)
	}

	return this._packet.getBuffer();
}

module.exports = CharTemplates;