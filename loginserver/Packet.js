let log = require("./../util/log");
let config = require("./../config/config");
let clientPackets = require("./../loginserver/clientpackets/clientPackets");

class Packet {
	constructor(player) {
		this._player = player;
		this._sessionKey1Server = [0x55555555, 0x44444444];
		this._sessionKey2Server = [0x55555555, 0x44444444];
		this._encrypted = null;
		this._decrypted = null;
		this._opcode = null;
	}

	getBuffer() {
		return this._decrypted;
	}

	getSessionKey1Server() {
		return this._sessionKey1Server;
	}

	getSessionKey2Server() {
		return this._sessionKey2Server;
	}

	handler(data) {
		this._encrypted = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		this._decrypted = new Buffer.from(this._player.blowfish.decrypt(this._encrypted));
		this._opcode = this._decrypted[0]; // First 2 bytes - packet type

		switch(this._opcode) {
			case 0x00:
				new clientPackets.RequestAuthLogin(this, this._player);

				break;
			case 0x02:
				new clientPackets.RequestServerLogin(this, this._player);
				
				break;
			case 0x05:
				new clientPackets.RequestServerList(this, this._player);
						
				break;
		}
	}

	close() {
		log(`Connection to the login server is closed for: ${this._player.socket.remoteAddress}:${this._player.socket.remotePort}`);
	}

	error() {
		log(`Client connection lost for: ${this._player.socket.remoteAddress}:${this._player.socket.remotePort}`);
	}

	keyComparison(keyServer, keyClient) {
		if(keyServer[0] === parseInt(keyClient[0], 16) && keyServer[1] === parseInt(keyClient[1], 16)) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = Packet;