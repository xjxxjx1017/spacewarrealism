import {Ship} from "../importall";
import {EventManager} from "./eventmanager";

export class EventHpChanged {
    public static Manager : EventManager<EventHpChanged> = new EventManager<EventHpChanged>();

    public ship : Ship;
    public hp : number;

    public constructor( _ship : Ship, _hp : number ) { 
        this.ship = _ship;
        this.hp = _hp;
    }
} 