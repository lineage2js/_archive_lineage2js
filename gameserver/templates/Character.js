class Character {
	constructor(data) {
		this._data = data

		this.objectId = null;
		this.login = null;
		this.name = null;
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
		this.exp = 0;
		this.sp = 0;
		this.waitType = 1; // 1 - is stands, 0 - is sitting
		this.moveType = 1; // 1 - is running, 0 - is walks

		this.pvp = 0;
		this.pk = 0;
		this.karma = 0;

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
		this.walkSpeed = null;
		this.swimSpeed = null;
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
		
		this.items = [];

		this._init();
	}

	getItems() {
		return this._items;
	}

	addItems(item) {
		this._items.push(item);
	}

	fillData(){
		for(let key in this._data) {
			this[key] = this._data[key]
		}
	}

	getData(){
		let data = {};

		for(let key in this) {
			if(key === "_data") continue;
			data[key] = this[key];
		}

		return data;
	}

	_init() {
		this.fillData();
	}
}

module.exports = Character;