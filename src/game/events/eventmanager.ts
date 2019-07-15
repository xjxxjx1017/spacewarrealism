
export class EventManager<TEvent> {
	private observerList : Map<any, ((id:string,event:TEvent)=>void)>;

	public constructor() {
		this.observerList = new Map<any, ((id:string,event:TEvent)=>void)>();
	}

    public attach( id : string, eventFunc : (id:string,event:TEvent)=>void ) : void {
        this.observerList.set( id, eventFunc );
    }

    public detach( id : string ) {
		this.observerList.delete( id );
    }

    public notify( evt : TEvent ) : void {
    	this.observerList.forEach( function( value : (id:string,event:TEvent)=>void, key ){
    		if ( value != null ) 
    			value( key, evt );
    	})
    }
}