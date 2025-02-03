class AzucendaIdle {
    constructor(game, x, y) {
        this.game = game;
        this.animator = this.idleLeft()
        this.x = x;
        this.y = y;
        this.facing = LEFT;
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
        return new Animator(ASSET_MANAGER.getAsset("./resources/Azucena.png"), 576, 0, 64, 64, 9, 0.125, true, true);
    }

    idleRight() {
        return new Animator(ASSET_MANAGER.getAsset("./resources/Azucena.png"), 0, 0, 64, 64, 9, 0.125, false, true);
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
    }
}