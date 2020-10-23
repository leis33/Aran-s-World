import { BackgroundGraphics } from "../graphics/BackgroundGraphics";
class Start extends Phaser.Scene{

    private logo: Phaser.GameObjects.Image;
    private buttonStart: Phaser.GameObjects.Image;
    private background1 : BackgroundGraphics;
    private background2 : BackgroundGraphics;
    private background3 : BackgroundGraphics;
    constructor(){
        super("start");
    }

    create(){
        this.background1 = new BackgroundGraphics(this, "background_night1");
        this.add.existing(this.background1);
        this.background2 = new BackgroundGraphics(this, "background_night2");
        this.add.existing(this.background2);
        this.background3 = new BackgroundGraphics(this, "background_night3");
        this.add.existing(this.background3);
        this.logo = this.add.image(this.cameras.main.width/2, 100, "logo");
        this.logo.setScale(0.5);
        this.add.existing(this.logo);
        this.buttonStart = this.add.image(this.cameras.main.width/2,this.cameras.main.height/2 + 100, "startbutton");
        this.buttonStart.setScale(0.1);
        this.buttonStart.setInteractive();
        this.buttonStart.on("pointerdown", () => {
            this.scene.start("level2");
        });
        this.add.existing(this.buttonStart);

        let startText = this.add.text(this.buttonStart.x-52, this.buttonStart.y-25,"start",{font:"40px Monospace"});
        startText.setOrigin(0);
        // startText.setInteractive();
        // startText.on("pointerdown", () => {this.scene.start("level2")});
        this.add.existing(startText);
    }

    update(){
        this.background1.update(1);
        this.background2.update(2);
        this.background3.update(3);
    }


}

export { Start }