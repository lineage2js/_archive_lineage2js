let config = require("./../../config/config");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");
let items = require("./../../gameserver/Items");

class RequestUseItem {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._usedItem = null;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD();

		this._init();
	}

	getObjectId() {
		return this._data.getData()[1];
	}

	_init() {
		this._usedItem = this._player.getItem(this.getObjectId());

		if(this._usedItem.category === "armor" || this._usedItem.category === "weapon") {
			switch(this._usedItem.bodyPart) {
				case items.types.SLOT_R_EAR:

					break;
				case items.types.SLOT_L_EAR:

					break;
				case items.types.SLOT_NECK:

					break;
				case items.types.SLOT_R_FINGER:

					break;
				case items.types.SLOT_L_FINGER:

					break;
				case items.types.SLOT_HEAD:

					break;
				case items.types.SLOT_R_HAND:
					this._putItem(this._player.hand.right, false);

					break;
				case items.types.SLOT_L_HAND:
					this._putItem(this._player.hand.left, false);

					break;
				case items.types.SLOT_GLOVES:
					this._putItem(this._player.gloves);

					break;
				case items.types.SLOT_CHEST:
					this._putItem(this._player.chest);

					break;
				case items.types.SLOT_LEGS:
					this._putItem(this._player.legs);

					break;
				case items.types.SLOT_FEET:
					this._putItem(this._player.feet);

					break;
				case items.types.SLOT_BACK:
					this._putItem(this._player.back);

					break;
				case items.types.SLOT_LR_HAND:
					this._putItem(this._player.hand.leftAndRight, true);

					break;
				case items.types.SLOT_FULL_ARMOR:
					this._putItem(this._player.chest);

					break;
			}
		}

		if(this._usedItem.category === "etc") {
			if(this._usedItem.itemId === 1665 || this._usedItem.itemId === 1863) { // map: world, elmore
				this._player.sendPacket(new serverPackets.ShowMiniMap(this._usedItem.itemId));
			}
		}

		this._player.sendPacket(new serverPackets.UserInfo(this._player));
		this._player.sendPacket(new serverPackets.ItemList(this._player));
		this._player.sendPacket(new serverPackets.SystemMessage(49, [{ type: config.base.systemMessageType.ITEM_NAME, value: this._usedItem.itemId }]));
		this._player.broadcast(new serverPackets.CharacterInfo(this._player));
	}

	_putItem(bodyPart, twoHandedWeapon) {
		if(bodyPart.objectId != 0) {
			let item = this._player.getItem(bodyPart.objectId);
			
			item.isEquipped = false; // снять если надето
		}

		if(twoHandedWeapon) { // Всегда срабатывает false на обычных предметах
			if(this._player.hand.right.objectId != 0) {
				let item = this._player.getItem(this._player.hand.right.objectId);
		
				item.isEquipped = false;
				this._player.hand.right.objectId = 0;
				this._player.hand.right.itemId = 0;
			}
			if(this._player.hand.left.objectId != 0) {
				let item = this._player.getItem(this._player.hand.left.objectId);
		
				item.isEquipped = false;
				this._player.hand.left.objectId = 0;
				this._player.hand.left.itemId = 0;
			}
		} else {
			if(this._player.hand.leftAndRight.objectId != 0) {
				let item = this._player.getItem(this._player.hand.leftAndRight.objectId);
		
				item.isEquipped = false;
				this._player.hand.leftAndRight.objectId = 0;
				this._player.hand.leftAndRight.itemId = 0;
			}
		}

		this._usedItem.isEquipped = true;
		bodyPart.objectId = this._usedItem.objectId;
		bodyPart.itemId = this._usedItem.itemId;
	}
}

module.exports = RequestUseItem;