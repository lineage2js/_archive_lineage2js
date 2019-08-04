var net = require("net");
var Blowfish = require("./util/blowfish.js");
var log = require("./util/log.js");
var SendPacket = require("./util/SendPacket.js");
var config = require("./config/config.js");
var serverPackets = require("./loginserver/serverpackets/serverPackets.js");
var clientPackets = require("./loginserver/clientpackets/clientPackets.js");
var blowfish = new Blowfish(config.base.blowfish.key);

function handlerSocket(socket) {
	var sendPacket = new SendPacket(blowfish, socket);
	var sessionKey1Server = [0x55555555, 0x44444444];

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		var decryptedPacket = new Buffer.from(blowfish.decrypt(packet));
		var packetType = decryptedPacket[0];

		loadPacketByType(packetType, decryptedPacket);

		function loadPacketByType(type, packet) {
			switch(type) {
				case 0x00: // RequestAuthLogin
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
				case 0x02: // RequestServerLogin
					log("RequestServerLogin");
					break;
				case 0x05: // RequestServerList
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
			// 0x01 - системная ошибка
			// return 0x01;

			// 0x02 - неправельный пароль
			// return 0x02;
			
			// 0x03 - логин или пароль неверен
			// return 0x03;
			
			// 0x04 - доступ запрещен
			// return 0x04;

			// 0x07 - аккаунт уже используется
			// return 0x07;
			
			// 0x09 - аккаунт забанен
			// return 0x09;
			
			return "success";
		}
	})

	socket.on("close", data => {
		log(`Connection to login server has closed: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		log(`Connected to login server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
		socket.setEncoding("binary");
		sendPacket.send(new serverPackets.InitLS(), false);
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