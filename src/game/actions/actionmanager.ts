export enum eActionType {
    ACTION_MOVE,
}

export enum eActionDurationType {
    SUSTAIN
}

export interface Action {
    type: eActionType;
    durType: eActionDurationType;
    durTime: number;
}

export interface ActionMove extends Action {
    vec1: { x: number, y: number };
}

export class ActionResolver {
	private funcMap : Map<eActionType, (act: Action)=>void>;

	public constructor() {
		this.funcMap = new Map<eActionType, (act: Action)=>void>();
	}
    
    public register( type: eActionType, func: (act: Action)=>void ){
        this.funcMap.set( type, func );
    }
    
    public resolveStack( acts: Action[] ) {
        for( var i = 0; i < acts.length; i++ ){
            this.resolveAction( acts[i] );
        }
    }

    public resolveAction( act: Action ) {
        var func = this.funcMap[act.type];
        func( act );
    }
}
