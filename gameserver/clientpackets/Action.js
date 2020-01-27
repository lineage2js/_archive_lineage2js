var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

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
	getOriginX() {
		return this._data.getData()[2];
	}
	getOriginY() {
		return this._data.getData()[3];
	}
	getOriginZ() {
		return this._data.getData()[4];
	}
	getActionId() {
		return this._data.getData()[5]; // 0 for simple click  1 for shift click
	}

	_init() {
		switch (this.getActionId()) {
			case 0: // click
				//this._player.sendPacket(new serverPackets.ActionFailed());
				this._player.sendPacket(new serverPackets.TargetSelected(this.getObjectId()));
				this._player.target = this.getObjectId();

				break;
			case 1: // click + shift
								
				break;
		}
	}
}

module.exports = Action;