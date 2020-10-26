import { BackgroundGraphics } from "../graphics/BackgroundGraphics";
import { BaseButton } from "../graphics/BaseButton";

class GameOver extends Phaser.Scene {
    private gameOverLogo: Phaser.GameObjects.Image;
    private buttonNewGame: BaseButton;

    private background1: BackgroundGraphics;
    private background2: BackgroundGraphics;
    private background3: BackgroundGraphics;

    constructor() {
        super("gameOver");
    }

    create() {
        this.cameras.main.fadeIn(800);

        this.background1 = new BackgroundGraphics(this, "background_day1");
        this.add.existing(this.background1);
        this.background2 = new BackgroundGraphics(this, "background_day2");
        this.add.existing(this.background2);
        this.background3 = new BackgroundGraphics(this, "background_day3");
        this.add.existing(this.background3);

        this.gameOverLogo = this.add.image(this.cameras.main.width / 2, 150, "gameOver");
        this.gameOverLogo.setScale(0.7);
        this.add.existing(this.gameOverLogo);

        this.buttonNewGame = new BaseButton(this, this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, "buttonsstart", 0, "NEW GAME", 1);
        this.buttonNewGame.text.setSize(40, 40);
        this.buttonNewGame.setOnClick(() => { this.scene.start("level1") }, this);
        this.add.existing(this.buttonNewGame);
    }

    update() {
        this.background1.update(-1);
        this.background2.update(-2);
        this.background3.update(-3);
    }
}

export { GameOver }