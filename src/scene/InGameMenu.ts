import { BaseButton } from "../graphics/BaseButton";
import { MenuScene } from "./MenuScene";

class InGameMenu extends MenuScene {
    private restartBtn: BaseButton;
    private mainMenuBtn: BaseButton;

    constructor() {
        super("ingameMenu");
    }

    create() {
        super.create();

        this.restartBtn = new BaseButton(this, this.background.x, (this.background.y - this.background.displayHeight / 2) + this.background.displayHeight * 0.44, "buttonsstart", 0, "restart", 1);
        this.restartBtn.setOnClick(this.onRestart, this);
        this.add.existing(this.restartBtn);

        this.mainMenuBtn = new BaseButton(this, this.background.x, (this.background.y - this.background.displayHeight / 2) + this.background.displayHeight * 0.69, "buttonsstart", 0, "main menu", 1);
        this.mainMenuBtn.setOnClick(this.onMainMenu, this);
        this.add.existing(this.mainMenuBtn);

        super.setOnCloseBtnCallback(this.onClose, this);

        let esc: Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        esc.on("down", this.onClose, this);
    }

    private onRestart(): void {
        this.scene.stop("level2");
        this.scene.stop("ingameMenu");
        this.scene.start("level2");
    }

    private onMainMenu(): void {
        this.scene.stop("level2");
        this.scene.stop("ingameMenu");
        this.scene.start("start");
    }

    private onClose(): void {
        this.scene.stop();
        this.scene.resume("level2");
    }
}

export { InGameMenu }