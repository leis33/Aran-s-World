import { Enemy } from "../actors/Enemy";
import { Player } from "../actors/Player";
import { BaseButton } from "../graphics/BaseButton";

class Level1 extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private player: Player;
    private sign: Phaser.GameObjects.Image;
    private pauseButton: BaseButton;

    constructor() {
        super("level1");
    }
    
    preload(){
        this.anims.create({
            key:"enemy4_idle",
            frames: this.anims.generateFrameNames("enemy4"),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "enemy5_idle",
            frames: this.anims.generateFrameNames("enemy5"),
            frameRate: 10,
            repeat: -1
        })
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

        this.player = new Player(this, 200, 600).setDepth(6); 
        this.add.existing(this.player);

        this.player.emitter.on("escPressed", this.onEscPressed, this);

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

        this.sign = this.add.image(finishPoint.x, finishPoint.y, "sign").setDepth(5);
        this.sign.setScale(0.17);
        this.sign.setTint(0x63543c);
        this.add.existing(this.sign);

        this.pauseButton = new BaseButton(this, 30, 30, "optionbuttons", 1, "", 4);
        this.pauseButton.setDepth(8);
        this.pauseButton.setOnClick(this.pauseButtonOnClick, this);
        this.add.existing(this.pauseButton);


        //enemeis

        let enemy1 = new Enemy(this, 200, 450, "enemy4", "enemy4_idle");
        enemy1.setDepth(6);
        this.physics.add.collider(enemy1, foregroundLayer1);
        this.physics.add.collider(this.player, enemy1, this.player.onPlayerEnemyCollision, null, this);
        enemy1.setSize(18, 40);
        enemy1.setOffset(49, 20);
        this.add.existing(enemy1);
        enemy1.scaleX = -1;

        let enemy2 = new Enemy(this, 930, 450, "enemy5", "enemy5_idle");
        enemy2.setDepth(6);
        this.physics.add.collider(enemy2, foregroundLayer1);
        this.physics.add.collider(this.player, enemy2, this.player.onPlayerEnemyCollision, null, this);
        enemy2.setSize(18, 40);
        enemy2.setOffset(39, 20);
        this.add.existing(enemy2);
        
        let enemy3 = new Enemy(this, 1730, 550, "enemy5", "enemy5_idle");
        enemy3.setDepth(6);
        this.physics.add.collider(enemy3, foregroundLayer1);
        this.physics.add.collider(this.player, enemy3, this.player.onPlayerEnemyCollision, null, this);
        enemy3.setSize(18, 40);
        enemy3.setOffset(39, 20);
        this.add.existing(enemy3);

         let enemy4 = new Enemy(this, 2030, 300, "enemy5", "enemy5_idle");
         enemy4.setDepth(6);
         this.physics.add.collider(enemy4, foregroundLayer1);
         this.physics.add.collider(this.player, enemy4, this.player.onPlayerEnemyCollision, null, this);
         enemy4.setSize(18, 40);
         enemy4.setOffset(39, 20);
         this.add.existing(enemy4); 

         let enemy5 = new Enemy(this, 2660, 450, "enemy4", "enemy4_idle");
         enemy5.setDepth(6);
         this.physics.add.collider(enemy5, foregroundLayer1);
         this.physics.add.collider(this.player, enemy5, this.player.onPlayerEnemyCollision, null, this);
         enemy5.setSize(18, 40);
         enemy5.setOffset(39, 20);
         this.add.existing(enemy5);

         let enemy6 = new Enemy(this, 2400, 450, "enemy5", "enemy5_idle");
         enemy6.setDepth(6);
         this.physics.add.collider(enemy6, foregroundLayer1);
         this.physics.add.collider(this.player, enemy6, this.player.onPlayerEnemyCollision, null, this);
         enemy6.setSize(18, 40);
         enemy6.setOffset(39, 20);
         this.add.existing(enemy6);

     }

    update(){
        this.player.update();
        
        if (this.player.x >= this.sign.x && this.player.y == this.sign.y - 1.333) {
            this.finishLine();
        }
        this.pauseButton.x = this.cameras.main.scrollX;
        this.pauseButton.y = this.cameras.main.scrollY;

     }

    private finishLine(){
        this.cameras.main.fadeOut(800);
        this.scene.start("level2");
    }

    private pauseButtonOnClick() {
        this.scene.pause();
        this.scene.launch("ingameMenu", { key: "level1" });
    }

    private onEscPressed(): void {
        this.scene.pause();
        this.scene.launch("ingameMenu", { key: "level1" });
    }

}

export { Level1 }