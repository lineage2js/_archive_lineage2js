var classId = require("./../../data/classId");
var characterTemplateData = require("./../../data/characterTemplate");
var templates = require("./../../gameserver/templates/templates");
var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class NewCharacter {
	constructor(packet) {
		this._packet = packet;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC();

		this._init();
	}

	_init() {
		var characterTemplateTable = this._serialization(characterTemplateData); // Чтобы удобно было доставать данные по classId
		var characterTemplates = [
			new templates.Character(characterTemplateTable[classId.fighter]),
			new templates.Character(characterTemplateTable[classId.mage]),
			new templates.Character(characterTemplateTable[classId.elvenFighter]),
			new templates.Character(characterTemplateTable[classId.elvenMage]),
			new templates.Character(characterTemplateTable[classId.darkFighter]),
			new templates.Character(characterTemplateTable[classId.darkMage]),
			new templates.Character(characterTemplateTable[classId.orcFighter]),
			new templates.Character(characterTemplateTable[classId.orcMage]),
			new templates.Character(characterTemplateTable[classId.dwarvenFighter]),
		];

		this._packet.send(new serverPackets.CharacterTemplates(characterTemplates));
	}

	_serialization(data) {
		var result = {};

		for(var i = 0; i < data.length; i++) {
			result[data[i].classId] = data[i];
		}

		return result;
	}
}

module.exports = NewCharacter;