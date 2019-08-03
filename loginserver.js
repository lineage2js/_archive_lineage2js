var net = require("net");
var Blowfish = require("./util/blowfish.js");
var config = require("./config/config.js");
var serverPackets = require("./loginserver/serverpackets/serverPackets.js");
var blowfish = new Blowfish(config.base.blowfish.key);

function handlerSocket(socket) {
	socket.on("data", data => {
		//
		var packet = Array.prototype.slice.call(new Buffer.from(data, "binary"),2);
		var decrypt = blowfish.decrypt(packet);
		console.log(decrypt);
		//
		// for test
		// var loginOk = [0x03, 0x55, 0x55, 0x55, 0x55, 0x44, 0x44, 0x44, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
		// socket.write(new Buffer.from([0x32, 0x00].concat(blowfish.encrypt(loginOk))));
	})

	socket.on("close", data => {
		console.log(`Connection to login server has closed: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		console.log(`Connected to login server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
		socket.setEncoding("binary");
		socket.write(serverPackets.InitLS());
		userHasJoined();
	}

	Init();
}

function Init() {
	net.createServer(handlerSocket).listen(config.loginserver.port, config.loginserver.host);
}

Init();