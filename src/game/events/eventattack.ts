import {} from "../importall";
import {EventManager} from "./eventmanager";

export class EventAttack {
    public static Manager : EventManager<EventAttack> = new EventManager<EventAttack>();

    public ATTACKED_BY_POINT : string = "ATTACKED_BY_POINT";
    // public ATTACKED_BY_LINE : string = "ATTACKED_BY_LINE";
    public groupId : number;
    public onKill : any;
    public p : Phaser.Geom.Point;
    public strength : number;

    public constructor( groupId : number, onKill: () => void, p : Phaser.Geom.Point, strength : number ) {
        this.groupId = groupId;
    	this.onKill = onKill;
        this.p = p;
        this.strength = strength;
    }
} 