import { BaseButton } from "../graphics/BaseButton";

class MenuScene extends Phaser.Scene {
    protected defaultStyle: any = {
        fontSize: '30px',
        fontFamily: 'Monospace',
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
    }

    protected background: Phaser.GameObjects.Sprite;
    private title: Phaser.GameObjects.Text;

    private closeBtn: BaseButton;

    constructor(key: string) {
        super(key);
    }

    create() {
        this.background = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "window");
        this.background.setScale(0.17, 0.15);

        this.title = this.add.text(this.background.x, (this.background.y - this.background.displayHeight / 2) + this.background.displayHeight * 0.1, "OPTIONS", this.defaultStyle);
        this.title.setOrigin(0.5);
        this.add.existing(this.title);

        this.closeBtn = new BaseButton(this, this.background.x, this.background.y + this.background.displayHeight / 2 - 40, "optionbuttons", 0, "", 2);
        this.setOnCloseBtnCallback(() => { this.scene.stop(); this.scene.resume("level2") }, this);
        this.add.existing(this.closeBtn);
    }

    public setOnCloseBtnCallback(callback: Function, context: any): void {
        this.closeBtn.setOnClick(callback, context);
    }
}

export { MenuScene }