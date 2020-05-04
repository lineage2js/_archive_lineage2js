var serverPackets = require("./../gameserver/serverpackets/serverPackets");
var config = require("./../config/config");
var Bot = require("./Bot");

class Player {
	constructor(socket, xor, server) {
		this.socket = socket || null;
		this.xor = xor || null;
		this.server = server || null;
		this.bot = false;
		
		this.objectId = null;
		this.target = null;
		this.login = null;
		this.characterName = null;
		this.title = "";
		this.level = 1;
		this.gender = null;
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
		this.exp = 0;
		this.sp = 0;
		this.gm = 0; // 0 - false, 1 - true;
		this.privateStoreType = 0;

		// states
		this._isStanding = 1; // 0 - sit, 1 - stand
		this._isRunning = 1; // 0 - walk, 1 - run
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
		
		this.str = null;
	 	this.dex = null;
		this.con = null;
		this.int = null;
		this.wit = null;
		this.men = null;
		this.hp = null;
		this.maximumHp = null;
		this.mp = null;
		this.maximumMp = null;

		this.pAtk = null;
		this.pDef = null;
		this.mAtk = null;
		this.mDef = null;
		this.pSpd = null;
		this.mSpd = null;

		this.accuracy = null;
		this.critical = null;
		this.evasion = null;
		this.runSpeed = null;
		this.walkSpeed = null
		this.swimsSpeed = null;
		this.maximumLoad = null;
		
		this.x = null;
		this.y = null;
		this.z = null;
		
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
		var packetLength = new Buffer.from([0x00, 0x00]);
		var packetCopy = new Buffer.from(packet);
		
		packetLength.writeInt16LE(packet.length + 2);
		
		if(encoding) {
			var packetEncrypted = new Buffer.from(this.xor.encrypt(packetCopy));

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
		var packetLength = new Buffer.from([0x00, 0x00]);
		var players = this.server.players.getPlayers();

		packetLength.writeInt16LE(packet.length + 2);

		for(var i = 0; i < players.length; i++) {
			if(players[i].online && players[i].socket !== this.socket && !players[i].bot) {
				//var packetCopy = new Buffer.from(packet);
				//var packetEncrypted = new Buffer.from(players[i].xor.encrypt(packetCopy));

				//packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
				packet = Buffer.concat([packetLength, packet]); // for test
				//players[i].socket.write(packetEncrypted);
				players[i].socket.write(packet); // for test
			}
		}
	}

	isStanding() {
		return this._isStanding === 1;
	}

	getWaitType() {
		return this._isStanding;
	}

	sitDown() {
		this._isStanding = 0;
	}

	standUp() {
		this._isStanding = 1;
	}

	isRunning() {
		return this._isRunning === 1;
	}

	getMoveType() {
		return this._isRunning;
	}

	setWalking() {
		this._isRunning = 0;
	}

	setRunning() {
		this._isRunning = 1;
	}

	setCombatState(value) {
		this._inCombat = value ? 1 : 0;
	}

	getCombatState() {
		return this._inCombat;
	}

	// fix
	attack(objectId) {
		var attacks = {
			soulshot: false,
			critical: false,
			miss: false
		}

		//var Player = this.constructor;
		var attacked = this.server.objects.get(objectId);

		if(true) {
			this.changeCombatStateTask();
			this.changeFlagTask();
			attacked.changeCombatStateTask(this); // arguments for test
			this.sendPacket(new serverPackets.MoveToPawn(this));
			this.sendPacket(new serverPackets.Attack(this, attacks));
			this.sendPacket(new serverPackets.UserInfo(this));
			this.broadcast(new serverPackets.Attack(this, attacks));
		}
	}

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
		var radius = 2000;

		for(var i = 0; i < players.length; i++) {
			if(players[i].socket !== this.socket) {
				if(players[i].online && this._checkPointInCircle(this.x, this.y, players[i].x, players[i].y, radius)) {
					callback(players[i]);
				}
			}
		}
	}

	getVisibleObjects(objects, callback) {
		var radius = 2000;

		for(var i = 0; i < objects.length; i++) {
			if(this._checkPointInCircle(this.x, this.y, objects[i].x, objects[i].y, radius)) {
				callback(objects[i]);
			}
		}
	}
	//

	fillData(data){
		for(var key in data) {
			this[key] = data[key];
		}
	}

	getSkill(id) {
		return this.skills.find(skill => skill.id === id);
	}

	getCharacters() {
		return this.server.db.get("characters").filter({"login": this.login}).value();
	}

	getObjectId() {
		return this.objectId;
	}

	getCharacterQuantity() {
		return this.server.db.get("characters").filter({"login": this.login}).value().length;
	}

	getCharacterNames() {
		return this.server.db.get("characters").map("characterName").value();
	}

	addCharacter(character) {
		this.server.db.get("characters").push(character).write();
	}

	changeCombatStateTask(attacker) {
		var startingTime = this.gender === 0 ? this.maleAttackSpeedMultiplier * 1000 : this.femaleAttackSpeedMultiplier * 1000;
		var endingTime = 3000;

		this.server.timer.tick([startingTime, endingTime], type => {
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
						var attackSpeedMultiplier = this.gender === 0 ? this.maleAttackSpeedMultiplier : this.femaleAttackSpeedMultiplier;
						
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
		var startingTime = this.gender === 0 ? this.maleAttackSpeedMultiplier * 1000 : this.femaleAttackSpeedMultiplier * 1000;
		var endingTime = 3000;
		
		this.server.timer.tick([startingTime, endingTime], type => {
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
		this.server.timer.tick([1000], type => {
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
		this.server.timer.tick([1000], type => {
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
		var dx = x2 - x1;
		var dy = y2 - y1;
		var sqrtDist = dx*dx + dy*dy;
		var sqrtRadius = radius*radius;

		return sqrtDist < sqrtRadius;
	}
}

module.exports = Player;