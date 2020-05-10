let Server = require("./gameserver/Server");
let idFactory = require("./util/IdFactory");
let announcements = require("./gameserver/Announcements");


idFactory.addFile("./data/idstate.json");
announcements.addFile("./data/announcements.json");

let server = new Server();

server.start();