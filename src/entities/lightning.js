class Lightning {
    constructor(game, x, y, run) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.run = run;
        this.removeFromWorld = false;
        this.done = false;
        this.cinema = this.run === true;
        this.damageDone = false;
        this.target = null;
        this.BB = new BoundingBox(this.x - this.game.camera.x + 30, this.y + 96, 50, 1000);
        this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/Magic/Lightning.png"), 0, 0, 64, 128, 10, 0.1, false, false);
    };

    update() {

        if (!this.target) {
            this.target = this.game.entities.find(entity =>
                entity instanceof Knight && !entity.dead
            );
        }

        if (!this.cinema) {
            this.BB = new BoundingBox(this.x - this.game.camera.x + 30, this.y + 96, 50, 1000);
            if (this.target.BB && this.BB.collide(this.target.BB)) {
                this.run = true;
                this.target.hp = 0;
                this.target.die();
            }
        } else {
            if (this.target.BB && this.BB.collide(this.target.BB)) {
                if (!this.damageDone) {
                    this.target.takeDamage(100);
                    this.damageDone = true;
                }
            }
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