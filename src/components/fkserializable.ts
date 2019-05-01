import * as _ from 'lodash';

export interface FkSerializable {
	// Each savable item need to implement this
	constructFromObj<T>( obj:any ) : T;
}

export class FkSerialize {

	// Use this method on all sub properties of GameData
	public serialize<T>( inst : T ) : string {
	    return JSON.stringify(inst);
	}

	// Use this method on GameData
	public unserialize<T extends FkSerializable>( str : string, 
		TConstuctor : {new(...args:any[]):T} ) : T {
	    var inst = new TConstuctor();
	    var obj = JSON.parse(str);
	    return inst.constructFromObj<T>( obj );
	}
}