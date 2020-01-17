var ProtocolVersion = require("./ProtocolVersion");
var RequestAuthLogin = require("./RequestAuthLogin");
var NewCharacter = require("./NewCharacter");
var Logout = require("./Logout");
var CharacterCreate = require("./CharacterCreate");
var CharacterSelected = require("./CharacterSelected");
var RequestQuestList = require("./RequestQuestList");
var RequestShowBoard = require("./RequestShowBoard");
var EnterWorld = require("./EnterWorld");
var MoveBackwardToLocation = require("./MoveBackwardToLocation");
var RequestSocialAction = require("./RequestSocialAction");
var Say2 = require("./Say2");
var StopMove = require("./StopMove");
var RequestActionUse = require("./RequestActionUse");
var Action = require("./Action");
var RequestTargetCanceled = require("./RequestTargetCanceled");
var RequestItemList = require("./RequestItemList");
var UseItem = require("./UseItem");
var ValidatePosition = require("./ValidatePosition");
var RequestSkillList = require("./RequestSkillList");
var RequestMagicSkillUse = require("./RequestMagicSkillUse");
var RequestAttack = require("./RequestAttack");

module.exports = {
	ProtocolVersion: ProtocolVersion,
	RequestAuthLogin: RequestAuthLogin,
	NewCharacter: NewCharacter,
	Logout: Logout,
	CharacterCreate: CharacterCreate,
	CharacterSelected: CharacterSelected,
	RequestQuestList: RequestQuestList,
	RequestShowBoard: RequestShowBoard,
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