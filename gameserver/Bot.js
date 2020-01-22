var classes = require("./../data/classes");
var characterTemplatesData = require("./../data/characterTemplates");
var Player = require("./Player.js");

// fix {bot} instanceof Player - false, потому что this._bot = {} 

class Bot extends Player {
	constructor(idFactory) {
		super(null, null, null);

		this._bots = [];
		this._bot = {};
		this._idFactory = idFactory;
		this._characterTemplates = this._serialization(characterTemplatesData);
		this._classes = [classes.fighter, classes.mage, classes.elvenFighter, classes.elvenMage, classes.darkFighter, classes.darkMage, classes.orcFighter, classes.orcMage, classes.dwarvenFighter];
	}

	create(count) {
		var x = -72100;
		var y = 257500;
		var z = -3115;

		for(var i = 0; i < count; i++) {
			var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			var classId = this._classes[Math.floor(Math.random() * this._classes.length)];
			var character = this._characterTemplates[classId];
			
			switch(this._classes.indexOf(classId)) {
				case 0:
				case 1:
					var raceId = 0;

					break;
				case 2:
				case 3:
					var raceId = 1;
					
					break;
				case 4:
				case 5:
					var raceId = 2;
					
					break;
				case 6:
				case 7:
					var raceId = 3;
					
					break;
				case 8:
					var raceId = 4;
					
					break;
			}

			this._bot.objectId = this._idFactory.getNextId();;
			this._bot.target = null;
			this._bot.login = null;
			this._bot.characterName = "bot" + i;
		    this._bot.title = "bot";
		    this._bot.level = 1;
			this._bot.gender = Math.floor(Math.random() * 2);
			this._bot.hairStyle = 1;
			this._bot.hairColor = 1;
			this._bot.face = 0;
			this._bot.heading = 0;
		    this._bot.accessLevel = 0;
		    this._bot.online = true;
		    this._bot.onlineTime = 0;
			this._bot.clanId = 0;
			this._bot.clanLeader = 0;
			this._bot.clanCrestId = 0;
			this._bot.allianceId = 0;
			this._bot.allianceCrestId = 0;
			this._bot.exp = 0;
			this._bot.sp = 0;
			this._bot.waitType = 1; // 1 - is stands, 0 - is sitting
			this._bot.moveType = 1; // 1 - is running, 0 - is walks
			this._bot.gm = 0;
			this._bot.privateStoreType = 0;
			this._bot.bot = true;

		    this._bot.pvp = 0;
		    this._bot.pk = 0;
		    this._bot.karma = 0;
		    this._bot.pvpFlag = 0;

			this._bot.classId = classId;
			this._bot.className = character.className;
			this._bot.raceId = raceId;
			
			this._bot.str = null;
		 	this._bot.dex = null;
			this._bot.con = null;
			this._bot.int = null;
			this._bot.wit = null;
			this._bot.men = null;
			this._bot.hp = null;
			this._bot.maximumHp = null;
			this._bot.mp = null;
			this._bot.maximumMp = null;

			this._bot.pAtk = null;
			this._bot.pDef = null;
			this._bot.mAtk = null;
			this._bot.mDef = null;
			this._bot.pSpd = null;
			this._bot.mSpd = null;

			this._bot.accuracy = character.accuracy;
			this._bot.critical = character.critical;
			this._bot.evasion = character.evesion;
			this._bot.runSpeed = character.runSpeed;
			this._bot.walkSpeed = character.walkSpeed
			this._bot.swimsSpeed = character.swimsSpeed;
			this._bot.maximumLoad = character.maximumLoad;
			
			this._bot.x = Math.floor(Math.random()*(500 * plusOrMinus)) + x;
			this._bot.y = Math.floor(Math.random()*(500 * plusOrMinus)) + y;
			this._bot.z = -3080;
			
			this._bot.canCraft = null;
			
			this._bot.maleMovementMultiplier = character.maleMovementMultiplier;
			this._bot.maleAttackSpeedMultiplier = character.maleMovementMultiplier;
			this._bot.maleCollisionRadius = character.maleCollisionRadius;
			this._bot.maleCollisionHeight = character.maleCollisionHeight;

			this._bot.femaleMovementMultiplier = character.femaleMovementMultiplier;
			this._bot.femaleAttackSpeedMultiplier = character.femaleMovementMultiplier;
			this._bot.femaleCollisionRadius = character.femaleCollisionRadius;
			this._bot.femaleCollisionHeight = character.femaleCollisionHeight;

			this._bot.items = null;

			// equipment
			this._bot.underwear = { objectId: 0, itemId: 0 };
			this._bot.ear = {
				left: { objectId: 0, itemId: 0 },
				right: { objectId: 0, itemId: 0 }
			}
			this._bot.neck = { objectId: 0, itemId: 0 };
			this._bot.finger = {
				left: { objectId: 0, itemId: 0 },
				right: { objectId: 0, itemId: 0 }
			}
			
			this._bot.head = { objectId: 0, itemId: 0 };
			this._bot.hand = {
				left: { objectId: 0, itemId: 0 },
				right: { objectId: 0, itemId: 0 },
				leftAndRight: { objectId: 0, itemId: 0 }
			}
			this._bot.gloves = { objectId: 0, itemId: 0 };
			this._bot.chest = { objectId: 0, itemId: 0 };
			this._bot.legs = { objectId: 0, itemId: 0 };
			this._bot.feet = { objectId: 0, itemId: 0 };
			this._bot.back = { objectId: 0, itemId: 0 };

			this._bots.push(this._bot);
			this._bot = {};
		}

		return this.get();
	}

	get() {
		return this._bots;
	}

	_serialization(data) {
		var result = {};

			for(var i = 0; i < data.length; i++) {
				result[data[i].classId] = data[i];
			}

		return result;
	}
}

module.exports = Bot;