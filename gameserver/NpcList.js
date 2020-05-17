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
			let params = this._data[i];

			for(let j = 0; j < params.count; j++) {
				let npc = new Npc(params);
				let [x, y] = npc.getRandomPos();
				let z = -3115;

				npc.objectId = idFactory.getNextId();
				
				switch(params.type) {
					case "monster":
					case "guard":
						npc.x = x;
						npc.y = y;
						npc.z = z;

						break;
					case "npc":
						npc.x = params.x;
						npc.y = params.y;
						npc.z = params.z;

						break;
				}

				this._list.push(npc);
			}
		}
	}

	getList() {
		return this._list;
	}
}

module.exports = new NpcList();