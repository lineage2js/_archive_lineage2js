# lineage 2 js

node.js server emulator  
server for lineage 2 chronicle 1 harbingers of war

config: data/config.json  
init: npm install -i

### run on linux:

node loginserver.js  
node gameserver.js

### run on windows:

serverStart.bat

### Packets

:heavy_check_mark: - done  
:warning: - in work

| Client packets(game server) | Server packets(game server) |
| --- | --- |
| :heavy_check_mark: ProtocolVersion | :heavy_check_mark: CryptInit |
| :heavy_check_mark: MoveBackwardToLocation | :heavy_check_mark: MoveToLocation |
| ? Say | NpcSay |
| :heavy_check_mark: RequestEnterWorld | :warning: CharacterInfo |
| :warning: Action | :warning: UserInfo |
| :heavy_check_mark: RequestAuthLogin | :heavy_check_mark: Attack |
| :heavy_check_mark: Logout | ? Attacked |
| :warning: RequestAttack | :heavy_check_mark: AttackCanceled |
| :heavy_check_mark: RequestCharacterCreate | :heavy_check_mark: Die |
| RequestCharacterDelete | Revive |
| :heavy_check_mark: CharacterSelected | AttackOutofRange |
| :heavy_check_mark: RequestNewCharacter | AttackinCoolTime |
| :heavy_check_mark: RequestItemList | AttackDeadTarget |
| RequestEquipItem | LeaveWorld |
| RequestUnEquipItem | AuthLoginSuccess |
| RequestDropItem | :heavy_check_mark: AuthLoginFail |
| :warning: RequestUseItem | :warning: SpawnItem |
| RequestTrade | :warning: DropItem |
| RequestAddTradeItem | GetItem |
| TradeDone | EquipItem |
| RequestTeleport | UnequipItem |
| :heavy_check_mark: RequestSocialAction | :warning: StatusUpdate |
| ? ChangeMoveType | :heavy_check_mark: NpcHtmlMessage |
| ? ChangeWaitType | SellList |
| RequestSellItem | BuyList |
| RequestBuyItem | :heavy_check_mark: DeleteObject |
| RequestLinkHtml | :warning: CharacterSelectionInfo |
| :warning: RequestBypassToServer | ? LoginFail |
| RequestBBSWrite | :heavy_check_mark: CharacterSelected |
| RequestCreatePledge | :warning: NpcInfo |
| RequestJoinPledge | :heavy_check_mark: CharacterTemplates |
| RequestAnswerJoinPledge | NewCharacterFail |
| RequestWithDrawalPledge | :heavy_check_mark: CharacterCreateSuccess |
| RequestOustPledgeMember | :heavy_check_mark: CharacterCreateFail |
| RequestDismissPledge | :warning: ItemList |
| RequestJoinParty | :heavy_check_mark: SunRise |
| RequestAnswerJoinParty | :heavy_check_mark: SunSet |
| RequestWithDrawalParty | ? EquipItemSuccess |
| RequestOustPartyMember | ? EquipItemFail |
| RequestDismissParty | ? UnEquipItemSuccess |
| ? RequestMagicSkillList | ? UnEquipItemFail |
| :heavy_check_mark: RequestMagicSkillUse | TradeStart |
| ? SendAppearing | TradeStartOk |
| SendWareHouseDepositList | TradeOwnAdd |
| SendWareHouseWithdrawList | TradeOtherAdd |
| RequestShortCutReg | TradeDone |
| RequestShortCutUse | CharacterDeleteSuccess |
| RequestShortCutDel | CharacterDeleteFail |
| :heavy_check_mark: StopMove | :heavy_check_mark: ActionFail |
| :heavy_check_mark: RequestTargetCancel | ServerClose |
| :heavy_check_mark: Say2 | InventoryUpdate |
| RequestPledgeMemberList | TeleportToLocation |
| ? RequestMagicList | :heavy_check_mark: TargetSelected |
| :heavy_check_mark: RequestSkillList | :heavy_check_mark: TargetUnselected |
| ? MoveWithDelta | :heavy_check_mark: AutoAttackStart |
| ? GetOnVehicle(boat) | :heavy_check_mark: AutoAttackStop |
| ? GetOffVehicle(boat) | :heavy_check_mark: SocialAction |
| AnswerTradeRequest | :heavy_check_mark: ChangeMoveType |
| :heavy_check_mark: RequestActionUse | :heavy_check_mark: ChangeWaitType |
| RequestRestart | NetworkFail |
| RequestSiegeInfo | CreatePledge |
| :heavy_check_mark: ValidatePosition | AskJoinPledge |
| ? RequestSEKCustom | JoinPledge |
| StartRotating | WithdrawalPledge |
| FinishRotating | OustPledgeMember |
| RequestStartPledgeWar | SetOustPledgeMember |
| RequestReplyStartPledgeWar | DismissPledge |
| RequestStopPledgeWar | SetDismissPledge |
| RequestReplyStopPledgeWar | AskJoinParty |
| RequestSurrenderPledgeWar | JoinParty |
| RequestReplySurrenderPledgeWar | WithdrawalParty |
| RequestSetPledgeCrest | OustPartyMember |
| RequestGiveNickName | SetOustPartyMember |
| :heavy_check_mark: RequestShowboard | DismissParty |
| RequestEnchantItem | SetDismissParty |
| RequestDestroyItem | MagicAndSkillList |
| SendBypassBuildCmd | WareHouseDepositList |
| MoveToLocationInVehicle | WareHouseWithdrawList |
| CanNotMoveAnymore(Vehicle) | WareHouseDone |
| RequestFriendInvite | ShortCutRegister |
| RequestFriendAddReply | ShortCutInit |
| RequestFriendInfoList | ShortCutDelete |
| RequestFriendDel | :heavy_check_mark: StopMove |
| RequestCharacterRestore | :heavy_check_mark: MagicSkillUse |
| :warning: RequestQuestList | MagicSkillCanceled |
| RequestDestroyQuest | :heavy_check_mark: CreateSay |
| RequestPledgeInfo | EquipUpdate |
| RequestPledgeExtendedInfo | :heavy_check_mark: StopMoveWithLocation |
| RequestPledgeCrest | DoorInfo |
| RequestSurrenderPersonally | DoorStatusUpdate |
| RequestRide | PartySmallWindowAll |
| RequestAcquireSkillInfo | PartySmallWindowAdd |
| RequestAcquireSkill | PartySmallWindowDeleteAll |
| RequestRestartPoint | PartySmallWindowDelete |
| RequestGMCommand | PartySmallWindowUpdate |
| RequestPartyMatchConfig | PledgeShowMemberListAll |
| RequestPartyMatchList | PledgeShowMemberListUpdate |
| RequestPartyMatchDetail | PledgeShowMemberListAdd |
| RequestCrystallizeItem | PledgeShowMemberListDelete |
| RequestPrivateStoreSellManageList | MagicList |
| SetPrivateStoreSellList | :heavy_check_mark: SkillList |
| RequestPrivateStoreSellManageCancel | VehicleInfo |
| RequestPrivateStoreSellQuit | VehicleDeparture |
| SetPrivateStoreSellMsg | VehicleCheckLocation |
| SendPrivateStoreBuyList | GetOnVehicle |
| RequestReviveReply | GetOffVehicle |
| RequestTutorialLinkHtml | TradeRequest |
| RequestTutorialPassCmdToServer | RestartResponse |
| RequestTutorialQuestionMarkPressed | :warning: MoveToPawn |
| RequestTutorialClientEvent | ValidateLocation |
| RequestPetition | StartRotating |
| RequestPetitionCancel | FinishRotating |
| RequestGMList | :heavy_check_mark: SystemMessage |
| RequestJoinAlly | StartPledgeWar |
| RequestAnswerJoinAlly | ReplyStartPledgeWar |
| RequestWithdrawAlly | StopPledgeWar |
| RequestOustAlly | ReplyStopPledgeWar |
| RequestDismissAlly | SurrenderPledgeWar |
| RequestSetAllyCrest | ReplySurrenderPledgeWar |
| RequestAllyCrest | SetPledgeCrest |
| RequestChangePetName | PledgeCrest |
| RequestPetUseItem | :heavy_check_mark: SetupGauge |
| RequestGiveItemToPet | :warning: ShowBoard |
| RequestGetItemFromPet | ChooseInventoryItem |
| RequestAllyInfo | MoveToLocationInVehicle |
| RequestPetGetItem | StopMoveInVehicle |
| RequestPrivateStoreBuyManageList | ValidateLocationInVehicle |
| SetPrivateStoreBuyList | TradeUpdate |
| RequestPrivateStoreBuyManageQuit | TradePressOwnOk |
| SetPrivateStoreBuyMsg | :warning: MagicSkillLaunched |
| SendPrivateStoreSellList | FriendAddRequestResult |
| SendTimeCheck | FriendAdd |
| RequestStartAllianceWar | FriendRemove |
| ReplyStartAllianceWar | FriendList |
| RequestStopAllianceWar | FriendStatus |
| ReplyStopAllianceWar | TradePressOtherOk |
| RequestSurrenderAllianceWar | FriendAddRequest |
| RequestSkillCoolTime | :heavy_check_mark: LogoutOk |
| RequestPackageSendableItemList | AbnormalStatusUpdate |
| RequestPackageSend | :warning: QuestList |
| RequestBlock | EnchantResult |
| RequestCastleSiegeInfo | AuthServerList |
| RequestCastleSiegeAttackerList | PledgeShowMemberListDeleteAll |
| RequestCastleSiegeDefenderList | PledgeInfo |
| RequestJoinCastleSiege | PledgeExtendedInfo |
| RequestConfirmCastleSiegeWaitingList | SurrenderPersonally |
| RequestSetCastleSiegeTime | :warning: Ride |
| RequestMultiSellChoose | GiveNickNameDone |
| NetPing | PledgeShowInfoUpdate |
| RequestRemainTime | ClientAction |
|  | AcquireSkillList |
|  | AcquireSkillInfo |
|  | ServerObjectInfo |
|  | GMHide |
|  | AcquireSkillDone |
|  | GMViewCharacterInfo |
|  | GMViewPledgeInfo |
|  | GMViewSkillInfo |
|  | GMViewMagicInfo |
|  | GMViewQuestInfo |
|  | GMViewItemList |
|  | GMViewWarehouseWithdrawList |
|  | PartyMatchList |
|  | PartyMatchDetail |
|  | PlaySound |
|  | StaticObject |
|  | PrivateStoreSellManageList |
|  | PrivateStoreSellList |
|  | PrivateStoreSellMsg |
|  | :heavy_check_mark: ShowMinimap |
|  | ReviveRequest |
|  | AbnormalVisualEffect |
|  | :heavy_check_mark: TutorialShowHtml |
|  | ShowTutorialMark |
|  | TutorialEnableClientEvent |
|  | TutorialCloseHtml |
|  | :heavy_check_mark: RadarControl |
|  | DeleteRadar |
|  | MyTargetSelected |
|  | PartyMemberPosition |
|  | AskJoinAlliance |
|  | JoinAlliance |
|  | WithdrawAlliance |
|  | OustAllianceMemberPledge |
|  | DismissAlliance |
|  | SetAllianceCrest |
|  | AllianceCrest |
|  | ServerCloseSocket |
|  | PetStatusShow |
|  | PetInfo |
|  | PetItemList |
|  | PetInventoryUpdate |
|  | AllianceInfo |
|  | PetStatusUpdate |
|  | PetDelete |
|  | PrivateStoreBuyManageList |
|  | PrivateStoreBuyList |
|  | PrivateStoreBuyMsg |
|  | VehicleStart |
|  | RequestTimeCheck |
|  | StartAllianceWar |
|  | ReplyStartAllianceWar |
|  | StopAllianceWar |
|  | ReplyStopAllianceWar |
|  | SurrenderAllianceWar |
|  | SkillCoolTime |
|  | PackageToList |
|  | PackageSendableList |
|  | EarthQuake |
|  | FlyToLocation |
|  | BlockList |
|  | SpecialCamera |
|  | NormalCamera |
|  | CastleSiegeInfo |
|  | CastleSiegeAttackerList |
|  | CastleSiegeDefenderList |
|  | NickNameChanged |
|  | PledgeStatusChanged |
|  | RelationChanged |
|  | EventTrigger |
|  | MultiSellList |
|  | SetSummonRemainTime |
|  | SkillRemainSec |
|  | NetPing |