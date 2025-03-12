class FireBomb {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.target = null;
        this.scale = 5;
        this.removeFromWorld = false;
        this.damageDone = false;
        this.BB = new BoundingBox(this.x - this.game.camera.x + 30, this.y + 50, 270, 200);
        this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/Magic/Fire-bomb.png"), 0, 0, 64, 64, 14, 0.075, false, false);
    };

    update() {
        if (this.animator.getDone()) {
            this.removeFromWorld = true;
        }

        if (!this.target) {
            this.target = this.game.entities.find(entity =>
                entity instanceof Knight && !entity.dead
            );
        }
        if (this.animator.currentFrame() > 8) {
            if (this.target.BB && this.BB.collide(this.target.BB)) {
                if (!this.damageDone) {
                    this.target.takeDamage(200);
                    this.damageDone = true;
                }
            }
        }
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        this.BB.draw(ctx);
    }
}