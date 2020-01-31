class Npc {
	constructor() {
		this.objectId = null;
		this.id = null;
		this.name = null;
		this.x = null;
		this.y = null;
		this.z = null;
		this.level = null;
		this.gender = null;
		this.type = null;
		this.attackRange = null;
		this.hp = null;
		this.mp = null;
		this.exp = null;
		this.sp = null;
		this.pAtk = null;
		this.pDef = null;
		this.mAtk = null;
		this.mDef = null;
		this.pSpd = null;
		this.mSpd = null;
		this.aggressive = null;
		this.rightHand = null;
		this.leftHand = null;
		this.armor = null;
		this.walkSpeed = null;
		this.runSpeed = null;
		this.class = null;
		this.collisionRadius = null;
		this.collisionHeight = null;
	}

	getVisibleObjects(objects, callback) {
		var radius = 2000;

		for(var i = 0; i < objects.length; i++) {
			if(!objects[i].bot && this._checkPointInCircle(this.x, this.y, objects[i].x, objects[i].y, radius)) {
				callback(objects[i]);
			}
		}
	}

	_checkPointInCircle(x1, y1, x2, y2, radius) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		var sqrtDist = dx*dx + dy*dy;
		var sqrtRadius = radius*radius;

		return sqrtDist < sqrtRadius;
	}
}

module.exports = Npc;