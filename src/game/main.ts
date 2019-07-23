import {Vue, Preload, Core, Setting} from "./importall";
declare var ElementUI : any;

const config: GameConfig = {
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
	backgroundColor: "#cccccc",
	render: { pixelArt: false, antialias: true, autoResize: false }
};

Vue.use(ElementUI);

export class Main extends Phaser.Game {
    constructor() {
        super( config );
    }
}