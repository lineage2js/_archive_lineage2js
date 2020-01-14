var config = require(".././config/config.js");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);

function Player() {

}

Player.prototype.authorization = function(login) {
	return db.get("accounts").find({"login": login}).value();
}

Player.prototype.checkAccount = function(login, password) {
	if(this.authorization(login)) {
		if(!(this.authorization(login).password === password)) {
			return config.base.errors.loginserver.REASON_PASS_WRONG;	
		}
		if(this.authorization(login).accessLevel < 0) {
			return config.base.errors.loginserver.REASON_ACCOUNT_BANNED;
		}

		return "success";
	} else {
		return config.base.errors.loginserver.REASON_USER_OR_PASS_WRONG;
	}
};

module.exports = Player;