let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");
let html = require("./../../gameserver/Html");
let world = require("./../../gameserver/World");
let Npc = require("./../../gameserver/Npc");

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
	getOriginX() {
		return this._data.getData()[2];
	}
	getOriginY() {
		return this._data.getData()[3];
	}
	getOriginZ() {
		return this._data.getData()[4];
	}
	getActionId() {
		return this._data.getData()[5]; // 0 for simple click  1 for shift click
	}

	_init() {
		switch (this.getActionId()) {
			case 0: // click
				let object = world.find(this.getObjectId());
				
				//
				if(object) {
					this._player.sendPacket(new serverPackets.TargetSelected(object.objectId));
					this._player.target = object.objectId;
				} else {
					this._player.sendPacket(new serverPackets.ActionFailed());
				}

				if(object instanceof Npc) {
					if(object.type === "npc") {
						this._player.sendPacket(new serverPackets.NpcHtmlMessage(html.get(object.id)));
					}

					if(object.type === "monster") {
						this._player.sendPacket(new serverPackets.StatusUpdate(object.objectId, object.hp, object.maximumHp));
					}
				}

				break;
			case 1: // click + shift
								
				break;
		}
	}
}

module.exports = Action;