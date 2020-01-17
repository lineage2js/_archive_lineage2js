var XOR = require("./../../util/XOR");
var config = require("./../../config/config");
var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class Logout {
	constructor(packet, player) {
		this._player = player;
		this._packet = packet;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC();

		this._init();
	}

	_init() {
		this._player.xor = new XOR(config.base.key.XOR);
		this._packet.setEncryption(false);
		this._packet.send(new serverPackets.LogoutOk());
		this._packet.broadcast(new serverPackets.DeleteObject(this._player.objectId));
	}
}

module.exports = Logout;