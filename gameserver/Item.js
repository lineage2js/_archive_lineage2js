class Item {
	constructor(items, idFactory) {
		this._items = items;
		this._idFactory = idFactory;
	}

	get(id) {
		return this._items[id];
	}

	create(id) {
		let item;

		item = JSON.parse(JSON.stringify(this.get(id)));
		item.objectId = this._idFactory.getNextId();

		return item;
	}
}

module.exports = Item;