let Server = require("./gameserver/Server");
let idFactory = require("./util/IdFactory");

idFactory.addFile("./data/idstate.json");

let server = new Server();

server.start();