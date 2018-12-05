import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, frame) {
    super(scene, x, y, 'fastFood', frame);
    this.scene = scene;
    this.health = 2;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    // escalo los enemigos
    this.setScale(0.2);

    // muevo a los enemigos
    this.timeEvent = this.scene.time.addEvent({
      delay: 3000,
      callback: this.move,
      loop: true,
      callbackScope: this
    });
  }

  loseHealth () {
    this.health--;
    this.tint = 0xff0000;
    if (this.health === 0) {
      this.timeEvent.destroy();
      this.destroy();
    } else {
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          this.tint = 0xffffff;
        }
      });
    }
  }

  move () {
    const randNumber = Math.floor((Math.random() * 4) + 1);
    switch (randNumber) {
      case 1:
        this.setVelocityX(100);
        break;
      case 2:
        this.setVelocityX(-100);
        break;
      case 3:
        this.setVelocityY(100);
        break;
      case 4:
        this.setVelocityY(-100);
        break;
      default:
        this.setVelocityX(100);
    }

    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        if (this.active) this.setVelocity(0);
      },
      callbackScope: this
    });
  }
}