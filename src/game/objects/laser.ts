import "phaser";
import {Ship} from "./ship";
import {FkDestructibleObject, FkDstrGridData} from "../../components/destructibleobject";

export class Laser {
	public attack( _pos : Phaser.Geom.Point, _ship : Ship ) {
		_ship.dataShipEntity.modifyByLine( _pos.x, _pos.y, 0, 0, 5,
			FkDstrGridData.getStateHide() );
        _ship.dataShipEntity.drawDstrObject();
	}
}