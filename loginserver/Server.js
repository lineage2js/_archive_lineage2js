let net = require("net");
let log = require("./../util/log");
let Blowfish = require("./../util/blowfish");
let config = require("./../config/config");
let serverPackets = require("./serverpackets/serverPackets");
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
		net.createServer(this._onSocket).listen(config.loginserver.port, config.loginserver.host, () => {
			log(`Login server listening on ${config.loginserver.host}:${config.loginserver.port}`)
		});
	}

	_onSocket(socket) {
		let Player = require("./Player");
		let Packet = require("./Packet");
		let blowfish = new Blowfish(config.base.key.blowfish);
		let player = new Player(socket, blowfish);
		let packet = new Packet(player);

		socket.on("data", packet.handler.bind(packet));
		socket.on("close", packet.close.bind(packet));
		socket.on("error", packet.error.bind(packet));
		socket.setEncoding("binary");
		player.sendPacket(new serverPackets.InitLS(), false); // false - first packet is not encrypted
		log(`Connected to the login server: ${socket.remoteAddress}:${socket.remotePort}`);
	}
}

module.exports = new Server();