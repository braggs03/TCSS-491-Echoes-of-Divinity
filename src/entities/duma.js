class Duma {
    constructor(game, x, y) {
        this.game = game;
        this.target = null;
        this.x = x
        this.y = y
        this.updateBB();
        this.inCutscene = false;

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack.png"), 0, 0, 240, 192, 11, 0.1, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack2.png"), 0, 0, 192, 176, 8, 0.1, false, false),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(DUMA + "Idle.png"), 0, 0, 160, 144, 6, 0.1, false, false),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack.png"), 2640, 0, 240, 192, 11, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack2.png"), 1536, 0, 192, 176, 8, 0.1, true, false),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(DUMA + "Idle.png"), 960, 0, 160, 144, 6, 0.1, true, false),
        }

        this.currentState = 'LeftIdle'
    }

    setState(state) {
        for (let key in this.animations) {
            if (this.currentState === key) {

            } else if (this.animations.hasOwnProperty(key)) {
                // Reset each Animator instance
                this.animations[key].reset();
            }
        }
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error(`State '${state}' not found.`);
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 100 - this.game.camera.x, this.y + 140, 100, 115);
    }

    update() {

    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        this.BB.draw(ctx);
    };
}