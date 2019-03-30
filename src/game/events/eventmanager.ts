
export class EventManager<TEvent> {
	private observerList : Map<any, ((TEvent)=>void)>;

	public constructor() {
		this.observerList = new Map<any, ((TEvent)=>void)>();
	}

    public attach( _id : any, _eventFunc : (TEvent)=>void ) : void {
        this.observerList.set( _id, _eventFunc );
    }

    public detach( _id : any ) {
    	delete this.observerList[ _id ];
    }

    public notify( _evt : TEvent ) : void {
    	this.observerList.forEach( function( value : (TEvent)=>void, key, map ){
    		if ( value != null ) 
    			value( _evt );
    	})
    }
}