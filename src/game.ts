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
                scene: [Preload, Start, Level2, Level3, InGameMenu]
=======
                scene: [Preload, Start, Level2, InGameMenu, Level3]
>>>>>>> 138a526425dfe6c43e9769c7de7583e53695f5a8
            };
        }

        super(GameApp.gameConfig);
    }
}

export { GameApp }

new GameApp(null);
