var net = require("net");
var log = require(".././util/log.js");
var config = require(".././config/config.js");
var Player = require("./Player.js");
var Packet = require("./Packet.js");
var serverPackets = require("./serverpackets/serverPackets.js");

function Server() {
	this._packet = null;
	this._socket = null;
}

Server.prototype._socketHandler = function(socket) {
	var player = new Player();
	var packet = new Packet(socket, player);

	socket.on("data", packet.handler.bind(packet));
	socket.on("close", packet.close.bind(packet));
	socket.on("error", packet.error.bind(packet));
	
	this._packet = packet;
	this._socket = socket;
	this._socketInit();
}

Server.prototype._socketInit = function() {
	this._socket.setEncoding("binary");
	this._packet.send(new serverPackets.InitLS(), false); // false - first packet is not encrypted
	log(`Connected to the login server: ${this._socket.remoteAddress}:${this._socket.remotePort}`);
}

Server.prototype.start = function() {
	net.createServer(this._socketHandler.bind(this)).listen(config.loginserver.port, config.loginserver.host, () => {
		log(`Login server listening on ${config.loginserver.host}:${config.loginserver.port}`)
	});
}

module.exports = Server;