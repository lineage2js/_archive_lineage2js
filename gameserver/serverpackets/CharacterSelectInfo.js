var ServerPacket = require("./ServerPacket.js");

function CharacterSelectInfo(characters, login) {
	this._packet = new ServerPacket(characters ? characters.length*400 : 10);
	this._packet.writeC(0x1f);

	if(characters) {
		this._packet.writeD(characters.length)
		for(var i = 0; i < characters.length; i++) {
			this._packet.writeS(characters[i].getCharacterName())
				.writeD(characters[i].getObjectId())
				.writeS(login)
				.writeD(0x55555555)	// getSessionId
				.writeD(characters[i].getClanId())

				.writeD(0x00)

				.writeD(characters[i].getGender())
				.writeD(characters[i].getRaceId())
				.writeD(characters[i].getClassId())
				
				.writeD(0x01)

				.writeD(characters[i].getX())	// no effect ?
				.writeD(characters[i].getY())	// no effect ?
				.writeD(characters[i].getZ())	// no effect ?

				.writeF(characters[i].getHp())
				.writeF(characters[i].getMp())

				.writeD(characters[i].getSp())
				.writeD(characters[i].getExp())
				.writeD(characters[i].getLevel())
				.writeD(characters[i].getKarma())
				 
				.writeD(0x00) 
				.writeD(0x00) 
				.writeD(0x00) 
				.writeD(0x00) 
				.writeD(0x00) 
				.writeD(0x00) 
				.writeD(0x00) 
				.writeD(0x00) 
				.writeD(0x00) 
				
				.writeD(0x00) 
				.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_REAR)); 
				.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LEAR)); 
				.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_NECK)); 
				.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_RFINGER));
				.writeD(0x00) // writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LFINGER));

				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_HEAD));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_RHAND));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LHAND));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_GLOVES));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_CHEST));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LEGS));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_FEET));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_BACK));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollObjectId(Inventory.PAPERDOLL_LRHAND));

				.writeD(0x00)
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_REAR));  
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LEAR)); 
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_NECK)); 
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_RFINGER));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LFINGER));

				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_HEAD));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_RHAND));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LHAND));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_GLOVES));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_CHEST));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LEGS));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_FEET));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_BACK));
				.writeD(0x00) //writeD(charInfoPackage.getInventory().getPaperdollItemId(Inventory.PAPERDOLL_LRHAND));

				.writeD(characters[i].getHairStyle())
				.writeD(characters[i].getHairColor())
				.writeD(characters[i].getFace())
				
				.writeF(characters[i].getMaximumHp())
				.writeF(characters[i].getMaximumMp())
				
				.writeD(0x00) //writeD(charInfoPackage.getDeleteTimer());  // days left before delete .. if != 0 then char is inactive
		}
	} else {
		this._packet.writeD(0x00);
	}
		
	return this._packet.getBuffer();
}

module.exports = CharacterSelectInfo;