let ServerPacket = require("./ServerPacket");

function ItemList(player, showWindow = false) {
	this._packet = new ServerPacket(5 + (28 * player.items.length));
	this._packet.writeC(0x27);
		
	if(showWindow) {
		this._packet.writeH(0x01);
	} else {
		this._packet.writeH(0x00);
	}

	this._packet.writeH(player.items.length);

	for(let i = 0; i < player.items.length; i++) {
		this._packet.writeH(player.items[i].type1)
			.writeD(player.items[i].objectId)
			.writeD(player.items[i].itemId)
			.writeD(0x01) // getCount
			.writeH(player.items[i].type2)
			.writeH(0xff);

		if (player.items[i].isEquipped) { // вещь на персонаже или нет
			this._packet.writeH(0x01);
		} else {
			this._packet.writeH(0x00);
		}

		this._packet.writeD(player.items[i].bodyPart)
			.writeH(0x00) // getEnchantLevel
			.writeH(0x00);
	}

	return this._packet.getBuffer();
}

module.exports = ItemList;