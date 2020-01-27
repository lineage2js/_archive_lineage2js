var config = require("./../../config/config");
var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var templates = require("./../../gameserver/templates/templates");
var characterTemplateData = require("./../../data/characterTemplates");
var ClientPacket = require("./ClientPacket");

class CharacterCreate {
	constructor(packet, player, server) {
		this._packet = packet;
		this._player = player;
		this._server = server;
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

	getCharacterName() {
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
		var characterName = this.getCharacterName();
		var characterTemplateTable = this._serialization(characterTemplateData);
		var characterQuantity = this._player.getCharacterQuantity();
		var MAXIMUM_QUANTITY_CHARACTERS = 7;

		if(characterQuantity === MAXIMUM_QUANTITY_CHARACTERS) {
			this._player.sendPacket(new serverPackets.CharacterCreateFail(config.base.errors.gameserver.REASON_TOO_MANY_CHARACTERS));
			
			return false;
		}

		if(characterName.length <= 16 && this._isAlphaNumeric(characterName)) {
			if(this._characterNameisExist(characterName)) {
				var character = new templates.Character(characterTemplateTable[this.getClassId()]);
				var charactersData;
				var charactersList = [];

				character.login = this._player.login;
				character.objectId = this._server.idFactory.getNextId();
				character.characterName = this.getCharacterName();
				character.maximumHp = character.hp;
				character.maximumMp = character.mp;
				character.gender = this.getGender();
				character.hairStyle = this.getHairStyle();
				character.hairColor = this.getHairColor();
				character.face = this.getFace();
				character.items = this._createItems(character.items);

				this._player.addCharacter(character.getData());
				charactersData = this._player.getCharacters();
				
				for(var i = 0; i < charactersData.length; i++) {
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
		var items = [];

		for(var i = 0; i < itemsId.length; i++) {
			items.push(this._server.item.create(itemsId[i]));
		}

		return items;
	}

	_characterNameisExist(characterName) {
		var names = this._player.getCharacterNames();

		for(var i = 0; i < names.length; i++) {
			if(names[i].toLowerCase() === characterName.toLowerCase()) {
				return false;
			}
		}

		return true;
	}

	_isAlphaNumeric(string) {
		var charCode;
							
		for(var i = 0; i < string.length; i++) {
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
		var result = {};

		for(var i = 0; i < data.length; i++) {
			result[data[i].classId] = data[i];
		}

		return result;
	}
}


module.exports = CharacterCreate;