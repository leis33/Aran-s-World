import { Player } from "../actors/Player";

class Main extends Phaser.Scene {
    private player: Player;

    constructor() {
        super("main");
    }

    create() {
        console.log("MAIN");

        this.player = new Player(this, 300, 300);
        this.add.existing(this.player);
    }

}

export { Main }