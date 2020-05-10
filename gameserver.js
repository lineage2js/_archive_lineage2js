let Server = require("./gameserver/Server");
let idFactory = require("./util/IdFactory");
let announcements = require("./gameserver/Announcements");
let html = require("./gameserver/Html");

idFactory.addFile("./data/idstate.json");
announcements.addFile("./data/announcements.json");
html.addFiles("data/html");

let server = new Server();

server.start();