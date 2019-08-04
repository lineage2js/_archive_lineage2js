var net = require("net");
var Blowfish = require("./util/blowfish.js");
var log = require("./util/log.js");
var SendPacket = require("./util/SendPacket.js");
var config = require("./config/config.js");
var blowfish = new Blowfish(config.base.blowfish.key);

function handlerSocket(socket) {
	var sendPacket = new SendPacket(blowfish, socket);

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		var decryptedPacket = new Buffer.from(blowfish.decrypt(packet));
		var packetType = decryptedPacket[0];

		loadPacketByType(packetType, decryptedPacket);
		log("kek")
		function loadPacketByType(type, packet) {
			switch(type) {
				
			}
		}
	})

	socket.on("close", data => {
		log(`Connection to game server has closed: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		log(`Connected to game server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
		socket.setEncoding("binary");
		userHasJoined();
	}

	Init();
}

function Init() {
	net.createServer(handlerSocket).listen(config.gameserver.port, config.gameserver.host, () => {
		log(`Game server listening on ${config.gameserver.host}:${config.gameserver.port}`)
	});
}

Init();