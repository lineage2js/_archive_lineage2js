var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class RequestSocialAction {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD();

		this._init();
	}

	getActionId() {
		return this._data.getData()[1];
	}

	_init() {
		var actionId = this.getActionId();

		this._player.sendPacket(new serverPackets.SocialAction(this._player, actionId));
		this._player.broadcast(new serverPackets.SocialAction(this._player, actionId));
	}

}

module.exports = RequestSocialAction;