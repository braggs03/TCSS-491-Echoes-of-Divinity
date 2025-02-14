class gameTitle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.animator = new Animator(ASSET_MANAGER.getAsset("../resources/Title.png"), 0, 0, 155, 47, 5, 0.125, false, true);
    };

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    }
}