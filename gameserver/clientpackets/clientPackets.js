var ProtocolVersion = require("./ProtocolVersion.js");
var RequestAuthLogin = require("./RequestAuthLogin.js");
var NewCharacter = require("./NewCharacter.js");
var Logout = require("./Logout.js");
var CharacterCreate = require("./CharacterCreate.js");
var CharacterSelected = require("./CharacterSelected.js");
var RequestQuestList = require("./RequestQuestList.js");
var EnterWorld = require("./EnterWorld.js");

module.exports = {
	ProtocolVersion: ProtocolVersion,
	RequestAuthLogin: RequestAuthLogin,
	NewCharacter: NewCharacter,
	Logout: Logout,
	CharacterCreate: CharacterCreate,
	CharacterSelected: CharacterSelected,
	RequestQuestList: RequestQuestList,
	EnterWorld: EnterWorld
}