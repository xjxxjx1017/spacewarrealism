
import 'phaser';
import * as _ from 'lodash';

export class FkFactory {
	private static registeredClass: Map<string, Class> = new Map<string, Class>();

	public static registClasses( className: string, classType: Class ){
		FkFactory.registeredClass[ className ] = classType;
	}

	public static factory( className: string, param: any ) : any{
		switch( className ){
			case "Boolean": return param.boolean == true;
			case "Number": return parseInt( param.num );
			case "Rectangle": return new Phaser.Geom.Rectangle( param.x, param.y, param.width, param.height);
			case "Point": return new Phaser.Geom.Point( param.x, param.y );
			default: 
				if ( FkFactory.registeredClass[className] != null ){
					var tmp = new FkFactory.registeredClass[className]();
					tmp.unserialize( JSON.stringify( param ) );
					return tmp;
				}
				alert( "Class not defined in factory: " + className ); 
				return null;
		}
	}
}