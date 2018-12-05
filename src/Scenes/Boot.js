import 'phaser';


export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.levels = {
      1: 'level1',
      2: 'level2'
    };
    // cargo el tilemap
    this.load.tilemapTiledJSON('level1', 'assets/tilemaps/level1.json');
    this.load.tilemapTiledJSON('level2', 'assets/tilemaps/level2.json');
    // cargo el spritesheet
    this.load.spritesheet('RPGpack_sheet', 'assets/images/RPGpack_sheet.png', { frameWidth: 64, frameHeight: 64 });
    // cargo el spritesheet del jugador
    this.load.spritesheet('characters', 'assets/images/muneca.png', { frameWidth: 64, frameHeight: 64 });
    // cargo el spritesheet de los enemigos
    this.load.spritesheet('fastFood', 'assets/images/enemies.png', { frameWidth: 200, frameHeight: 200 });
    // cargo el sprite del portal
    this.load.image('portal', 'assets/images/raft.png');
    // cargo el sprite de las frutas
    this.load.spritesheet('fruitSprite', 'assets/images/fruit/fruit.png', { frameWidth: 20, frameHeight: 20 });
    // cargo el cuchillo
    this.load.image('bullet', 'assets/images/knife.png');

    //cargo el audio
    this.load.audio('music', 'assets/audio/history.mp3');
    this.load.audio('knife', 'assets/audio/knife.mp3');
    this.load.audio('eat', 'assets/audio/pop.mp3' );

  }

  create () {
    this.scene.start('Game', { level: 1, newGame: true, levels: this.levels });
    
  }
};
