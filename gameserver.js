var net = require("net");
var log = require("./util/log.js");
var SendPacket = require("./util/SendPacket.js");
var config = require("./config/config.js");
var serverPackets = require("./gameserver/serverpackets/serverPackets.js");
var clientPackets = require("./gameserver/clientpackets/clientPackets.js");

function handlerSocket(socket) {
	//var sendPacket = new SendPacket(blowfish, socket);

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		var packetType = packet[0];

		loadPacketByType(packetType, packet);

		function loadPacketByType(type, packet) {
			switch(type) {
				case 0x00:
					var protocolVersion = new clientPackets.ProtocolVersion(packet);
					
					if(protocolVersion.getVersion() === 419) {
						log("It's work");
					}
					break;
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