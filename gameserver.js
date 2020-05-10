let Server = require("./gameserver/Server");
let idFactory = require("./util/IdFactory");
let announcements = require("./gameserver/Announcements");
let html = require("./gameserver/Html");
let items = require("./gameserver/Items");

idFactory.addFile("./data/idstate.json");
announcements.addFile("./data/announcements.json");
html.addFiles("data/html");
items.addFiles([{ path: "data/items/armor.json", category: "armor" }, { path: "data/items/weapon.json", category: "weapon" }, { path: "data/items/etc.json", category: "etc" }]);

let server = new Server();

server.start();