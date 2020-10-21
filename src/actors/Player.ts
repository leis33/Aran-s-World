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

        this.setSize(23, 32);
        //this.anims.play("player_idle", true);
    }

    public update(): void {
        this.handleKeyboardInput();
        //this.animations();
    }

    private handleKeyboardInput(): void {
        this.setVelocity(0);

        if (this.keys.shift.isDown) {
            if (this.keys.left.isDown || this.keys.a.isDown) {
                this.setVelocityX(-this.runSpeed);
            } else if (this.keys.right.isDown || this.keys.d.isDown) {
                this.setVelocityX(this.runSpeed);
            }

            this.body.velocity.normalize().scale(this.runSpeed);

        } else {
            if (this.keys.left.isDown || this.keys.a.isDown) {
                this.setVelocityX(-this.walkSpeed);
            } else if (this.keys.right.isDown || this.keys.d.isDown) {
                this.setVelocityX(this.walkSpeed);
            }  

            this.body.velocity.normalize().scale(this.walkSpeed);
        }
    }

    private animations() {
        if (this.keys.shift.isDown && (this.keys.a.isDown || this.keys.left.isDown || this.keys.d.isDown || this.keys.right.isDown)) {
            this.anims.play("player_run", true);
        } else if (this.keys.a.isDown || this.keys.left.isDown || this.keys.d.isDown || this.keys.right.isDown) {
            this.anims.play("player_run", true);
        } else {
            if (this.anims.isPlaying) {
                this.anims.stop();
            }
            this.anims.play("player_idle", true);
        }

        if (this.keys.a.isDown || this.keys.left.isDown) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
            this.setOffset(10, 28)
        }
    }
}

export { Player }