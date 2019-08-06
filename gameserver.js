var net = require("net");
var XOR = require("./util/XOR.js");
var log = require("./util/log.js");
var SendPacket = require("./util/SendPacket.js");
var config = require("./config/config.js");
var errorCodes = require("./config/errorCOdes.js");
var serverPackets = require("./gameserver/serverpackets/serverPackets.js");
var clientPackets = require("./gameserver/clientpackets/clientPackets.js");

function socketHandler(socket) {
	var encryption = false;
	var xor = new XOR(config.base.key.XOR);
	var sendPacket = new SendPacket(xor, socket);
	var sessionKey1Server = [0x55555555, 0x44444444];
	var sessionKey2Server = [0x55555555, 0x44444444];

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		var decryptedPacket = new Buffer.from(encryption ? xor.decrypt(packet) : packet);
		var packetType = packet[0];
		// for test
		log(packet);
		log(packetType);
		//

		packetHandler(packetType, decryptedPacket);

		function packetHandler(type, packet) {
			switch(type) {
				case 0x00:
					var protocolVersion = new clientPackets.ProtocolVersion(packet);
					
					if(protocolVersion.getVersion() === config.base.PROTOCOL_VERSION.CLIENT) {
						sendPacket.send(new serverPackets.CryptInit(config.base.key.XOR), false);
						encryption = true; // The first packet is not encrypted
					}
					break;
				case 0x08:
					var requestAuthLogin = new clientPackets.RequestAuthLogin(packet);
					var sessionKey1Client = requestAuthLogin.getSessionKey1();
					var sessionKey2Client = requestAuthLogin.getSessionKey2();

					if(keyComparison(sessionKey1Server, sessionKey1Client) && keyComparison(sessionKey2Server, sessionKey2Client)) {
						sendPacket.send(new serverPackets.CharSelectInfo());
					} else {
						sendPacket.send(new serverPackets.AuthLoginFail(errorCodes.gameserver.AuthLoginFail.REASON_SYSTEM_ERROR));
					}
					break;
				case 0x0e:
					var newCharacter = new clientPackets.NewCharacter(packet);
					if(newCharacter.getStatus()) {
						sendPacket.send(new serverPackets.CharTemplates());
					}
					break;
				case 0x09:
					var logout = new clientPackets.Logout(packet);

					if(logout.getStatus()) {
						xor = new XOR(config.base.key.XOR);
						encryption = false;
					}
					break;
			}
		}

		function keyComparison(keyServer, keyClient) {
			if(keyServer[0] === parseInt(keyClient[0], 16) && keyServer[1] === parseInt(keyClient[1], 16)) {
				return true;
			} else {
				return false;
			}
		}
	})

	socket.on("close", data => {
		log(`Connection to the game server is closed for: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
		socket.setEncoding("binary");
		userHasJoined();
	}

	Init();
}

function Init() {
	net.createServer(socketHandler).listen(config.gameserver.port, config.gameserver.host, () => {
		log(`Game server listening on ${config.gameserver.host}:${config.gameserver.port}`)
	});
}

Init();