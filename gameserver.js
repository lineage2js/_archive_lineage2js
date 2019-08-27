var net = require("net");
var file = require("fs");
var XOR = require("./util/XOR.js");
var log = require("./util/log.js");
var IdFactory = require("./util/IdFactory.js");
var config = require("./config/config.js");
var Bot = require("./gameserver/Bot.js");
var Player = require("./gameserver/Player.js");
var Players = require("./gameserver/Players.js");
var Item = require("./gameserver/Item.js");
var SendPacket = require("./gameserver/SendPacket.js");
var Announcements = require("./gameserver/Announcements.js");
var serverPackets = require("./gameserver/serverpackets/serverPackets.js");
var clientPackets = require("./gameserver/clientpackets/clientPackets.js");
var tables = require("./gameserver/tables/tables.js");
var templates = require("./gameserver/templates/templates.js");
var classId = require("./data/classId.js");
var characterTemplatesData = require("./data/characterTemplates.js");
// DB
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var database = new FileSync("data/database.json");
var db = low(database);
// Items
var armor = JSON.parse(file.readFileSync("data/armor.json", "utf-8"));
var weapon = JSON.parse(file.readFileSync("data/weapon.json", "utf-8"));
// Init object
var idFactory = new IdFactory("data/idstate.json");
var players = new Players();
var announcements = new Announcements("data/announcements.json");
var itemTable = new tables.ItemTable([{ items: armor, type: "armor" }, { items: weapon, type: "weapon" }]);
var item = new Item(itemTable.getData(), idFactory);

// Data - файл
// Table - сериализация данных
// Template - взаимодействие с данными через get/set

//
var characterTemplateTable = new tables.CharacterTemplateTable(characterTemplatesData).getData();
var bot = new Bot(idFactory, characterTemplateTable, classId);
var bots = bot.createBots(1);

players.addBots(bots);
//

function socketHandler(socket) {
	var encryption = false;
	var xor = new XOR(config.base.key.XOR);
	var player = new Player();
	var sendPacket = new SendPacket(player, players.getPlayers());
	var sessionKey1Server = [0x55555555, 0x44444444];
	var sessionKey2Server = [0x55555555, 0x44444444];

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		//var decryptedPacket = new Buffer.from(encryption ? player.xor.decrypt(packet) : packet);
		var decryptedPacket = new Buffer.from(packet);
		
		// for test
		log(packet);
		//

		packetHandler(decryptedPacket);

		function packetHandler(packet) {
			var type = packet[0];

			switch(type) {
				case 0x00:
					var protocolVersion = new clientPackets.ProtocolVersion(packet);
					
					if(protocolVersion.getVersion() === config.base.PROTOCOL_VERSION.CLIENT) {
						sendPacket.send(new serverPackets.CryptInit(config.base.key.XOR), false);
						encryption = true; // The first packet is not encrypted
					}

					break;
				case 0x08:
					var requestAuthLogin = new clientPackets.RequestAuthLogin(packet);
					var sessionKey1Client = requestAuthLogin.getSessionKey1();
					var sessionKey2Client = requestAuthLogin.getSessionKey2();
					var charactersList = [];
					var charactersData;

					player.login = requestAuthLogin.getLogin();
					charactersData = db.get("characters").filter({"login": player.login}).value();

					for(var i = 0; i < charactersData.length; i++) {
						charactersList.push(new templates.L2CharacterTemplate(charactersData[i]));
					}

					if(keyComparison(sessionKey1Server, sessionKey1Client) && keyComparison(sessionKey2Server, sessionKey2Client)) {
						// Загружать из БД список персонажей
						sendPacket.send(new serverPackets.CharacterSelectInfo(charactersList, player));
					} else {
						sendPacket.send(new serverPackets.AuthLoginFail(config.base.errors.gameserver.REASON_SYSTEM_ERROR));
					}

					break;
				case 0x0e:
					var newCharacter = new clientPackets.NewCharacter(packet);
					// Получаем и преобразуем данные из одного объекта в другой чтобы удобно было доставать данные по classId
					var characterTemplateTable = new tables.CharacterTemplateTable(characterTemplatesData).getData();
					var characterTemplates = [
						new templates.L2CharacterTemplate(characterTemplateTable[classId.fighter]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.mage]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.elvenFighter]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.elvenMage]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.darkFighter]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.darkMage]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.orcFighter]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.orcMage]),
						new templates.L2CharacterTemplate(characterTemplateTable[classId.dwarvenFighter]),
					];

					sendPacket.send(new serverPackets.CharacterTemplates(characterTemplates));

					break;
				case 0x09:
					var logout = new clientPackets.Logout(packet);

					xor = new XOR(config.base.key.XOR);
					encryption = false;
					sendPacket.send(new serverPackets.LogoutOK());
					sendPacket.broadcast(new serverPackets.DeleteObject(player.objectId));

					break;
				case 0x0b:
					var characterCreate = new clientPackets.CharacterCreate(packet);
					var characterName = characterCreate.getCharacterName();
					var characterTemplateTable = new tables.CharacterTemplateTable(characterTemplatesData).getData();
					var characterQuantity = db.get("characters").filter({"login": player.login}).value().length;
					var MAXIMUM_QUANTITY_CHARACTERS = 7;

					if(characterQuantity === MAXIMUM_QUANTITY_CHARACTERS) {
						sendPacket.send(new serverPackets.CharacterCreateFail(config.base.errors.gameserver.REASON_TOO_MANY_CHARACTERS));
						
						break;
					}

					if(characterName.length <= 16 && isAlphaNumeric(characterName)) {
						if(characterNameisExist(characterName)) {
							var character = new templates.L2CharacterTemplate(characterTemplateTable[characterCreate.getClassId()]);
							var charactersData;
							var charactersList = [];

							character.login = player.login;
							character.objectId = idFactory.getNextId();
							character.characterName = characterCreate.getCharacterName();
							character.maximumHp = character.hp;
							character.maximumMp = character.mp;
							character.gender = characterCreate.getGender();
							character.hairStyle = characterCreate.getHairStyle();
							character.hairColor = characterCreate.getHairColor();
							character.face = characterCreate.getFace();
							character.items = createDefaultItems(character.items);

							db.get("characters").push(character.getData()).write();
							charactersData = db.get("characters").filter({"login": player.login}).value();
							
							for(var i = 0; i < charactersData.length; i++) {
								charactersList.push(new templates.L2CharacterTemplate(charactersData[i]));
							}

							sendPacket.send(new serverPackets.CharacterCreateSuccess());
							sendPacket.send(new serverPackets.CharacterSelectInfo(charactersList, player));
						} else {
							sendPacket.send(new serverPackets.CharacterCreateFail(config.base.errors.gameserver.REASON_NAME_ALREADY_EXISTS));
						}
					} else {
						sendPacket.send(new serverPackets.CharacterCreateFail(config.base.errors.gameserver.REASON_16_ENG_CHARS));
					}

					function createDefaultItems(defaultIdItems) {
						var items = [];

						for(var i = 0; i < defaultIdItems.length; i++) {
							items.push(item.createItem(defaultIdItems[i]));
						}

						return items;
					}

					function characterNameisExist(characterName) {
						var names = db.get("characters").map("characterName").value();

						for(var i = 0; i < names.length; i++) {
							if(names[i].toLowerCase() === characterName.toLowerCase()) {
								return false;
							}
						}

						return true;
					}

					function isAlphaNumeric(string) {
						var charCode;
						
						for(var i = 0; i < string.length; i++) {
					  		charCode = string[i].charCodeAt();
						  	
						  	if (!(charCode > 47 && charCode < 58) && // numeric (0-9)
						        !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
						        !(charCode > 96 && charCode < 123)) { // lower alpha (a-z)
						    	return false;
						    }
						}
					  
					  return true;
					}

					break;
				case 0x0d:
					var characterSelected = new clientPackets.CharacterSelected(packet);
					var characterData = db.get("characters").filter({"login": player.login}).value()[characterSelected.getCharacterSlot()];
					var character = new templates.L2CharacterTemplate(characterData);

					player.fillData(character);
					player.characterSlot = characterSelected.getCharacterSlot();
					player.online = true;
					// for test
					player.items.push(item.createItem(400));
					player.items.push(item.createItem(420));
					player.items.push(item.createItem(2436));
					player.items.push(item.createItem(2460));
					player.items.push(item.createItem(233));
					player.items.push(item.createItem(78));
					player.items.push(item.createItem(2497));

					player.items.push(item.createItem(84));
					player.items.push(item.createItem(439));
					player.items.push(item.createItem(471));
					player.items.push(item.createItem(2430));
					player.items.push(item.createItem(2454));
					player.items.push(item.createItem(618));
					player.items.push(item.createItem(283));
					player.items.push(item.createItem(2392));
					player.items.push(item.createItem(2381));

					player.items.push(item.createItem(2406));
					player.items.push(item.createItem(2397));
					//
					sendPacket.send(new serverPackets.CharacterSelected(character));

					break;
				case 0x63:
					var requestQuestList = new clientPackets.RequestQuestList(packet);

					sendPacket.send(new serverPackets.QuestList(/* remove */)); // database - quests

					break;
				case 0x03:
					var enterWorld = new clientPackets.EnterWorld(packet);

					announcements.show(function(announcement) {
						sendPacket.send(new serverPackets.CreateSay(player, config.base.MESSAGE_TYPE.ANNOUNCEMENT, announcement));
					})

					sendPacket.send(new serverPackets.SunRise());
					sendPacket.send(new serverPackets.UserInfo(player));
					sendPacket.send(new serverPackets.ItemList(player));
					sendPacket.broadcast(new serverPackets.CharacterInfo(player)); // Оповестить всех, что персонаж зашел в мир

					player.getVisiblePlayers(players.getPlayers(), function(anotherPlayer) {
						sendPacket.send(new serverPackets.CharacterInfo(anotherPlayer));
					});

					break;
				case 0x01:
					var moveBackwardToLocation = new clientPackets.MoveBackwardToLocation(packet);
					var positions = {
						target: {
							x: moveBackwardToLocation.getTargetX(),
							y: moveBackwardToLocation.getTargetY(),
							z: moveBackwardToLocation.getTargetZ()
						},
						origin: {
							x: moveBackwardToLocation.getOriginX(),
							y: moveBackwardToLocation.getOriginY(),
							z: moveBackwardToLocation.getOriginZ()
						}
					}

					sendPacket.send(new serverPackets.MoveToLocation(positions, player));
					sendPacket.broadcast(new serverPackets.MoveToLocation(positions, player));

					player.x = positions.target.x;
					player.y = positions.target.y;
					player.z = positions.target.z;

					break;
				case 0x1b:
					var requestSocialAction = new clientPackets.RequestSocialAction(packet);
					var actionId = requestSocialAction.getActionId();

					sendPacket.send(new serverPackets.SocialAction(player, actionId));
					sendPacket.broadcast(new serverPackets.SocialAction(player, actionId));

					break;
				case 0x38:
					var say2 = new clientPackets.Say2(packet);

					sendPacket.send(new serverPackets.CreateSay(player, say2.getType(), say2.getText()));
					sendPacket.broadcast(new serverPackets.CreateSay(player, say2.getType(), say2.getText()));

					break;
				case 0x36:
					var stopMove = new clientPackets.StopMove(packet);

					player.x = stopMove.getX();
					player.y = stopMove.getY();
					player.z = stopMove.getZ();
					sendPacket.send(new serverPackets.StopMoveWithLocation(player));

					break;
				case 0x45:
					var requestActionUse = new clientPackets.RequestActionUse(packet);

					switch(requestActionUse.getActionId()) {
						case 0:
							var waitType = player.waitType ^ 0x01 // 1 => 0, 0 => 1

							sendPacket.send(new serverPackets.ChangeWaitType(player, waitType));
							sendPacket.broadcast(new serverPackets.ChangeWaitType(player, waitType));
							player.waitType = waitType;

							break;
						case 1:
							var moveType = player.moveType ^ 0x01 // 1 => 0, 0 => 1

							sendPacket.send(new serverPackets.ChangeMoveType(player, moveType));
							sendPacket.broadcast(new serverPackets.ChangeMoveType(player, moveType));
							player.moveType = moveType;
					}

					break;
				case 0x04:
					var action = new clientPackets.Action(packet);

					switch (action.getActionId()) {
						case 0: // click
							//sendPacket.send(new serverPackets.ActionFailed());
							sendPacket.send(new serverPackets.TargetSelected(action.getObjectId()));
							player.target = action.getObjectId();

							break;
						case 1: // click + shift
							
							break;
					}

					break;
				case 0x37:
					var requestTargetCanceled = new clientPackets.RequestTargetCanceled(packet);

					sendPacket.send(new serverPackets.TargetUnselected(player));
					player.target = null;

					break;
				case 0x0f:
					var requestItemList = new clientPackets.RequestItemList(packet);

					sendPacket.send(new serverPackets.ItemList(player, true));

					break;
				case 0x14: // доделать
					var useItem = new clientPackets.UseItem(packet);
					var usedItem = player.getItem(useItem.getObjectId());

					if(usedItem.type === "armor" || usedItem.type === "weapon") {
						switch(usedItem.bodyPart) {
							case itemTable.types.SLOT_R_EAR:

								break;
							case itemTable.types.SLOT_L_EAR:

								break;
							case itemTable.types.SLOT_NECK:

								break;
							case itemTable.types.SLOT_R_FINGER:

								break;
							case itemTable.types.SLOT_L_FINGER:

								break;
							case itemTable.types.SLOT_HEAD:

								break;
							case itemTable.types.SLOT_R_HAND:
								putOnThing(player.hand.right, false);

								break;
							case itemTable.types.SLOT_L_HAND:
								putOnThing(player.hand.left, false);

								break;
							case itemTable.types.SLOT_GLOVES:
								putOnThing(player.gloves);

								break;
							case itemTable.types.SLOT_CHEST:
								putOnThing(player.chest);

								break;
							case itemTable.types.SLOT_LEGS:
								putOnThing(player.legs);

								break;
							case itemTable.types.SLOT_FEET:
								putOnThing(player.feet);

								break;
							case itemTable.types.SLOT_BACK:
								putOnThing(player.back);

								break;
							case itemTable.types.SLOT_LR_HAND:
								putOnThing(player.hand.leftAndRight, true);

								break;
							case itemTable.types.SLOT_FULL_ARMOR:
								putOnThing(player.chest);

								break;
						}

					}

					sendPacket.send(new serverPackets.UserInfo(player));
					sendPacket.send(new serverPackets.ItemList(player));
					sendPacket.send(new serverPackets.SystemMessage(49, [{ type: config.base.systemMessageType.ITEM_NAME, value: usedItem.itemId }])); //
					sendPacket.broadcast(new serverPackets.CharacterInfo(player));
					
					function putOnThing(placeToDress, twoHandedWeapon) {
						if(placeToDress.objectId != 0) {
							var item = player.getItem(placeToDress.objectId);
							item.isEquipped = false; // снять если надето
						}

						if(twoHandedWeapon) { // Всегда срабатывает false на обычных предметах
							if(player.hand.right.objectId != 0) {
								var item = player.getItem(player.hand.right.objectId);
								item.isEquipped = false;
								player.hand.right.objectId = 0;
								player.hand.right.itemId = 0;
							}
							if(player.hand.left.objectId != 0) {
								var item = player.getItem(player.hand.left.objectId);
								item.isEquipped = false;
								player.hand.left.objectId = 0;
								player.hand.left.itemId = 0;
							}
						} else {
							if(player.hand.leftAndRight.objectId != 0) {
								var item = player.getItem(player.hand.leftAndRight.objectId);
								player.hand.leftAndRight.objectId = 0;
								player.hand.leftAndRight.itemId = 0;
								item.isEquipped = false;
							}
						}

						placeToDress.objectId = usedItem.objectId;
						placeToDress.itemId = usedItem.itemId;
						usedItem.isEquipped = true;
					}

					break;
				case 0x48:
					var validatePosition = new clientPackets.ValidatePosition(packet);

					player.x = validatePosition.getX();
					player.y = validatePosition.getY();
					player.z = validatePosition.getZ();
					player.heading = validatePosition.getHeading();

					break;
				case 0x3f:
					var requestSkillList = new clientPackets.RequestSkillList(packet);

					sendPacket.send(new serverPackets.SkillList(player));

					break;
				case 0x2f:
					var requestMagicSkillUse = new clientPackets.RequestMagicSkillUse(packet);
					var skill = player.skills.filter(skill => skill.id === requestMagicSkillUse.getSkillId())[0];
					
					sendPacket.send(new serverPackets.MagicSkillUse(player, skill));
					sendPacket.send(new serverPackets.MagicSkillLaunched(player, skill));
					sendPacket.send(new serverPackets.SetupGauge(0, skill.hitTime)); // 0 - blue, 1 - red, 2 - cyan

					break;
				case 0x0a:
					var requestAttack = new clientPackets.RequestAttack(packet);
					var hits = {
						soulshot: false,
						critical: false,
						miss: false
					}

					sendPacket.send(new serverPackets.MoveToPawn(player));
					sendPacket.send(new serverPackets.Attack(player, hits))

					break;
			}
		}

		function keyComparison(keyServer, keyClient) {
			if(keyServer[0] === parseInt(keyClient[0], 16) && keyServer[1] === parseInt(keyClient[1], 16)) {
				return true;
			} else {
				return false;
			}
		}
	})

	socket.on("close", () => {
		log(`Connection to the game server is closed for: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	socket.on("error", () => {
		log(`Client connection lost for: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
		player.socket = socket;
		player.xor = xor;
		players.addPlayer(player);
		socket.setEncoding("binary");
		userHasJoined();
	}

	Init();
}

function Init() {
	net.createServer(socketHandler).listen(config.gameserver.port, config.gameserver.host, () => {
		log(`Game server listening on ${config.gameserver.host}:${config.gameserver.port}`)
	});
}

Init();