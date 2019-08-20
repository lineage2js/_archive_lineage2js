function Item(items, idFactory) {
	this._items = items;
	this._idFactory = idFactory;
}

Item.prototype.getItem = function(id) {
	return this._items[id];
}

Item.prototype.createItem = function(id) {
	var item;

	item = JSON.parse(JSON.stringify(this.getItem(id)));
	item.objectId = this._idFactory.getNextId();

	return item;
}

module.exports = Item;