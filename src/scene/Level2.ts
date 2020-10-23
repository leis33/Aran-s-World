import { Player } from "../actors/Player";
import { Enemy } from "../actors/Enemy";

class Level2 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private player: Player;
    private enemy: Enemy;
    constructor(){
        super("level2");
    }

    create(){
        this.map = this.make.tilemap({key: "level2", tileWidth: 32, tileHeight: 32});
        let background1: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background1", "background1");
        let background2: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background2", "background2");
        let background3: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background3", "background4");
        let worldTileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("rockyworld_tileset","tiles1");
        let treesTileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("rockytrees_tileset", "tiles2");

        let Background1Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 1", background1).setDepth(0);
        let Background2Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 2", background2).setDepth(1);
        let Background3Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 3", background3).setDepth(2);
        let TreeLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tree Layer", worldTileset).setDepth(3);
        let TileLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tile Layer 1",worldTileset).setDepth(4);
        let TreeLayer2: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tree Layer 2", [treesTileset, worldTileset]).setDepth(5);
        let MainLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Main Layer", worldTileset).setDepth(6);
        let ObjectLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("Object Layer 1");

        Background1Layer.setScale(0.7);
        Background2Layer.setScale(0.7);
        Background3Layer.setScale(0.7);
        TreeLayer1.setScale(0.7);
        TileLayer.setScale(0.7);
        TreeLayer2.setScale(0.7);
        MainLayer.setScale(0.7);

        let spawnPoint: any = this.map.findObject(ObjectLayer,(obj) => obj.name == "Start");

        this.player = new Player(this, spawnPoint.x, spawnPoint.y-129).setDepth(7);
        this.add.existing(this.player);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels-970, this.map.heightInPixels-300);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels-970, this.map.heightInPixels-300);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        
    }

    update(){
        this.player.update();
    }

}

export { Level2 }