import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, frame) {
    super(scene, x, y, 'fruitSprite', frame);
    this.scene = scene;
    this.health = 3;

    //habilito la fisica
    this.scene.physics.world.enable(this);
    // incluyo la fruta en la escena
    this.scene.add.existing(this);

  }
 
}