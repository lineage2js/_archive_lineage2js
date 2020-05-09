let fs = require("fs");
let Npc = require("./Npc");

class NpcTable {
	constructor(file, server) {
		this._file = file;
		this._server = server;
		this._idFactory = this._server.idFactory;
		this._storage = null;

		this._init();
	}

	spawn() {
		let objects = [];
		//let x = -72100;
		//let y = 257500;
		

		for(let i = 0; i < 3 ; i++) {
			for(let j = 0; j < this._storage.length; j++) {
				let npc = new Npc();
				let item = this._storage[j];
				let sign = Math.random() < 0.5 ? -1 : 1;
				let [x, y] = npc.getRandomPos();
				let z = -3115;

				npc.objectId = this._idFactory.getNextId();
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

				objects.push(npc);
			}
		}

		return objects;
	}

	get(id) {
		return this._storage.find(data => data.id === id);
	}

	_readFile() {
		this._storage = JSON.parse(fs.readFileSync(this._file, "utf-8"))
	}

	_init(){ 
		this._readFile();
	}
}

module.exports = NpcTable;