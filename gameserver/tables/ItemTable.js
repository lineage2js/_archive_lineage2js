var TYPES = {
	TYPE1_WEAPON_RING_EARRING_NECKLACE: 0,
	TYPE1_SHIELD_ARMOR: 1,
	TYPE1_ITEM_QUESTITEM_ADENA: 4,

	TYPE2_WEAPON: 0,
	TYPE2_SHIELD_ARMOR: 1,
	TYPE2_ACCESSORY: 2,
	TYPE2_QUEST: 3,
	TYPE2_MONEY: 4,
	TYPE2_OTHER: 5,

	MATERIAL_STEEL: 0x00,
	MATERIAL_FINE_STEEL: 0x01,
	MATERIAL_BLOOD_STEEL: 0x02,
	MATERIAL_BRONZE: 0x03,
	MATERIAL_SILVER: 0x04,
	MATERIAL_GOLD: 0x05,
	MATERIAL_MITHRIL: 0x06,
	MATERIAL_ORIHARUKON: 0x07,
	MATERIAL_PAPER: 0x08,
	MATERIAL_WOOD: 0x09,
	MATERIAL_CLOTH: 0x0a,
	MATERIAL_LEATHER: 0x0b,
	MATERIAL_BONE: 0x0c,
	MATERIAL_HORN: 0x0d,
	MATERIAL_DAMASCUS: 0x0e,
	MATERIAL_ADAMANTAITE: 0x0f,
	MATERIAL_CHRYSOLITE: 0x10,
	MATERIAL_CRYSTAL: 0x11,
	MATERIAL_LIQUID: 0x12,
	MATERIAL_SCALE_OF_DRAGON: 0x13,
	MATERIAL_DYESTUFF: 0x14,
	MATERIAL_COBWEB: 0x15,

	CRYSTAL_NONE: 0x01,
	CRYSTAL_D: 0x02,
	CRYSTAL_C: 0x03,
	CRYSTAL_B: 0x04,
	CRYSTAL_A: 0x05,
	CRYSTAL_S: 0x06,

	// weapon
	WEAPON_NONE: 0x01,
	WEAPON_SWORD: 0x02,
	WEAPON_BLUNT: 0x03,
	WEAPON_DAGGER: 0x04,
	WEAPON_BOW: 0x05,
	WEAPON_POLE: 0x06,
	WEAPON_ETC: 0x07,
	WEAPON_FIST: 0x08,
	WEAPON_DUAL: 0x09,
	WEAPON_DUALFIST: 0x0a,

	// armor
	ARMOR_NONE: 0x01,
	ARMOR_LIGHT: 0x02,
	ARMOR_HEAVY: 0x03,
	ARMOR_MAGIC: 0x04,

	SLOT_NONE: 0x0000,
	SLOT_UNDERWEAR: 0x0001,
	SLOT_R_EAR: 0x0002,
	SLOT_L_EAR: 0x0004,
	SLOT_NECK: 0x0008,
	SLOT_R_FINGER: 0x0010,
	SLOT_L_FINGER: 0x0020,
	SLOT_HEAD: 0x0040,
	SLOT_R_HAND: 0x0080,
	SLOT_L_HAND: 0x0100,
	SLOT_GLOVES: 0x0200,
	SLOT_CHEST: 0x0400,
	SLOT_LEGS: 0x0800,
	SLOT_FEET: 0x1000,
	SLOT_BACK: 0x2000,
	SLOT_LR_HAND: 0x4000,
	SLOT_FULL_ARMOR: 0x8000,
}

var STRING_TYPES = {
	MATERIAL: {
		"paper": TYPES.MATERIAL_PAPER,
		"wood": TYPES.MATERIAL_WOOD,
		"liquid": TYPES.MATERIAL_LIQUID,
		"cloth": TYPES.MATERIAL_CLOTH,
		"leather": TYPES.MATERIAL_LEATHER,
		"horn": TYPES.MATERIAL_HORN,
		"bone": TYPES.MATERIAL_BONE,
		"bronze": TYPES.MATERIAL_BRONZE,
		"fine_steel": TYPES.MATERIAL_FINE_STEEL,
		"cotton": TYPES.MATERIAL_FINE_STEEL,
		"mithril": TYPES.MATERIAL_MITHRIL,
		"silver": TYPES.MATERIAL_SILVER,
		"gold": TYPES.MATERIAL_GOLD,
		"adamantaite": TYPES.MATERIAL_ADAMANTAITE,
		"steel": TYPES.MATERIAL_STEEL,
		"oriharukon": TYPES.MATERIAL_ORIHARUKON,
		"blood_steel": TYPES.MATERIAL_BLOOD_STEEL,
		"crystal": TYPES.MATERIAL_CRYSTAL,
		"damascus": TYPES.MATERIAL_DAMASCUS,
		"chrysolite": TYPES.MATERIAL_CHRYSOLITE,
		"scale_of_dragon": TYPES.MATERIAL_SCALE_OF_DRAGON,
		"dyestuff": TYPES.MATERIAL_DYESTUFF,
		"cobweb": TYPES.MATERIAL_COBWEB
	},
	CRYSTAL: {
		"s": TYPES.CRYSTAL_S,
		"a": TYPES.CRYSTAL_A,
		"b": TYPES.CRYSTAL_B,
		"c": TYPES.CRYSTAL_C,
		"d": TYPES.CRYSTAL_D,
		"none": TYPES.CRYSTAL_NONE
	},
	WEAPON: {
		"none": TYPES.WEAPON_NONE, // these are shields !
		"blunt": TYPES.WEAPON_BLUNT,
		"bow": TYPES.WEAPON_BOW,
		"dagger": TYPES.WEAPON_DAGGER,
		"dual": TYPES.WEAPON_DUAL,
		"dualfist": TYPES.WEAPON_DUALFIST,
		"etc": TYPES.WEAPON_ETC,
		"fist": TYPES.WEAPON_FIST,
		"pole": TYPES.WEAPON_POLE,
		"sword": TYPES.WEAPON_SWORD
	},
	ARMOR: {
		"none": TYPES.ARMOR_NONE,
		"light": TYPES.ARMOR_LIGHT,
		"heavy": TYPES.ARMOR_HEAVY,
		"magic": TYPES.ARMOR_MAGIC
	},
	SLOT: {
		"chest": TYPES.SLOT_CHEST,
		"chest_full": TYPES.SLOT_FULL_ARMOR, 
		"head": TYPES.SLOT_HEAD,
		"underwear": TYPES.SLOT_UNDERWEAR,
		"back": TYPES.SLOT_BACK,
		"neck": TYPES.SLOT_NECK,
		"legs": TYPES.SLOT_LEGS,
		"feet": TYPES.SLOT_FEET,
		"gloves": TYPES.SLOT_GLOVES,
		"chest,legs": TYPES.SLOT_CHEST, // | L2Item.SLOT_LEGS,
		"rhand": TYPES.SLOT_R_HAND,
		"lhand": TYPES.SLOT_L_HAND,
		"lrhand": TYPES.SLOT_LR_HAND,
		"rear,lear": TYPES.SLOT_L_EAR, // | L2Item.SLOT_R_EAR,
		"rfinger,lfinger": TYPES.SLOT_L_FINGER, // | L2Item.SLOT_R_FINGER,
		"none": TYPES.SLOT_NONE
	}
}

function ItemTable(data) {
	this._data = data;
	this._result = null;

	this.serialization();
}

ItemTable.prototype.serialization = function() {
	this._result = {};

	for(var i = 0; i < this._data.length; i++) {
		for(var j = 0; j < this._data[i].items.length; j++) {
			var data = this._data[i];
			var item = this._data[i].items[j]

			switch(data.type) {
				case "armor":
					if(STRING_TYPES.ARMOR[item.bodyPart] === TYPES.SLOT_NECK 
						|| STRING_TYPES.ARMOR[item.bodyPart] === TYPES.SLOT_L_EAR 
						|| STRING_TYPES.ARMOR[item.bodyPart] === TYPES.SLOT_L_FINGER) {
						item.type1 = TYPES.TYPE1_WEAPON_RING_EARRING_NECKLACE;
						item.type2 = TYPES.TYPE2_ACCESSORY;
					} else {
						item.type1 = TYPES.TYPE1_SHIELD_ARMOR;
						item.type2 = TYPES.TYPE2_SHIELD_ARMOR;
					}

					break;
				case "weapon":
					if(STRING_TYPES.WEAPON[item.weaponType] === TYPES.WEAPON_NONE) {
						item.type1 = TYPES.TYPE1_SHIELD_ARMOR;
						item.type2 = TYPES.TYPE2_SHIELD_ARMOR;

						break;
					}

					item.type1 = TYPES.TYPE1_WEAPON_RING_EARRING_NECKLACE;
					item.type2 = TYPES.TYPE2_WEAPON;

					break;
			}

			this._result[item.itemId] = item;
			this._result[item.itemId].type = data.type;
		}
	}
}

ItemTable.prototype.getData = function() {
	return this._result;
}

module.exports = ItemTable;