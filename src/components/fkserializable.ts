import * as _ from 'lodash';
import {FkDestructibleObject,FkDstrGridData} from './destructibleobject';
import {FkQuadTree} from './fkquadtree';

export interface FkSerializable {
	// Each savable item need to implement this
	serialize() : string;
	unserialize( s : string );
	// new();
}

export class FkSerialize {

    public static unserialize( target : any, s : string, keyList : string[] ) {
        var src = JSON.parse( s );
        for ( var i = 0; i < keyList.length; i++ ){
            var k = keyList[i];
            if ( src[k] == null )
            	continue;
            if ( src[k].CLASS_TYPE == 'Boolean' )
        		target[k] = src[k].boolean == true;
        	else if ( src[k].CLASS_TYPE == 'Number' )
				target[k] = parseInt( src[k].num );
			else if ( src[k].CLASS_TYPE == 'Rectangle')
				target[k] = FkSerialize.factory( src[k].CLASS_TYPE, src[k].x, src[k].y, src[k].width, src[k].height );
			else if ( src[k].length >= 0 ){
				target[k] = [];
				for ( var i = 0; i < src[k].length; i++ ){
					var tmp = FkSerialize.factory( src[k][i].CLASS_TYPE );
					tmp.unserialize( JSON.stringify( src[k][i] ) );
					target[k].push( tmp );
				}
			}
			else {
				var tmp = FkSerialize.factory( src[k].CLASS_TYPE );
				tmp.unserialize( JSON.stringify( src[k] ) );
				target[k] = tmp;
			}
        }
    }

    public static serialize( src: any, keyList : string[] ) : string {
        var saveObj = {};
        for ( var i = 0; i < keyList.length; i++ ) {
            var k = keyList[i];
            var v = src[k];
            var toSave = FkSerialize.serializeWithType( v );
            if ( toSave != null && v != null && v.constructor != null )
                toSave.CLASS_TYPE = v.constructor.name; // This is important, we need class 
            saveObj[k] = toSave;
        }
        return JSON.stringify( saveObj );
    }

    public static serializeWithType( obj : any ) {
        // In case of Boolean
        if ( obj === false || obj === true )
            return {
                boolean: obj,    // A special entry for Booleans
            };
		if ( obj == null )
			return null;
		// In case of Array
		if ( obj.length > 0 ) {
			var rlt = [];
			for( var i = 0; i < obj.lenth; i++ ) {
				rlt.push( this.serializeWithType( obj[i] ) )
			}
			return rlt;
		}
		// In case of Serializable Object
		if ( obj.serialize != null )
			return JSON.parse( obj.serialize() );
		// In case of Phaser.Geom.Rectangle
		if ( obj.width > 0 && obj.height > 0 )
			return {
				x: obj.x,
				y: obj.y,
				width: obj.width,
				height: obj.height
			};
		// In case of Number
		if ( !isNaN( obj ) )
			return {
				num: obj,	// A special entry for numbers
			};
    }

	private static factory( className: string, ...arg ) : any{
		switch( className ){
			case "Rectangle": return new Phaser.Geom.Rectangle( arg[0], arg[1], arg[2], arg[3]);
			case "FkDstrGridData": return new FkDstrGridData();
			case "FkQuadTree": return new FkQuadTree();
			default: return null;
		}
	}
}