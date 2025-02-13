const DUNEGON_GROUND_WIDTH = 31;
const DUNEGON_GROUND_HEIGHT = 8;

class DungeonGround {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(this.x * DUNEGON_GROUND_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_GROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND_WIDTH * w * this.scale, DUNEGON_GROUND_HEIGHT * h * this.scale);
    };

    update() {
        this.BB = new BoundingBox(this.x * DUNEGON_GROUND_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_GROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND_WIDTH * this.w * this.scale, DUNEGON_GROUND_HEIGHT * this.h * this.scale);
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            for (let k = 0; k < this.w; k++) {
                ctx.drawImage(this.spritesheet, 200, 1432, DUNEGON_GROUND_WIDTH, DUNEGON_GROUND_HEIGHT, this.x * DUNEGON_GROUND_WIDTH * this.scale + (k * DUNEGON_GROUND_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_GROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND_WIDTH * this.scale, DUNEGON_GROUND_HEIGHT * this.scale);
            }
        }
        this.BB.draw(ctx);
    };
};

const DUNEGON_WALL_WIDTH = 8;
const DUNEGON_WALL_HEIGHT = 31;

class DungeonWall {
    constructor(game, x, y, h) {
        Object.assign(this, { game, x, y, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(this.x * DUNEGON_WALL_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_WALL_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL_WIDTH * this.scale, DUNEGON_WALL_HEIGHT * h * this.scale);
    };

    update() {
        this.BB = new BoundingBox(this.x * DUNEGON_WALL_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_WALL_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL_WIDTH * this.scale, DUNEGON_WALL_HEIGHT * this.h * this.scale);
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            ctx.drawImage(this.spritesheet, 232, 1400, DUNEGON_WALL_WIDTH, DUNEGON_BACKGROUND_HEIGHT, (this.x * DUNEGON_WALL_WIDTH * this.scale) - this.game.camera.x, this.y + l * DUNEGON_WALL_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL_WIDTH * this.scale, DUNEGON_WALL_HEIGHT * this.scale);
        }
        this.BB.draw(ctx);
    };
};

const DUNEGON_BACKGROUND_WIDTH = 31;
const DUNEGON_BACKGROUND_HEIGHT = 31;

class DungeonBackground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 3;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 808, 968, DUNEGON_BACKGROUND_WIDTH, DUNEGON_BACKGROUND_HEIGHT, (this.x + i * DUNEGON_BACKGROUND_WIDTH * this.scale) - this.game.camera.x, this.y + k * DUNEGON_BACKGROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_BACKGROUND_WIDTH * this.scale, DUNEGON_BACKGROUND_HEIGHT * this.scale);
            }
        }
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
};

const DUNEGON_DOOR_WIDTH = 47;
const DUNEGON_DOOR_HEIGHT = 39;

class DungeonDoor {
    constructor(game, x, y, level) {
        Object.assign(this, { game, x, y, level });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5.5;
        this.BB = new BoundingBox(this.x - this.game.camera.x,  this.y - this.game.camera.y, DUNEGON_DOOR_WIDTH * this.scale, DUNEGON_DOOR_HEIGHT * this.scale);
        this.fReleased = false;
    };

    update() {

        this.BB = new BoundingBox(this.x + 81 - this.game.camera.x,  this.y + 50 - this.game.camera.y, DUNEGON_DOOR_WIDTH * 2.2, DUNEGON_DOOR_HEIGHT * 4.3);

        const that = this;
        if (this.game.keys["f"]) {
            this.game.entities.forEach((entity) => {
                if (this.fReleased && entity.BB && that.BB.collide(entity.BB) && entity instanceof Knight) {
                    console.dir(that.level);
                    that.game.camera.loadLevel(that.level, true, false, false);
                }
            });
        } else {
            this.fReleased = true;
        }
    };


    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1840, 1904, DUNEGON_DOOR_WIDTH, DUNEGON_DOOR_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNEGON_DOOR_WIDTH * this.scale, DUNEGON_DOOR_HEIGHT * this.scale);
        this.BB.draw(ctx);
    };
};

const DUNEGON_TORCH_WIDTH = 20;
const DUNEGON_TORCH_HEIGHT = 39;

class DungeonTorch {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.animator = this.torch();
        this.scale = 5.5;
    };

    update() {
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y - this.game.camera.y, 4);
    }

    torch() {
        return new Animator(ASSET_MANAGER.getAsset(TORCH), 0, 0, 21, 27, 4, 0.1, false, true);
    }
};


const DUNEGON_BACKGROUND2_WIDTH = 896;
const DUNEGON_BACKGROUND2_HEIGHT = 144;

class DungeonBackground2 {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON_BACKGROUND_IMAGE);
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 0, 0, DUNEGON_BACKGROUND2_WIDTH, DUNEGON_BACKGROUND2_HEIGHT, (this.x + i * DUNEGON_BACKGROUND2_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_BACKGROUND2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_BACKGROUND2_WIDTH * this.scale, DUNEGON_BACKGROUND2_HEIGHT * this.scale);
            }
        }
    };
};

const BONFIRE_WIDTH = 56;
const BONFIRE_HEIGHT = 56;

class Bonfire {
    constructor(game, x, y, level) {
        Object.assign(this, { game, x, y, level });

        this.animator1 = this.bonfireAnimationLit();
        this.animator2 = this.bonfireAnimationUnlit();
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.otherspritesheet = ASSET_MANAGER.getAsset("../resources/bonfire_unlit.png");
        this.scale = 3;
        this.BB = new BoundingBox(this.x - this.game.camera.x,  this.y - this.game.camera.y, BONFIRE_WIDTH * this.scale, BONFIRE_HEIGHT * this.scale);
        this.fReleased = false;
        this.discovered = false;
        this.isCurrent = false;
    };

    update() {

        this.BB = new BoundingBox(this.x + 81 - this.game.camera.x,  this.y + 50 - this.game.camera.y, BONFIRE_HEIGHT * 2.2, BONFIRE_HEIGHT * 4.3);

        if (this.game.keys["f"]) {
            this.game.entities.forEach((entity) => {
                if (this.fReleased && entity.BB && this.BB.collide(entity.BB) && entity instanceof Knight) {
                    console.dir(this.level);
                    this.activateCheckpoint();
                    this.fReleased = false;
                }
            });
        } else {
            this.fReleased = true;
        }
    };

    bonfireAnimationLit() {
        return new Animator(ASSET_MANAGER.getAsset(DUNGEON), 2236, 775, 64, 56, 6, 0.1, false, true);
    }

    bonfireAnimationUnlit() {
        return new Animator(ASSET_MANAGER.getAsset(DUNGEON), 2620, 775, 64, 56, 1, 0.1, false, true);
    }


    activateCheckpoint() {
        this.discovered = true;
        this.isCurrent = true;

        this.game.camera.currentCheckpoint = this;
        console.log(`Checkpoint activated at (${this.x}, ${this.y}) in level: ${this.level}`)
        // this.game.camera.loadLevel(this.level, false, false, false);
    }


    draw(ctx) {
        if(this.discovered){
            this.animator1.drawFrame(this.game.clockTick, ctx, this.x + 50 - this.game.camera.x, this.y + 40 - this.game.camera.y, this.scale);
        } else {
            this.animator2.drawFrame(this.game.clockTick, ctx, this.x + 50 - this.game.camera.x, this.y + 40 - this.game.camera.y, this.scale);
        }
        // ctx.drawImage(this.spritesheet, 2240, 776, BONFIRE_WIDTH, BONFIRE_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, BONFIRE_WIDTH * this.scale, BONFIRE_HEIGHT * this.scale);
        this.BB.draw(ctx);
    };
};

const MENU_BACKGROUND_WIDTH = 640;
const MENU_BACKGROUND_HEIGHT = 320;

class menuBackground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset('../resources/menuScreen.png');
        this.scale = 2.24;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 0, 0, MENU_BACKGROUND_WIDTH, MENU_BACKGROUND_HEIGHT, (this.x + i * MENU_BACKGROUND_WIDTH * this.scale), this.y * MENU_BACKGROUND_HEIGHT * this.scale, MENU_BACKGROUND_WIDTH * this.scale, MENU_BACKGROUND_HEIGHT * this.scale);
            }
        }
    };
}