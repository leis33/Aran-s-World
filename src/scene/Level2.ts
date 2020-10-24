import { Player } from "../actors/Player";
import { Enemy } from "../actors/Enemy";
import { BaseButton } from "../graphics/BaseButton";

class Level2 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private player: Player;
    private enemy: Enemy;
    private pauseButton: BaseButton;
    public sceneName: string = "level2";
    private sign: Phaser.GameObjects.Image;
    constructor() {
        super("level2");
    }

    preload() {
        this.anims.create({
            key: "enemy1_attack",
            frames: this.anims.generateFrameNames("enemy1_1", {prefix: "attack0", start: 1, end: 8}),
            frameRate: 7,
            repeat: -1
        })

        this.anims.create({
            key: "enemy3_attack",
            frames: this.anims.generateFrameNames("enemy3_1", {prefix: "attack_right0", start: 1, end: 8}),
            frameRate: 7,
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
        this.map = this.make.tilemap({ key: "level2" });

        let background1: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background1", "background1");
        let background2: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background2", "background2");
        let background3: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("background3", "background4");
        let worldTileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("rockyworld_tileset", "tiles1");
        let treesTileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("rockytrees_tileset", "tiles2");
        let tileSet: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("tiles", "tiles3");

        let Background1Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 1", background1).setDepth(0);
        let Background2Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 2", background2).setDepth(1);
        let Background3Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 3", background3).setDepth(2);
        let TreeLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tree Layer", worldTileset).setDepth(3);
        let TileLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tile Layer 1", worldTileset).setDepth(4);
        let TreeLayer2: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tree Layer 2", [treesTileset, worldTileset, tileSet]).setDepth(5);
        let MainLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Main Layer", [worldTileset,tileSet]).setDepth(6);
        let ObjectLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("Object Layer 1");

        Background1Layer.setScale(0.7);
        Background2Layer.setScale(0.7);
        Background3Layer.setScale(0.7);
        TreeLayer1.setScale(0.7);
        TileLayer.setScale(0.7);
        TreeLayer2.setScale(0.7);
        MainLayer.setScale(0.7);

        let spawnPoint: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "Start");
        let finishPoint: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "Finish");
        let enemy1Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy1");
        let enemy2Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy2");
        let enemy3Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy3");
        let enemy4Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy4");
        let enemy5Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy5");
        let enemy6Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy6");
        

        this.player = new Player(this, spawnPoint.x, spawnPoint.y - 129).setDepth(7);
        this.add.existing(this.player);
        
        this.sign = this.add.image(finishPoint.x - 10, 285.59999999999997, "sign").setDepth(6);
        this.sign.setScale(0.17);
        this.add.existing(this.sign);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels - 970, this.map.heightInPixels - 300);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels - 970, this.map.heightInPixels - 300);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });

        this.player.emitter.on("escPressed", this.onEscPressed, this);

        console.log(this.player.x, this.player.y, spawnPoint.x, spawnPoint.y)

        // this.pauseButton = new BaseButton(this, 30, 30, "optionbuttons", 1, "", 4);
        // this.pauseButton.setDepth(8);
        // this.pauseButton.setOnClick(this.pauseButtonOnClick, this);
        // this.add.existing(this.pauseButton);

        let enemy1 = new Enemy(this, enemy1Point.x * 0.7, enemy1Point.y * 0.7, "enemy1_1", "enemy1_attack");
        enemy1.setDepth(8);
        this.physics.add.collider(enemy1, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy1);
        enemy1.setSize(32, 32);
        enemy1.scaleX = -1;
        enemy1.setOffset(32, 0);
        (<Phaser.Physics.Arcade.Body>enemy1.body).setImmovable(true);
        this.add.existing(enemy1);

        let enemy2 = new Enemy(this, enemy2Point.x * 0.7, enemy2Point.y * 0.7, "enemy1_1", "enemy1_attack");
        enemy2.setDepth(8);
        this.physics.add.collider(enemy2, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy2);
        enemy2.setSize(32, 32);
        enemy2.scaleX = -1;
        enemy2.setOffset(32, 0);
        (<Phaser.Physics.Arcade.Body>enemy2.body).setImmovable(true);
        this.add.existing(enemy2);

        let enemy3 = new Enemy(this, enemy3Point.x * 0.7, enemy3Point.y *0.7, "enemy1_1", "enemy1_attack");
        enemy3.setDepth(8);
        this.physics.add.collider(enemy3, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy3);
        enemy3.setSize(32, 32);
        enemy3.scaleX = -1;
        enemy3.setOffset(32, 0);
        (<Phaser.Physics.Arcade.Body>enemy3.body).setImmovable(true);
        this.add.existing(enemy3);

        let enemy4 = new Enemy(this, enemy4Point.x * 0.7, enemy4Point.y * 0.7, "enemy3_1", "enemy3_attack");
        enemy4.setDepth(8);
        this.physics.add.collider(enemy4, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy4);
        enemy4.setSize(enemy4.width - 20, enemy4.height - 5);
        (<Phaser.Physics.Arcade.Body>enemy4.body).setImmovable(true);
        this.add.existing(enemy4);

        let enemy5 = new Enemy(this, enemy5Point.x * 0.7, enemy5Point.y * 0.7, "enemy3_1", "enemy3_attack");
        enemy5.setDepth(8);
        this.physics.add.collider(enemy5, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy5);
        enemy5.setSize(enemy5.width - 20, enemy5.height - 5);
        (<Phaser.Physics.Arcade.Body>enemy5.body).setImmovable(true);
        this.add.existing(enemy5);
        
        let enemy6 = new Enemy(this, enemy6Point.x * 0.7, enemy6Point.y * 0.7, "enemy4", "enemy4_idle");
        enemy6.setDepth(8);
        this.physics.add.collider(enemy6, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy6);
        enemy6.setSize(enemy6.width - 30,enemy6.height);
        enemy6.scaleX = -1;
        enemy6.setOffset(32, 0);
        (<Phaser.Physics.Arcade.Body>enemy6.body).setImmovable(true);
        this.add.existing(enemy6);

    }

    update() {
        this.player.update();

        if(this.player.x >= this.sign.x && this.player.y == this.sign.y){
            this.finishLine();
        }
    }


    private finishLine(){
        this.cameras.main.fadeOut(800);
        this.scene.start("level3");
    }
    // private pauseButtonOnClick() {
    //     this.scene.pause();
    //     this.scene.launch("ingameMenu");
    // }

    private onEscPressed(): void {
        this.scene.pause();
        this.scene.launch("ingameMenu");
    }

    // private getSceneName(){
    //     return this.sceneName;
    // }

}

export { Level2 }