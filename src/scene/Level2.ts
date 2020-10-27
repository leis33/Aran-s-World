import { Player } from "../actors/Player";
import { Enemy } from "../actors/Enemy";
import { BaseButton } from "../graphics/BaseButton";
import { Collectible } from "../actors/Collectible";

class Level2 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private player: Player;
    private enemy: Enemy;
    private pauseButton: BaseButton;
    public sceneName: string = "level2";
    private sign: Phaser.GameObjects.Image;
    private points: number = 0;

    private hitAudio: Phaser.Sound.BaseSound;
    private collectDiaAudio: Phaser.Sound.BaseSound;
    private CollectHpAudio: Phaser.Sound.BaseSound;

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
        let Background3Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 3", [background3, background2]).setDepth(2);
        let Background4Layer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Background 4",  background3). setDepth(3);
        let TreeLayer1: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tree Layer", worldTileset).setDepth(4);
        let TileLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tile Layer 1", worldTileset).setDepth(5);
        let TreeLayer2: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Tree Layer 2", [treesTileset, worldTileset, tileSet]).setDepth(6);
        let MainLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Main Layer", [worldTileset,tileSet]).setDepth(7);
        let ObjectLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("Object Layer 1");

        // Background1Layer.setScale(0.7);
        // Background2Layer.setScale(0.7);
        // Background3Layer.setScale(0.7);
        // TreeLayer1.setScale(0.7);
        // TileLayer.setScale(0.7);
        // TreeLayer2.setScale(0.7);
        // MainLayer.setScale(0.7);

        let spawnPoint: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "Start");
        let finishPoint: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "Finish");
        let enemy1Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy1");
        let enemy2Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy2");
        let enemy3Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy3");
        let enemy4Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy4");
        let enemy5Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy5");
        let enemy6Point: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "enemy6");
        let diamondPoint1: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "diamond1");
        let diamondPoint2: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "diamond2");
        let diamondPoint3: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "diamond3");
        let diamondPoint4: any = this.map.findObject(ObjectLayer, (obj) => obj.name == "diamond4");
        let heartPoint1 : any = this.map.findObject(ObjectLayer, (obj) => obj.name == "heart1");
        

        this.player = new Player(this, spawnPoint.x, spawnPoint.y - 129).setDepth(8);
        this.add.existing(this.player);
        
        this.sign = this.add.image(finishPoint.x, 420, "sign").setDepth(7);
        this.sign.setScale(0.17);
        this.sign.setTint(0x63543c);
        this.add.existing(this.sign);

        // this.cameras.main.setBounds(0, 0, this.map.widthInPixels - 970, this.map.heightInPixels - 300);
        // this.physics.world.setBounds(0, 0, this.map.widthInPixels - 970, this.map.heightInPixels - 300);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });

        this.player.emitter.on("escPressed", this.onEscPressed, this);


        this.pauseButton = new BaseButton(this, this.cameras.main.width/2, 30, "optionbuttons", 1, "", 4);
        this.pauseButton.setDepth(8);
        this.pauseButton.setOnClick(this.pauseButtonOnClick, this);
        this.add.existing(this.pauseButton);

        //enemies
        let enemy1 = new Enemy(this, enemy1Point.x  , enemy1Point.y  , "enemy1_1", "enemy1_attack");
        this.physics.add.collider(enemy1, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy1, this.player.onPlayerEnemyCollision, null, this);
        enemy1.setSize(32, 32);
        enemy1.scaleX = -1;
        enemy1.setOffset(32, 0);

        let enemy2 = new Enemy(this, enemy2Point.x  , enemy2Point.y  , "enemy1_1", "enemy1_attack");
        this.physics.add.collider(enemy2, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy2,this.player.onPlayerEnemyCollision, null, this);
        enemy2.setSize(32, 32);
        enemy2.scaleX = -1;
        enemy2.setOffset(32, 0);

        let enemy3 = new Enemy(this, enemy3Point.x  , enemy3Point.y *0.7, "enemy1_1", "enemy1_attack");
        this.physics.add.collider(enemy3, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy3, this.player.onPlayerEnemyCollision, null, this);
        enemy3.setSize(32, 32);

        let enemy4 = new Enemy(this, enemy4Point.x  , enemy4Point.y  , "enemy3_1", "enemy3_attack");
        this.physics.add.collider(enemy4, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy4, this.player.onPlayerEnemyCollision, null, this);
        enemy4.flipX = false;
        enemy4.setSize(43, 46);
        enemy4.setOffset(0, 14);
        

        let enemy5 = new Enemy(this, enemy5Point.x  , enemy5Point.y  , "enemy3_1", "enemy3_attack");
        this.physics.add.collider(enemy5, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy5, this.player.onPlayerEnemyCollision, null, this);
        enemy5.setSize(43, 46);
        enemy5.setOffset(22, 14);
        
        let enemy6 = new Enemy(this, enemy6Point.x  , enemy6Point.y , "enemy4", "enemy4_idle");
        this.physics.add.collider(enemy6, MainLayer);
        MainLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, enemy6, this.player.onPlayerEnemyCollision, null, this);
        enemy6.setSize(enemy6.width - 37, enemy6.height);
        enemy6.setOffset(30, 0);

        //diamonds
        let diamond1 = new Collectible(this, diamondPoint1.x, diamondPoint2.y + 100, "diamonds","diamond");
        this.physics.add.collider(this.player, diamond1,this.player.onPlayerDiamondCollision, null, this);

        let diamond2 = new Collectible(this, diamondPoint2.x, diamondPoint2.y, "diamonds","diamond");
        this.physics.add.collider(this.player, diamond2, this.player.onPlayerDiamondCollision, null, this);

        let diamond3 = new Collectible(this, diamondPoint3.x, diamondPoint3.y, "diamonds","diamond");
        this.physics.add.collider(this.player, diamond3, this.player.onPlayerDiamondCollision, null, this);

        let diamond4 = new Collectible(this, diamondPoint4.x, diamondPoint4.y, "diamonds","diamond");
        this.physics.add.collider(this.player, diamond4, this.player.onPlayerDiamondCollision, null, this);

        let heart1 = new Collectible(this, heartPoint1.x, heartPoint1.y, "hearts", "heart");
        heart1.setScale(1.5);
        this.physics.add.collider(this.player, heart1, this.player.onPlayerHeartCollision, null, this);
    }

    update() {
        this.player.update();

        if(this.player.x >= this.sign.x && this.player.y == this.sign.y){
            this.finishLine();
        }

        this.pauseButton.x = this.cameras.main.scrollX;
        this.pauseButton.y = this.cameras.main.scrollY;
    }


    private finishLine(){
        this.cameras.main.fadeOut(800);
        this.scene.start("level3");
    }
    private pauseButtonOnClick() {
        this.scene.pause();
        this.scene.launch("ingameMenu", { key: "level2" });
    }

    private onEscPressed(): void {
        this.scene.pause();
        this.scene.launch("ingameMenu", { key: "level2" });
    }

    // private diamondCollected(diamond: Diamond) {
    //     diamond.visible = false;
    //     this.points += 5;
    //     console.log(this.points);


    // }

    // private getSceneName(){
    //     return this.sceneName;
    // }

}

export { Level2 }