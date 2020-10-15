import 'phaser';
import { Boot } from './scene/Boot';
import { Preload } from './scene/Preload';
import { Main } from './scene/Main';

class GameApp extends Phaser.Game {
    public static gameConfig: Phaser.Types.Core.GameConfig = null;

    constructor(config: Phaser.Types.Core.GameConfig) {
        GameApp.gameConfig = config;

        if (GameApp.gameConfig == null) {
            GameApp.gameConfig = {
                type: Phaser.AUTO,
                parent: "content",
                backgroundColor: '#385e78',
                width: 1024,
                height: 512,
                scene: [Boot, Preload, Main]
            };
        }

        super(GameApp.gameConfig);
    }
}

export { GameApp }

new GameApp(null);
