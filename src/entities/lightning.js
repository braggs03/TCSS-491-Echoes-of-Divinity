class lightning {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./resources/Magic/Lightning.png"), 0, 0, 64, 128, 10, 0.125, false, false);

    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 500, 20, 3);
    }
}