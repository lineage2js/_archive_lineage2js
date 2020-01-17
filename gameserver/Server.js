var net = require("net");
var file = require("fs");
var XOR = require("./../util/XOR");
var log = require("./../util/log");
var config = require("./../config/config");
var Bot = require("./../gameserver/Bot");
var Player = require("./../gameserver/Player");
var Players = require("./../gameserver/Players");
var Packet = require("./../gameserver/Packet");
var templates = require("./../gameserver/templates/templates");
var Item = require("./../gameserver/Item");
var IdFactory = require("./../util/IdFactory");
var Announcements = require("./../gameserver/Announcements");

class Server {
	constructor() {
		this.idFactory = new IdFactory("data/idstate.json");
		this.announcements =  new Announcements("data/announcements.json");
		this.items = new templates.Items([{ link: "data/items/armor.json", category: "armor" }, { link: "data/items/weapon.json", category: "weapon" }, { link: "data/items/etc.json", category: "etc" }]);
		this.item = new Item(this.items.getData(), this.idFactory);
		this.bot = new Bot(this.idFactory);
		this.players = new Players();
		this.players.addBots(this.bot.create(10))
	}

	start() {
		net.createServer(this._socketHandler.bind(this)).listen(config.gameserver.port, config.gameserver.host, () => {
			log(`Game server listening on ${config.gameserver.host}:${config.gameserver.port}`)
		});
	}

	_socketHandler(socket) {
		var xor = new XOR(config.base.key.XOR);
		var player = new Player(socket, xor);
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