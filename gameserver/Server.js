let net = require("net");
let file = require("fs");
let XOR = require("./../util/XOR");
let log = require("./../util/log");
let config = require("./../config/config");
let Bots = require("./../gameserver/Bots");
let Player = require("./../gameserver/Player");
let Players = require("./../gameserver/Players");
let Packet = require("./../gameserver/Packet");
let templates = require("./../gameserver/templates/templates");
let Item = require("./../gameserver/Item");
//let idFactory = require("./../util/IdFactory");
let Announcements = require("./../gameserver/Announcements");
let HTML = require("./../gameserver/HTML");
let NpcTable = require("./../gameserver/NpcTable");
let Objects = require("./../gameserver/Objects");
let Timer = require("./../gameserver/Timer");
let serverPacket = require("./serverPackets/serverPackets");
// db
let low = require("lowdb");
let FileSync = require("lowdb/adapters/FileSync");
let database = new FileSync("data/database.json");
let db = low(database);

class Server {
	constructor() {
		this.html = new HTML("data/html");
		this.npcTable = new NpcTable("data/npc.json", this); // NpcTable ???
		this.announcements =  new Announcements("data/announcements.json");
		this.items = new templates.Items([{ link: "data/items/armor.json", category: "armor" }, { link: "data/items/weapon.json", category: "weapon" }, { link: "data/items/etc.json", category: "etc" }]);
		this.item = new Item(this.items.getData());
		this.bots = new Bots(this);
		this.objects = new Objects();
		this.timer = new Timer();
		this.players = new Players(this);
		this.db = db;
		this.players.addBots(this.bots.create(10));
		this.objects.add(this.npcTable.spawn());
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
		let xor = new XOR(config.base.key.XOR);
		let player = new Player(socket, xor, this);
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