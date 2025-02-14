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
        ctx.drawImage(this.spritesheet, 1496, 1520, SHOPKEEPER_TENT_WIDTH, SHOPKEEPER_TENT_HEIGHT, this.x  - this.game.camera.x, this.y, SHOPKEEPER_TENT_WIDTH * this.scale, SHOPKEEPER_TENT_HEIGHT * this.scale);
    };
};

const CHANDELIER_WIDTH = 39;
const CHANDELIER_HEIGHT = 39;

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
        ctx.drawImage(this.spritesheet, 2096, 208, CHANDELIER_WIDTH, CHANDELIER_HEIGHT, this.x  - this.game.camera.x, this.y, CHANDELIER_WIDTH * this.scale, CHANDELIER_HEIGHT * this.scale);
    };
};

const WORKBENCH_WIDTH = 39;
const WORKBENCH_HEIGHT = 31;

class DungeonWorkbench {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5.5;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1608, 2480, WORKBENCH_WIDTH, WORKBENCH_HEIGHT, this.x - this.game.camera.x, this.y, WORKBENCH_WIDTH * this.scale, WORKBENCH_HEIGHT * this.scale);
    };
};

const ANVIL_WIDTH = 23;
const ANVIL_HEIGHT = 15;

class DungeonAnvil {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 4.5;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1656, 2504, ANVIL_WIDTH, ANVIL_HEIGHT, this.x - this.game.camera.x, this.y, ANVIL_WIDTH * this.scale, ANVIL_HEIGHT * this.scale);
    };
};

const WALL_AXE_WIDTH = 39;
const WALL_AXE_HEIGHT = 24;

class WallAxe {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 3;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1736, 2448, WALL_AXE_WIDTH, WALL_AXE_HEIGHT, this.x - this.game.camera.x, this.y, WALL_AXE_WIDTH * this.scale, WALL_AXE_HEIGHT * this.scale);
    };
};

const SWORDRACK_WIDTH = 31;
const SWORDRACK_HEIGHT = 24;

class SwordRack {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 3;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1712, 2520, SWORDRACK_WIDTH, SWORDRACK_HEIGHT, this.x - this.game.camera.x, this.y, SWORDRACK_WIDTH * this.scale, SWORDRACK_HEIGHT * this.scale);
    };
};

const SHIELD_WIDTH = 31;
const SHIELD_HEIGHT = 24;

class ShieldRack {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 3;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1752, 2584, SHIELD_WIDTH, SHIELD_HEIGHT, this.x - this.game.camera.x, this.y, SHIELD_WIDTH * this.scale, SHIELD_HEIGHT * this.scale);
    };
};

const BOXES_WIDTH = 47;
const BOXES_HEIGHT = 39;

class Boxes {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 4;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1200, 1648, BOXES_WIDTH, BOXES_HEIGHT, this.x - this.game.camera.x, this.y, BOXES_WIDTH * this.scale, BOXES_HEIGHT * this.scale);
    };
};

const POTION_WIDTH = 16;
const POTION_HEIGHT = 16;

class Potion {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 4;
        this.BB = new BoundingBox(this.x - this.game.camera.x , this.y - this.game.camera.y, POTION_WIDTH * this.scale, POTION_HEIGHT * this.scale);
    };

    update() {
        this.BB = new BoundingBox(this.x - this.game.camera.x , this.y - this.game.camera.y, POTION_WIDTH * this.scale, POTION_HEIGHT * this.scale);

    };
//1736 - green, 1712 - red
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1712, 2216, POTION_WIDTH, POTION_HEIGHT, this.x - this.game.camera.x, this.y, POTION_WIDTH * this.scale, POTION_HEIGHT * this.scale);
        this.BB.draw(ctx); 
    }

}
