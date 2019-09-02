import {Vue, Preload, Core, Setting} from "./importall";
declare var ElementUI : any;

const config: Phaser.Types.Core.GameConfig = {
	width: Setting.GAME_WIDTH,
	height: Setting.GAME_HEIGHT,
	type: Phaser.AUTO,
	parent: "game",
	scene: [Preload, Core],
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            debugShowInternalEdges: true,
            debugShowConvexHulls: true,
            gravity: {
                x: 0,
                y: 0
            },
        }
    },
	backgroundColor: "#000000",
    render: { 
        pixelArt: false, 
        antialias: true,
        roundPixels: false
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

Vue.use(ElementUI);

export class Main extends Phaser.Game {
    constructor() {
        super( config );
    }
}