function L2CharTemplate(data) {
	this._data = data

	this._objectId = null;
	this._accountName = null;
    this._characterName = null;
    this._title = null;
    this._level = null;
	this._gender = null;
	this._hairStyle = null;
	this._hairColor = null;
	this._face = null;
	this._heading = null;
    this._accessLevel = null;
    this._online = null;
    this._onlineTime = null;

    this._pvp = null;
    this._pk = null;
    this._karma = null;

	this._classId = null;
	this._className = null;
	this._raceId = null;
	this._clanId = null;
	
	this._str = null;
 	this._dex = null;
	this._con = null;
	this._int = null;
	this._wit = null;
	this._men = null;
	this._hp = null;
	this._maximumHp = null;
	this._mp = null;
	this._maximumMp = null;
	this._exp = null;
	this._sp = null;

	this._pAtk = null;
	this._pDef = null;
	this._mAtk = null;
	this._mDef = null;
	this._pSpd = null;
	this._mSpd = null;
	this._accuracy = null;
	this._critical = null;
	this._evasion = null;
	this._moveSpd = null;
	this._maximumLoad = null;
	
	this._x = null;
	this._y = null;
	this._z = null;
	
	this._canCraft = null;
	
	this._maleMovementMultiplier = null;
	this._maleAttackSpeedMultiplier = null;
	this._maleCollisionRadius = null;
	this._maleCollisionHeight = null;
	
	this._femaleMovementMultiplier = null;
	this._femaleAttackSpeedMultiplier = null;
	this._femaleCollisionRadius = null;
	this._femaleCollisionHeight = null;
	
	this._items = [];

	this.fillData();
}

L2CharTemplate.prototype.getObjectId = function() {
	return this._objectId;
}

L2CharTemplate.prototype.setObjectId = function(objectId) {
	this._objectId = objectId;
}

L2CharTemplate.prototype.getAccountName = function() {
	return this._accountName;
}

L2CharTemplate.prototype.setAccountName = function(accountName) {
	this._accountName = accountName;
}

L2CharTemplate.prototype.getCharacterName = function() {
	return this._characterName;
}

L2CharTemplate.prototype.setCharacterName = function(characterName) {
	this._characterName = characterName;
}

L2CharTemplate.prototype.getTitle = function() {
	return this._title;
}

L2CharTemplate.prototype.setTitle = function(title) {
	this._title = title;
}

L2CharTemplate.prototype.getLevel = function() {
	return this._level;
}

L2CharTemplate.prototype.setLevel = function(level) {
	this._level = level;
}

L2CharTemplate.prototype.getGender = function() {
	return this._gender;
}

L2CharTemplate.prototype.setGender = function(gender) {
	this._gender = gender;
}

L2CharTemplate.prototype.getHairStyle = function() {
	return this._hairStyle;
}

L2CharTemplate.prototype.setHairStyle = function(hairStyle) {
	this._hairStyle = hairStyle;
}

L2CharTemplate.prototype.getHairColor = function() {
	return this._hairColor;
}

L2CharTemplate.prototype.setHairColor = function(hairColor) {
	this._hairColor = hairColor;
}

L2CharTemplate.prototype.getFace = function() {
	return this._face;
}

L2CharTemplate.prototype.setFace = function(face) {
	this._face = face;
}

L2CharTemplate.prototype.getHeading = function() {
	return this._heading;
}

L2CharTemplate.prototype.setHeading = function(heading) {
	this._heading = heading;
}

L2CharTemplate.prototype.getAccessLevel = function() {
	return this._accessLevel;
}

L2CharTemplate.prototype.setAccessLevel = function(accessLevel) {
	this._accessLevel = accessLevel;
}

L2CharTemplate.prototype.getOnline = function() {
	return this._online;
}

L2CharTemplate.prototype.setOnline = function(online) {
	this._online = online;
}

L2CharTemplate.prototype.getOnlineTime = function() {
	return this._onlineTime;
}

L2CharTemplate.prototype.setOnlineTime = function(onlineTime) {
	this._onlineTime = onlineTime;
}

L2CharTemplate.prototype.getPvp = function() {
	return this._pvp;
}

L2CharTemplate.prototype.setPvp = function(pvp) {
	this._pvp = pvp;
}

L2CharTemplate.prototype.getPk = function() {
	return this._pk;
}

L2CharTemplate.prototype.setPk = function(pk) {
	this._pk = pk;
}

L2CharTemplate.prototype.getKarma = function() {
	return this._karma;
}

L2CharTemplate.prototype.setKarma = function(karma) {
	this._karma = karma;
}

L2CharTemplate.prototype.getClassId = function() {
	return this._classId;
}

L2CharTemplate.prototype.setClassId = function(classId) {
	this._classId = classId;
}

L2CharTemplate.prototype.getClassName = function() {
	return this._className;
}

L2CharTemplate.prototype.setClassName = function(className) {
	this._className = className;
}

L2CharTemplate.prototype.getRaceId = function() {
	return this._raceId;
}

L2CharTemplate.prototype.setRaceId = function(raceId) {
	this._raceId = raceId;
}

L2CharTemplate.prototype.getClanId = function() {
	return this._clanId;
}

L2CharTemplate.prototype.setClanId = function(clanId) {
	this._clanId = clanId;
}

L2CharTemplate.prototype.getStr = function() {
	return this._str;
}

L2CharTemplate.prototype.setStr = function(str) {
	this._str = str;
}

L2CharTemplate.prototype.getDex = function() {
	return this._dex;
}

L2CharTemplate.prototype.setDex = function(dex) {
	this._dex = dex
}

L2CharTemplate.prototype.getCon = function() {
	return this._con;
}

L2CharTemplate.prototype.setCon = function(con) {
	this._con = con;
}

L2CharTemplate.prototype.getInt = function() {
	return this._int;
}

L2CharTemplate.prototype.setInt = function(int) {
	this._int = int;
}

L2CharTemplate.prototype.getWit = function() {
	return this._wit;
}

L2CharTemplate.prototype.setWit = function(wit) {
	this._wit = wit;
}

L2CharTemplate.prototype.getMen = function() {
	return this._men;
}

L2CharTemplate.prototype.setMen = function(men) {
	this._men = men;
}

L2CharTemplate.prototype.getHp = function() {
	return this._hp;
}

L2CharTemplate.prototype.setHp = function(hp) {
	this._hp = hp;
}

L2CharTemplate.prototype.getMaximumHp = function() {
	return this._maximumHp;
}

L2CharTemplate.prototype.setMaximumHp = function(maximumHp) {
	this._maximumHp = maximumHp;
}

L2CharTemplate.prototype.getMp = function() {
	return this._mp;
}

L2CharTemplate.prototype.setMp = function(mp) {
	this._mp = mp;
}

L2CharTemplate.prototype.getMaximumMp = function() {
	return this._maximumMp;
}

L2CharTemplate.prototype.setMaximumMp = function(maximumMp) {
	this._maximumMp = maximumMp;
}

L2CharTemplate.prototype.getExp = function() {
	return this._exp;
}

L2CharTemplate.prototype.setExp = function(exp) {
	this._exp = exp;
}

L2CharTemplate.prototype.getSp = function() {
	return this._sp;
}

L2CharTemplate.prototype.setSp = function(sp) {
	this._sp = sp;
}

L2CharTemplate.prototype.getPatk = function() {
	return this._pAtk;
}

L2CharTemplate.prototype.setPatk = function(pAtk) {
	this._pAtk = pAtk;
}

L2CharTemplate.prototype.getPdef = function() {
	return this._pDef;
}

L2CharTemplate.prototype.setPdef = function(pDef) {
	this._pDef = pDef;
}

L2CharTemplate.prototype.getMatk = function() {
	return this._mAtk;
}

L2CharTemplate.prototype.setMatk = function(mAtk) {
	this._mAtk = mAtk;
}

L2CharTemplate.prototype.getMdef = function() {
	return this._mDef;
}

L2CharTemplate.prototype.setMdef = function(mDef) {
	this._mDef = mDef;
}

L2CharTemplate.prototype.getPspd = function() {
	return this._pSpd;
}

L2CharTemplate.prototype.setPspd = function(pSpd) {
	this._pSpd = pSpd;
}

L2CharTemplate.prototype.getMspd = function() {
	return this._mSpd;
}

L2CharTemplate.prototype.setPspd = function(mSpd) {
	this._mSpd = mSpd;
}

L2CharTemplate.prototype.getAccuracy = function() {
	return this._accuracy;
}

L2CharTemplate.prototype.setAccuracy = function(accuracy) {
	this._accuracy = accuracy;
}

L2CharTemplate.prototype.getCritical = function() {
	return this._critical;
}

L2CharTemplate.prototype.setCritical = function(critical) {
	this._critical = critical;
}

L2CharTemplate.prototype.getEvasion = function() {
	return this._evasion;
}

L2CharTemplate.prototype.setEvasion = function(evasion) {
	this._evasion = evasion;
}

L2CharTemplate.prototype.getMoveSpd = function() {
	return this._moveSpd;
}

L2CharTemplate.prototype.setMoveSpd = function(moveSpd) {
	this._moveSpd = moveSpd;
}

L2CharTemplate.prototype.getMaximumLoad = function() {
	return this._maximumLoad;
}

L2CharTemplate.prototype.setMaximumLoad = function(maximumLoad) {
	this._maximumLoad = maximumLoad;
}

L2CharTemplate.prototype.getX = function() {
	return this._x;
}

L2CharTemplate.prototype.setX = function(x) {
	this._x = x;
}

L2CharTemplate.prototype.getY = function() {
	return this._y;
}

L2CharTemplate.prototype.setY = function(y) {
	this._y = y;
}

L2CharTemplate.prototype.getZ = function() {
	return this._z;
}

L2CharTemplate.prototype.setZ = function(z) {
	this._z = z;
}

L2CharTemplate.prototype.getCanCraft = function() {
	return this._canCraft;
}

L2CharTemplate.prototype.setCanCraft = function(canCraft) {
	this._canCraft = canCraft;
}

L2CharTemplate.prototype.getMaleMovementMultiplier = function() {
	return this._maleMovementMultiplier;
}

L2CharTemplate.prototype.setMaleMovementMultiplier = function(maleMovementMultiplier) {
	this._maleMovementMultiplier = maleMovementMultiplier;
}

L2CharTemplate.prototype.getMaleAttackSpeedMultiplier = function() {
	return this._maleAttackSpeedMultiplier;
}

L2CharTemplate.prototype.setMaleAttackSpeedMultiplier = function(maleAttackSpeedMultiplier) {
	this._maleAttackSpeedMultiplier = maleAttackSpeedMultiplier;
}

L2CharTemplate.prototype.getMaleCollisionRadius = function() {
	return this._maleCollisionRadius;
}

L2CharTemplate.prototype.setMaleCollisionRadius = function(maleCollisionRadius) {
	this._maleCollisionRadius = maleCollisionRadius;
}

L2CharTemplate.prototype.getMaleCollisionHeight = function() {
	return this._maleCollisionHeight;
}

L2CharTemplate.prototype.setMaleCollisionHeight = function(maleCollisionHeight) {
	this._maleCollisionHeight = maleCollisionHeight;
}

L2CharTemplate.prototype.getFemaleMovementMultiplier = function() {
	return this._femaleMovementMultiplier;
}

L2CharTemplate.prototype.setFemaleMovementMultiplier = function(femaleMovementMultiplier) {
	this._femaleMovementMultiplier = femaleMovementMultiplier;
}

L2CharTemplate.prototype.getFemaleAttackSpeedMultiplier = function() {
	return this._femaleAttackSpeedMultiplier;
}

L2CharTemplate.prototype.setFemaleAttackSpeedMultiplier = function(femaleAttackSpeedMultiplier) {
	this._femaleAttackSpeedMultiplier = femaleAttackSpeedMultiplier;
}

L2CharTemplate.prototype.getFemaleCollisionRadius = function() {
	return this._femaleCollisionRadius;
}

L2CharTemplate.prototype.setFemaleCollisionRadius = function(femaleCollisionRadius) {
	this._femaleCollisionRadius = femaleCollisionRadius;
}

L2CharTemplate.prototype.getFemaleCollisionHeight = function() {
	return this._femaleCollisionHeight;
}

L2CharTemplate.prototype.setFemaleCollisionHeight = function(femaleCollisionHeight) {
	this._femaleCollisionHeight = femaleCollisionHeight;
}

L2CharTemplate.prototype.getItems = function() {
	return this._items;
}

L2CharTemplate.prototype.addItems = function(item) {
	this._items.push(item);
}

L2CharTemplate.prototype.fillData = function(){
	for(key in this._data) {
		this["_" + key] = this._data[key]
	}
}

L2CharTemplate.prototype.getData = function(){
	var data = {};

	for(key in this) {
		if(key === "_data" || typeof this[key] == "function") continue;
		data[key.slice(1)] = this[key];
	}

	return data;
}


module.exports = L2CharTemplate;