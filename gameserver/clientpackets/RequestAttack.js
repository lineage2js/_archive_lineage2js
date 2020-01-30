var config = require("./../../config/config");
var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class Action {
	constructor(packet, player, server) {
		this._packet = packet;
		this._player = player;
		this._server = server;
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
		return this._data.getData()[5]; // 0 for simple click, 1 for shift click
	}

	_init() {
		var attacks = {
			soulshot: false,
			critical: false,
			miss: false
		}

		this._player.attack(this.getObjectId(), (resolution, player, attacked) => {

			player.changeCombatStateTask(type => {
				if(type === "start") {
					player.sendPacket(new serverPackets.AutoAttackStart(player.objectId));
					player.sendPacket(new serverPackets.SystemMessage(35, [{ type: config.base.systemMessageType.NUMBER, value: 1000 }]));
					//
					// attacked.hp -= 200;
					// attacked.broadcast(new serverPackets.CharacterInfo(attacked));
					// if(attacked.hp <= 0) {
					// 	attacked.broadcast(new serverPackets.Die(attacked))
					// }
					//
				}

				if(type === "stop") {
					player.sendPacket(new serverPackets.AutoAttackStop(player.objectId));
				}

				player.sendPacket(new serverPackets.UserInfo(player));
			})

			player.changeFlagTask(() => {
				player.sendPacket(new serverPackets.UserInfo(player));
			})

			attacked.changeCombatStateTask(type => {
				if(type === "start") {
					attacked.broadcast(new serverPackets.AutoAttackStart(attacked.objectId));
					attacked.broadcast(new serverPackets.CreateSay(attacked, 0, "attack start")); // for test
					//

					var attackSpeed = attacked.gender === 0 ? attacked.maleAttackSpeedMultiplier : attacked.femaleAttackSpeedMultiplier;

					attacked.target = player.objectId;
					attacked.broadcast(new serverPackets.Attack(attacked, attacks));

					setTimeout(() => {
						player.hp -= 5;
						player.mp -= 10;

						player.regenerationHpTask(() => {
							player.sendPacket(new serverPackets.UserInfo(player));
						});

						player.regenerationMpTask(() => {
							player.sendPacket(new serverPackets.UserInfo(player));
						});

						if(player.hp <= 0) {
							player.sendPacket(new serverPackets.Die(player))
						}
					}, attackSpeed * attacked.pSpd)
					//
				}

				if(type === "stop") {
					attacked.broadcast(new serverPackets.AutoAttackStop(attacked.objectId));
					attacked.broadcast(new serverPackets.CreateSay(attacked, 0, "attack end")); // for test	
				}

				attacked.broadcast(new serverPackets.CharacterInfo(attacked));
			})



		});

		this._player.sendPacket(new serverPackets.MoveToPawn(this._player));
		this._player.sendPacket(new serverPackets.Attack(this._player, attacks));
		this._player.sendPacket(new serverPackets.UserInfo(this._player));
	}
}

module.exports = Action;