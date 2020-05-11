let Server = require("./gameserver/Server");
let idFactory = require("./util/IdFactory");
let announcements = require("./gameserver/Announcements");
let html = require("./gameserver/Html");
let items = require("./gameserver/Items");
let npcList = require("./gameserver/NpcList");

idFactory.addFile("./data/id.json");
announcements.addFile("./data/announcements.json");
html.addFiles("./data/html");
items.addFiles([{ path: "./data/items/armor.json", category: "armor" }, { path: "./data/items/weapon.json", category: "weapon" }, { path: "./data/items/etc.json", category: "etc" }]);
npcList.addFile("./data/npc.json");
npcList.spawn();

let server = new Server();

server.start();