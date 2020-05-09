let Npc = require("./Npc");

class Objects {
	constructor() {
		this._objects = [];
	}

	add(objects) {
		if(Array.isArray(objects)) {
			for(let i = 0; i < objects.length; i++) {
				this._objects.push(objects[i]);
			}
		} else {
			this._objects.push(objects);
		}
	}

	get(objectId) {
		return this._objects.find(object => object.objectId === objectId);
	}

	getNpc() {
		let objects = [];

		for(let i = 0; i < this._objects.length; i++) {
			if(this._objects[i] instanceof Npc) {
				objects.push(this._objects[i]);
			}
		}

		return objects
	}
}

module.exports = Objects;