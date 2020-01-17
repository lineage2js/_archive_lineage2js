var file = require("fs");
var log = require("./../util/log");
var config = require("./../config/config");
var XOR = require("./../util/XOR");
var clientPackets = require("./../gameserver/clientpackets/clientPackets");
var serverPackets = require("./../gameserver/serverpackets/serverPackets");
var templates = require("./../gameserver/templates/templates");
// DB
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);

class Packet {
	constructor(player, players, server) {
		this._server = server;
		this._player = player;
		this._players = players;
		this._sessionKey1Server = [0x55555555, 0x44444444];
		this._sessionKey2Server = [0x55555555, 0x44444444];
		this._encryption = false;
		this._encrypted = null;
		this._decrypted = null;
		this._opcode = null;
	}

	setEncryption(value) {
		this._encryption = value;
	}

	getEncryption() {
		return this._encryption;
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

	send(packet, encoding = false /* false for test */) {
		var packetLength = new Buffer.from([0x00, 0x00]);
		var packetCopy = new Buffer.from(packet);
		
		packetLength.writeInt16LE(packet.length + 2);
		
		if(encoding) {
			var packetEncrypted = new Buffer.from(this._player.xor.encrypt(packetCopy));

			packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
			this._player.socket.write(packetEncrypted);
		} else {
			packet = Buffer.concat([packetLength, packet]);
			this._player.socket.write(packet);
		}
	}

	broadcast(packet) {
		var packetLength = new Buffer.from([0x00, 0x00]);

		packetLength.writeInt16LE(packet.length + 2);

		for(var i = 0; i < this._players.length; i++) {
			if(this._players[i].online && this._players[i].socket !== this._player.socket && !this._players[i].bot) {
				var packetCopy = new Buffer.from(packet);
				var packetEncrypted = new Buffer.from(this._players[i].xor.encrypt(packetCopy));

				packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
				this._players[i].socket.write(packetEncrypted);
			}
		}
	}

	handler(data) {
		this._encrypted = new Buffer.from(data, "binary").slice(2); // slice(2) - without first two byte responsible for packet size
		//this._decrypted = new Buffer.from(this.getEncryption() ? this._player.xor.decrypt(this._encrypted) : this._encrypted);
		this._decrypted = new Buffer.from(this._encrypted);
		log(this._encrypted); // for test
		this._opcode = this._decrypted[0];

		switch(this._opcode) {
			case 0x00:
				new clientPackets.ProtocolVersion(this);

				break;
			case 0x08:
				new clientPackets.RequestAuthLogin(this, this._player);

				break;
			case 0x0e:
				new clientPackets.NewCharacter(this);

				break;
			case 0x09:
				new clientPackets.Logout(this, this._player);

				break;
			case 0x0b:
				new clientPackets.CharacterCreate(this, this._player, this._server);

				break;
			case 0x0d:
				new clientPackets.CharacterSelected(this, this._player, this._server);

				break;
			case 0x63:
				new clientPackets.RequestQuestList(this);

				break;
			case 0x03:
				new clientPackets.EnterWorld(this, this._player, this._players, this._server);
				
				break;
			case 0x01:
				new clientPackets.MoveBackwardToLocation(this, this._player);

				break;
			case 0x1b:
				new clientPackets.RequestSocialAction(this, this._player);

				break;
			case 0x38:
				new clientPackets.Say2(this, this._player);

				break;
			case 0x36:
				new clientPackets.StopMove(this, this._player);

				break;
			case 0x45:
				new clientPackets.RequestActionUse(this, this._player);

				break;
			case 0x04:
				new clientPackets.Action(this, this._player);

				break;
			case 0x37:
				new clientPackets.RequestTargetCanceled(this, this._player);

				break;
			case 0x0f:
				new clientPackets.RequestItemList(this, this._player);

				break;
			case 0x14: // доделать
				new clientPackets.UseItem(this, this._player, this._server);

				break;
			case 0x48:
				new clientPackets.ValidatePosition(this, this._player);

				break;
			case 0x3f:
				new clientPackets.RequestSkillList(this, this._player);

				break;
			case 0x2f:
				new clientPackets.RequestMagicSkillUse(this, this._player);

				break;
			case 0x0a:
				new clientPackets.RequestAttack(this, this._player);

				break;
			case 0x57:
				new clientPackets.RequestShowBoard(this, this._server);

				break;
		}
	}

	keyComparison(keyServer, keyClient) {
		if(keyServer[0] === parseInt(keyClient[0], 16) && keyServer[1] === parseInt(keyClient[1], 16)) {
			return true;
		} else {
			return false;
		}
	}

	close() {
		log(`Connection to the game server is closed for: ${this._player.socket.remoteAddress}:${this._player.socket.remotePort}`);
	}

	error() {
		log(`Client connection lost for: ${this._player.socket.remoteAddress}:${this._player.socket.remotePort}`);
	}
}

module.exports = Packet;