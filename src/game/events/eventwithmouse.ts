import {EventManager} from "./eventmanager";

export class EventWithMouse {
	public static IMAGE_RED_TURRET : string = "red_turret";
	public static Manager : EventManager<EventWithMouse> = new EventManager<EventWithMouse>();

	public isActive : boolean;
	public src : string;

	public constructor( _src : string ) { 
		this.isActive = _src != null;
		this.src = _src;
	}
} 