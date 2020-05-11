let config = require("./../../config/config");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class Action {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD()
			.readD()
			.readD()
			.readD()
			.readC();

		this._init();
	}

	getObjectId() {
		return this._data.getData()[1];
	}

	getX() {
		return this._data.getData()[2];
	}

	getY() {
		return this._data.getData()[3];
	}

	getZ() {
		return this._data.getData()[4];
	}

	getAttackId() {
		return this._data.getData()[5]; // 0 for simple click, 1 for shift click
	}

	_init() {
		this._player.attack(this.getObjectId());
	}
}

module.exports = Action;