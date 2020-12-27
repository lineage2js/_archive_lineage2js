let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class RequestActionUse {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD()
			.readD()
			.readC()

		this._init();
	}

	getActionId() {
		return this._data.getData()[1];
	}
	getCtrlStatus() {
		return this._data.getData()[2];
	}
	getShiftStatus() {
		return this._data.getData()[3];
	}

	_init() {
		switch(this.getActionId()) {
			case 0:
				if(this._player.isStanding()) {
					this._player.sitDown();
				} else {
					this._player.standUp();
				}

				this._player.sendPacket(new serverPackets.ChangeWaitType(this._player));
				this._player.broadcast(new serverPackets.ChangeWaitType(this._player));

				break;
			case 1:
				if(this._player.isRunning()) {
					this._player.walk();
				} else {
					this._player.run();
				}

				this._player.sendPacket(new serverPackets.ChangeMoveType(this._player));
				this._player.broadcast(new serverPackets.ChangeMoveType(this._player));
		}
	}
}

module.exports = RequestActionUse;