let fs = require("fs");
let Npc = require("./Npc");
let idFactory = require("./../util/IdFactory");

class NpcList {
	constructor(file) {
		this._file = file;
		this._list = [];
		this._data = null;
	}

	addFile(path) {
		this._data = JSON.parse(fs.readFileSync(path, "utf-8"))
	}

	spawn() {
		for(let i = 0; i < this._data.length ; i++) {
			let item = this._data[i];

			for(let j = 0; j < item.count; j++) {
				let npc = new Npc();
				let sign = Math.random() < 0.5 ? -1 : 1;
				let [x, y] = npc.getRandomPos();
				let z = -3115;

				npc.objectId = idFactory.getNextId();
				npc.id = item.id;
				npc.name = item.name;
				npc.x = x;
				npc.y = y;
				npc.z = z;
				npc.level = item.level;
				npc.gender = item.gender;
				npc.type = item.type;
				npc.attackRange = item.attackRange;
				npc.hp = item.hp;
				npc.mp = item.mp;
				npc.exp = item.exp;
				npc.sp = item.sp;
				npc.pAtk = item.pAtk;
				npc.pDef = item.pDef;
				npc.mAtk = item.mAtk;
				npc.mDef = item.mDef;
				npc.pSpd = item.pSpd;
				npc.mSpd = item.mSpd;
				npc.aggressive = item.aggressive;
				npc.rightHand = item.rightHand;
				npc.leftHand = item.leftHand;
				npc.armor = item.armor;
				npc.walkSpeed = item.walkSpeed;
				npc.runSpeed = item.runSpeed;
				npc.class = item.class;
				npc.collisionRadius = item.collisionRadius;
				npc.collisionHeight = item.collisionHeight;

				this._list.push(npc);
			}
		}
	}

	get() {
		return this._list;
	}
}

module.exports = new NpcList();