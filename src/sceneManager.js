class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.gameOver = false;

        this.title = true;
        this.credits = false;
        this.level = null;

        this.menuSelect = {
            mario: false,
            luigi: false,
            credits: false
        }
        this.menuSelectIndex = -10;
        this.creditsLineIndex = 0;
        this.menuButtonTimer = 0.15;
        this.menuButtonCooldown = 0.15;

        //this.knight = new Knight(this.game, 100, 100);

        this.loadLevel(shopkeeper, 0, 0, false, true);
    };

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title) {

        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;


        this.knight = new Knight(this.game, 100, 435);
        this.game.addEntity(this.knight);

        if (level.tent) {
            for (let i = 0; i < level.tent.length; i++) {
                let tent = level.tent[i];
                this.game.addEntity(new ShopkeeperTent(this.game, tent.x, tent.y));
            }
        }

        if (level.reinaIdle) {
            for (let i = 0; i < level.reinaIdle.length; i++) {
                let reinaIdle = level.reinaIdle[i];
                this.game.addEntity(new ReinaIdle(this.game, reinaIdle.x, reinaIdle.y));
            }
        }

        if (level.mechagolem) {
            for (let i = 0; i < level.mechagolem.length; i++) {
                let mechagolem = level.mechagolem[i];
                this.game.addEntity(new MechaGolem(this.game, mechagolem.x, mechagolem.y));
            }
        }

        if (level.dungeonGround) {
            for (let i = 0; i < level.dungeonGround.length; i++) {
                let ground = level.dungeonGround[i];
                this.game.addEntity(new DungeonGround(this.game, ground.x, ground.y, ground.w));
            }
        }

        if (level.dungeonWall) {
            for (let i = 0; i < level.dungeonWall.length; i++) {
                let wall = level.dungeonWall[i];
                this.game.addEntity(new DungeonWall(this.game, wall.x, wall.y, wall.h));
            }
        }

        if (level.chandelier) {
            for (let i = 0; i < level.chandelier.length; i++) {
                let chandelier = level.chandelier[i];
                this.game.addEntity(new Chandelier(this.game, chandelier.x, chandelier.y));
            }
        }

        if (level.dungeonBackground) {
            for (let i = 0; i < level.dungeonBackground.length; i++) {
                let background = level.dungeonBackground[i];
                this.game.addEntity(new DungeonBackground(this.game, background.x, background.y, background.w, background.h));
            }
        }

        if (level.music && !this.title) {
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset(level.music);
        }
        if (level == shopkeeper) {

        }
    };

    update() { 

        let middlepoint = PARAMS.SCREENWIDTH / 2 - 50;
        this.x = this.knight.x - middlepoint;
        //if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;


        if (this.level == shopkeeper && this.knight.x > 2000 && this.game.keys["e"]) {
            this.loadLevel(one, 0, 0, false, false)
        }
    };

    draw(ctx) {
    };  
};