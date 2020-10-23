import { GameApp } from  "../game";

class BackgroundGraphics extends Phaser.GameObjects.TileSprite {
    private movementSpeed: number = 0.5;

    constructor(scene: Phaser.Scene, texture: string) {
        super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 2, <number>GameApp.gameConfig.width, <number>GameApp.gameConfig.height,texture);
    }

    public update(num: number): void {
        this.tilePositionX += this.movementSpeed*num;
    }
}

export { BackgroundGraphics }