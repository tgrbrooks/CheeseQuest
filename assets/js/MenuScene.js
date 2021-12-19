class MenuScene extends Phaser.Scene{

  constructor () {
    super('MenuScene');
  } 

  preload () {
  }

  create () {

      // Use X key to continue with game
      this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      
      this.blink = 1000;
      this.transitionTime = 1000;
      this.shouldTransition = false;

      //------------------------------------------------------------------------------------
      //                               START UP SCREEN
      //------------------------------------------------------------------------------------

      // Configure meny differently for each level
      if(this.registry.get('Level') == 0){
        // Add background image
        this.add.image(400, 300, 'start_screen');
        this.animTime = 0;
        // Add and center main body text
        this.starringText = this.add.bitmapText(100, 200, 'font', 'STARRING\n\nCHEESE BAG', 20, 1);
        this.starringText.setX((800-this.starringText.width)/2.)
        // Add images of pete
        this.physics.add.staticGroup().create(400, 380, 'pete').setScale(4).anims.play('turn');
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO BEGIN', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 1: CHEESE SHOP
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 2){
        // Add background image
        this.add.image(400, 300, 'menu_level1');
        // Add and center main body text
        this.starringText = this.add.bitmapText(20, 300, 'font', "FILL YOUR BAG WITH CHEESE\n\nYOU MIGHT NEED IT LATER!", 16, 1);
        this.starringText.setX((800-this.starringText.width)/2.);
        this.findText = this.add.bitmapText(200, 420, 'font', 'COLLECT              AVOID     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        this.physics.add.staticGroup().create(300, 420, 'brie').setScale(3);
        this.physics.add.staticGroup().create(380, 420, 'cheddar').setScale(3);
        this.physics.add.staticGroup().create(460, 420, 'edam').setScale(3);
        this.physics.add.staticGroup().create(650, 420, 'mouldy').setScale(3);
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 2: CHEESE TAX FRAUD
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 1){
        // Add background image
        this.add.image(400, 300, 'menu_level2');
        // Add and center main body text
        this.starringText = this.add.bitmapText(20, 400, 'font', "A ROUGE CHEESEMONGER HAS FILED A\n\nFRAUDULENT TAX RETURN!\n\nONLY YOU CAN USE YOUR CHEESE\n\nTO BRING HER TO JUSTICE", 16, 1);
        this.starringText.setX((800-this.starringText.width)/2.);
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      if(this.registry.get('Level') == 3){
        // Add background image
        this.add.image(400, 300, 'menu_complete');
        // Add and center continue text
        this.pressX = this.add.bitmapText(230, 550, 'font', 'PRESS X TO RESTART GAME', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

  }

  update(time, delta) {
      
        // Control transition from start screen (give time for beam animation
        this.animTime -= delta;
        if(this.registry.get('StartGame') && this.animTime < 0){
            this.registry.set('Level', 1);
            this.registry.set('StartGame', false);
            this.scene.start('MenuScene');
        }

        // Control blinking of continue text
        this.blink -= delta;
        if (this.blink < 0) {
            this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
            this.blink = 500;
        }

        // Start next scene transition if start key is pressed
        if (this.startKey.isDown) {
            this.startKey.reset();
            // If we're on the start screen play beam animation
            this.shouldTransition = true;
            this.transitionTime = 1000;
            this.cameras.main.fade(1000);  
        }

        // Move to next scene once transition is complete
        this.transitionTime -= delta;
        if(this.shouldTransition && this.transitionTime < 0){
            // Restart game
            if(this.registry.get('Level') == 0){
              this.registry.set('Level', 1);
              this.scene.start('MenuScene');
            }
            // Move to next level
            else{
              this.scene.start('GameScene');
            }
        }
  } 

}
