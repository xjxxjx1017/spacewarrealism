
class ResourceLoader{
	static load( game ){
        game.load.image('ship', 'assets/ship.jpg');
        game.load.image('space', 'assets/space.png');
        game.load.image('button_normal', 'assets/button/normal.png');
        game.load.image('button_hover', 'assets/button/hover.png');
        game.load.image('button_down', 'assets/button/down.png');
        game.load.image('overlay_ship', 'assets/buttonoverlay/ship.png');
        game.load.image('overlay_missle', 'assets/buttonoverlay/missle.png');
        game.load.image('overlay_grass', 'assets/buttonoverlay/grass.png');
        game.load.image('overlay_nohuman', 'assets/buttonoverlay/nohuman.png');
	}
}

export { ResourceLoader }