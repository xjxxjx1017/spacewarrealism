import 'phaser';
import * as _ from 'lodash';
import { PanelEditShip } from "../ui-components/panel-edit-ship";
import "../ui-components/panel-edit-ship-vue";
import { PanelInformation } from "../ui-components/panel-information";
import { PanelGameState } from "../ui-components/panel-game-state";
import "../ui-components/panel-information-vue";
import { Ship } from "./ship";
import { FkWithMouse } from "../ui-components/fkwithmouse";
import { EventHpChanged } from "../events/eventhpchanged";
import { EventCheckCondition, EnumCheckCondition } from "../events/eventcheckcondition";
var GameState;
(function (GameState) {
    GameState[GameState["STATE_BATTLE"] = 0] = "STATE_BATTLE";
    GameState[GameState["STATE_IDLE"] = 1] = "STATE_IDLE";
})(GameState || (GameState = {}));
var GameData = /** @class */ (function () {
    function GameData(_game) {
        this.dataState = GameState.STATE_IDLE;
        GameData.inst = _game;
        this.dataGame = _game;
    }
    GameData.prototype.save = function () {
        console.log("==== test start ====");
        console.log("Original: ");
        console.log(this);
        var tmpA = this.dataShipList[0].serialize();
        console.log("Saved as: ");
        console.log(tmpA);
        localStorage.setItem("ship", tmpA);
    };
    GameData.prototype.load = function () {
        var tmpA = localStorage.getItem("ship");
        this.dataShipList[0].unserialize(tmpA);
        console.log("Loaded as: ");
        console.log(this);
        console.log("==== test end ====");
    };
    GameData.prototype.run = function () {
        var self = this;
        var shipData = [
            new Phaser.Geom.Rectangle(15, 15, 200, 200),
            new Phaser.Geom.Rectangle(100 + 15 + 300, 15, 200, 200)
        ];
        this.dataShipList = [];
        _.forEach(shipData, function (d) {
            var ship = new Ship().init(d);
            self.dataShipList.push(ship);
        });
        this.uiWithMouse = new FkWithMouse(this.dataGame);
        this.uiEditorShip = new PanelEditShip(this.dataGame);
        var uiGroup = [];
        var count = 0;
        _.forEach(self.dataShipList, function (s) {
            var infor = {
                stateHp: s.getHp(),
                stateWidth: s.dataRect.width,
                statePosX: s.dataRect.x,
                statePosY: s.dataRect.y - 20,
                stateHeight: 18,
            };
            uiGroup.push(infor);
            // Use event to pass ship HP updates to UI
            EventHpChanged.Manager.attach("hpupdate" + count, function (id, evt) {
                if (s == evt.ship)
                    infor.stateHp = evt.hp;
            });
            count++;
        });
        this.uiInformation = new PanelInformation(this.dataGame, uiGroup);
        this.uiGameState = new PanelGameState(this);
        EventCheckCondition.Manager.attach(EnumCheckCondition.CONDITION_GAME_WIN, function (_id, _event) { self.checkWiningCondition(); });
    };
    GameData.prototype.checkWiningCondition = function () {
        var gameEnd = false;
        _.forEach(this.dataShipList, function (s) {
            if (!s.getIsAlive())
                gameEnd = true;
        });
        if (gameEnd)
            this.changeStateToIdle();
    };
    GameData.prototype.changeStateToBattle = function () {
        var self = this;
        if (this.tmpAttackTimer) {
            this.tmpAttackTimer.remove(function () { });
            this.tmpAttackTimer = null;
        }
        // Auto attack every seconds
        this.tmpAttackTimer = this.dataGame.time.addEvent({ delay: 1000, callback: function () {
                self.dataShipList[0].attack(self.dataShipList[1]);
                self.dataShipList[1].attack(self.dataShipList[0]);
                EventCheckCondition.Manager.notify(EnumCheckCondition.CONDITION_GAME_WIN);
            }, repeat: 40 });
    };
    GameData.prototype.changeStateToIdle = function () {
        if (this.tmpAttackTimer) {
            this.tmpAttackTimer.remove(function () { });
            this.tmpAttackTimer = null;
        }
    };
    GameData.prototype.reset = function () {
        console.log("reset");
    };
    return GameData;
}());
export { GameData };
//# sourceMappingURL=gamedata.js.map