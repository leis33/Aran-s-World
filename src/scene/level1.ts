import { Player } from "../actors/Player";

class Level1 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private player: Player;
    //private sign: Phaser.GameObjects.Sprite;

    constructor() {
        super("level1");
    }

    create() {
        this.cameras.main.fadeIn(800);

        this.map = this.make.tilemap({ key: "level1"});

        let backgroundTileSet1: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background_day1", "backgrounD1");
        let backgroundTileSet2: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background_day2", "backgrounD2");
        let backgroundTileSet3: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background_day3", "backgrounD3");
        let backgroundTileSet4: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("mainlevbuild_A", "mainlevbuild1");
        let backgroundTileSet5: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("decorative", "decorations1");
        let tileSet: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("mainlevbuild_A", "mainlevbuild1");

        let backgroundLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tile Layer 1", [backgroundTileSet1]).setDepth(0);
        let backgroundLayer2: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tile Layer 2", [backgroundTileSet2]).setDepth(1);
        let backgroundLayer3: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Backgroundday3", [backgroundTileSet3]).setDepth(2);
        let backgroundLayer4: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("otherbackgrounds", [backgroundTileSet4]).setDepth(3);
        let backgroundLayer5: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("decorations", [backgroundTileSet5]).setDepth(4);

        let foregroundLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("platforms", [tileSet]).setDepth(5);

        let objectLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("Object Layer 1");

        let spawnPoint: any = this.map.findObject(objectLayer, (obj) => obj.name == "Start")
        let finishPoint: any = this.map.findObject(objectLayer, (obj) => obj.name == "Finish");

        this.player = new Player(this, 600, 300).setDepth(6);
        this.add.existing(this.player);

       //this.player.emitter.on("escPressed", this.onEscPressed, this);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, foregroundLayer1);
         foregroundLayer1.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, foregroundLayer1);
         foregroundLayer1.setCollisionByProperty({ spikeCollides: true });

        foregroundLayer1.renderDebug(this.add.graphics(), {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(200, 48, 200, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })
     }

     update(){
        this.player.update();
     }
}

export { Level1 }