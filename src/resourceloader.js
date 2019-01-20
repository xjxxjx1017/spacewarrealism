import 'phaser';

class ResourceLoader{
	static load( game ){
        game.load.image('logo', 'assets/logo.png');
	}
}

export { ResourceLoader }