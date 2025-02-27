class Lightning {
    constructor(game, x, y, run) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.run = run;
        this.removeFromWorld = false;
        this.done = false;
        this.cinema = this.run === true;
        this.BB = new BoundingBox(this.x - this.game.camera.x + 30, this.y + 96, 50, 1000);
        this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/Magic/Lightning.png"), 0, 0, 64, 128, 10, 0.1, false, false);
    };

    update() {
        if (!this.cinema) {
            this.BB = new BoundingBox(this.x - this.game.camera.x + 30, this.y + 96, 50, 1000);
            let that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof Knight) {
                        //that.run = true;
                        entity.hp = 0;
                        entity.die();
                    }
                }
            });
        } else {
            if (this.animator.getDone()) {
                this.run = false;
                this.removeFromWorld = true;
                this.done = true;
            }
        }
    }

    draw(ctx) {
        if (this.run) {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 5);
        }
        this.BB.draw(ctx);
    }
}