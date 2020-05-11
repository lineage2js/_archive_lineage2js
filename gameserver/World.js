class World {
	constructor() {
		this._objects = [];
		this._players = [];
		this._bots = [];
		this._npcList = [];
	}

	addPlayer(player) {
		this._add(player, "players");
	}

	getPlayers() {
		return this._players
	}

	addBot(bot) {
		this._add(bot, "bots");
	}

	getBots() {
		return this._bots;
	}

	addNpc(npc) {
		this._add(npc, "npcList");
	}

	getNpcList() {
		return this._npcList;
	}

	find(objectId) {
		return this._objects.find(object => object.objectId === objectId);
	}

	_add(object, section) {
		if(Array.isArray(object)) {
			for(let i = 0; i < object.length; i++) {
				this._objects.push(object[i]);
				this["_" + section].push(object[i]);
			}
		} else {
			this._objects.push(object);
			this["_" + section].push(object);
		}
	}
}

module.exports = new World();