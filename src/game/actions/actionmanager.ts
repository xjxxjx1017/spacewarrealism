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
    private acts: Action[];

	public constructor() {
		this.funcMap = new Map<eActionType, (act: Action)=>void>();
        this.acts = []; 
	}
    
    public register( type: eActionType, func: (act: Action)=>void ){
        this.funcMap.set( type, func );
    }
    
    public resolveStack() {
        // ### temp resolve logic
        for( var i = 0; i < this.acts.length; i++ ){
            this.resolveAction( this.acts[i] );
        }
        this.acts = []; 
    }

    public resolveAction( act: Action ) {
        var func = this.funcMap.get(act.type);
        func( act );
    }

    public act( action: Action ) {
        this.acts.push( action );
        this.resolveStack();
    }
}
