import { Lodash as _, FkSerializable, EventShipBrush, EBrushType, EventGameModeChanged, EGameModeChanged, EventStampType, EStampType, EventHpChanged, EventGameUpdate, EventEntityUpdate, EventAttack, PanelEditShip, PanelInformationUnit, PanelGameState, FkDestructibleObject, FkDstrGridData, FkQuadTree, Gun, FkWithMouse, EventCheckCondition, EnumCheckCondition, GameData, FkUtil, Setting } from "../importall";

export class Meteorite {
    // TODO: delete dataRect, no longer needed
    private id: string;
    public dataRect: Phaser.Geom.Rectangle;
    public entity: FkDestructibleObject;
    public dataContainer: any;
    private groupId: number;

    public constructor() {
        this.id = FkUtil.generateId();
    }

    public kill() {
        this.entity.kill();
        if (this.dataContainer != null) {
            this.dataContainer.destroy();
            this.dataContainer = null;
        }
        EventAttack.Manager.detach(this.id);

        // TODO: remove container from game scene
    }

    public init(groupId: number, _rect: Phaser.Geom.Rectangle) {
        this.groupId = groupId;
        this.dataRect = _rect;
        this.dataContainer = GameData.inst.add.container(_rect.x, _rect.y);
        this.dataContainer.setAngle(270);
        this.dataContainer.setSize(_rect.width, _rect.height);
        this.initMatter();
        // Init ship body entity and events
        this.entity = new FkDestructibleObject().init(this.dataContainer, -_rect.width / 2, -_rect.height / 2, _rect.width, _rect.height, null);
        this.initAfter();

        return this;
    }

    private initMatter() {
        var self = this;
        GameData.inst.matter.add.gameObject(this.dataContainer, { shape: { type: 'circle', radius: 10 } });
        
        this.dataContainer.setCollisionCategory( GameData.COLLIDE_SHIP );
        this.dataContainer.setCollidesWith( [1] );
    }

    protected initAfter() {
        var self = this;
        // Init events
        EventAttack.Manager.attach(this.id, (id, evt) => {
            if (evt.groupId == self.groupId)
                return;
            var p = new Phaser.Geom.Point();
            this.dataContainer.getLocalTransformMatrix().applyInverse(evt.p.x, evt.p.y, p);
            var collide = self.entity.collisionWithPoint(p, FkDstrGridData.getStateVisible());
            if (collide) {
                self.attackedByPoint(p, evt.strength);
                evt.onKill();
            }
        })
        // Show Object
        this.entity.drawDstrObject();
    }

    public getHp(): number {
        return Math.floor(this.entity.area(function (node: FkDstrGridData): boolean {
            return node.dataIsVisible;
        }) * 100);
    }

    private afterAttacked() {
        var self = this;
        self.entity.drawDstrObject();
    }

    public attackedByPoint(_srcLocal: Phaser.Geom.Point, _strength: number) {
        console.log( "attacked... ship " + this.id );
        var self = this;
        self.entity.modifyByCircle(new Phaser.Geom.Circle(_srcLocal.x, _srcLocal.y, _strength), FkDstrGridData.getStateHide());
        self.afterAttacked();
    }

    public attackedByLine(_srcGlobal: Phaser.Geom.Point, _targetGlobal: Phaser.Geom.Point, _strength: number) {
        var self = this;
        var locMat: Phaser.GameObjects.Components.TransformMatrix = this.dataContainer.getLocalTransformMatrix();
        var _srcPoint: any = new Phaser.Geom.Point();
        var _targetPoint: any = new Phaser.Geom.Point();
        locMat.applyInverse(_srcGlobal.x, _srcGlobal.y, _srcPoint);
        locMat.applyInverse(_targetGlobal.x, _targetGlobal.y, _targetPoint);

        self.entity.modifyByLine(_srcPoint.x, _srcPoint.y,
            _targetPoint.x, _targetPoint.y, _strength,
            FkDstrGridData.getStateHide());
        self.afterAttacked();
    }

    public getIsAlive(): boolean {
        return this.getHp() > 20;
    }
}