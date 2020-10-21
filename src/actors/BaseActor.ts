abstract class BaseActor extends Phaser.Physics.Arcade.Sprite {
    protected _hitPoints: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, hp: number = 1) {
        super(scene, x, y, texture);

        this._hitPoints = hp;
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    public get hitPoints(): number {
        return this._hitPoints;
    }

    public get isAlive(): boolean {
        return this._hitPoints > 0;
    }
}

export { BaseActor }