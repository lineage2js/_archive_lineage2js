let XOR = require("./../../util/XOR");
let config = require("./../../config/config");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class Logout {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC();

		this._init();
	}

	_init() {
		this._player.xor = new XOR(config.base.key.XOR);
		this._packet.setEncryption(false);
		this._player.sendPacket(new serverPackets.LogoutOk());
		this._player.broadcast(new serverPackets.DeleteObject(this._player.objectId));
	}
}

module.exports = Logout;