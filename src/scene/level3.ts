import { Player } from "../actors/Player";
import { Enemy } from "../actors/Enemy";

class Level3 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private player: Player;
    private enemies2: Enemy[];
    private enemies3: Enemy[];
    private enemy4: Enemy;


    constructor() {
        super("level3");
    }

    create() {
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

        this.player = new Player(this, spawnPoint.x, spawnPoint.y - 18).setDepth(7);
        this.add.existing(this.player);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, foregroundLayer1);
        foregroundLayer1.setCollisionByProperty({ collides: true });

        this.anims.create({
            key:"enemy3_idle",
            frames: this.anims.generateFrameNames("enemy3"),
            frameRate: 10,
            repeat: -1
        });

        let enemies3: Phaser.GameObjects.Sprite[] = this.map.createFromObjects("objects", 1796, {key: "enemy3"})
        for (let enemy of enemies3) {
            this.add.existing(enemy);
            this.physics.add.existing(enemy);  
                     
            enemy.setDepth(8);
            enemy.anims.play("enemy3_idle", true);
            (<Phaser.Physics.Arcade.Body>enemy.body).setImmovable(true);

            this.physics.add.collider(this.player, enemy);
        }

    }

    update() {
        this.player.update();
    }
}

export { Level3 }