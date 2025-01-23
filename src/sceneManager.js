class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
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

        this.loadLevel(levelOne, 100, 100, false, true);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title) {

        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;

        // this.knight = new Knight(this.game, 100, 1);
        // this.game.addEntity(this.knight);

        this.game.addEntity(new Knight(this.game, 0 , 435));

        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        } else {
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

            // this.time = 400;
            this.game.camera.paused = false;
        }

        // if (level.lifts) {
        //     for (var i = 0; i < level.lifts.length; i++) {
        //         let lift = level.lifts[i];
        //         this.game.addEntity(new Lift(this.game, lift.x * PARAMS.BLOCKWIDTH, lift.y * PARAMS.BLOCKWIDTH, lift.goingDown));
        //     }
        // }
        //this.game.addEntity(this.mario);

    };

    update() { 

        let midpoint = 100000;

        if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;

        // NOTE: THIS FOLLOWING CODE HAS A BUG WHERE CANVAS COLOR WON'T CHANGE BACK TO BLUE.
        var canvas = document.getElementById("gameWorld");
        if (this.underground) {
            canvas.style.backgroundColor = "black";
        } else {
            canvas.style.backgroundColor = "#049cd8";
        }
    };

    draw(ctx) {
    };
};