class Level3 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

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
        let backgroundLayer4: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("background5", [backgroundTileSet]).setDepth(3);
        let backgroundLayer5: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("background4", [backgroundTileSet]).setDepth(4);

        let foregroundLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("foreground1", [backgroundTileSet]).setDepth(6);
        let foregroundLayer2: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("foreground2", [backgroundTileSet]).setDepth(5);

        let objectLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("objects");

    }
}

export { Level3 }