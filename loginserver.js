var net = require("net");
var Blowfish = require("./util/blowfish.js");
var log = require("./util/log.js");
var config = require("./config/config.js");
var serverPackets = require("./loginserver/serverpackets/serverPackets.js");
var clientPackets = require("./loginserver/clientpackets/clientPackets.js");
var blowfish = new Blowfish(config.base.blowfish.key);

function handlerSocket(socket) {
	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2);
		var decryptedPacket = new Buffer.from(blowfish.decrypt(packet));
		var packetType = decryptedPacket[0];

		loadPacketByType(packetType, decryptedPacket);

		function loadPacketByType(type, packet) {
			switch(type) {
				case 0x00:
					var requestAuthLogin = new clientPackets.RequestAuthLogin(packet);
					log(`user ${requestAuthLogin.getUserName()} requesting auth login`);
					break;
			}
		}
		//
		// for test
		// var loginOk = [0x03, 0x55, 0x55, 0x55, 0x55, 0x44, 0x44, 0x44, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
		// socket.write(new Buffer.from([0x32, 0x00].concat(blowfish.encrypt(loginOk))));
	})

	socket.on("close", data => {
		log(`Connection to login server has closed: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		log(`Connected to login server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
		socket.setEncoding("binary");
		socket.write(serverPackets.InitLS());
		userHasJoined();
	}

	Init();
}

function Init() {
	net.createServer(handlerSocket).listen(config.loginserver.port, config.loginserver.host, () => {
		log(`Login server listening on ${config.loginserver.host}:${config.loginserver.port}`)
	});
}

Init();