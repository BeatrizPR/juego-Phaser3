import 'phaser';
import Enemy from '../Sprites/Enemy';

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    this.spriteFrames = [ 1, 2, 3, 4, 5, 6 ];

    // creo el array a partir del sprite de enemigos
    this.createEnemies(scene, spriteArray);
  }

  createEnemies (scene, spriteArray) {
    spriteArray.forEach((sprite) => {
      const randNumber = Math.floor(Math.random() * this.spriteFrames.length - 1);
      // creo un enemigo
      const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);
      //redimensiono el enemigo
      enemy.setScale(0.2);
      // lo incluyo en un grupo
      this.add(enemy);
      // destruyo el sprite
      sprite.destroy();
    });
  }
}