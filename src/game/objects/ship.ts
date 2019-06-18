import {Lodash as _, FkSerializable, EventShipBrush, EBrushType, EventStampType, EStampType, EventHpChanged, EventEntityUpdate, PanelEditShip, PanelInformationUnit, PanelGameState, FkDestructibleObject, FkDstrGridData, FkQuadTree, Gun, FkWithMouse, EventCheckCondition, EnumCheckCondition, GameData, FkUtil} from "../importall";

export class Ship extends FkSerializable{
    // TODO: delete dataRect, no longer needed
    public dataRect : Phaser.Geom.Rectangle;
    public dataShipEntity : FkDestructibleObject;
    private dataGunList : Gun[];
    public dataContainer : any;
    private dataPlayerControl: boolean;
    public dataCursors: Phaser.Input.Keyboard.CursorKeys;

    public constructor(){ 
        super(); 
    }

    public kill() {
        this.dataShipEntity.kill();
        _.map( this.dataGunList, function(x){
            x.kill();
        });
        this.dataGunList = [];
        if ( this.dataContainer != null ){
            this.dataContainer.destroy();
            this.dataContainer = null;
        }
        EventShipBrush.Manager.detach( this );
        EventStampType.Manager.detach( this );
        EventEntityUpdate.Manager.detach( this );
        // TODO: remove container from game scene
    }

    public getObjectData( info: any, context: any ) : any {
        var self = this;
        info["dataPlayerControl"] = this.dataPlayerControl;
        info["dataContainer"] = this.dataContainer.toJSON();
        info["dataRect"] = { x: this.dataRect.x, y: this.dataRect.y, width: this.dataRect.width, height: this.dataRect.height };
        info["dataShipEntity"] = this.dataShipEntity.getObjectData( {}, this );
        info["dataGunList"] = _.map( this.dataGunList, function(x){
            return x.getObjectData( {}, self ) 
        });
        return info;
    }

    public constructFromObjectData( info: any, context: any ): any {
        var self = this;
        this.kill();
        this.dataRect = new Phaser.Geom.Rectangle( 
            info.dataRect.x, info.dataRect.y, 
            info.dataRect.width, info.dataRect.height );
        this.dataPlayerControl = info.dataPlayerControl;
        this.dataContainer = GameData.inst.add.container( info.dataContainer.x, info.dataContainer.y );
        this.dataContainer.setAngle(info.dataContainer.angle);
        this.dataContainer.setSize( info.dataRect.width, info.dataRect.height);
        this.initMatter();
        this.dataShipEntity = new FkDestructibleObject().constructFromObjectData( info.dataShipEntity, this );
        this.dataGunList = _.map( info.dataGunList, function(x){
            return new Gun().constructFromObjectData( x, self );
        });
        this.initAfter();
        return this;
    }

	public init( _rect : Phaser.Geom.Rectangle, _playerControl: boolean ) {
        this.dataRect = _rect;
        this.dataPlayerControl = _playerControl;
        this.dataContainer = GameData.inst.add.container( _rect.x, _rect.y );
        this.dataContainer.setAngle( 270 );
        this.dataContainer.setSize( _rect.width, _rect.height );
        this.initMatter();
        // Init ship body entity and events
        this.dataShipEntity = new FkDestructibleObject().init( this.dataContainer, -_rect.width/2, -_rect.height/2, _rect.width, _rect.height, null );
        // Init guns on ship
        this.dataGunList = [];
        this.initAfter();

        return this;
	}

    private initMatter(){
        var self = this;
        GameData.inst.matter.add.gameObject(this.dataContainer, {});
        if ( this.dataPlayerControl ){
            GameData.inst.cameras.main.startFollow(this.dataContainer, true, 0.05, 0.05, 0, 0);
            this.dataContainer.setFixedRotation();
            this.dataContainer.setFrictionAir(0.05);
            this.dataContainer.setMass(30);
            // this.dataCursors = GameData.inst.input.keyboard.createCursorKeys();
            this.dataCursors = GameData.inst.input.keyboard.addKeys(
                {up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D});
            GameData.inst.input.on( "pointermove", function(p){
                var pp: any = new Phaser.Geom.Point();
                GameData.inst.cameras.main.getWorldPoint( p.x, p.y, pp );
                var a = FkUtil.getAngle( self.dataContainer.x, self.dataContainer.y, pp.x, pp.y ) - 90;
                FkUtil.debugDrawLine( new Phaser.Geom.Point( self.dataContainer.x, self.dataContainer.y ), pp  );
                self.dataContainer.setAngle( a );
            })
        }
    }

    protected initAfter(){
        var self = this;
        // Init events
        EventShipBrush.Manager.attach( this, (id,evt)=> { self.onBrushDraw( evt ); } );
        EventStampType.Manager.attach( this, (id,evt)=> { self.onPlaceStamp( evt ); } );
        EventEntityUpdate.Manager.attach( this, (id,evt)=> { 
            if ( this == id ) 
                self.onEntityUpdate( evt ); 
        });
        // Show Object
        this.dataShipEntity.drawDstrObject();
    }

    public update( time: number, delta: number )
    {
        if ( this.dataPlayerControl ) {
            if (this.dataCursors.left.isDown)
            {
                this.dataContainer.applyForce( { x: -0.1, y: 0 } );
            }
            else if (this.dataCursors.right.isDown)
            {
                this.dataContainer.applyForce( { x: 0.1, y: 0 } );
            }

            if (this.dataCursors.up.isDown)
            {
                this.dataContainer.applyForce( { x: 0, y: -0.1 } );
            }
            else if (this.dataCursors.down.isDown)
            {
                this.dataContainer.applyForce( { x: 0, y: 0.1 } );
            }
        }
    }


    public getHp() : number {
        return Math.floor( this.dataShipEntity.area( function(node : FkDstrGridData) : boolean { 
                return node.dataIsVisible;
            }) * 100 );
    }

    private onEntityUpdate( evt ) {
        var hp = this.getHp();
        EventHpChanged.Manager.notify( new EventHpChanged( this, hp) );
    }

    public attack( _target : Ship ) {
        var self = this;
        _.forEach( self.dataGunList, function(g) {
            g.attack( _target, 20 );
        });
    }

    public attackedByLine( _srcGlobal : Phaser.Geom.Point, _targetGlobal : Phaser.Geom.Point, _strength : number ) {
        var self = this;
        var locMat: Phaser.GameObjects.Components.TransformMatrix = this.dataContainer.getLocalTransformMatrix();
        var _srcPoint: any = new Phaser.Geom.Point();
        var _targetPoint: any = new Phaser.Geom.Point();
        locMat.applyInverse( _srcGlobal.x, _srcGlobal.y, _srcPoint );
        locMat.applyInverse( _targetGlobal.x, _targetGlobal.y, _targetPoint );

        self.dataShipEntity.modifyByLine( _srcPoint.x, _srcPoint.y, 
            _targetPoint.x, _targetPoint.y, _strength,
            FkDstrGridData.getStateHide() );
        self.dataShipEntity.drawDstrObject();
        var toRemove = [];
        _.forEach( self.dataGunList, function(g) {
            var b = self.dataShipEntity.collisionWithPoint( g.dataPos, FkDstrGridData.getStateVisible() );
            if ( !b )
                toRemove.push( g );
        });
        _.forEach( toRemove, function(g) {
            g.kill();
            _.pull( self.dataGunList, g );
        });
    }

    private onPlaceStamp( _evt : EventStampType ) {
        var p = GameData.inst.cameras.main.getWorldPoint(_evt.pos.x, _evt.pos.y);
        var p2: any = this.dataContainer.pointToContainer( p );
        if ( !this.dataShipEntity.collisionWithPoint( p2, FkDstrGridData.getStateVisible() ) )
            return;
        switch ( _evt.type ) {
            case EStampType.STAMP_TURRET_RED:
                var g = new Gun().init( this.dataContainer, p2 );
                this.dataGunList.push( g );
                break;
            default:
                console.log( "Brush not found." );
                break;
        }
    }

    private onBrushDraw( _evt : EventShipBrush ) {
        var p = GameData.inst.cameras.main.getWorldPoint(_evt.pos.x, _evt.pos.y);
        var p2: any = this.dataContainer.pointToContainer( p );
    	switch ( _evt.brushType ) {
    		case EBrushType.BRUSH_NORMAL:
    			this.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( p2.x, p2.y, _evt.brushSize ),
    				FkDstrGridData.getStateVisible() );
				this.dataShipEntity.drawDstrObject();
    			break;
    		case EBrushType.BRUSH_ERASE:
    			this.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( p2.x, p2.y, _evt.brushSize ),
    				FkDstrGridData.getStateHide() );
				this.dataShipEntity.drawDstrObject();
    			break;
    		default:
    			console.log( "Brush not found." );
    			break;
    	}
    }

    public getIsAlive() : boolean {
        return this.dataGunList.length > 0;
    }
}