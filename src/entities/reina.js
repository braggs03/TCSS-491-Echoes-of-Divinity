const REINA_WIDTH = 200;
const REINA_HEIGHT = 110;
const REINA_X_OFFSET = -20;
const REINA_Y_OFFSET = 30;

class Reina {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.facing = LEFT;
        this.animator = this.idleLeft();
        this.scale = 5;
        this.BB = new BoundingBox(this.x + REINA_X_OFFSET - this.game.camera.x, this.y + REINA_Y_OFFSET - this.game.camera.y, REINA_WIDTH, REINA_HEIGHT);
    };

    update() {
        this.BB = new BoundingBox(this.x + REINA_X_OFFSET - this.game.camera.x, this.y + REINA_Y_OFFSET - this.game.camera.y, REINA_WIDTH, REINA_HEIGHT);
        if (this.game.camera.knight.x + KNIGHT_WIDTH < this.x) {
            if (this.facing != LEFT) {
                this.facing = LEFT;
                this.animator = this.idleLeft();
            }
        } else {
            if (this.facing != RIGHT) {
                this.facing = RIGHT;
                this.animator = this.idleRight();
            }
        }

        testInteractable(this, text.reina);
    };

    idleLeft() {
        return new Animator(ASSET_MANAGER.getAsset(REINA), 384, 0, 64, 64, 6, 0.125, true, true);
    }

    idleRight() {
        return new Animator(ASSET_MANAGER.getAsset(REINA), 0, 0, 64, 64, 6, 0.125, false, true);
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2.7);
        this.BB.draw(ctx);
    }
}