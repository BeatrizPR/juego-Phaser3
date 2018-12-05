import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'portal');
    this.scene = scene;

    // habilito la física 
    this.scene.physics.world.enable(this);
    // incluyo el jugador en la escena
    this.scene.add.existing(this);
  }
}