import * as _ from 'lodash';
import {FkDestructibleObject,FkDstrGridData} from './destructibleobject';
import {FkQuadTree} from './fkquadtree';
import {FkFactory} from './fkfactory';

export abstract class FkSerializable {
	protected dataKeyList = [];
	protected dataKillKeyList = [];
	protected dataClassType;

	public constructor( _classType: string, _keyList: string[], _killKeyList: string[] ){
		this.dataKeyList = _keyList;
		this.dataKillKeyList = _killKeyList;
		this.dataClassType = _classType;
	}

	public abstract afterUnserializeInit();

	public kill() {
		if( this.dataKillKeyList == null )
			return;
		for( var i = 0; i < this.dataKillKeyList.length; i++ ){
			var k = this.dataKillKeyList[i];
			if ( this[k] ) {
				if ( Array.isArray( this[k] ) ){
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

export class FkSerialize {
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
        target.kill();
        for ( var i = 0; i < keyList.length; i++ ){
            var k = keyList[i];
            if ( src[k] == null )
            	continue;
            if ( Array.isArray( src[k] ) ){
				target[k] = [];
				for ( var j = 0; j < src[k].length; j++ ){
					var tmp = FkFactory.factory( src[k][j].CLASS_TYPE, src[k][j] );
					target[k].push( tmp );
				}
			}
			else target[k] = FkFactory.factory( src[k].CLASS_TYPE, src[k] );
        }
    }

    private static serializeWithType( obj : any ) {
		if ( obj == null )
			return null;
		// In case of Array
		if ( Array.isArray( obj ) ) {
			var rltArr = [];
			for( var i = 0; i < obj.length; i++ ) {
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
				if ( FkFactory.getRegistClasses(className) != null ) {
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