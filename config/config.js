let base = {
	key: {
		blowfish: [0x5b,0x3b,0x27,0x2e,0x5d,0x39,0x34,0x2d,0x33,0x31,0x3d,0x3d,0x2d,0x25,0x26,0x40,0x21,0x5e,0x2b,0x5d], // [;'.]94-31==-%&@!^+]\000
		//XOR: [0x94, 0x35, 0x00, 0x00, 0xa1, 0x6c, 0x54, 0x87]
		XOR: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
	},
	PROTOCOL_VERSION: {
		CLIENT: 419,
		SERVER: 30810 // 0x785a
	},
	MESSAGE_TYPE: {
		ALL: 0,
		SHOUT: 1,
		TELL: 2,
		PARTY: 3,
		CLAN: 4,
		PRIVATE_CHAT_PLAYER: 6, // used for petition
		PRIVATE_CHAT_GM: 7, // used for petition
		TRADE: 8,
		GM_MESSAGE: 9,
		ANNOUNCEMENT: 10
	},
	errors: {
		loginserver: {
			REASON_SYSTEM_ERROR: 0x01,
			REASON_PASS_WRONG: 0x02,
			REASON_USER_OR_PASS_WRONG: 0x03,
			REASON_ACCESS_FAILED: 0x04,
			REASON_ACCOUNT_IN_USE: 0x07,
			REASON_ACCOUNT_BANNED: 0x09,
			REASON_TOO_MANY_PLAYERS: 0x0f
		},
		gameserver: {
			REASON_SYSTEM_ERROR: 0x01,
			REASON_PASS_WRONG: 0x02,
			REASON_ACCESS_FAILED: 0x04,
			REASON_ACCOUNT_IN_USE: 0x07,
			REASON_CREATION_FAILED: 0x00,
			REASON_TOO_MANY_CHARACTERS: 0x01,
			REASON_NAME_ALREADY_EXISTS: 0x02,
			REASON_16_ENG_CHARS: 0x03
		}
	},
	systemMessageType: {
		TEXT: 0,
		NUMBER: 1,
		NPC_NAME: 2,
		ITEM_NAME: 3,
		SKILL_NAME: 4
	}
};

let loginserver = {
	host: "127.0.0.1",
	port: 2106
};

let gameserver = {
	host: "127.0.0.1",
	port: 7777,
	maxPlayer: 100
};

module.exports = {
	base: base,
	loginserver: loginserver,
	gameserver: gameserver
}