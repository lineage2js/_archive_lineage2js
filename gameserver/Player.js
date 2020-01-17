var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);

function Player(socket, xor) {
	this.socket = socket;
	this.xor = xor;
	
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
	this.waitType = 1; // 1 - is stands, 0 - is sitting
	this.moveType = 1; // 1 - is running, 0 - is walks
	this.gm = 0; // 0 - false, 1 - true;
	this.privateStoreType = 0;

    this.pvp = 0;
    this.pk = 0;
    this.karma = 0;
    this.pvpFlag = 0;

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

Player.prototype.getItem = function(objectId) {
	return this.items.filter(item => item.objectId === objectId)[0];
}

Player.prototype.getLoad = function() {
	return this.items.reduce(function(weight, item) {
		return weight + item.weight
	}, 0);
}

Player.prototype.getVisiblePlayers = function(players, handler) {
	var radius = 2000;

	for(var i = 0; i < players.length; i++) {
		if(players[i].socket !== this.socket) {
			if(players[i].online && checkPointInCircle(this.x, this.y, players[i].x, players[i].y, radius)) {
				handler(players[i]);
			}
		}
	}
}

Player.prototype.fillData = function(data){
	for(key in data) {
		this[key] = data[key];
	}
}

Player.prototype.getSkill = function(id) {
	return this.skills.filter(skill => skill.id === id)[0];
}

Player.prototype.getCharacters = function() {
	return db.get("characters").filter({"login": this.login}).value();
}

Player.prototype.getCharacterQuantity = function() {
	return db.get("characters").filter({"login": this.login}).value().length;
}

Player.prototype.getCharacterNames = function() {
	return db.get("characters").map("characterName").value();
}

Player.prototype.addCharacter = function(character) {
	db.get("characters").push(character).write();
}


function checkPointInCircle(x1, y1, x2, y2, radius) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	var sqrtDist = dx*dx + dy*dy;
	var sqrtRadius = radius*radius;

	return sqrtDist < sqrtRadius;
}

module.exports = Player;