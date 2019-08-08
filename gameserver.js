var net = require("net");
var file = require("fs");
var XOR = require("./util/XOR.js");
var log = require("./util/log.js");
var SendPacket = require("./util/SendPacket.js");
var config = require("./config/config.js");
var errorCodes = require("./config/errorCodes.js");
var serverPackets = require("./gameserver/serverpackets/serverPackets.js");
var clientPackets = require("./gameserver/clientpackets/clientPackets.js");
var tables = require("./gameserver/tables/tables.js");
var templates = require("./gameserver/templates/templates.js");
var classId = require("./data/class_id.js");
var characterTemplatesData = require("./data/character_templates.js");

// Data - файл
// Table - сериализация данных
// Template - взаимодействие с данными через get/set

function socketHandler(socket) {
	var encryption = false;
	var xor = new XOR(config.base.key.XOR);
	var sendPacket = new SendPacket(xor, socket);
	var sessionKey1Server = [0x55555555, 0x44444444];
	var sessionKey2Server = [0x55555555, 0x44444444];

	socket.on("data", data => {
		var packet = new Buffer.from(data, "binary").slice(2); // slice(2) - without byte responsible for packet size
		var decryptedPacket = new Buffer.from(encryption ? xor.decrypt(packet) : packet);
		var packetType = packet[0];
		// for test
		log(packet);
		log(packetType);
		//

		packetHandler(packetType, decryptedPacket);

		function packetHandler(type, packet) {
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

					if(keyComparison(sessionKey1Server, sessionKey1Client) && keyComparison(sessionKey2Server, sessionKey2Client)) {
						// Загружать из БД список персонажей
						sendPacket.send(new serverPackets.CharacterSelectInfo());
					} else {
						sendPacket.send(new serverPackets.AuthLoginFail(errorCodes.gameserver.authLoginFail.REASON_SYSTEM_ERROR));
					}
					break;
				case 0x0e:
					var newCharacter = new clientPackets.NewCharacter(packet);
					if(newCharacter.getStatus()) {
						// Получаем и преобразуем данные из одного объекта в другой чтобы удобно было доставать данные по classId
						var characterTemplateTable = (new tables.CharacterTemplateTable(characterTemplatesData)).getData();
						var characterTamplates = [
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
						
						sendPacket.send(new serverPackets.CharacterTemplates(characterTamplates));
					}
					break;
				case 0x09:
					var logout = new clientPackets.Logout(packet);

					if(logout.getStatus()) {
						xor = new XOR(config.base.key.XOR);
						encryption = false;
					}
					break;
				case 0x0b:
					var characterCreate = new clientPackets.CharacterCreate(packet);
					var nickName = characterCreate.getNickName();
					log(nickName.length)
					if(nickName.length <= 16 && isAlphaNumeric(nickName)) {
						if(nickName != "space2pacman") { // Проверка на доступность имени
							sendPacket.send(new serverPackets.CharacterCreateSuccess());
							// Загружать из БД список персонажей
							sendPacket.send(new serverPackets.CharacterSelectInfo());
						} else {
							sendPacket.send(new serverPackets.CharacterCreateFail(errorCodes.gameserver.characterCreateFail.REASON_NAME_ALREADY_EXISTS));
						}
					} else {
						sendPacket.send(new serverPackets.CharacterCreateFail(errorCodes.gameserver.characterCreateFail.REASON_16_ENG_CHARS));
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

	socket.on("close", data => {
		log(`Connection to the game server is closed for: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	socket.on("error", data => {
		log(`Client connection lost for: ${socket.remoteAddress}:${socket.remotePort}`);
	})

	function userHasJoined() {
		log(`Connected to the game server: ${socket.remoteAddress}:${socket.remotePort}`);
	}

	function Init() {
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