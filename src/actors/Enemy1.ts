import { BaseActor } from "./BaseActor";

class Enemy extends BaseActor {
    private readonly hp: number = 1;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, animsKey: string, prefix: string, startFrame: number, endFrame: number) {
        super(scene, x, y, texture);
        
        this._hitPoints = this.hp;

        this.scene.anims.create({
            key: animsKey,
            frames: this.scene.anims.generateFrameNames(texture, {prefix: prefix, start: startFrame, end: endFrame}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.play(animsKey, true);
    }
}

export { Enemy }