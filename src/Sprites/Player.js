import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'characters', 19);
    this.scene = scene;
    this.health = 5;
    this.hitDelay = false;
    this.direction = 'up';

    // habilito la fisica
    this.scene.physics.world.enable(this);
    // añado el jugador a la escena
    this.scene.add.existing(this);
  }

  preload(){
    var gOverTxt = this.make.text({
      x: width / 2,
      y: height / 2 - 90,
      text: '',
      style: {
          font: '35px rockwell, symbol, monospace',
          fill: '#FC46AD',
          align: 'center',
          //backgroundColor: '#E9B6ED'
      }
    });
    gOverTxt.setText('Game Over');
    gOverTxt.setOrigin(0.5, 0.5);
  }

  update (cursors) {
    this.setVelocity(0);
    // compruebo si la tecla de subir y bajar está pulsada
    if (cursors.up.isDown) {
      this.direction = 'up';
      this.setVelocityY(-150);
      this.anims.play('up', true);
    } else if (cursors.down.isDown) {
      this.direction = 'down';
      this.setVelocityY(150);
      this.anims.play('down', true);
    }
    // compruebo si está pulsado la derecha o izquierda
    if (cursors.left.isDown) {
      this.direction = 'left';
      this.setVelocityX(-150);
      this.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.direction = 'right';
      this.setVelocityX(150);
      this.anims.play('right', true);
    }
  }

  loseHealth () {
    // el jugador pierda vida si es alcanzado por los enemigos
    this.health--;
    this.scene.events.emit('loseHealth', this.health);
    if (this.health === 0) {
      self.game.scene.keys.UI.gOverTxt.visible = true;
      this.scene.loadNextLevel(true);
      setTimeout(function(){ 
      self.game.scene.keys.UI.gOverTxt.visible = false;
      }, 5000);
      
    }
  }

  enemyCollision (player, enemy) { 
    
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0xff0000;
      // se pinta de rojo el jugador cada vez que se choca con un enemigo
      this.scene.time.addEvent({
        delay: 1200,
        callback: () => {
          this.hitDelay = false;
          this.tint = 0xffffff;
        },
        callbackScope: this
      });
    }
  }
}