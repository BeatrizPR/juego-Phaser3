import 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children) {
    super(world, scene, children);
    this.scene = scene;
    
    this.createMultiple({
      frameQuantity: 100 ,
      key: 'bullet',
      active: false,
      visible: false
    });
  }

  enemyCollision (bullet, enemy) {
    // compruebo que el cuchillo colisiona con el enemigo
    bullet.active = false;
    bullet.visible = false;
    bullet.disableBody();
    enemy.loseHealth();
  }

  fireBullet (x, y, direction) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      // llamo al sonido del cuchillo cuando se dispara
      self.game.scene.keys.Game.knifeAudio.play();
      bullet.enableBody(true);
      bullet.active = true;
      bullet.visible = true;
      bullet.setPosition(x, y);
      bullet.setScale(0.4);
      
      switch (direction) {
        case 'up':
          bullet.flipY =true;
          bullet.flipX =false;
          bullet.setVelocityY(-300);
          break;
        case 'down':
          bullet.flipY = false;
          bullet.setVelocityY(300);
          break;
        case 'left':
          bullet.flipX= true;
          bullet.flipY =true;
          bullet.setVelocityX(-300);
          
          break;
        case 'right':
          bullet.flipX = false;
          bullet.flipY =true;
          bullet.setVelocityX(300);
          break;
        default:
          bullet.setVelocityY(-300);
      }

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          bullet.disableBody();
          bullet.active = false;
          bullet.visible = false;
          bullet.setVelocity(0);
        }
      });
    }
  }
}