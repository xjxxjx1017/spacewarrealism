import "phaser";
import {EventManager} from "./eventmanager";
import {Ship} from "../objects/ship";
import {FkDestructibleObject} from "../../components/destructibleobject";

export class EventEntityUpdate {
    public static Manager : EventManager<EventEntityUpdate> = new EventManager<EventEntityUpdate>();

    public constructor() { 
    }
} 