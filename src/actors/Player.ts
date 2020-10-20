import { CustomKeyboardInput } from "../utils/CustomKeyboardInput";
import { BaseActor } from "./BaseActor";

class Player extends BaseActor {
    private readonly walkSpeed: number = 150;
    private readonly runSpeed: number = 270;
    private readonly hp: number = 3;

    private keys: CustomKeyboardInput;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player");

        this._hitPoints = this.hp;

        this.scene.anims.create({
            key: "player_idle",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "idle", start: 1, end: 9 }),
            frameRate: 10
        });

        this.scene.anims.create({
            key: "player_attack",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "Attack", start: 1, end: 7 }),
            frameRate: 10
        });

        this.scene.anims.create({
            key: "player_death",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "death", start: 1, end: 5 }),
            frameRate: 10
        });

        this.scene.anims.create({
            key: "player_hit",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "hit", start: 1, end: 3 }),
            frameRate: 10
        });

        this.scene.anims.create({
            key: "player_jump",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "jump", start: 1, end: 7 }),
            frameRate: 10
        });

        this.scene.anims.create({
            key: "player_run",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "run", start: 1, end: 8 }),
            frameRate: 10
        });

        this.keys = new CustomKeyboardInput(scene);
    }
}

export { Player }