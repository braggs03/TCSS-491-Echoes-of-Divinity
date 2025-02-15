const AZUCENA_WIDTH = 200;
const AZUCENA_HEIGHT = 110;
const AZUCENA_X_OFFSET = 5;
const AZUCENA_Y_OFFSET = 30;

class Azucena {
    constructor(game, x, y) {
        this.game = game;
        this.animator = this.idleLeft()
        this.x = x;
        this.y = y;
        this.facing = LEFT;
        this.BB = new BoundingBox(this.x + AZUCENA_X_OFFSET - this.game.camera.x, this.y + AZUCENA_Y_OFFSET - this.game.camera.y, AZUCENA_WIDTH, AZUCENA_HEIGHT);
    };

    update() {
        this.BB = new BoundingBox(this.x + AZUCENA_X_OFFSET - this.game.camera.x, this.y + AZUCENA_Y_OFFSET - this.game.camera.y, AZUCENA_WIDTH, AZUCENA_HEIGHT);
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

        testInteractable(this, text.azucena);
    };

    idleLeft() {
        return new Animator(ASSET_MANAGER.getAsset(AZUCENA), 576, 0, 64, 64, 9, 0.125, true, true);
    }

    idleRight() {
        return new Animator(ASSET_MANAGER.getAsset(AZUCENA), 0, 0, 64, 64, 9, 0.125, false, true);
    }

    draw(ctx) {
        this.BB.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
    }
}