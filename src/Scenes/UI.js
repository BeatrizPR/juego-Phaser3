import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UI', active: true });
  }

  init () {
    this.fruitsCollected = 0;
  }

  create () {
    
      // creo los textos del juego
      this.scoreText = this.add.text(12, 12, `Frutas: ${this.fruitsCollected}`, { fontSize: '32px', fill: '#21767f', fontFamily: 'rockwell, symbol' });

      this.healthText = this.add.text(12, 50, `Vida: 5`, { fontSize: '32px', fill: '#21767f', fontFamily: 'rockwell, symbol' });

      this.winTxt = this.add.text( 125, 130, `\n *****  ¡Has ganado!  ***** \n `, {fontSize: '80px', fill: '#21767f', fontFamily: 'rockwell, symbol', backgroundColor: 'pink', align: 'center'  });

      this.winTxt.visible = false;

      this.gOverTxt = this.add.text( 125, 130, `\n :( \n  Lo siento, ¡Has perdido!   \n `, {fontSize: '80px', fill: '#21767f', fontFamily: 'rockwell, symbol', backgroundColor: 'orange', align: 'center'  });

      this.gOverTxt.visible = false;

      // referencia a la escena del juego
      this.gameScene = this.scene.get('Game');

      // eventos desde la escena
      this.gameScene.events.on('fruitCollected', () => {
        this.fruitsCollected++;
        this.scoreText.setText(`Frutas: ${this.fruitsCollected}`);

        if (this.fruitsCollected === 100) {
          this.winTxt.visible = true; 
          this.gameScene = this.scene.pause('Game');
          // paro la música , muestro el texto de victoria y reinicio el juego
          setTimeout ( function(){
            self.game.scene.keys.UI.winTxt.visible = false;
            this.audioGame = self.game.scene.keys.Game.musicAudio.stop('music');
            self.game.scene.keys.Boot.scene.start('Game');
            },   
            5000);  
        }
      });

      this.gameScene.events.on('loseHealth', (health) => {
        this.healthText.setText(`Vida: ${health}`);
      });

      this.gameScene.events.on('newGame', () => {
        this.fruitsCollected = 0;
        this.scoreText.setText(`Frutas: ${this.fruitsCollected}`);
        this.healthText.setText(`Vida: 5`);
      });

    }
  

};
