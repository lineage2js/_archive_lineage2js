class Objects {
	constructor() {
		this._objects = [];
	}

	add(object) {
		this._objects.push(object);
	}

	get(objectId) {
		return this._objects.filter(object => object.objectId === objectId)[0];
	} 
}

module.exports = Objects;