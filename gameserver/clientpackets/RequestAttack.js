var config = require("./../../config/config");
var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class Action {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD()
			.readD()
			.readD()
			.readD()
			.readC();

		this._init();
	}

	getObjectId() {
		return this._data.getData()[1];
	}

	getX() {
		return this._data.getData()[2];
	}

	getY() {
		return this._data.getData()[3];
	}

	getZ() {
		return this._data.getData()[4];
	}

	getAttackId() {
		return this._data.getData()[5]; // 0 for simple click  1 for shift click
	}

	_init() {
		var hits = {
			soulshot: false,
			critical: false,
			miss: false
		}

		this._player.hit(this.getObjectId(), type => {
			if(type === "start") {
				this._packet.send(new serverPackets.AutoAttackStart(this._player.objectId));
				this._packet.send(new serverPackets.SystemMessage(35, [{ type: config.base.systemMessageType.NUMBER, value: 1000 }]));
			}

			if(type === "end") {
				this._packet.send(new serverPackets.AutoAttackStop(this._player.objectId));
			}
			
			this._packet.send(new serverPackets.UserInfo(this._player));
		});
		this._packet.send(new serverPackets.MoveToPawn(this._player));
		this._packet.send(new serverPackets.Attack(this._player, hits));
		this._packet.send(new serverPackets.UserInfo(this._player));
	}
}

module.exports = Action;