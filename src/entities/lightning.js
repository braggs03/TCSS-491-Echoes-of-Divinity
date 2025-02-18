class Lightning {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.run = false;
        this.BB = new BoundingBox(this.x - this.game.camera.x + 30, this.y + 96, 50, 1000);
        this.animator = new Animator(ASSET_MANAGER.getAsset("../resources/Magic/Lightning.png"), 0, 0, 64, 128, 10, 0.1, false, false);
    };

    update() {
        this.BB = new BoundingBox(this.x - this.game.camera.x + 30, this.y + 96, 50, 1000);
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Knight) {
                    that.run = true;
                    entity.hp = 0;
                    entity.die();
                }
            }
        });
    };


    draw(ctx) {
        if (this.run) {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 5);
        }
        this.BB.draw(ctx);
    }
}