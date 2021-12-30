class BootScene extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        const progress = this.add.graphics();

        var loadText = this.add.text(250, 200, 'Loading...', { fontSize: '64px', fill: '#ffffff' });

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            this.makeAnimations();
            //  Our player animations, turning, walking left and walking right.

            progress.destroy();
            this.scene.start('MenuScene');
        });

        // Menu screens
        this.load.image('start_screen',     'assets/images/menus/start_screen.png');
        this.load.image('menu_level1',      'assets/images/menus/menu_level1.png');
        this.load.image('menu_level2',      'assets/images/menus/menu_level2.png');
        this.load.image('menu_complete',    'assets/images/menus/menu_complete.png');
        this.load.image('gameover_screen',  'assets/images/menus/gameover_screen.png');

        // Level backgrounds
        this.load.image('cheesecounter',   'assets/images/backgrounds/cheesecounter.jpg');
        this.load.image('cheese_shop',   'assets/images/backgrounds/cheese_shop.png');

        // Game objects
        this.load.image('mouldy',          'assets/images/items/mouldy.png');
        this.load.image('brie',            'assets/images/items/brie.png');
        this.load.image('edam',            'assets/images/items/edam.png');
        this.load.image('cheddar',         'assets/images/items/cheddar.png');
        this.load.image('brieWheel',       'assets/images/items/brieWheel.png');
        this.load.image('edamWheel',       'assets/images/items/edamWheel.png');
        this.load.image('cheddarWheel',    'assets/images/items/cheddarWheel.png');

        // Sprite sheets
        this.load.spritesheet('pete',         'assets/images/spritesheets/pete-bag.png', { frameWidth: 25, frameHeight: 38 });
        this.load.spritesheet('cheesemonger', 'assets/images/spritesheets/cheesemonger.png', { frameWidth: 20, frameHeight: 25 });

        // Fonts
        this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

        // Tile sheets
        this.load.image("bkg_sheet", "assets/images/bkg_sheet.png");
        this.load.image("bkg_sheet_extruded", "assets/images/bkg_sheet_extruded.png");

        // Level tile maps
        this.load.tilemapTiledJSON("map_bonus", "assets/images/tilemap_bonus.json"); 
        this.load.tilemapTiledJSON("map_level2", "assets/images/tilemap_level2.json"); 


    }

    create() {
      this.registry.set('Mobile', false)
      this.registry.set('Level', 0);
      this.registry.set('StartGame', false);
      this.registry.set('BrieScore', 0);
      this.registry.set('EdamScore', 0);
      this.registry.set('CheddarScore', 0);
    }

  makeAnimations() {

    // Pete animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('pete', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'pete', frame: 12 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('pete', { start: 13, end: 24 }),
        frameRate: 10,
        repeat: -1
    });

    // Cheesemonger animations
    this.anims.create({
        key: 'cleft',
        frames: this.anims.generateFrameNumbers('cheesemonger', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'cturn',
        frames: [ { key: 'cheesemonger', frame: 3 } ],
        frameRate: 5
    });
    this.anims.create({
        key: 'cright',
        frames: this.anims.generateFrameNumbers('cheesemonger', { start: 4, end: 6 }),
        frameRate: 5,
        repeat: -1
    });

  }

}
