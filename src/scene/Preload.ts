class Preload extends Phaser.Scene {
    private loadingText: Phaser.GameObjects.Text;

    constructor() {
        super("preload");
    }

    create() {
        this.load.on("load", this.onFileLoaded, this);
        this.load.on("complete", this.onComplete, this);

        this.loadingText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, "Loading..", {font: "40px Calibri", fill: "black"});
        this.loadingText.setOrigin(0.5);
        this.add.existing(this.loadingText);

        this.load.start();
    }

    private onFileLoaded(): void {
        this.loadingText.text += "..";
    }

    private onComplete(): void {
        console.log("load complete");

        this.scene.start("main");
    }
}

export { Preload }