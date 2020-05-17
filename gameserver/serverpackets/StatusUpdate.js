let ServerPacket = require("./ServerPacket");
let STATUS = {
	LEVEL: 0x01,
	EXP: 0x02,
	STR: 0x03,
	DEX: 0x04,
	CON: 0x05,
	INT: 0x06,
	WIT: 0x07,
	MEN: 0x08,
	
	CUR_HP: 0x09,
	MAX_HP: 0x0a,
	CUR_MP: 0x0b,
	MAX_MP: 0x0c,

	SP: 0x0d,
	CUR_LOAD: 0x0e,
	MAX_LOAD: 0x0f,

	P_ATK: 0x11,
	ATK_SPD: 0x12,
	P_DEF: 0x13,
	EVASION: 0x14,
	ACCURACY: 0x15,
	CRITICAL: 0x16,
	M_ATK: 0x17,
	CAST_SPD: 0x18,
	M_DEF: 0x19,
	PVP_FLAG: 0x1a,
	KARMA: 0x1b,
}

function StatusUpdate(objectId, hp, maximumHp) { // fix
	this._packet = new ServerPacket(17);
	this._packet.writeC(0x1a)
		.writeD(objectId)
		.writeD(2) // attributes count
		.writeD(0x09) // hp ID
		.writeD(hp) // hp value
		.writeD(0x0a) // max hp id
		.writeD(maximumHp) // max hp value

	return this._packet.getBuffer();
}

module.exports = StatusUpdate;