var log = require(".././util/log.js");
var config = require(".././config/config.js");
var Blowfish = require(".././util/blowfish.js");
var serverPackets = require(".././loginserver/serverpackets/serverPackets.js");
var clientPackets = require(".././loginserver/clientpackets/clientPackets.js");

function Packet(socket, player) {
	this._blowfish = new Blowfish(config.base.key.blowfish);
	this._socket = socket;
	this._player = player;
	this._sessionKey1Server = [0x55555555, 0x44444444];
	this._sessionKey2Server = [0x55555555, 0x44444444];
	this._encrypted = null;
	this._decrypted = null;
	this._type = null;
}

Packet.prototype.send = function(packet, encoding = true) {
	var packetLength = new Buffer.from([0x00, 0x00]);
	// Мутация аргументов - зло
	packetLength.writeInt16LE(packet.length + 2);

	if(encoding) {
		packet = new Buffer.from(this._blowfish.encrypt(packet));
		packet = Buffer.concat([packetLength, packet]);
		this._socket.write(packet);
	} else {
		packet = Buffer.concat([packetLength, packet]);
		this._socket.write(packet);
	}
}

Packet.prototype.handler = function(data) {
	this._encrypted = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
	this._decrypted = new Buffer.from(this._blowfish.decrypt(this._encrypted));
	this._type = this._decrypted[0]; // First 2 bytes - packet type

	switch(this._type) {
		case 0x00:
			var requestAuthLogin = new clientPackets.RequestAuthLogin(this._decrypted);
			// Перенести все в RequestAuthLogin
			var accountStatus = this._player.checkAccount(requestAuthLogin.getLogin(), requestAuthLogin.getPassword());

			log(`player ${requestAuthLogin.getLogin()} requesting auth login`);

			if(accountStatus === "success") {
				this.send(new serverPackets.LoginOk(this._sessionKey1Server));
			} else {
				this.send(new serverPackets.LoginFail(accountStatus));
			}

			break;
		case 0x02:
			var requestServerLogin = new clientPackets.RequestServerLogin(this._decrypted);
			var sessionKey1Client = requestServerLogin.getSessionKey1();
			var serverNumber = requestServerLogin.getServerNumber();

			if(this.keyComparison(this._sessionKey1Server, sessionKey1Client)) {
				// Проверка на доступность сервера / Check server status
				if(true) {
					this.send(new serverPackets.PlayOk(this._sessionKey2Server));
				} else {
					this.send(new serverPackets.PlayFail(config.base.errors.loginserver.REASON_SYSTEM_ERROR))
				}
			}

			break;
		case 0x05:
			var requestServerList = new clientPackets.RequestServerList(this._decrypted);
			var sessionKey1Client = requestServerList.getSessionKey1();

			if(this.keyComparison(this._sessionKey1Server, sessionKey1Client)) {
				this.send(new serverPackets.ServerList(config.gameserver.host, config.gameserver.port, config.gameserver.maxPlayer));
			}
					
			break;
	}
}

Packet.prototype.close = function() {
	log(`Connection to the login server is closed for: ${this._socket.remoteAddress}:${this._socket.remotePort}`);
}

Packet.prototype.error = function() {
	log(`Client connection lost for: ${this._socket.remoteAddress}:${this._socket.remotePort}`);
}

Packet.prototype.keyComparison = (keyServer, keyClient) => {
	if(keyServer[0] === parseInt(keyClient[0], 16) && keyServer[1] === parseInt(keyClient[1], 16)) {
		return true;
	} else {
		return false;
	}
}

module.exports = Packet;