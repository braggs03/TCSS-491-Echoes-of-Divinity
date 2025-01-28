class ReinaIdle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.facing = LEFT;
        this.animator = this.idleLeft();
    };

    update() {
        if (this.game.camera.knight.x < this.x) {
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
    };

    idleLeft() {
        return new Animator(ASSET_MANAGER.getAsset(REINA), 384, 0, 64, 64, 6, 0.125, true, true);
    }

    idleRight() {
        return new Animator(ASSET_MANAGER.getAsset(REINA), 0, 0, 64, 64, 6, 0.125, false, true);
    }
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2.7);
    }
}