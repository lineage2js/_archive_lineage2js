function Item(items, idFactory) {
	this._items = items;
	this._idFactory = idFactory;
}

Item.prototype.get = function(id) {
	return this._items[id];
}

Item.prototype.create = function(id) {
	var item;

	item = JSON.parse(JSON.stringify(this.get(id)));
	item.objectId = this._idFactory.getNextId();

	return item;
}

module.exports = Item;