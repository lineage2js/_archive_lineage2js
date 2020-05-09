let classes = require("./../../data/classes");
let characterTemplateData = require("./../../data/characterTemplates");
let templates = require("./../../gameserver/templates/templates");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class NewCharacter {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC();

		this._init();
	}

	_init() {
		let characterTemplateTable = this._serialization(characterTemplateData); // Чтобы удобно было доставать данные по classId
		let characterTemplates = [
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

		this._player.sendPacket(new serverPackets.CharacterTemplates(characterTemplates));
	}

	_serialization(data) {
		let result = {};

		for(let i = 0; i < data.length; i++) {
			result[data[i].classId] = data[i];
		}

		return result;
	}
}

module.exports = NewCharacter;