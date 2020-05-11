let fs = require("fs");
let idFactory = require("./../util/IdFactory");
let types = {
	TYPE1_WEAPON_RING_EARRING_NECKLACE: 0,
	TYPE1_SHIELD_ARMOR: 1,
	TYPE1_ITEM_QUESTITEM_ADENA: 4,

	TYPE2_WEAPON: 0,
	TYPE2_SHIELD_ARMOR: 1,
	TYPE2_ACCESSORY: 2,
	TYPE2_QUEST: 3,
	TYPE2_MONEY: 4,
	TYPE2_OTHER: 5,

	TYPE_ARROW: 0,
	TYPE_MATERIAL: 1,
	TYPE_PET_COLLAR: 2,
	TYPE_POTION: 3,
	TYPE_RECIPE: 4,
	TYPE_SCROLL: 5,
	TYPE_QUEST: 6,
	TYPE_MONEY: 7,
	TYPE_OTHER: 8,
	TYPE_SPELLBOOK: 9,

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
let stringTypes = {
	MATERIAL: {
		"paper": types.MATERIAL_PAPER,
		"wood": types.MATERIAL_WOOD,
		"liquid": types.MATERIAL_LIQUID,
		"cloth": types.MATERIAL_CLOTH,
		"leather": types.MATERIAL_LEATHER,
		"horn": types.MATERIAL_HORN,
		"bone": types.MATERIAL_BONE,
		"bronze": types.MATERIAL_BRONZE,
		"fine_steel": types.MATERIAL_FINE_STEEL,
		"cotton": types.MATERIAL_FINE_STEEL,
		"mithril": types.MATERIAL_MITHRIL,
		"silver": types.MATERIAL_SILVER,
		"gold": types.MATERIAL_GOLD,
		"adamantaite": types.MATERIAL_ADAMANTAITE,
		"steel": types.MATERIAL_STEEL,
		"oriharukon": types.MATERIAL_ORIHARUKON,
		"blood_steel": types.MATERIAL_BLOOD_STEEL,
		"crystal": types.MATERIAL_CRYSTAL,
		"damascus": types.MATERIAL_DAMASCUS,
		"chrysolite": types.MATERIAL_CHRYSOLITE,
		"scale_of_dragon": types.MATERIAL_SCALE_OF_DRAGON,
		"dyestuff": types.MATERIAL_DYESTUFF,
		"cobweb": types.MATERIAL_COBWEB
	},
	CRYSTAL: {
		"s": types.CRYSTAL_S,
		"a": types.CRYSTAL_A,
		"b": types.CRYSTAL_B,
		"c": types.CRYSTAL_C,
		"d": types.CRYSTAL_D,
		"none": types.CRYSTAL_NONE
	},
	WEAPON: {
		"none": types.WEAPON_NONE, // these are shields !
		"blunt": types.WEAPON_BLUNT,
		"bow": types.WEAPON_BOW,
		"dagger": types.WEAPON_DAGGER,
		"dual": types.WEAPON_DUAL,
		"dualfist": types.WEAPON_DUALFIST,
		"etc": types.WEAPON_ETC,
		"fist": types.WEAPON_FIST,
		"pole": types.WEAPON_POLE,
		"sword": types.WEAPON_SWORD
	},
	ARMOR: {
		"none": types.ARMOR_NONE,
		"light": types.ARMOR_LIGHT,
		"heavy": types.ARMOR_HEAVY,
		"magic": types.ARMOR_MAGIC
	},
	SLOT: {
		"chest": types.SLOT_CHEST,
		"chest_full": types.SLOT_FULL_ARMOR, 
		"head": types.SLOT_HEAD,
		"underwear": types.SLOT_UNDERWEAR,
		"back": types.SLOT_BACK,
		"neck": types.SLOT_NECK,
		"legs": types.SLOT_LEGS,
		"feet": types.SLOT_FEET,
		"gloves": types.SLOT_GLOVES,
		"chest,legs": types.SLOT_CHEST, // | L2Item.SLOT_LEGS,
		"rhand": types.SLOT_R_HAND,
		"lhand": types.SLOT_L_HAND,
		"lrhand": types.SLOT_LR_HAND,
		"rear,lear": types.SLOT_L_EAR, // | L2Item.SLOT_R_EAR,
		"rfinger,lfinger": types.SLOT_L_FINGER, // | L2Item.SLOT_R_FINGER,
		"none": types.SLOT_NONE
	}
}

class Items {
	constructor() {
		this.types = types;
		this.stringTypes = stringTypes;
		this._data = [];
		this._items = {};
		this._paths = null;
	}

	addFiles(paths) {
		this._paths = paths;
		this._load();
		this._serialization();
	}

	create(id) {
		let item;

		item = JSON.parse(JSON.stringify(this._items[id]));
		item.objectId = idFactory.getNextId();

		return item;
	}

	_load() {
		for(let i = 0; i < this._paths.length; i++) {
			this._data.push({ items: JSON.parse(fs.readFileSync(this._paths[i].path, "utf-8")), category: this._paths[i].category });
		}
	}

	_serialization() {
		for(let i = 0; i < this._data.length; i++) {
			for(let j = 0; j < this._data[i].items.length; j++) {
				let data = this._data[i];
				let item = this._data[i].items[j];

				switch(data.category) {
					case "armor":
						if(this.stringTypes.ARMOR[item.bodyPart] === this.types.SLOT_NECK 
							|| this.stringTypes.ARMOR[item.bodyPart] === this.types.SLOT_L_EAR 
							|| this.stringTypes.ARMOR[item.bodyPart] === this.types.SLOT_L_FINGER) {
							item.type1 = this.types.TYPE1_WEAPON_RING_EARRING_NECKLACE;
							item.type2 = this.types.TYPE2_ACCESSORY;
							item.bodyPart = this.stringTypes.SLOT[item.bodyPart];
							item.isEquipped = false;
						} else {
							item.type1 = this.types.TYPE1_SHIELD_ARMOR;
							item.type2 = this.types.TYPE2_SHIELD_ARMOR;
							item.bodyPart = this.stringTypes.SLOT[item.bodyPart];
							item.isEquipped = false;
						}

						break;
					case "weapon":
						if(this.stringTypes.WEAPON[item.type] === this.types.WEAPON_NONE) {
							item.type1 = this.types.TYPE1_SHIELD_ARMOR;
							item.type2 = this.types.TYPE2_SHIELD_ARMOR;
							item.bodyPart = this.stringTypes.SLOT[item.bodyPart];
							item.isEquipped = false;

							break;
						}

						item.type1 = this.types.TYPE1_WEAPON_RING_EARRING_NECKLACE;
						item.type2 = this.types.TYPE2_WEAPON;
						item.bodyPart = this.stringTypes.SLOT[item.bodyPart];
						item.isEquipped = false;

						break;
					case "etc":
						if(item.type === "quest") {
							item.type2 = this.types.TYPE2_QUEST;
						} else {
							item.type2 = this.types.TYPE2_OTHER;
						}

						item.type1 = this.types.TYPE1_ITEM_QUESTITEM_ADENA;

						break;
				}

				this._items[item.itemId] = item;
				this._items[item.itemId].category = data.category;
			}
		}
	}
}

module.exports = new Items();