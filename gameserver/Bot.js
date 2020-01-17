var classId = require("./../data/classId");
var characterTemplatesData = require("./../data/characterTemplate");

class Bots {
	constructor(idFactory) {
		this._bots = [];
		this._idFactory = idFactory;
		this._characterTemplates = this.serialization(characterTemplatesData);
		this._classId = [classId.fighter, classId.mage, classId.elvenFighter, classId.elvenMage, classId.darkFighter, classId.darkMage, classId.orcFighter, classId.orcMage, classId.dwarvenFighter];
	}

	create(count) {
		var x = -72100;
		var y = 257500;
		var z = -3115;

		for(var i = 0; i < count; i++) {
			var bot = {};
			var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			var classId = this._classId[Math.floor(Math.random() * this._classId.length)];
			var character = this._characterTemplates[classId];
			
			switch(this._classId.indexOf(classId)) {
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

			bot.objectId = this._idFactory.getNextId();;
			bot.target = null;
			bot.login = null;
			bot.characterName = "bot" + i;
		    bot.title = "bot";
		    bot.level = 1;
			bot.gender = Math.floor(Math.random() * 2);
			bot.hairStyle = 1;
			bot.hairColor = 1;
			bot.face = 0;
			bot.heading = 0;
		    bot.accessLevel = 0;
		    bot.online = true;
		    bot.onlineTime = 0;
			bot.clanId = 0;
			bot.clanLeader = 0;
			bot.clanCrestId = 0;
			bot.allianceId = 0;
			bot.allianceCrestId = 0;
			bot.exp = 0;
			bot.sp = 0;
			bot.waitType = 1; // 1 - is stands, 0 - is sitting
			bot.moveType = 1; // 1 - is running, 0 - is walks
			bot.gm = 0;
			bot.privateStoreType = 0;
			bot.bot = true;

		    bot.pvp = 0;
		    bot.pk = 0;
		    bot.karma = 0;
		    bot.pvpFlag = 0;

			bot.classId = classId;
			bot.className = character.className;
			bot.raceId = raceId;
			
			bot.str = null;
		 	bot.dex = null;
			bot.con = null;
			bot.int = null;
			bot.wit = null;
			bot.men = null;
			bot.hp = null;
			bot.maximumHp = null;
			bot.mp = null;
			bot.maximumMp = null;

			bot.pAtk = null;
			bot.pDef = null;
			bot.mAtk = null;
			bot.mDef = null;
			bot.pSpd = null;
			bot.mSpd = null;

			bot.accuracy = character.accuracy;
			bot.critical = character.critical;
			bot.evasion = character.evesion;
			bot.runSpeed = character.runSpeed;
			bot.walkSpeed = character.walkSpeed
			bot.swimsSpeed = character.swimsSpeed;
			bot.maximumLoad = character.maximumLoad;
			
			bot.x = Math.floor(Math.random()*(500 * plusOrMinus)) + x;
			bot.y = Math.floor(Math.random()*(500 * plusOrMinus)) + y;
			bot.z = -3080;
			
			bot.canCraft = null;
			
			bot.maleMovementMultiplier = character.maleMovementMultiplier;
			bot.maleAttackSpeedMultiplier = character.maleMovementMultiplier;
			bot.maleCollisionRadius = character.maleCollisionRadius;
			bot.maleCollisionHeight = character.maleCollisionHeight;

			bot.femaleMovementMultiplier = character.femaleMovementMultiplier;
			bot.femaleAttackSpeedMultiplier = character.femaleMovementMultiplier;
			bot.femaleCollisionRadius = character.femaleCollisionRadius;
			bot.femaleCollisionHeight = character.femaleCollisionHeight;

			bot.items = null;

			// equipment
			bot.underwear = { objectId: 0, itemId: 0 };
			bot.ear = {
				left: { objectId: 0, itemId: 0 },
				right: { objectId: 0, itemId: 0 }
			}
			bot.neck = { objectId: 0, itemId: 0 };
			bot.finger = {
				left: { objectId: 0, itemId: 0 },
				right: { objectId: 0, itemId: 0 }
			}
			
			bot.head = { objectId: 0, itemId: 0 };
			bot.hand = {
				left: { objectId: 0, itemId: 0 },
				right: { objectId: 0, itemId: 0 },
				leftAndRight: { objectId: 0, itemId: 0 }
			}
			bot.gloves = { objectId: 0, itemId: 0 };
			bot.chest = { objectId: 0, itemId: 0 };
			bot.legs = { objectId: 0, itemId: 0 };
			bot.feet = { objectId: 0, itemId: 0 };
			bot.back = { objectId: 0, itemId: 0 };

			this._bots.push(bot);
		}

		return this.get();
	}

	get() {
		return this._bots;
	}

	serialization(data) {
		var result = {};

			for(var i = 0; i < data.length; i++) {
				result[data[i].classId] = data[i];
			}

		return result;
	}
}

module.exports = Bots;