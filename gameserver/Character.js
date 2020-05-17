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
		this.swimsSpeed = params.swimsSpeed || null;
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
		let attacked = world.find(objectId);

		attacked.changeCombatStateTask();
		this.broadcast(new serverPackets.Attack(this, attacks));
	}

	changeCombatStateTask(attacker) {
		let startingTime = 1000;
		let endingTime = 3000;

		timer.tick([startingTime, endingTime], type => {
			switch(type) {
				case "start":
					this.broadcast(new serverPackets.AutoAttackStart(this.objectId));
					this.target = attacker.objectId;
					this.attack(this.target)

					break;
				case "stop":
					this.broadcast(new serverPackets.AutoAttackStop(this.objectId));

					break;
			}
		})
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