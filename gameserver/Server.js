var net = require("net");
var file = require("fs");
var XOR = require("./../util/XOR");
var log = require("./../util/log");
var config = require("./../config/config");
var Bots = require("./../gameserver/Bots");
var Player = require("./../gameserver/Player");
var Players = require("./../gameserver/Players");
var Packet = require("./../gameserver/Packet");
var templates = require("./../gameserver/templates/templates");
var Item = require("./../gameserver/Item");
var IdFactory = require("./../util/IdFactory");
var Announcements = require("./../gameserver/Announcements");
var HTML = require("./../gameserver/HTML");
var NpcTable = require("./../gameserver/NpcTable");
var Objects = require("./../gameserver/Objects");
var Timer = require("./../gameserver/Timer");
var serverPacket = require("./serverPackets/serverPackets");
// db
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);

class Server {
	constructor() {
		this.idFactory = new IdFactory("data/idstate.json");
		this.html = new HTML("data/html");
		this.npcTable = new NpcTable("data/npc.json", this); // NpcTable ???
		this.announcements =  new Announcements("data/announcements.json");
		this.items = new templates.Items([{ link: "data/items/armor.json", category: "armor" }, { link: "data/items/weapon.json", category: "weapon" }, { link: "data/items/etc.json", category: "etc" }]);
		this.item = new Item(this.items.getData(), this.idFactory);
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
			var npcList = this.objects.getNpc();

			for(var i = 0; i < npcList.length; i++) {
				var npc = npcList[i];
				var [x, y] = npc.getRandomPos();
				var origin = {
					x: npc.x,
					y: npc.y,
					z: npc.z
				}		
				var position = {
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
		var xor = new XOR(config.base.key.XOR);
		var player = new Player(socket, xor, this);
		var packet = new Packet(player, this.players, this);

		socket.on("data", packet.handler.bind(packet));
		socket.on("close", packet.close.bind(packet));
		socket.on("error", packet.error.bind(packet));
		socket.setEncoding("binary");
		this.players.addPlayer(player);
		log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
	}
}

module.exports = Server;