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
				//this._player.sendPacket(new serverPackets.ActionFailed());
				this._player.sendPacket(new serverPackets.TargetSelected(this.getObjectId()));
				this._player.sendPacket(new serverPackets.StatusUpdate(this.getObjectId()));
				this._player.target = this.getObjectId();
				
				// for test
				let object = world.find(this._player.target);

				if(object instanceof Npc) {
					if(object.type === "npc") {
						this._player.sendPacket(new serverPackets.NpcHtmlMessage(html.get(object.id)));
					}
				}
				//

				break;
			case 1: // click + shift
								
				break;
		}
	}
}

module.exports = Action;