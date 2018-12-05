import 'phaser';
import Fruit from '../Sprites/Fruit';

export default class Fruits extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    this.spriteFrames = [ 1, 2, 3, 4, 5];
    // incluyo la fruta en un grupo
    this.createFruit(scene, spriteArray);
    //this.refresh();
  }
  
  createFruit (scene, spriteArray){
    spriteArray.forEach((sprite) => {
      const randNumber = Math.floor(Math.random() * this.spriteFrames.length - 1);
      // creo una nueva fruta
      const fruit = new Fruit(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);
      
      // añado al grupo
      this.add(fruit);
      console.log('aleatorio');
      sprite.destroy();
    });
  }

  collectFruit (player, fruit) {
    
    this.remove(fruit);
    fruit.destroy();
    self.game.scene.keys.Game.eatAudio.play();
    // dispara el evento
    this.scene.events.emit('fruitCollected');
  }
}