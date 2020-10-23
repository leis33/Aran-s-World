import 'phaser';
import { Preload } from './scene/Preload';
import { Level3 } from './scene/level3';
import { Level2 } from './scene/Level2';
import { Start } from './scene/Start';
import { InGameMenu } from "./scene/InGameMenu";
import { MenuScene } from './scene/MenuScene';

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
                scene: [Preload, Start, InGameMenu, Level2, Level3]
            };
        }

        super(GameApp.gameConfig);
    }
}

export { GameApp }

new GameApp(null);
