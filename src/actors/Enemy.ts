import { BaseActor } from "./BaseActor";

class Enemy extends BaseActor {
    private readonly hp: number = 1;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, animsKey: string) {
        super(scene, x, y, texture);
        
        this._hitPoints = this.hp;

        this.scene.anims.create({
            key: animsKey,
            frames: this.scene.anims.generateFrameNames(texture),
            frameRate: 10,
            repeat: -1
        });

        this.flipX = true;
        this.anims.play(animsKey, true);
    }
}

export { Enemy }