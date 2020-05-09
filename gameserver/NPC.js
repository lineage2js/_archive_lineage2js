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
		let radius = 2000;

		for(let i = 0; i < objects.length; i++) {
			if(!objects[i].bot && this._checkPointInCircle(this.x, this.y, objects[i].x, objects[i].y, radius)) {
				callback(objects[i]);
			}
		}
	}

	_checkPointInCircle(x1, y1, x2, y2, radius) {
		let dx = x2 - x1;
		let dy = y2 - y1;
		let sqrtDist = dx*dx + dy*dy;
		let sqrtRadius = radius*radius;

		return sqrtDist < sqrtRadius;
	}

	_inPoly(xp, yp, x, y){
		let npol = xp.length;
		let j = npol - 1;
		let c = false;

		for (let i = 0; i < npol; i++){
			if ((((yp[i]<=y) && (y<yp[j])) || ((yp[j]<=y) && (y<yp[i]))) &&
				(x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
				c = !c
			}
			j = i;
		}

		return c;
	}

	getRandomPos() {
		let max = { x: -80000, y: 270000 };
		let min = { x: -60000, y: 250000 };
		let xp = [-71921, -72081, -72277, -72105];
		let yp = [257496, 257310, 257480, 257686];
		let x;
		let y;
			
		do {
			x = Math.floor(min.x + Math.random() * (max.x + 1 - min.x));
			y = Math.floor(min.y + Math.random() * (max.y + 1 - min.y));
		} while(!this._inPoly(xp, yp, x, y))

		return [x, y]
	}
}

module.exports = Npc;