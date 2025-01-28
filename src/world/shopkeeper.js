const SHOPKEEPER_TENT_WIDTH = 119;
const SHOPKEEPER_TENT_HEIGHT = 47;

class ShopkeeperTent {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y    });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 4.3;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1496, 1464, SHOPKEEPER_TENT_WIDTH, SHOPKEEPER_TENT_HEIGHT, this.x  - this.game.camera.x, this.y, SHOPKEEPER_TENT_WIDTH * this.scale, SHOPKEEPER_TENT_HEIGHT * this.scale);
    };
};

const CHANDELIER_TENT_WIDTH = 39;
const CHANDELIER_TENT_HEIGHT = 39;

class Chandelier {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y    });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        ctx.save();
        ctx
        ctx.drawImage(this.spritesheet, 2096, 208, CHANDELIER_TENT_WIDTH, CHANDELIER_TENT_HEIGHT, this.x  - this.game.camera.x, this.y, CHANDELIER_TENT_WIDTH * this.scale, CHANDELIER_TENT_HEIGHT * this.scale);
    };
};