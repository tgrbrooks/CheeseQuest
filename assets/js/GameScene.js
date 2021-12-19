class GameScene extends Phaser.Scene{

  constructor () {
    super('GameScene');
  }


  preload () {
  }

  create () {

      //  Input Events
      cursors = this.input.keyboard.createCursorKeys();
      this.edamKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      this.cheddarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      this.brieKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

      // Control transition between scenes
      this.transitionTime = 1000;
      this.shouldTransition = false;

      this.cameras.main.fadeIn(500);

      player = this.physics.add.sprite(50, 500, 'pete').setScale(2);
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

      this.climb = false;

      //------------------------------------------------------------------------------------
      //                               LEVEL 1: CHEESE SHOP
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level")==2){

        // Count scores for cheese types
        this.edamScore = 0;
        this.cheddarScore = 0;
        this.brieScore = 0;

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 800, 600); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);

        // Add background image
        this.add.image(400, 300, 'cheesecounter');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_bonus" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);

        // Display edam score on the left
        this.edamText = this.add.text(16, 16, 'Edam: 0', { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        this.edamText.setText('Edam: ' + this.edamScore);
        // Display cheddar score on the right
        this.cheddarText = this.add.text(186, 16, 'Cheddar: 0', { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        this.cheddarText.setText('Cheddar: '+this.cheddarScore);
        this.brieText = this.add.text(406, 16, 'Brie: 0', { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        this.brieText.setText('Brie: '+this.brieScore);
  
        player = this.physics.add.sprite(50, 500, 'pete').setScale(2);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // Set a one minute timer
        timedEvent = this.time.delayedCall(60000, onEventBonus, [], this);
        // Display remaining time
        timeText = this.add.text(600, 16, 'Time: 60', { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);

        // Add in cheese collectibles
        collectibles = this.physics.add.group();
        var edam = collectibles.create(Phaser.Math.Between(50, 750), 100, 'edam').setScale(2);
        edam.setData('name', 'edam');
        var cheddar = collectibles.create(Phaser.Math.Between(50, 750), 100, 'cheddar').setScale(2);
        cheddar.setData('name', 'cheddar');
        var brie = collectibles.create(Phaser.Math.Between(50, 750), 100, 'brie').setScale(2);
        brie.setData('name', 'brie');
        // Make them bounce around
        collectibles.children.iterate(function (child) {
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setVelocity(Phaser.Math.Between(-60, 60), 20);
          child.allowGravity = false;
        });

        let hazards = this.physics.add.group();
        var mouldy = hazards.create(Phaser.Math.Between(50, 750), 100, 'mouldy').setScale(2);
        mouldy.setData('name', 'mouldy');
        // Make them bounce around
        hazards.children.iterate(function (child) {
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setVelocity(Phaser.Math.Between(-60, 60), 20);
          child.allowGravity = false;
        });

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(player, collectibles, this.hitCheese, null, this);
        this.physics.add.collider(player, hazards, this.hitMouldy, null, this);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.collider(hazards, worldLayer);

      }

      //------------------------------------------------------------------------------------
      //                               LEVEL 1: CHEESE TAX FRAUD
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level")==1){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 800, 600); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);

        // Add background image
        this.add.image(400, 300, 'cheese_shop');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_level2" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        this.stairsLayer = map.createStaticLayer("Stairs", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);
        this.stairsLayer.setCollisionBetween(0, 1400);
  
        player = this.physics.add.sprite(50, 500, 'pete').setScale(2);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.cheeses = this.physics.add.group({
          allowGravity: false
        })

        this.cheesemonger = this.physics.add.sprite(680, 200, 'cheesemonger').setScale(2.5)
        this.cheesemonger.setBounce(0.2);
        this.cheesemonger.setCollideWorldBounds(true);
        this.cheesemonger.setVelocityX(-120)
        this.enemyHealth = 3

        this.cheesewheels = this.physics.add.group({
          allowGravity: false,
          immovable: true
        })
        this.cheesewheels.create(600, 170, 'brieWheel').setScale(1.5).setData('name', 'brie');
        this.cheesewheels.create(700, 170, 'brieWheel').setScale(1.5).setData('name', 'brie');
        this.cheesewheels.create(530, 210, 'brieWheel').setScale(1.5).setData('name', 'brie');
        this.cheesewheels.create(565, 170, 'edamWheel').setScale(1.5).setData('name', 'edam');
        this.cheesewheels.create(735, 170, 'edamWheel').setScale(1.5).setData('name', 'edam');
        this.cheesewheels.create(770, 210, 'edamWheel').setScale(1.5).setData('name', 'edam');
        this.cheesewheels.create(530, 170, 'cheddarWheel').setScale(1.5).setData('name', 'cheddar');
        this.cheesewheels.create(770, 170, 'cheddarWheel').setScale(1.5).setData('name', 'cheddar');
        this.cheesewheels.create(565, 210, 'cheddarWheel').setScale(1.5).setData('name', 'cheddar');
        this.cheeseCount = 1;

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(this.cheesemonger, worldLayer);
        this.physics.add.collider(this.cheeses, worldLayer);
        this.physics.add.collider(this.cheeses, this.cheesewheels, this.cheeseCollide, null, this);

      }

  }

  update (time, delta) {

    // Move to next scene when transition completed
    this.transitionTime -= delta;
    if(this.shouldTransition && this.transitionTime <= 0){
      this.shouldTransition = false;
      this.transitionTime = 1000;
      this.scene.start('MenuScene');
    }
    // If transition begun don't update game any more
    if(this.shouldTransition){
      return;
    }

    // End game when transition completed
    if (gameOver && this.transitionTime <= 0){
        this.levelScore = 0;
        gameOver = false;
        cursors.left.reset();
        cursors.right.reset();
        cursors.up.reset();
        this.scene.start('GameOverScene');
    }

    // Control lydias movement
    var speed = 160;
    var jump = 250;
    // Moving to the left
    if (cursors.left.isDown){
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    }
    // Moving to the right
    else if (cursors.right.isDown){
        player.setVelocityX(speed);
        player.anims.play('right', true);
    }
    // Stationary
    else{
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    // Jumping
    if (cursors.up.isDown && player.body.onFloor()){
        player.setVelocityY(-jump);
    }

    // Update time remaining text for bonus round
    if(this.registry.get("Level")==2){
      var elapsed = timedEvent.getElapsedSeconds();
      var timeLeft = 60. - elapsed;
      timeText.setText('Time: ' + timeLeft.toString().substr(0, 4));
    } 

    if(this.registry.get("Level")==1){
      let vx = player.body.velocity.x
      let vy = player.body.velocity.y
      let norm = 200 / (Math.sqrt(vx*vx+vy*vy))
      if(this.brieKey.isDown){
        this.brieKey.reset()
        let newBrie = this.cheeses.create(player.x, player.y, 'brie').setScale(2);
        newBrie.setData('name', 'brie');
        newBrie.setBounce(1);
        newBrie.setVelocity(vx*norm, vy*norm);
      }
      if(this.edamKey.isDown){
        this.edamKey.reset()
        let newEdam = this.cheeses.create(player.x, player.y, 'edam').setScale(2);
        newEdam.setData('name', 'edam');
        newEdam.setBounce(1);
        newEdam.setVelocity(vx*norm, vy*norm);
      }
      if(this.cheddarKey.isDown){
        this.cheddarKey.reset()
        let newCheddar = this.cheeses.create(player.x, player.y, 'cheddar').setScale(2);
        newCheddar.setData('name', 'cheddar');
        newCheddar.setBounce(1);
        newCheddar.setVelocity(vx*norm, vy*norm);
      }

      if (this.cheesemonger.body.velocity.x < 0) {
        this.cheesemonger.anims.play('cright', true)
      }
      else if (this.cheesemonger.body.velocity.x > 0) {
        this.cheesemonger.anims.play('cleft', true)
      }
      else {
        this.cheesemonger.anims.play('cturn')
      }
      if (this.cheesemonger.x > 690) {
        this.cheesemonger.setVelocityX(-80)
      }
      if(this.cheesemonger.x < 606) {
        this.cheesemonger.setVelocityX(80)
      }
      if(this.climb && this.cheesemonger.x < 650 && this.cheesemonger.x > 646) {
        this.cheesemonger.setVelocityX(0)
        this.cheesemonger.setVelocityY(-60)
      }
      if(this.climb && this.cheesemonger.y < 100) {
        this.climb = false
        this.cheesemonger.setVelocityY(0)
        this.cheesemonger.setVelocityX(120)
        this.physics.add.collider(this.cheesemonger, this.stairsLayer);
        this.physics.add.collider(this.cheeses, this.cheesemonger, this.hitEnemy, null, this);
      }
    }
      
  }
  
  // Controls behaviour when pete hits cheese
  hitCheese (player, cheese){
    var cheeseName = cheese.getData('name');
    // Make toy vanish
    cheese.disableBody(true, true);
    // Add 1 to lydias score and update text
    if (cheeseName === 'edam') {
      this.edamScore += 1;
      this.edamText.setText('Edam: ' + this.edamScore);
    } else if (cheeseName === 'cheddar') {
      this.cheddarScore += 1;
      this.cheddarText.setText('Cheddar: ' + this.cheddarScore);
    } else if (cheeseName === 'brie') {
      this.brieScore += 1;
      this.brieText.setText('Brie: ' + this.brieScore);
    }
    // Add and configure new toy of the same type
    var newCheese = collectibles.create(Phaser.Math.Between(25, 775), 0, cheeseName).setScale(2);
    newCheese.setData('name', cheeseName);
    newCheese.setBounce(1);
    newCheese.setCollideWorldBounds(true);
    newCheese.setVelocity(Phaser.Math.Between(-60, 60), 20);
    newCheese.setAllowGravity(false);
    collectibles.remove(cheese);

  }

  // Controls behaviour when lydia hits bomb
  hitMouldy (player, cheese) {

    // Begin game over sequence
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    this.transitionTime = 1000;
    this.cameras.main.fade(1000);  

  }

  cheeseCollide (cheese, wheel){
    var cheeseName = cheese.getData('name');
    var wheelName = wheel.getData('name');
    // Make toy vanish
    cheese.disableBody(true, true);
    if (cheeseName === wheelName) {
      wheel.disableBody(true, true);
      this.cheeseCount--;
    }
    if (this.cheeseCount === 0){
      this.climb = true
      this.cheesemonger.setVelocityX(648-this.cheesemonger.x)
    }
  }

  hitEnemy (enemy, cheese){
    cheese.disableBody(true, true);
    this.enemyHealth--;
    enemy.setTint(0xff0000);
    enemy.setVelocityX(0);
    this.time.delayedCall(500, onHitEnemy, [], this);

    if (this.enemyHealth==0) {
      enemy.disableBody(true, true);
      // Begin new scene transition
      cursors.left.reset();
      cursors.right.reset();
      cursors.up.reset();
      this.registry.set('Level', this.registry.get('Level')+1);
      this.shouldTransition = true;
      this.transitionTime = 1000;
      this.physics.pause();
      this.cameras.main.fade(1000);
    }
  }

}

// Controls behaviour when bonus level timer ends
function onEventBonus() 
{
    // Begin new scene transition
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    this.registry.set('Level', this.registry.get('Level')+1);
    this.shouldTransition = true;
    this.transitionTime = 1000;
    this.physics.pause();
    this.cameras.main.fade(1000);
}

function onHitEnemy()
{
    this.cheesemonger.setTint();
    this.cheesemonger.setVelocityX(120);
}
