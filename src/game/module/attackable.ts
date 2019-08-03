import { Lodash as _, FkDestructibleObject, FkDstrGridData } from "../importall";

export class Attackable {

    public static attackedByPoint( 
        entity:FkDestructibleObject, afterAttacked: any, 
        srcLocal: Phaser.Geom.Point, strength: number) {

        entity.modifyByCircle(new Phaser.Geom.Circle(srcLocal.x, srcLocal.y, strength), FkDstrGridData.getStateHide());
        afterAttacked();
    }

    public static attackedByLine( 
        entity:FkDestructibleObject, afterAttacked: any, 
        matrix: Phaser.GameObjects.Components.TransformMatrix, 
        srcGlobal: Phaser.Geom.Point, targetGlobal: Phaser.Geom.Point, strength: number ) {
            
        var srcPoint: any = new Phaser.Geom.Point();
        var targetPoint: any = new Phaser.Geom.Point();
        matrix.applyInverse(srcGlobal.x, srcGlobal.y, srcPoint);
        matrix.applyInverse(targetGlobal.x, targetGlobal.y, targetPoint);

        entity.modifyByLine(srcPoint.x, srcPoint.y,
            targetPoint.x, targetPoint.y, strength,
            FkDstrGridData.getStateHide());
        afterAttacked();
    }
}