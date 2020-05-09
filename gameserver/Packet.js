let file = require("fs");
let log = require("./../util/log");
let config = require("./../config/config");
let XOR = require("./../util/XOR");
let clientPackets = require("./../gameserver/clientpackets/clientPackets");
let serverPackets = require("./../gameserver/serverpackets/serverPackets");
let templates = require("./../gameserver/templates/templates");

class Packet {
	constructor(player, players, server) {
		this._player = player;
		this._players = players;
		this._server = server;
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

	handler(data) {
		this._encrypted = new Buffer.from(data, "binary").slice(2); // slice(2) - without first two byte responsible for packet size
		//this._decrypted = new Buffer.from(this.getEncryption() ? this._player.xor.decrypt(this._encrypted) : this._encrypted);
		this._decrypted = new Buffer.from(this._encrypted);
		log(this._encrypted); // for test
		this._opcode = this._decrypted[0];

		switch(this._opcode) {
			case 0x00:
				new clientPackets.ProtocolVersion(this, this._player);

				break;
			case 0x08:
				new clientPackets.RequestAuthLogin(this, this._player);

				break;
			case 0x0e:
				new clientPackets.NewCharacter(this, this._player);

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
				new clientPackets.RequestQuestList(this, this._player);

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
				new clientPackets.RequestTargetCancel(this, this._player);

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
				new clientPackets.RequestAttack(this, this._player, this._server);

				break;
			case 0x57:
				new clientPackets.RequestShowBoard(this, this._player, this._server);

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