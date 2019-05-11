import * as _ from 'lodash';
import {FkDestructibleObject,FkDstrGridData} from './destructibleobject';
import {FkQuadTree} from './fkquadtree';

export abstract class FkSerializable {
	protected dataKeyList = [];
	protected dataKillKeyList = [];
	protected dataClassType;

	public constructor( _classDef: Class, _classType: string, _keyList: string[], _killKeyList: string[] ){
		this.dataKeyList = _keyList;
		this.dataKillKeyList = _killKeyList;
		this.dataClassType = _classType;
		if ( FkSerialize.registeredClass[_classType] == null )
			FkSerialize.registeredClass[_classType] = _classDef;
	}

	public abstract afterUnserializeInit();

	public kill() {
		if( this.dataKillKeyList == null )
			return;
		for( var i = 0; i < this.dataKillKeyList.length; i++ ){
			var k = this.dataKillKeyList[i];
			if ( this[k] ) {
				if ( this[k].length != null ){
		            for( var i = 0; i < this[k].length; i++ ){
		                var item = this[k][i];
		                if ( item.kill == null ){
		                	alert( "Kill function not found on: " + this.dataClassType + "." + k );
		                }
		                item.kill();
		                this[k][i] = null;
		            }
		            this[k] = null;
				}
				else {
	                if ( this[k].kill == null ){
	                	alert( "Kill function not found on: " + this.dataClassType + "." + k );
	                }
		            this[k].kill();
		            this[k] = null;
				}
			}
		}
	}

	public serialize() : string {
        return FkSerialize.serialize( this, this.dataKeyList );
	}

	public unserialize( s : string ) {
        FkSerialize.unserialize( this, s, this.dataKeyList );
        this.afterUnserializeInit();
	}
}

class FkSerialize {
	public static registeredClass: Map<string, Class> = new Map<string, Class>();

    public static serialize( src: any, keyList : string[] ) : string {
        var saveObj = {};
        for ( var i = 0; i < keyList.length; i++ ) {
            var k = keyList[i];
            var v = src[k];
            var toSave = FkSerialize.serializeWithType( v );
            saveObj[k] = toSave;
        }
        return JSON.stringify( saveObj );
    }

    public static unserialize( target : any, s : string, keyList : string[] ) {
        var src = JSON.parse( s );
        for ( var i = 0; i < keyList.length; i++ ){
            var k = keyList[i];
            if ( src[k] == null )
            	continue;
            target.kill();
            if ( src[k].length >= 0 ){
				target[k] = [];
				for ( var i = 0; i < src[k].length; i++ ){
					var tmp = FkSerialize.factory( src[k][i].CLASS_TYPE, src[k][i] );
					target[k].push( tmp );
				}
			}
			else target[k] = FkSerialize.factory( src[k].CLASS_TYPE, src[k] );
        }
    }

	private static factory( className: string, param: any ) : any{
		var tmp;
		switch( className ){
			case "Boolean": return param.boolean == true;
			case "Number": return parseInt( param.num );
			case "Rectangle": return new Phaser.Geom.Rectangle( param.x, param.y, param.width, param.height);
			case "Point": return new Phaser.Geom.Point( param.x, param.y );
			default: 
				if ( FkSerialize.registeredClass[className] != null ){
					tmp = new FkSerialize.registeredClass[className]();
					tmp.unserialize( JSON.stringify( param ) );
					return tmp;
				}
				alert( "Class not defined in factory: " + className ); 
				return null;
		}
	}

    private static serializeWithType( obj : any ) {
		if ( obj == null )
			return null;
		// In case of Array
		if ( obj.length > 0 ) {
			var rltArr = [];
			for( var i = 0; i < obj.lenth; i++ ) {
				rltArr.push( this.serializeWithType( obj[i] ) )
			}
			return rltArr;
		}
		var rlt: any = {};
		var className = obj.constructor.name;
		switch( className ){
			case "Boolean": rlt.boolean = obj; break;
			case "Number": rlt.num = obj; break;
			case "Rectangle": 
				rlt.x = obj.x;
				rlt.y = obj.y;
				rlt.width = obj.width;
				rlt.height = obj.height;
				break;
			case "Point":
				rlt.x = obj.x;
				rlt.y = obj.y;
				break;
			default:
				if ( FkSerialize.registeredClass[className] != null ) {
					rlt = JSON.parse( obj.serialize() );
					break;
				}
				alert( "Class not defined in serializeWithType: " + className ); 
				break;
		}
		rlt.CLASS_TYPE = className;
		return rlt;
    }
}