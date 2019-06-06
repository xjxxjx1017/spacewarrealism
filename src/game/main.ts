import {Vue, Preload, Core} from "./importall";
declare var ElementUI : any;

const config: GameConfig = {
	width: 800,
	height: 400,
	type: Phaser.AUTO,
	parent: "game",
	scene: [Preload, Core],
    physics: {
        default: 'matter',
        matter: {
            debug: true,
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