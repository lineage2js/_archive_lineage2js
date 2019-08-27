var ProtocolVersion = require("./ProtocolVersion.js");
var RequestAuthLogin = require("./RequestAuthLogin.js");
var NewCharacter = require("./NewCharacter.js");
var Logout = require("./Logout.js");
var CharacterCreate = require("./CharacterCreate.js");
var CharacterSelected = require("./CharacterSelected.js");
var RequestQuestList = require("./RequestQuestList.js");
var EnterWorld = require("./EnterWorld.js");
var MoveBackwardToLocation = require("./MoveBackwardToLocation.js");
var RequestSocialAction = require("./RequestSocialAction.js");
var Say2 = require("./Say2.js");
var StopMove = require("./StopMove.js");
var RequestActionUse = require("./RequestActionUse.js");
var Action = require("./Action.js");
var RequestTargetCanceled = require("./RequestTargetCanceled.js");
var RequestItemList = require("./RequestItemList.js");
var UseItem = require("./UseItem.js");
var ValidatePosition = require("./ValidatePosition.js");
var RequestSkillList = require("./RequestSkillList.js");
var RequestMagicSkillUse = require("./RequestMagicSkillUse.js");
var RequestAttack = require("./RequestAttack.js");

module.exports = {
	ProtocolVersion: ProtocolVersion,
	RequestAuthLogin: RequestAuthLogin,
	NewCharacter: NewCharacter,
	Logout: Logout,
	CharacterCreate: CharacterCreate,
	CharacterSelected: CharacterSelected,
	RequestQuestList: RequestQuestList,
	EnterWorld: EnterWorld,
	MoveBackwardToLocation: MoveBackwardToLocation,
	RequestSocialAction: RequestSocialAction,
	Say2: Say2,
	StopMove: StopMove,
	RequestActionUse: RequestActionUse,
	Action: Action,
	RequestTargetCanceled: RequestTargetCanceled,
	RequestItemList: RequestItemList,
	UseItem: UseItem,
	ValidatePosition: ValidatePosition,
	RequestSkillList: RequestSkillList,
	RequestMagicSkillUse: RequestMagicSkillUse,
	RequestAttack: RequestAttack
}