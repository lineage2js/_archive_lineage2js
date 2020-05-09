let config = require("./../../config/config");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class ProtocolVersion {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD();

		this._init();
	}

	getVersion() {
		return this._data.getData()[1];
	}

	_init() {
		if(this.getVersion() === config.base.PROTOCOL_VERSION.CLIENT) {
			this._player.sendPacket(new serverPackets.CryptInit(config.base.key.XOR), false);
			this._packet.setEncryption(true); // The first packet is not encrypted
		}
	}
}

module.exports = ProtocolVersion;