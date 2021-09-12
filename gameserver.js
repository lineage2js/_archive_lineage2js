let server = require("./gameserver/Server");
let idFactory = require("./util/IdFactory");
let announcements = require("./gameserver/Announcements");
let html = require("./gameserver/Html");
let items = require("./gameserver/Items");
let npcList = require("./gameserver/NpcList");
let world = require("./gameserver/World");
let bots = require("./gameserver/Bots");
let tasks = require("./gameserver/Tasks");

// add files
idFactory.addFile("./data/id.json");
announcements.addFile("./data/announcements.json");
html.addFiles("./data/html");
items.addFiles([{ path: "./data/items/armor.json", category: "armor" }, { path: "./data/items/weapon.json", category: "weapon" }, { path: "./data/items/etc.json", category: "etc" }]);
npcList.addFile("./data/npc.json");

// init
npcList.spawn();
bots.create(10);
world.addNpc(npcList.getList());
world.addBot(bots.getBots());
//tasks.startNpcMove();
server.start();