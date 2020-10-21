class Preload extends Phaser.Scene {
    private loadingText: Phaser.GameObjects.Text;

    constructor() {
        super("preload");
    }

    create() {
        this.load.on("load", this.onFileLoaded, this);
        this.load.on("complete", this.onComplete, this);

        this.load.image("tiles3", "./assets/level3/tiles.png");
        this.load.image("background3", "./assets/level3/background.png");
        this.load.tilemapTiledJSON("level3", "./assets/level3/level3.json");

        //enemies
        this.load.spritesheet("enemy1", "./assets/anims/enemy1.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy2", "./assets/anims/enemy2.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("enemy3", "./assets/anims/enemy3.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("enemy4", "./assets/anims/enemy4.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("enemy5", "./assets/anims/enemy5.png", {frameWidth: 64, frameHeight: 64});

        this.load.atlas("player", "./assets/anims/player.png", "./assets/anims/player.json");

        this.loadingText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, "Loading..", {font: "40px Calibri", fill: "black"});
        this.loadingText.setOrigin(0.5);
        this.add.existing(this.loadingText);

        this.load.start();
    }

    private onFileLoaded(): void {
        this.loadingText.text += ".";
    }

    private onComplete(): void {
        console.log("load complete");

        this.scene.start("level3");
    }
}

export { Preload }