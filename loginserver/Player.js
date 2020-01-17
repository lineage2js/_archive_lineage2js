var config = require(".././config/config");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);

class Player {
	constructor(socket, blowfish) {
		this.blowfish = blowfish;
		this.socket = socket;
	}

	getAccount(login) {
		return db.get("accounts").find({"login": login}).value();
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