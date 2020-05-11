let Npc = require("./Npc");

class World {
	constructor() {
		this._objects = [];
		this._players = [];
		this._bots = [];
		this._npcList = [];
	}

	//
	addPlayer(player) {
		this._players.push(player);
	}

	getPlayers() {
		return this._players
	}

	addBot(bot) {
		// fix
		if(Array.isArray(bot)) {
			for(let i = 0; i < bot.length; i++) {
				this._bots.push(bot[i]);
			}
		} else {
			this._bots.push(bot);
		}
	}

	getBots() {
		return this._bots;
	}

	addNpc(npc) {
		// fix
		if(Array.isArray(npc)) {
			for(let i = 0; i < npc.length; i++) {
				this._npcList.push(npc[i]);
			}
		} else {
			this._npcList.push(npc);
		}
	}

	getNpcList() {
		return this._npcList;
	}
	//

	add(objects) {
		if(Array.isArray(objects)) {
			for(let i = 0; i < objects.length; i++) {
				this._objects.push(objects[i]);
			}
		} else {
			this._objects.push(objects);
		}
	}

	find(objectId) {
		return this._objects.find(object => object.objectId === objectId);
	}
}

module.exports = new World();