let net = require("net");
let log = require("./../util/log");
let config = require("./../config/config");

// db
let low = require("lowdb");
let FileSync = require("lowdb/adapters/FileSync");
let database = new FileSync("data/database.json");
let db = low(database);

class Server {
	constructor() {
		this.db = db;
	}

	start() {
		net.createServer(this._onSocket).listen(config.gameserver.port, config.gameserver.host, () => {
			log(`Game server listening on ${config.gameserver.host}:${config.gameserver.port}`)
		});
	}

	_onSocket(socket) {
		let Player = require("./../gameserver/Player");
		let Packet = require("./../gameserver/Packet");
		let world = require("./../gameserver/World");
		let player = new Player(socket);
		let packet = new Packet(player);

		socket.on("data", packet.onData.bind(packet));
		socket.on("close", packet.onClose.bind(packet));
		socket.on("error", packet.onError.bind(packet));
		socket.setEncoding("binary");
		world.addPlayer(player);
		log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
	}
}

module.exports = new Server();