import {Lodash as _, FkSerializable, EventShipBrush, EBrushType, EventStampType, EStampType, EventHpChanged, EventEntityUpdate, PanelEditShip, PanelInformationUnit, PanelGameState, FkDestructibleObject, FkDstrGridData, FkQuadTree, Gun, FkWithMouse, EventCheckCondition, EnumCheckCondition, GameData} from "../importall";

export class Ship extends FkSerializable {
    public dataRect : Phaser.Geom.Rectangle;
    public dataShipEntity : FkDestructibleObject;
    private dataGunList : Gun[];
    public dataContainer : any;
    private dataPlayerControl: boolean;
    public dataCursors: Phaser.Input.Keyboard.CursorKeys;

    public constructor(){
        super( "Ship", ["dataRect", "dataShipEntity", "dataGunList"], ["dataShipEntity", "dataGunList"] );
    }

	public init( _rect : Phaser.Geom.Rectangle, _playerControl: boolean ) {
        this.dataRect = _rect;
        this.dataPlayerControl = _playerControl;
        this.dataContainer = GameData.inst.add.container( _rect.x, _rect.y );
        this.dataContainer.setSize( _rect.width, _rect.height );
        GameData.inst.matter.add.gameObject(this.dataContainer, {});
        if ( this.dataPlayerControl ){
            GameData.inst.cameras.main.startFollow(this.dataContainer, true, 0.05, 0.05, 0, 0);
            this.dataContainer.setFixedRotation();
            this.dataContainer.setAngle(270);
            this.dataContainer.setFrictionAir(0.05);
            this.dataContainer.setMass(30);
            this.dataCursors = GameData.inst.input.keyboard.createCursorKeys();
        }
        // Init ship body entity and events
        this.dataShipEntity = new FkDestructibleObject().init( this.dataContainer, -_rect.width/2, -_rect.height/2, _rect.width, _rect.height, null );
        // Init guns on ship
        this.dataGunList = [];
        this.afterUnserializeInit();

        return this;
	}

    public kill(){
        super.kill();
        EventShipBrush.Manager.detach( this );
        EventStampType.Manager.detach( this );
        EventEntityUpdate.Manager.detach( this );
    }

    public afterUnserializeInit(){
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
                this.dataContainer.thrustLeft(0.1);
            }
            else if (this.dataCursors.right.isDown)
            {
                this.dataContainer.thrustRight(0.1);
            }

            if (this.dataCursors.up.isDown)
            {
                this.dataContainer.thrust(0.1);
            }
            else if (this.dataCursors.down.isDown)
            {
                this.dataContainer.thrustBack(0.1);
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

    public attackedByLine( _srcPoint : Phaser.Geom.Point, _targetPoint : Phaser.Geom.Point, _strength : number ) {
        var self = this;
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
            g.destroy();
            _.pull( self.dataGunList, g );
        });
    }

    private onPlaceStamp( _evt : EventStampType ) {
        var p = GameData.inst.cameras.main.getWorldPoint(_evt.pos.x, _evt.pos.y);
        var p2: any = this.dataContainer.pointToContainer( p );
        if ( !this.dataShipEntity.collisionWithPoint( _evt.pos, FkDstrGridData.getStateVisible() ) )
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
    	switch ( _evt.brushType ) {
    		case EBrushType.BRUSH_NORMAL:
    			this.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( _evt.pos.x, _evt.pos.y, _evt.brushSize ),
    				FkDstrGridData.getStateVisible() );
				this.dataShipEntity.drawDstrObject();
    			break;
    		case EBrushType.BRUSH_ERASE:
    			this.dataShipEntity.modifyByCircle( 
    				new Phaser.Geom.Circle( _evt.pos.x, _evt.pos.y, _evt.brushSize ),
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

    public getTargetPoint( _source : Phaser.Geom.Point ) : Phaser.Geom.Point {
        var MULTI = 10; 
        var x = ( Math.random() * this.dataRect.width + this.dataRect.x - _source.x ) * MULTI;
        var y = ( Math.random() * this.dataRect.height + this.dataRect.y - _source.y ) * MULTI;
        return new Phaser.Geom.Point( _source.x + x, _source.y + y );
    }
}