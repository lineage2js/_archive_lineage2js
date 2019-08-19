var net = require("net");
var Blowfish = require("./util/blowfish.js");
var log = require("./util/log.js");
var config = require("./config/config.js");
var SendPacket = require("./loginserver/SendPacket.js");
var serverPackets = require("./loginserver/serverpackets/serverPackets.js");
var clientPackets = require("./loginserver/clientpackets/clientPackets.js");
// DB
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);

function socketHandler(socket) {
	var blowfish = new Blowfish(config.base.key.blowfish);
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
					var accountStatus;

					log(`user ${requestAuthLogin.getLogin()} requesting auth login`);
					
					accountStatus = checkAccount(requestAuthLogin.getLogin(), requestAuthLogin.getPassword());

					if(accountStatus === "success") {
						sendPacket.send(new serverPackets.LoginOk(sessionKey1Server));
					} else {
						sendPacket.send(new serverPackets.LoginFail(accountStatus));
					}

					function checkAccount(login, password) {
						var account = {
							login: function() {
								return db.get("accounts").find({"login": login}).value();
							}
						}
						if(account.login()) {
							if(!(account.login().password === password)) {
								return config.base.errors.loginserver.REASON_PASS_WRONG;	
							}
							if(account.login().accessLevel < 0) {
								return config.base.errors.loginserver.REASON_ACCOUNT_BANNED;
							}

							return "success";
						} else {
							return config.base.errors.loginserver.REASON_USER_OR_PASS_WRONG;
						}
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
							sendPacket.send(new serverPackets.PlayFail(config.base.errors.loginserver.REASON_SYSTEM_ERROR))
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
	})

	socket.on("close", () => {
		log(`Connection to the login server is closed for: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	socket.on("error", () => {
		log(`Client connection lost for: ${socket.remoteAddress}:${socket.remotePort}`);
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