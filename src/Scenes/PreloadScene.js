import 'phaser';
import { BlendModes } from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor (key) {
    super(key);
    
  }

preload ()   { 
    this.load.image('imagen', '../assets/images/logo.png');
    for (var i = 0; i <= 450; i++) {
        this.load.image('imagen'+i, 'logo.png');
    }
    this.load.image('sky', 'assets/images/sky.jpg');
    // con GameObject.Graphics creo la barra de progreso
    // 2 rectangulos separados, uno dentro de otro
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0xcfee9e, 0.8);
    //                             alto, ancho
    progressBox.fillRect(500, 270, 320, 50);
    // creo ancho y alto para obtener el área visible del juego actual
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    // incluyo texto para decir que se está cargando el juego
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 80,
        text: 'Cargando...',
        style: {
            font: '20px monospace',
            fill: '#79c99e'
        }
    });
    loadingText.setOrigin(0.5, 0.5); //centramos el texto
    
    // texto para poner el porcentaje de carga
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 20,
        text: '0%',
        style: {
            font: '20px rockwell, symbol, monospace',
            fill: '#0E562F'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    // creo el texto con las "imágenes" que se cargan
    var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '20px monospace',
                fill: '#79c99e'
            }
        });
        assetText.setOrigin(0.5, 0.5);
    
    var initText = this.make.text({
            x: width / 2,
            y: height / 2 - 90,
            text: '',
            style: {
                font: '35px rockwell, symbol, monospace',
                fill: '#FC46AD',
                align: 'center'
            }
        });
        initText.setOrigin(0.5, 0.5);
    
    var descriptionTxt = this.make.text({
            x: width / 2,
            y: height / 2  +50,
            text: '',
            style: {
                font: '30px rockwell, symbol, monospace',
                fill: '#79c99e',
                align: 'center'
            }
        });
        descriptionTxt.setOrigin(0.5, 0.5);
    // creo el progreso y cargo el archivo
    // el evento progreso recibirá un valor entre 0 y 1 que sirve para ver el progreso de carga
    this.load.on('progress', function (value) {
        console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        // la barra de progreso se crea calculando el ancho del rectangulo para basarlo en el valor de progreso que se recibe
        progressBar.fillRect(510, 280, 300 * value, 30);
        // añado el porcentaje de carga multiplicado por 100 porque el valor emitido era entre 0 y 1
        percentText.setText(parseInt (value*100)+ '%'); 

    });
    // con fileprogress se recibe un objeto que recibe informacion sobre el archivo que se ha cargado        
    this.load.on('fileprogress', function (file) {
        console.log(file.src);
        // cargamos el nombre de archivo generado para el logo
        assetText.setText('Cargando imágenes: ' + file.key);
        
    });

     // se completará cuando se hayan cargado todos los archivos
    this.load.on('complete', function () {
        
        console.log('complete');
        initText.setText('Para comenzar pulsa la tecla de espacio\n');
        descriptionTxt.setText('Para ganar el juego tienes que conseguir las frutas\n y no dejarte ganar por los enemigos, que son fast food.\n\n Para matar a los enemigos pulsa el espacio.');
        // destruyo las barras y el texto, cuando ha terminado de cargar y solo se ve el logo
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();

    });

} 

create ()   { 
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
} 

update(){
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.scene.start('Boot');
      }
}


}