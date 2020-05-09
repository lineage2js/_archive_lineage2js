let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class MoveBackwardToLocation {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD();

		this._init();
	}

	getTargetX() {
		return this._data.getData()[1];
	}
	getTargetY() {
		return this._data.getData()[2];
	}
	getTargetZ() {
		return this._data.getData()[3];
	}
	getOriginX() {
		return this._data.getData()[4];
	}
	getOriginY() {
		return this._data.getData()[5];
	}
	getOriginZ() {
		return this._data.getData()[6];
	}

	_init() {
		let positions = {
			target: {
				x: this.getTargetX(),
				y: this.getTargetY(),
				z: this.getTargetZ()
			},
			origin: {
				x: this.getOriginX(),
				y: this.getOriginY(),
				z: this.getOriginZ()
			}
		}

		this._player.sendPacket(new serverPackets.MoveToLocation(positions, this._player));
		this._player.broadcast(new serverPackets.MoveToLocation(positions, this._player));

		this._player.x = positions.target.x;
		this._player.y = positions.target.y;
		this._player.z = positions.target.z;
	}
}

module.exports = MoveBackwardToLocation;