const DUNEGON_GROUND_WIDTH = 31;
const DUNEGON_GROUND_HEIGHT = 8;

class DungeonGround {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        for (let i = 0; i < this.w; i++) {
            ctx.drawImage(this.spritesheet, 200, 1432, 31, 8, (this.x + i * DUNEGON_GROUND_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_GROUND_HEIGHT * this.scale, DUNEGON_GROUND_WIDTH * this.scale, DUNEGON_GROUND_HEIGHT * this.scale);
        }
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
};

const DUNEGON_WALL_WIDTH = 8;
const DUNEGON_WALL_HEIGHT = 31;

class DungeonWall {
    constructor(game, x, y, h) {
        Object.assign(this, { game, x, y, h });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        for (let i = 0; i < this.h; i++) {
            ctx.drawImage(this.spritesheet, 232, 1400, DUNEGON_WALL_WIDTH, DUNEGON_BACKGROUND_HEIGHT, (this.x * DUNEGON_WALL_WIDTH * this.scale) - this.game.camera.x, this.y + i * DUNEGON_WALL_HEIGHT * this.scale, DUNEGON_WALL_WIDTH * this.scale, DUNEGON_WALL_HEIGHT * this.scale);
        }
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
};

const DUNEGON_BACKGROUND_WIDTH = 31;
const DUNEGON_BACKGROUND_HEIGHT = 31;

class DungeonBackground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 808, 968, DUNEGON_BACKGROUND_WIDTH, DUNEGON_BACKGROUND_HEIGHT, (this.x + i * DUNEGON_BACKGROUND_WIDTH * this.scale) - this.game.camera.x, this.y + k * DUNEGON_BACKGROUND_HEIGHT * this.scale, DUNEGON_BACKGROUND_WIDTH * this.scale, DUNEGON_BACKGROUND_HEIGHT * this.scale);
            }
        }
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
};

