let config = require("./../../config/config");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let templates = require("./../../gameserver/templates/templates");
let characterTemplateData = require("./../../data/characterTemplates");
let ClientPacket = require("./ClientPacket");
let idFactory = require("./../../util/IdFactory");
let items = require("./../../gameserver/Items");

class CharacterCreate {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readS()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD()
			.readD();

		this._init();
	}

	getName() {
		return this._data.getData()[1];
	}

	getRace() {
		return this._data.getData()[2];
	}

	getGender() {
		return this._data.getData()[3];
	}

	getClassId() {
		return this._data.getData()[4];
	}

	getHairStyle() {
		return this._data.getData()[11];
	}

	getHairColor() {
		return this._data.getData()[12];
	}

	getFace() {
		return this._data.getData()[13];
	}

	_init() {
		let name = this.getName();
		let characterTemplateTable = this._serialization(characterTemplateData);
		let characterQuantity = this._player.getCharacterQuantity();
		let MAXIMUM_QUANTITY_CHARACTERS = 7;

		if(characterQuantity === MAXIMUM_QUANTITY_CHARACTERS) {
			this._player.sendPacket(new serverPackets.CharacterCreateFail(config.base.errors.gameserver.REASON_TOO_MANY_CHARACTERS));
			
			return false;
		}

		if(name.length <= 16 && this._isAlphaNumeric(name)) {
			if(this._checkNameIsExist(name)) {
				let character = new templates.Character(characterTemplateTable[this.getClassId()]);
				let charactersData;
				let charactersList = [];

				character.login = this._player.login;
				character.objectId = idFactory.getNextId();
				character.name = this.getName();
				character.maximumHp = character.hp;
				character.maximumMp = character.mp;
				character.gender = this.getGender();
				character.hairStyle = this.getHairStyle();
				character.hairColor = this.getHairColor();
				character.face = this.getFace();
				character.items = this._createItems(character.items);

				this._player.addCharacter(character.getData());
				charactersData = this._player.getCharacters();
				
				for(let i = 0; i < charactersData.length; i++) {
					charactersList.push(new templates.Character(charactersData[i]));
				}

				this._player.sendPacket(new serverPackets.CharacterCreateSuccess());
				this._player.sendPacket(new serverPackets.CharacterSelectInfo(charactersList, this._player));
			} else {
				this._player.sendPacket(new serverPackets.CharacterCreateFail(config.base.errors.gameserver.REASON_NAME_ALREADY_EXISTS));
							}
		} else {
			this._player.sendPacket(new serverPackets.CharacterCreateFail(config.base.errors.gameserver.REASON_16_ENG_CHARS));
		}
	}

	_createItems(itemsId) {
		let data = [];

		for(let i = 0; i < itemsId.length; i++) {
			data.push(items.create(itemsId[i]));
		}

		return data;
	}

	_checkNameIsExist(name) {
		let names = this._player.getCharacterNames();

		for(let i = 0; i < names.length; i++) {
			if(names[i].toLowerCase() === name.toLowerCase()) {
				return false;
			}
		}

		return true;
	}

	_isAlphaNumeric(string) {
		let charCode;
							
		for(let i = 0; i < string.length; i++) {
	  		charCode = string[i].charCodeAt();
					  	
		  	if (!(charCode > 47 && charCode < 58) && // numeric (0-9)
		        !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
		        !(charCode > 96 && charCode < 123)) { // lower alpha (a-z)
		    	return false;
		    }
		}
						  
		return true;
	}

	_serialization(data) {
		let result = {};

		for(let i = 0; i < data.length; i++) {
			result[data[i].classId] = data[i];
		}

		return result;
	}
}


module.exports = CharacterCreate;