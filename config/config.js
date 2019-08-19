var base = {
	key: {
		blowfish: [0x5b,0x3b,0x27,0x2e,0x5d,0x39,0x34,0x2d,0x33,0x31,0x3d,0x3d,0x2d,0x25,0x26,0x40,0x21,0x5e,0x2b,0x5d], // [;'.]94-31==-%&@!^+]\000
		XOR: [0x94, 0x35, 0x00, 0x00, 0xa1, 0x6c, 0x54, 0x87]
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
	}
};

var loginserver = {
	host: "192.168.1.24",
	port: 2106
};

var gameserver = {
	host: "192.168.1.24",
	port: 7777,
	maxPlayer: 100
};

module.exports = {
	base: base,
	loginserver: loginserver,
	gameserver: gameserver
}