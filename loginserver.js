var net = require("net");
var Blowfish = require("./util/blowfish.js");
var log = require("./util/log.js");
var SendPacket = require("./util/SendPacket.js");
var config = require("./config/config.js");
var errorCodes = require("./config/errorCOdes.js");
var serverPackets = require("./loginserver/serverpackets/serverPackets.js");
var clientPackets = require("./loginserver/clientpackets/clientPackets.js");
var blowfish = new Blowfish(config.base.key.blowfish);

function socketHandler(socket) {
	var sendPacket = new SendPacket(blowfish, socket);
	var sessionKey1Server = [0x55555555, 0x44444444];
	var sessionKey2Server = [0x55555555, 0x44444444];

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		var decryptedPacket = new Buffer.from(blowfish.decrypt(packet));
		var packetType = decryptedPacket[0];

		packetHandler(packetType, decryptedPacket);

		function packetHandler(type, packet) {
			switch(type) {
				case 0x00:
					var requestAuthLogin = new clientPackets.RequestAuthLogin(packet);
					var userStatus;

					log(`user ${requestAuthLogin.getUserName()} requesting auth login`);
					
					userStatus = checkUser(requestAuthLogin.getUserName(), requestAuthLogin.getPassword());

					if(userStatus === "success") {
						sendPacket.send(new serverPackets.LoginOk(sessionKey1Server));
					} else {
						sendPacket.send(new serverPackets.LoginFail(userStatus));
					}
					
					break;
				case 0x02:
					var requestServerLogin = new clientPackets.RequestServerLogin(packet);
					var sessionKey1Client = requestServerLogin.getSessionKey1();
					var serverNumber = requestServerLogin.getServerNumber();

					if(keyComparison(sessionKey1Server, sessionKey1Client)) {
						// Проверка на доступность сервера
						if(true) {
							sendPacket.send(new serverPackets.PlayOk(sessionKey2Server));
						} else {
							sendPacket.send(new serverPackets.PlayFail(errorCodes.loginserver.PlayFail.REASON_SYSTEM_ERROR))
						}
					}
					break;
				case 0x05:
					var requestServerList = new clientPackets.RequestServerList(packet);
					var sessionKey1Client = requestServerList.getSessionKey1();

					if(keyComparison(sessionKey1Server, sessionKey1Client)) {
						sendPacket.send(new serverPackets.ServerList(config.gameserver.host, config.gameserver.port, config.gameserver.maxPlayer));
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

		function checkUser(userName, password) {
			// example: return errorCodes.loginserver.LoginFail.REASON_SYSTEM_ERROR
			return "success";
		}
	})

	socket.on("close", data => {
		log(`Connection to the login server is closed for: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		log(`Connected to the login server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
		socket.setEncoding("binary");
		sendPacket.send(new serverPackets.InitLS(), false);
		userHasJoined();
	}

	Init();
}

function Init() {
	net.createServer(socketHandler).listen(config.loginserver.port, config.loginserver.host, () => {
		log(`Login server listening on ${config.loginserver.host}:${config.loginserver.port}`)
	});
}

Init();