var net = require("net");
var log = require("./util/log.js");
var SendPacket = require("./util/SendPacket.js");
var config = require("./config/config.js");
var serverPackets = require("./gameserver/serverpackets/serverPackets.js");
var clientPackets = require("./gameserver/clientpackets/clientPackets.js");

function socketHandler(socket) {
	var sendPacket = new SendPacket(null /* remove */, socket);
	// confog.base.key.XOR

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		var packetType = packet[0];
		log(packet)
		log(packetType)

		packetHandler(packetType, packet);

		function packetHandler(type, packet) {
			switch(type) {
				case 0x00:
					var protocolVersion = new clientPackets.ProtocolVersion(packet);
					
					if(protocolVersion.getVersion() === config.base.PROTOCOL_VERSION.CLIENT) {
						sendPacket.send(new serverPackets.CryptInit(), false /* remove */);	
					}
					break;
				case 0x08: // RequestAuthLogin Login, SK2_2 SK2_1 SK1_1 SK1_2
					var requestAuthLogin = new clientPackets.RequestAuthLogin(packet);

					if(true) {
						sendPacket.send(new serverPackets.CharSelectInfo(), false /* remove */);
					}
					break;
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