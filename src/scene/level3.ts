import { Player } from "../actors/Player";
import { Enemy } from "../actors/Enemy";
import { CustomKeyboardInput } from "../utils/CustomKeyboardInput";

class Level3 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private player: Player;
    private keys: CustomKeyboardInput;

    constructor() {
        super("level3");
    }

    preload() {
        this.anims.create({
            key: "enemy2_idle",
            frames: this.anims.generateFrameNames("enemy2"),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "enemy3_idle",
            frames: this.anims.generateFrameNames("enemy3"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "enemy4_idle",
            frames: this.anims.generateFrameNames("enemy4"),
            frameRate: 10,
            repeat: -1
        })
    }

    create() {
        this.cameras.main.fadeIn(800);

        this.keys = new CustomKeyboardInput(this);

        this.map = this.make.tilemap({ key: "level3" });

        let tileSet: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("tiles", "tiles3");
        let backgroundTileSet: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background", "background3");

        let backgroundLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("background1", [backgroundTileSet]).setDepth(0);
        let backgroundLayer2: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("background2", [backgroundTileSet]).setDepth(1);
        let backgroundLayer3: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("background3", [backgroundTileSet]).setDepth(2);
        let backgroundLayer4: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("background5", [tileSet]).setDepth(3);
        let backgroundLayer5: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("background4", [tileSet]).setDepth(4);

        let foregroundLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("foreground1", [tileSet]).setDepth(6);
        let foregroundLayer2: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("foreground2", [tileSet]).setDepth(5);

        let objectLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("objects");

        let spawnPoint: any = this.map.findObject("objects", (obj) => obj.name == "Start")

        this.player = new Player(this, spawnPoint.x, spawnPoint.y).setDepth(7);
        this.add.existing(this.player);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, foregroundLayer1);
        foregroundLayer1.setCollisionByProperty({ collides: true });

        //TODO: fix enemies' hitboxes
        let enemy1 = new Enemy(this, 672, 406, "enemy3", "enemy3_idle");
        enemy1.setDepth(7);
        this.physics.add.collider(enemy1, foregroundLayer1);
        this.physics.add.collider(this.player, enemy1, this.player.onPlayerEnemyCollision, null, this);
        enemy1.scaleX = -1;
        enemy1.setOffset(32, 0);
        (<Phaser.Physics.Arcade.Body>enemy1.body).setImmovable(true);
        this.add.existing(enemy1);

        let enemy2 = new Enemy(this, 1248, 630, "enemy3", "enemy3_idle");
        enemy2.setDepth(8);
        this.physics.add.collider(enemy2, foregroundLayer1);
        this.physics.add.collider(this.player, enemy2, this.player.onPlayerEnemyCollision, null, this);
        (<Phaser.Physics.Arcade.Body>enemy2.body).setImmovable(true);
        this.add.existing(enemy2);

        let enemy3 = new Enemy(this, 1856, 342, "enemy3", "enemy3_idle");
        enemy3.setDepth(8);
        this.physics.add.collider(enemy3, foregroundLayer1);
        this.physics.add.collider(this.player, enemy3, this.player.onPlayerEnemyCollision, null, this);
        (<Phaser.Physics.Arcade.Body>enemy3.body).setImmovable(true);
        this.add.existing(enemy3);

        let enemy4 = new Enemy(this, 1952, 312, "enemy2", "enemy2_idle");
        enemy4.setDepth(8);
        this.physics.add.collider(enemy4, foregroundLayer1);
        this.physics.add.collider(this.player, enemy4, this.player.onPlayerEnemyCollision, null, this);
        (<Phaser.Physics.Arcade.Body>enemy4.body).setImmovable(true);
        this.add.existing(enemy4);

        let enemy5 = new Enemy(this, 736, 696, "enemy2", "enemy2_idle");
        enemy5.setDepth(8);
        this.physics.add.collider(enemy5, foregroundLayer1);
        this.physics.add.collider(this.player, enemy5, this.player.onPlayerEnemyCollision, null, this);
        (<Phaser.Physics.Arcade.Body>enemy5.body).setImmovable(true);
        this.add.existing(enemy5);
        
        let enemy6 = new Enemy(this, 2624, 504, "enemy4", "enemy4_idle");
        enemy6.setDepth(8);
        this.physics.add.collider(enemy6, foregroundLayer1);
        this.physics.add.collider(this.player, enemy6, this.player.onPlayerEnemyCollision, null, this);
        (<Phaser.Physics.Arcade.Body>enemy6.body).setImmovable(true);
        this.add.existing(enemy6);
    }

    update() {
        this.player.update();
    }
}

export { Level3 }