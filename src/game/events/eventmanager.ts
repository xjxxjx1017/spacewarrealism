
export class EventManager<TEvent> {
	private observerList : Map<any, ((_id:any,_event:TEvent)=>void)>;

	public constructor() {
		this.observerList = new Map<any, ((_id:any,_event:TEvent)=>void)>();
	}

    public attach( _id : any, _eventFunc : (_id:any,_event:TEvent)=>void ) : void {
        this.observerList.set( _id, _eventFunc );
    }

    public detach( _id : any ) {
    	delete this.observerList[ _id ];
    }

    public notify( _evt : TEvent ) : void {
    	this.observerList.forEach( function( value : (_id:any,_event:TEvent)=>void, key, map ){
    		if ( value != null ) 
    			value( key, _evt );
    	})
    }
}