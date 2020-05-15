let ServerPacket = require("./ServerPacket");

function CharacterSelectInfo(characters, player) {
	this._packet = new ServerPacket(characters ? characters.length * 400 : 10); //
	this._packet.writeC(0x1f);

	if(characters) {
		this._packet.writeD(characters.length)
		for(let i = 0; i < characters.length; i++) {
			this._packet.writeS(characters[i].name)
				.writeD(characters[i].objectId)
				.writeS(player.login)
				.writeD(0x55555555)	// getSessionId
				.writeD(characters[i].clanId)

				.writeD(0x00)

				.writeD(characters[i].gender)
				.writeD(characters[i].raceId)
				.writeD(characters[i].classId)
				
				.writeD(0x01)

				.writeD(characters[i].x)	// no effect ?
				.writeD(characters[i].y)	// no effect ?
				.writeD(characters[i].z)	// no effect ?

				.writeF(characters[i].hp)
				.writeF(characters[i].mp)

				.writeD(characters[i].sp)
				.writeD(characters[i].exp)
				.writeD(characters[i].level)
				.writeD(characters[i].karma)
				 
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

				.writeD(characters[i].hairStyle)
				.writeD(characters[i].hairColor)
				.writeD(characters[i].face)
				
				.writeF(characters[i].maximumHp)
				.writeF(characters[i].maximumMp)
				
				.writeD(0x00) //writeD(charInfoPackage.getDeleteTimer());  // days left before delete .. if != 0 then char is inactive
		}
	} else {
		this._packet.writeD(0x00);
	}
		
	return this._packet.getBuffer();
}

module.exports = CharacterSelectInfo;