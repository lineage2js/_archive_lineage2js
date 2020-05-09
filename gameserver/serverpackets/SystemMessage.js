let ServerPacket = require("./ServerPacket");
let types = {
	TEXT: 0,
	NUMBER: 1,
	NPC_NAME: 2,
	ITEM_NAME: 3,
	SKILL_NAME: 4
}

function SystemMessage(messageId, messages) {
	this._packet = new ServerPacket(9 + (8 * messages.length));
	this._packet.writeC(0x7a)
		.writeD(messageId)
		.writeD(messages.length)

	for(let i = 0; i < messages.length; i++) {
		let type = messages[i].type;

		this._packet.writeD(type);

		switch(type) {
			case types.TEXT:
				this._packet.writeS(messages[i].value);

				break;
			case types.NUMBER:
			case types.NPC_NAME:
			case types.ITEM_NAME:
				this._packet.writeD(messages[i].value);

				break;
			case types.SKILL_NAME:
				this._packet.writeD(messages[i].value)
					.writeD(0x01); //

				break;
		}
	}
		
	return this._packet.getBuffer();
}

module.exports = SystemMessage;