import { BackgroundGraphics } from "../graphics/BackgroundGraphics";
import { BaseButton } from "../graphics/BaseButton";
class Start extends Phaser.Scene {
    private logo: Phaser.GameObjects.Image;
    private buttonStart: BaseButton;
    private background1: BackgroundGraphics;
    private background2: BackgroundGraphics;
    private background3: BackgroundGraphics;

    private audio: Phaser.Sound.BaseSound;

    constructor() {
        super("start");
    }

    create() {
        this.background1 = new BackgroundGraphics(this, "background_day1");
        this.add.existing(this.background1);
        this.background2 = new BackgroundGraphics(this, "background_day2");
        this.add.existing(this.background2);
        this.background3 = new BackgroundGraphics(this, "background_day3");
        this.add.existing(this.background3);

        this.logo = this.add.image(this.cameras.main.width / 2, 100, "logo");
        this.logo.setScale(0.5);
        this.add.existing(this.logo);

        this.buttonStart = new BaseButton(this, this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, "buttonsstart", 0, "START", 1);
        this.buttonStart.text.setSize(40, 40);
        this.buttonStart.setOnClick(() => { this.scene.start("level2") }, this);
        this.add.existing(this.buttonStart);

        this.audio = this.sound.add("backgroundMusic", {
            mute: false,
            volume: 0.15,
            rate: 1,
            loop: true
        });
        this.audio.play();
    }

    update() {
        this.background1.update(1);
        this.background2.update(2);
        this.background3.update(3);
    }


}

export { Start }