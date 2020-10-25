  
import { CustomKeyboardInput } from "../utils/CustomKeyboardInput";
import { BaseActor } from "./BaseActor";
import { Enemy } from "./Enemy";

class Player extends BaseActor {
    private readonly walkSpeed: number = 150;
    private readonly runSpeed: number = 270;
    private readonly hp: number = 3;

    private keys: CustomKeyboardInput;
    public emitter: Phaser.Events.EventEmitter;

    private updatePlayer: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player");

        this._hitPoints = this.hp;

        this.scene.anims.create({
            key: "player_idle",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "idle", start: 1, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "player_attack",
            frames: this.scene.anims.generateFrameNames("player", { prefix: "attack", start: 1, end: 7 }),
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
        
        this.emitter = new Phaser.Events.EventEmitter();

        this.keys = new CustomKeyboardInput(scene);
        this.keys.escape.on("down", this.onEscPress, this);

        this.setupPlayerEvents();
    }

    public update(): void {
        this.handleKeyboardInput();
        this.animations();
        this.setupKeyboardEvents();
    }

    private onEscPress(): void {
        this.emitter.emit("escPressed");
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

    private animations(): void {
        if (this.updatePlayer) {
            if (this.keys.shift.isDown && (this.keys.a.isDown || this.keys.left.isDown || this.keys.d.isDown || this.keys.right.isDown)) {
                this.anims.play("player_run", true);
            } else if (this.keys.a.isDown || this.keys.left.isDown || this.keys.d.isDown || this.keys.right.isDown) {
                this.anims.play("player_run", true);
            } else {
                this.anims.play("player_idle", true);
                this.setSize(23, 32);
            }

            if (this.keys.a.isDown || this.keys.left.isDown) {
                this.flipX = true;
                this.setSize(23, 32);
                this.setOffset(30, 28)
            } else {
                this.flipX = false;
                this.setSize(23, 32);
                this.setOffset(10, 28)
            }
        }
    }

    private setupPlayerEvents(): void {
        this.on('animationcomplete', (anim: Phaser.Animations.Animation) => {
            this.emit("customEventName_" + anim.key);

            this.updatePlayer = true;
        });
    }

    private setupKeyboardEvents(): void {
        this.keys.z.on("down", () => {
            this.updatePlayer = false;
            this.anims.play("player_attack", true);
            this.setSize(40, 32);
            this.setOffset(10, 28);
        });

        this.keys.space.on("down", () => {
            // if (this.body.velocity.y != this.scene.physics.world.gravity.y && this.body.velocity.y != -6000) {
                this.updatePlayer = false;
                this.body.velocity.y = -6000;
                this.anims.play("player_jump", true);
               
        //    }
        });
    }

    public onPlayerEnemyCollision(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) {
        if (player.body.width == 40) {
            enemy.destroy();
        } else {
            //player.destroy();
        }
    }

    public onPlayerDiamondCollision(player: Phaser.Physics.Arcade.Sprite, diamond: Phaser.Physics.Arcade.Sprite){
        diamond.destroy();
    }

    public onPlayerHeartCollision(player: Phaser.Physics.Arcade.Sprite, heart: Phaser.Physics.Arcade.Sprite){
        heart.destroy();
    }

    /* public onPlayerEnvironmentCollision(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Tilemaps.StaticTilemapLayer) {
        if (player.flipX = false && player.body.width == 40 && player.body.blocked.right) {
            player.body.x -= 17;
        } else if (player.flipX = true && player.body.width == 40 && player.body.blocked.left) {
            player.body.x += 17;
        }
    } */
}

export { Player }