var config = require("./../../config/config");
var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class EnterWorld {
	constructor(packet, player, players, server) {
		this._packet = packet;
		this._player = player;
		this._players = players;
		this._server = server;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()

		this._init();
	}

	_init() {
		this._server.announcements.show(announcement => {
			this._packet.send(new serverPackets.CreateSay(this._player, config.base.MESSAGE_TYPE.ANNOUNCEMENT, announcement));
		})

		this._packet.send(new serverPackets.SunRise());
		this._packet.send(new serverPackets.UserInfo(this._player));
		this._packet.send(new serverPackets.ItemList(this._player));
		this._packet.broadcast(new serverPackets.CharacterInfo(this._player)); // Оповестить всех, что персонаж зашел в мир

		this._player.getVisiblePlayers(this._players.getPlayers(), anotherPlayer => {
			this._packet.send(new serverPackets.CharacterInfo(anotherPlayer));
		});
	}
}

module.exports = EnterWorld;