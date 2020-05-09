let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class RequestTargetCanceled {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC();

		this._init();
	}

	_init() {
		this._player.sendPacket(new serverPackets.TargetUnselected(this._player));
		this._player.target = null;
	}
}

module.exports = RequestTargetCanceled;