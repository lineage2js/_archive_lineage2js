let idFactory = require("./../util/IdFactory");

class Item {
	constructor(items) {
		this._items = items;
	}

	get(id) {
		return this._items[id];
	}

	create(id) {
		let item;

		item = JSON.parse(JSON.stringify(this.get(id)));
		item.objectId = idFactory.getNextId();

		return item;
	}
}

module.exports = Item;