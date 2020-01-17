var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

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
				var waitType = this._player.waitType ^ 0x01 // 1 => 0, 0 => 1

				this._packet.send(new serverPackets.ChangeWaitType(this._player, waitType));
				this._packet.broadcast(new serverPackets.ChangeWaitType(this._player, waitType));
				this._player.waitType = waitType;

				break;
			case 1:
				var moveType = this._player.moveType ^ 0x01 // 1 => 0, 0 => 1

				this._packet.send(new serverPackets.ChangeMoveType(this._player, moveType));
				this._packet.broadcast(new serverPackets.ChangeMoveType(this._player, moveType));
				this._player.moveType = moveType;
		}
	}
}

module.exports = RequestActionUse;