let templates = require("./../../gameserver/templates/templates");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class CharacterSelected {
	constructor(packet, player, server) {
		this._packet = packet;
		this._player = player;
		this._server = server;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD();

		this._init();
	}

	getCharacterSlot () {
		return this._data.getData()[1];
	}

	_init() {
		let characterData = this._player.getCharacters()[this.getCharacterSlot()];
		let character = new templates.Character(characterData);

		this._player.fillData(character);
		this._player.characterSlot = this.getCharacterSlot();
		this._player.online = true;
		// for test
		this._player.items.push(this._server.item.create(400));
		this._player.items.push(this._server.item.create(420));
		this._player.items.push(this._server.item.create(2436));
		this._player.items.push(this._server.item.create(2460));
		this._player.items.push(this._server.item.create(233));
		this._player.items.push(this._server.item.create(78));
		this._player.items.push(this._server.item.create(2497));

		this._player.items.push(this._server.item.create(84));
		this._player.items.push(this._server.item.create(439));
		this._player.items.push(this._server.item.create(471));
		this._player.items.push(this._server.item.create(2430));
		this._player.items.push(this._server.item.create(2454));
		this._player.items.push(this._server.item.create(618));
		this._player.items.push(this._server.item.create(283));
		this._player.items.push(this._server.item.create(2392));
		this._player.items.push(this._server.item.create(2381));

		this._player.items.push(this._server.item.create(2406));
		this._player.items.push(this._server.item.create(2397));

		//etc
		this._player.items.push(this._server.item.create(57));
		this._player.items.push(this._server.item.create(1665));
		this._player.items.push(this._server.item.create(1863));
		this._player.items.push(this._server.item.create(3875));
		// quest
		this._player.items.push(this._server.item.create(3440));
		this._player.items.push(this._server.item.create(3444));
		this._player.items.push(this._server.item.create(3467));
		//

		this._player.sendPacket(new serverPackets.CharacterSelected(character));
	}
}

module.exports = CharacterSelected;