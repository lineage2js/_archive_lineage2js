var CryptInit = require("./CryptInit");
var CharacterSelectInfo = require("./CharacterSelectInfo");
var CharacterTemplates = require("./CharacterTemplates");
var AuthLoginFail = require("./AuthLoginFail");
var CharacterCreateSuccess = require("./CharacterCreateSuccess");
var CharacterCreateFail = require("./CharacterCreateFail");
var CharacterSelected = require("./CharacterSelected");
var QuestList = require("./QuestList");
var UserInfo = require("./UserInfo");
var MoveToLocation = require("./MoveToLocation");
var LogoutOk = require("./LogoutOk");
var NpcInfo = require("./NpcInfo");
var SunRise = require("./SunRise");
var SunSet = require("./SunSet");
var CharacterInfo = require("./CharacterInfo");
var SocialAction = require("./SocialAction");
var CreateSay = require("./CreateSay");
var StopMoveWithLocation = require("./StopMoveWithLocation");
var ChangeWaitType = require("./ChangeWaitType");
var ChangeMoveType = require("./ChangeMoveType");
var ActionFailed = require("./ActionFailed");
var TargetSelected = require("./TargetSelected");
var TargetUnselected = require("./TargetUnselected");
var TutorialShowHtml = require("./TutorialShowHtml");
var ItemList = require("./ItemList");
var DeleteObject = require("./DeleteObject");
var SkillList = require("./SkillList");
var MagicSkillUse = require("./MagicSkillUse");
var SystemMessage = require("./SystemMessage");
var MoveToPawn = require("./MoveToPawn");
var Attack = require("./Attack");
var SetupGauge = require("./SetupGauge");
var ShowBoard = require("./ShowBoard");
var MagicSkillLaunched = require("./MagicSkillLaunched");
var ShowMiniMap = require("./ShowMiniMap");

module.exports = {
	CryptInit: CryptInit,
	CharacterSelectInfo: CharacterSelectInfo,
	CharacterTemplates: CharacterTemplates,
	AuthLoginFail: AuthLoginFail,
	CharacterCreateSuccess: CharacterCreateSuccess,
	CharacterCreateFail: CharacterCreateFail,
	CharacterSelected: CharacterSelected,
	QuestList: QuestList,
	UserInfo: UserInfo,
	MoveToLocation: MoveToLocation,
	LogoutOk: LogoutOk,
	NpcInfo: NpcInfo,
	SunRise: SunRise,
	SunSet: SunSet,
	CharacterInfo: CharacterInfo,
	SocialAction: SocialAction,
	CreateSay: CreateSay,
	StopMoveWithLocation: StopMoveWithLocation,
	ChangeWaitType: ChangeWaitType,
	ChangeMoveType: ChangeMoveType,
	ActionFailed: ActionFailed,
	TargetSelected: TargetSelected,
	TargetUnselected: TargetUnselected,
	TutorialShowHtml: TutorialShowHtml,
	ItemList: ItemList,
	DeleteObject: DeleteObject,
	SkillList: SkillList,
	MagicSkillUse: MagicSkillUse,
	SystemMessage: SystemMessage,
	MoveToPawn: MoveToPawn,
	Attack: Attack,
	SetupGauge: SetupGauge,
	ShowBoard: ShowBoard,
	MagicSkillLaunched: MagicSkillLaunched,
	ShowMiniMap: ShowMiniMap
}