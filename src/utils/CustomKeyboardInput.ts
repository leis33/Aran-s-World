class CustomKeyboardInput {
    public up?: Phaser.Input.Keyboard.Key;
    public down?: Phaser.Input.Keyboard.Key;
    public left?: Phaser.Input.Keyboard.Key;
    public right?: Phaser.Input.Keyboard.Key;

    public w?: Phaser.Input.Keyboard.Key;
    public s?: Phaser.Input.Keyboard.Key;
    public a?: Phaser.Input.Keyboard.Key;
    public d?: Phaser.Input.Keyboard.Key;
    
    public z?: Phaser.Input.Keyboard.Key;

    public space?: Phaser.Input.Keyboard.Key;
    public shift?: Phaser.Input.Keyboard.Key;
    public escape?: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene) {
        this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.w = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.s = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.a = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.d = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.z = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.escape = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
}

export { CustomKeyboardInput }
