var net = require("net");
var log = require("./../util/log");
var Blowfish = require("./../util/blowfish");
var config = require("./../config/config");
var Player = require("./Player");
var Packet = require("./Packet");
var serverPackets = require("./serverpackets/serverPackets");
// db
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);

class Server {
	constructor() {
		this.db = db;
	}

	start() {
		net.createServer(this._socketHandler.bind(this)).listen(config.loginserver.port, config.loginserver.host, () => {
			log(`Login server listening on ${config.loginserver.host}:${config.loginserver.port}`)
		});
	}

	_socketHandler(socket) {
		var blowfish = new Blowfish(config.base.key.blowfish);
		var player = new Player(socket, blowfish, this);
		var packet = new Packet(player);

		socket.on("data", packet.handler.bind(packet));
		socket.on("close", packet.close.bind(packet));
		socket.on("error", packet.error.bind(packet));
		socket.setEncoding("binary");
		player.sendPacket(new serverPackets.InitLS(), false); // false - first packet is not encrypted
		log(`Connected to the login server: ${socket.remoteAddress}:${socket.remotePort}`);
	}
}

module.exports = Server;