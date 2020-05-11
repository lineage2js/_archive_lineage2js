let net = require("net");
let file = require("fs");
let log = require("./../util/log");
let config = require("./../config/config");
let Bots = require("./../gameserver/Bots");
let Player = require("./../gameserver/Player");
let Players = require("./../gameserver/Players");
let Packet = require("./../gameserver/Packet");
let npcList = require("./../gameserver/NpcList");
let Objects = require("./../gameserver/Objects");
let serverPacket = require("./serverPackets/serverPackets");
// db
let low = require("lowdb");
let FileSync = require("lowdb/adapters/FileSync");
let database = new FileSync("data/database.json");
let db = low(database);

class Server {
	constructor() {
		this.bots = new Bots(this);
		this.objects = new Objects();
		this.players = new Players(this);
		this.db = db;
		this.players.addBots(this.bots.create(10));
		this.objects.add(npcList.get());
		this.objects.add(this.bots.get());
		
		// test
		setInterval(() => {
			let npcList = this.objects.getNpc();

			for(let i = 0; i < npcList.length; i++) {
				let npc = npcList[i];
				let [x, y] = npc.getRandomPos();
				let origin = {
					x: npc.x,
					y: npc.y,
					z: npc.z
				}		
				let position = {
					target: {
						x: npc.x = x,
						y: npc.y = y,
						z: npc.z
					},
					origin: {
						x: origin.x,
						y: origin.y,
						z: origin.z
					}
				}

				npc.getVisibleObjects(this.players.getPlayers(), player => {
					player.sendPacket(new serverPacket.MoveToLocation(position, npc));
				})
			}
		}, 10000)
		//
	}

	start() {
		net.createServer(this._socketHandler.bind(this)).listen(config.gameserver.port, config.gameserver.host, () => {
			log(`Game server listening on ${config.gameserver.host}:${config.gameserver.port}`)
		});
	}

	_socketHandler(socket) {
		let player = new Player(socket, this);
		let packet = new Packet(player, this.players, this);

		socket.on("data", packet.handler.bind(packet));
		socket.on("close", packet.close.bind(packet));
		socket.on("error", packet.error.bind(packet));
		socket.setEncoding("binary");
		this.players.addPlayer(player);
		log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
	}
}

module.exports = Server;