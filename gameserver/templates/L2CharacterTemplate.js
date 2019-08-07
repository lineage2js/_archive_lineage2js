function L2CharTemplate(data) {
	this._data = data

	this._classId = null;
	this._className = null;
	this._raceId = null;
	
	this._str = null;
 	this._dex = null;
	this._con = null;
	this._int = null;
	this._wit = null;
	this._men = null;
	this._hp = null;
	this._mp = null;	
	
	this._pAtk = null;
	this._pDef = null;
	this._mAtk = null;
	this._mDef = null;
	this._pSpd = null;
	this._mSpd = null;
	this._acc = null;
	this._critical = null;
	this._evasion = null;
	this._moveSpd = null;
	this._load = null;
	
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

L2CharTemplate.prototype.getMp = function() {
	return this._mp;
}

L2CharTemplate.prototype.setMp = function(mp) {
	this._mp = mp;
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

L2CharTemplate.prototype.getAcc = function() {
	return this._acc;
}

L2CharTemplate.prototype.setAcc = function(acc) {
	this._acc = acc;
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

L2CharTemplate.prototype.getLoad = function() {
	return this._load;
}

L2CharTemplate.prototype.setLoad = function(load) {
	this._load = load;
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

module.exports = L2CharTemplate;