var Player = require("./Player.js");

// fix {bot} instanceof Player - false, потому что this._bot = {} 

class Bot extends Player {

}

module.exports = Bot;