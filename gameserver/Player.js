let serverPackets = require("./serverpackets/serverPackets");
let config = require("./../config/config");
let XOR = require("./../util/XOR");
let timer = require("./Timer");
let world = require("./World");
let server = require("./Server");
let items = require("./Items");
let Character = require("./Character");

class Player extends Character {
	constructor(socket) {
		super();

		this.socket = socket || null;
		this.xor = new XOR(config.base.key.XOR) || null;
		
		this.target = null;
		this.login = null;
		this.hairStyle = null;
		this.hairColor = null;
		this.face = null;
		this.heading = 0;
		this.accessLevel = 0;
		this.online = false;
		this.onlineTime = 0;
		this.clanId = 0;
		this.clanLeader = 0;
		this.clanCrestId = 0;
		this.allianceId = 0;
		this.allianceCrestId = 0;
		this.gm = 0; // 0 - false, 1 - true;
		this.privateStoreType = 0;

		// states
		this._waitType = 1; // 0 - sit, 1 - stand
		this._moveType = 1; // 0 - walk, 1 - run
		this._inCombat = 0; // 0 - idle, 1 - combat
		this._isRegenerationHp = false;
		this._isRegenerationMp = false;

		this.pvp = 0;
		this.pk = 0;
		this.karma = 0;
		this._flag = {
			status: 0,
			display: 0 
		};

		this.classId = null;
		this.className = null;
		this.raceId = null;		
		this.canCraft = null;
		
		this.maleMovementMultiplier = null;
		this.maleAttackSpeedMultiplier = null;
		this.maleCollisionRadius = null;
		this.maleCollisionHeight = null;
		
		this.femaleMovementMultiplier = null;
		this.femaleAttackSpeedMultiplier = null;
		this.femaleCollisionRadius = null;
		this.femaleCollisionHeight = null;

		this.items = null;

		// equipment
		this.underwear = { objectId: 0, itemId: 0 };
		this.ear = {
			left: { objectId: 0, itemId: 0 },
			right: { objectId: 0, itemId: 0 }
		}
		this.neck = { objectId: 0, itemId: 0 };
		this.finger = {
			left: { objectId: 0, itemId: 0 },
			right: { objectId: 0, itemId: 0 }
		}
		
		this.head = { objectId: 0, itemId: 0 };
		this.hand = {
			left: { objectId: 0, itemId: 0 },
			right: { objectId: 0, itemId: 0 },
			leftAndRight: { objectId: 0, itemId: 0 }
		}
		this.gloves = { objectId: 0, itemId: 0 };
		this.chest = { objectId: 0, itemId: 0 };
		this.legs = { objectId: 0, itemId: 0 };
		this.feet = { objectId: 0, itemId: 0 };
		this.back = { objectId: 0, itemId: 0 };
	}

	sendPacket(packet, encoding = false /* false for test */) {
		let packetLength = new Buffer.from([0x00, 0x00]);
		let packetCopy = new Buffer.from(packet);
		
		packetLength.writeInt16LE(packet.length + 2);
		
		if(encoding) {
			let packetEncrypted = new Buffer.from(this.xor.encrypt(packetCopy));

			packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
			this.socket.write(packetEncrypted);
		} else {
			packet = Buffer.concat([packetLength, packet]);
			if(!this.bot) {
				this.socket.write(packet);
			}
		}
	}

	broadcast(packet) {
		let packetLength = new Buffer.from([0x00, 0x00]);
		let players = world.getPlayers();

		packetLength.writeInt16LE(packet.length + 2);

		for(let i = 0; i < players.length; i++) {
			if(players[i].online && players[i].socket !== this.socket && !players[i].bot) {
				//let packetCopy = new Buffer.from(packet);
				//let packetEncrypted = new Buffer.from(players[i].xor.encrypt(packetCopy));

				//packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
				packet = Buffer.concat([packetLength, packet]); // for test
				//players[i].socket.write(packetEncrypted);
				players[i].socket.write(packet); // for test
			}
		}
	}

	getWaitType() {
		return this._waitType;
	}

	isStanding() {
		return this._waitType === 1;
	}

	sitDown() {
		this._waitType = 0;
	}

	standUp() {
		this._waitType = 1;
	}

	getMoveType() {
		return this._moveType;
	}

	isRunning() {
		return this._moveType === 1;
	}

	walk() {
		this._moveType = 0;
	}

	run() {
		this._moveType = 1;
	}

	setCombatState(value) {
		this._inCombat = value ? 1 : 0;
	}

	getCombatState() {
		return this._inCombat;
	}

	// fix
	attack(objectId) {
		let attacks = {
			soulshot: false,
			critical: false,
			miss: false
		}

		let attacked = world.find(objectId);

		if(true) {
			// for test
			attacked.hp -= 10;
			
			if(attacked.hp <= 0) {
				this.sendPacket(new serverPackets.Die(attacked));
				this.broadcast(new serverPackets.Die(attacked));
				this.sendPacket(new serverPackets.DropItem(attacked, items.create(57)));
				this.broadcast(new serverPackets.DropItem(attacked, items.create(57)));
			}

			this.sendPacket(new serverPackets.StatusUpdate(objectId, attacked.hp, attacked.maximumHp));
			//

			this.changeCombatStateTask();
			this.changeFlagTask();
			attacked.changeCombatStateTask(this); // arguments for test
			this.sendPacket(new serverPackets.MoveToPawn(this));
			this.sendPacket(new serverPackets.Attack(this, attacks));
			this.sendPacket(new serverPackets.UserInfo(this));
			this.broadcast(new serverPackets.Attack(this, attacks));
		}
	}
	//
	// hit(character) {
	// 	let hp = character.getHp();
	// 	let damage = 10;

	// 	character.setHp(hp - damage);
	// }
	//
	getFlagDisplay() {
		return this._flag.display;
	}

	getItem(objectId) {
		return this.items.filter(item => item.objectId === objectId)[0];
	}

	getLoad() {
		return this.items.reduce(function(weight, item) {
			return weight + item.weight
		}, 0);
	}

	getVisiblePlayers(players, callback) {
		let radius = 2000;

		for(let i = 0; i < players.length; i++) {
			if(players[i].socket !== this.socket) {
				if(players[i].online && this._checkPointInCircle(this.x, this.y, players[i].x, players[i].y, radius)) {
					callback(players[i]);
				}
			}
		}
	}

	getVisibleObjects(objects, callback) {
		let radius = 2000;

		for(let i = 0; i < objects.length; i++) {
			if(this._checkPointInCircle(this.x, this.y, objects[i].x, objects[i].y, radius)) {
				callback(objects[i]);
			}
		}
	}

	fillData(data){
		for(let key in data) {
			this[key] = data[key];
		}
	}

	getSkill(id) {
		return this.skills.find(skill => skill.id === id);
	}

	getCharacters() {
		return server.db.get("characters").filter({"login": this.login}).value();
	}

	getObjectId() {
		return this.objectId;
	}

	getCharacterQuantity() {
		return server.db.get("characters").filter({"login": this.login}).value().length;
	}

	getCharacterNames() {
		return server.db.get("characters").map("name").value();
	}

	addCharacter(character) {
		server.db.get("characters").push(character).write();
	}

	changeCombatStateTask(attacker) {
		let startingTime = this.gender === 0 ? this.maleAttackSpeedMultiplier * 1000 : this.femaleAttackSpeedMultiplier * 1000;
		let endingTime = 3000;

		timer.tick([startingTime, endingTime], type => {
			switch(type) {
				case "start":
					this.setCombatState(true);
					this.sendPacket(new serverPackets.AutoAttackStart(this.objectId));
					this.broadcast(new serverPackets.AutoAttackStart(this.objectId));
					this.sendPacket(new serverPackets.SystemMessage(35, [{ type: config.base.systemMessageType.NUMBER, value: 1000 }]));
					
					// for test
					if(this.bot && attacker) {
						this.target = attacker.objectId;
						this.attack(this.target)
						if(!attacker.time) attacker.time = 1500;
						this.broadcast(new serverPackets.CreateSay(this, 0, attacker.time.toString()));

						//
						let attackSpeedMultiplier = this.gender === 0 ? this.maleAttackSpeedMultiplier : this.femaleAttackSpeedMultiplier;
						
						setTimeout(() => {
							
							attacker.time -= 100;
							attacker.hp -= 10;
							attacker.sendPacket(new serverPackets.UserInfo(this));

							this.changeCombatStateTask(attacker)
						}, attackSpeedMultiplier * this.pSpd + this.dex);
						//
					}
					//

					break;
				case "stop":
					this.setCombatState(false);
					this.sendPacket(new serverPackets.AutoAttackStop(this.objectId));
					this.broadcast(new serverPackets.AutoAttackStop(this.objectId));

					break;
			}

			this.sendPacket(new serverPackets.UserInfo(this));
			this.broadcast(new serverPackets.CharacterInfo(this));
		})
	}

	changeFlagTask() {
		let startingTime = this.gender === 0 ? this.maleAttackSpeedMultiplier * 1000 : this.femaleAttackSpeedMultiplier * 1000;
		let endingTime = 3000;
		
		timer.tick([startingTime, endingTime], type => {
			switch(type) {
				case "start":
					this._flag.status = 1;
					this._flag.display = 1;
					this.sendPacket(new serverPackets.UserInfo(this));

					break;
				case "stop":
					this._flag.status = 0;
					this._flag.display = 0;
					this.sendPacket(new serverPackets.UserInfo(this));

					break;
			}
		})
	}

	regenerationHpTask(callback) {
		if(!this._isRegenerationHp) {
			this._isRegenerationHp = true;
			this._regenerationHp(callback);
		}
	}

	regenerationMpTask(callback) {
		if(!this._isRegenerationMp) {
			this._isRegenerationMp = true;
			this._regenerationMp(callback);
		}
	}

	_regenerationHp(callback) {
		timer.tick([1000], type => {
			if(this.hp < this.maximumHp) {
				this.hp++
				callback();
				this._regenerationHp(callback);
			} else {
				this._isRegenerationHp = false;
			}
		})
	}

	_regenerationMp(callback) {
		timer.tick([1000], type => {
			if(this.mp < this.maximumMp) {
				this.mp++
				callback();
				this._regenerationMp(callback);
			} else {
				this._isRegenerationMp = false;
			}
		})
	}

	_checkPointInCircle(x1, y1, x2, y2, radius) {
		let dx = x2 - x1;
		let dy = y2 - y1;
		let sqrtDist = dx*dx + dy*dy;
		let sqrtRadius = radius*radius;

		return sqrtDist < sqrtRadius;
	}
}

module.exports = Player;