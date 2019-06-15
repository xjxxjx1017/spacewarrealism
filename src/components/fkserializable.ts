import { Lodash as _, FkDestructibleObject, FkDstrGridData, FkQuadTree, FkFactory } from "../game/importall";

export abstract class FkSerializable {

	public abstract kill();
	public abstract getObjectData( info: any, context: any ): any;
	public abstract constructFromObjectData( info: any, context: any ): any;
}

export class FkSerialize {
}