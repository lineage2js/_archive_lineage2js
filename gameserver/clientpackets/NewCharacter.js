var classes = require("./../../data/classes");
var characterTemplateData = require("./../../data/characterTemplates");
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
			new templates.Character(characterTemplateTable[classes.fighter]),
			new templates.Character(characterTemplateTable[classes.mage]),
			new templates.Character(characterTemplateTable[classes.elvenFighter]),
			new templates.Character(characterTemplateTable[classes.elvenMage]),
			new templates.Character(characterTemplateTable[classes.darkFighter]),
			new templates.Character(characterTemplateTable[classes.darkMage]),
			new templates.Character(characterTemplateTable[classes.orcFighter]),
			new templates.Character(characterTemplateTable[classes.orcMage]),
			new templates.Character(characterTemplateTable[classes.dwarvenFighter]),
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