import { BaseActor } from "./BaseActor";
class Collectible extends BaseActor {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, animsKey: string) {
        super(scene, x, y, texture);

        this.scene.anims.create({
            key: animsKey,
            frames: this.scene.anims.generateFrameNames(texture),
            frameRate: 10,
            repeat: -1
        });
        this.setGravity(0);
        this.setVelocity(0);
        this.setDepth(8);
        this.setVisible(true);
        this.anims.play(animsKey, true);
        scene.add.existing(this);
    }

    // public onCollected(x: number, y: number, texture: string){
    //     let collectedIdentificator = this.scene.add.image(x, y, texture, 1);
    //     this.scene.add.existing(collectedIdentificator);
    // }
}

export { Collectible }