let config = require(".././config/config");
let server = require("./Server");

class Player {
	constructor(socket, blowfish) {
		this.blowfish = blowfish;
		this.socket = socket;
	}

	sendPacket(packet, encoding = true) {
		let packetLength = new Buffer.from([0x00, 0x00]);
		// Мутация аргументов - зло
		packetLength.writeInt16LE(packet.length + 2);

		if(encoding) {
			packet = new Buffer.from(this.blowfish.encrypt(packet));
			packet = Buffer.concat([packetLength, packet]);
			this.socket.write(packet);
		} else {
			packet = Buffer.concat([packetLength, packet]);
			this.socket.write(packet);
		}
	}

	getAccount(login) {
		return server.db.get("accounts").find({"login": login}).value();
	}

	checkAccount(login, password) {
		if(this.getAccount(login)) {
			if(!(this.getAccount(login).password === password)) {
				return config.base.errors.loginserver.REASON_PASS_WRONG;	
			}
			if(this.getAccount(login).accessLevel < 0) {
				return config.base.errors.loginserver.REASON_ACCOUNT_BANNED;
			}

			return "success";
		} else {
			return config.base.errors.loginserver.REASON_USER_OR_PASS_WRONG;
		}
	}
}

module.exports = Player;