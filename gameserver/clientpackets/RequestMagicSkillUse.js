let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class RequestMagicSkillUse {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD()
			.readD()
			.readC();

		this._init();
	}

	getSkillId() {
		return this._data.getData()[1];
	}

	_init() {
		let skill = this._player.getSkill(this.getSkillId());
		let gauge = {
			blue: 0,
			red: 1,
			cyan: 2
		}
						
		this._player.sendPacket(new serverPackets.MagicSkillUse(this._player, skill));
		this._player.sendPacket(new serverPackets.MagicSkillLaunched(this._player, skill));
		this._player.sendPacket(new serverPackets.SetupGauge(gauge.blue, skill.hitTime));
	}
}

module.exports = RequestMagicSkillUse;