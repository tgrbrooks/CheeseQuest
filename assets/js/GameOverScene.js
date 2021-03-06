class GameOverScene extends Phaser.Scene{

  constructor () {
    super('GameOverScene');
  } 

  preload () {
  }

  create () {

      // Create continue key
      this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

      this.blink = 1000;
      this.transitionTime = 1000;
      this.shouldTransition = false;

      // Add background image
      this.add.image(400, 300, 'gameover_screen');

      //------------------------------------------------------------------------------------
      //                              LEVEL 0: CHEESE
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 1){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 450, 'font', 'YOU DIDNT COLLECT ENOUGH CHEESE', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      }

      if(this.registry.get('Level') == 2){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 450, 'font', 'THE CHEESEMONGER AVOIDED TAX ON\n\nA PRIME WHEEL OF STILTON', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      }

      // Add and center continue text
      this.pressX = this.add.bitmapText(200, 550, 'font', 'PRESS X OR TAP TO RESTART GAME', 16, 1);
      this.pressX.setX((800-this.pressX.width)/2.);

      this.input.on('pointerdown', function (pointer) {
        this.shouldTransition = true;
        this.transitionTime = 1000;
        this.cameras.main.fade(1000);  
      }, this);

  }

  update(time, delta) {

        // Control flashing of continue text
        this.blink -= delta;
        if (this.blink < 0) {
            this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
            this.blink = 500;
        }

        // If start key is pressed begin scene transition
        if (this.startKey.isDown) {
            this.startKey.reset();
            this.shouldTransition = true;
            this.transitionTime = 1000;
            this.cameras.main.fade(1000);
        }

        // Go back to menu when transition completed
        this.transitionTime -= delta;
        if(this.shouldTransition && this.transitionTime < 0){
          this.registry.set('Level', 1)
          this.scene.start('MenuScene');
        }
  } 

}
