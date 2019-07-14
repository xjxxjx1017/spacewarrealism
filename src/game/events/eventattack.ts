import {} from "../importall";
import {EventManager} from "./eventmanager";

export class EventAttack {
    public static Manager : EventManager<EventAttack> = new EventManager<EventAttack>();

    public ATTACKED_BY_POINT : string = "ATTACKED_BY_POINT";
    // public ATTACKED_BY_LINE : string = "ATTACKED_BY_LINE";
    public onKill : any;
    public p : Phaser.Geom.Point;
    public strength : number;

    public constructor( _onKill: () => void, _p : Phaser.Geom.Point, _strength : number ) {
    	this.onKill = _onKill;
        this.p = _p;
        this.strength = _strength;
    }
} 