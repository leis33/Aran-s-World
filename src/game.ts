import 'phaser';
import { Preload } from './scene/Preload';
import { Level3 } from './scene/level3';
import { Level2 } from './scene/Level2';
import { Start } from './scene/Start';
import { InGameMenu } from "./scene/InGameMenu";

class GameApp extends Phaser.Game {
    public static gameConfig: Phaser.Types.Core.GameConfig = null;

    constructor(config: Phaser.Types.Core.GameConfig) {
        GameApp.gameConfig = config;

        if (GameApp.gameConfig == null) {
            GameApp.gameConfig = {
                type: Phaser.AUTO,
                parent: "content",
                backgroundColor: 'black',
                width: 1024,
                height: 512,
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                },
                physics: {
                    default: "arcade",
                    arcade: {
                        debug: true
                    }
                },
<<<<<<< HEAD
                scene: [Preload, Start,Main, Level2, InGameMenu]
=======
                scene: [Preload, Start, Level2, Level3]
>>>>>>> 6fed82fc29553d3bfe4adf081652497306bf828c
            };
        }

        super(GameApp.gameConfig);
    }
}

export { GameApp }

new GameApp(null);
