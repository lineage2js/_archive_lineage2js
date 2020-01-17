var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class StopMove {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD()
			.readD()
			.readD()
			.readD();

		this._init();
	}

	getX() {
		return this._data.getData()[1];
	}
	getY() {
		return this._data.getData()[2];
	}
	getZ() {
		return this._data.getData()[3];
	}
	getHeading() {
		return this._data.getData()[4];
	}

	_init() {
		this._player.x = this.getX();
		this._player.y = this.getY();
		this._player.z = this.getZ();
		this._packet.send(new serverPackets.StopMoveWithLocation(this._player));
	}
}

module.exports = StopMove;