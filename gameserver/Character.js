let serverPackets = require("./serverpackets/serverPackets");
let world = require("./World");
let timer = require("./Timer");

class Character {
	constructor(params = {}) {
		this.objectId = params.objectId || null;
		this.name = params.name || null;
		this.title = params.title || "";
		this.gender = params.gender || null;
		this.level = params.level || 1;
		this.exp = params.exp || 0;
		this.sp = params.sp || 0;

		this.str = params.str || null;
	 	this.dex = params.dex || null;
		this.con = params.con || null;
		this.int = params.int || null;
		this.wit = params.wit || null;
		this.men = params.men || null;
		this.hp = params.hp || null;
		this.maximumHp = params.hp || null;
		this.mp = params.mp || null;
		this.maximumMp = params.mp || null;

		this.pAtk = params.pAtk || null;
		this.pDef = params.pDef || null;
		this.mAtk = params.mAtk || null;
		this.mDef = params.mDef || null;
		this.pSpd = params.pSpd || null;
		this.mSpd = params.mSpd || null;

		this.accuracy = params.accuracy || null;
		this.critical = params.critical || null;
		this.evasion = params.evasion || null;
		this.runSpeed = params.runSpeed || null;
		this.walkSpeed = params.walkSpeed || null
		this.swimSpeed = params.swimSpeed || null;
		this.maximumLoad = params.maximumLoad || null;
		
		this.x = params.x || null;
		this.y = params.y || null;
		this.z = params.z || null;
	}

	attack(objectId) {
		let attacks = {
			soulshot: false,
			critical: false,
			miss: false
		}

		if (this.player) {
			let target = world.find(objectId);

			if (target.hp <= 0) {
				this.sendPacket(new serverPackets.Die(target));
				this.broadcast(new serverPackets.Die(target));
				this.sendPacket(new serverPackets.DropItem(target, items.create(57)));
				this.broadcast(new serverPackets.DropItem(target, items.create(57)));
			} else {
				this.sendPacket(new serverPackets.StatusUpdate(objectId, target.hp, target.maximumHp));
				this.changeCombatStateTask();
				this.changeFlagTask();
				this.sendPacket(new serverPackets.Attack(this, attacks));
				this.sendPacket(new serverPackets.UserInfo(this));
				this.broadcast(new serverPackets.Attack(this, attacks));

				setTimeout(() => {
					target.attack(this.objectId);
				}, 500000 / target.pSpd);
			}	
		}

		if (!this.player) {
			if (this.bot) {
				this.changeCombatStateTask();
			}

			if (!this.time) this.time = 0;

			let target = world.find(objectId);

			this.target = target.objectId;
			
			this.broadcast(new serverPackets.MoveToPawn(this));
			
			// test
			// Надо дожидатся окончания MoveToPawn и начинать атаку
			setTimeout(() => {
				this.broadcast(new serverPackets.StopMove(this));
				// setTimeout(() => {
				// 	this.time++;
	
				// 	if (this.time <= 3) {
				// 		this.attack(this.target);
						
				// 		this.broadcast(new serverPackets.Attack(this, attacks));
						
				// 	} else {
				// 		this.time = 0;
				// 	}
				// }, 500000 / this.pSpd);
			}, 3000)
		}
	}

	broadcast(packet) { // for test
		let packetLength = new Buffer.from([0x00, 0x00]);
		let players = world.getPlayers();

		packetLength.writeInt16LE(packet.length + 2);

		for(let i = 0; i < players.length; i++) {
			if(players[i].online && players[i].socket !== this.socket && !players[i].bot) {
				packet = Buffer.concat([packetLength, packet]); 
				players[i].socket.write(packet);
			}
		}
	}
}

module.exports = Character;