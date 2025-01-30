class celes {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.x = 100;
        this.y = 200;
        this.updateBB();

        this.animations = {
            LeftAttack1: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack1.png"), 1280, 0, 128, 128, 10, 0.1, true, false),
            LeftAttack2: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack2.png"), 512, 0, 128, 128, 4, 0.15, true, false),
            //LeftCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "Charge.png"), 288, 0, 128, 128, 9, 0.15),
            LeftDead: new Animator(ASSET_MANAGER.getAsset(CELES + "Dead.png"), 640, 0, 128, 128, 5, 0.5, true, false),
            LeftHurt: new Animator(ASSET_MANAGER.getAsset(CELES + "sHurt.png"), 384, 0, 128, 128, 3, 0.15, true, false),
            LeftIdle: new Animator(ASSET_MANAGER.getAsset(CELES + "Idle.png"), 896, 0, 128, 128, 7, 0.15, true, true),
            LeftJump: new Animator(ASSET_MANAGER.getAsset(CELES + "Jump.png"), 1024, 0, 128, 128, 8, 0.15, true, false),
            LeftLightBall: new Animator(ASSET_MANAGER.getAsset(CELES + "LightBall.png"), 896, 0, 128, 128, 7, 0.15, true, false),
            LeftLightCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "LightCharge.png"), 1664, 0, 128, 128, 12, 0.1, true, false),
            LeftRun: new Animator(ASSET_MANAGER.getAsset(CELES + "Run.png"), 1024, 0, 128, 128, 8, 0.1, true, true),
            LeftWalk: new Animator(ASSET_MANAGER.getAsset(CELES + "Walk.png"), 896, 0, 128, 128, 7, 0.15, true, true),
            RightAttack1: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack1.png"), 0, 0, 128, 128, 10, 0.1, false, false),
            RightAttack2: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack2.png"), 0, 0, 128, 128, 4, 0.15, false, false),
            //RightCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "Charge.png"), 0, 0, 128, 128, 9, 0.15),
            RightDead: new Animator(ASSET_MANAGER.getAsset(CELES + "Dead.png"), 0, 0, 128, 128, 5, 0.5, false, false),
            RightHurt: new Animator(ASSET_MANAGER.getAsset(CELES + "Hurt.png"), 0, 0, 128, 128, 3, 0.15, false, false),
            RightIdle: new Animator(ASSET_MANAGER.getAsset(CELES + "Idle.png"), 0, 0, 128, 128, 7, 0.15, false, true),
            RightJump: new Animator(ASSET_MANAGER.getAsset(CELES + "Jump.png"), 0, 0, 128, 128, 8, 0.15, false, false),
            RightLightBall: new Animator(ASSET_MANAGER.getAsset(CELES + "LightBall.png"), 0, 0, 128, 128, 7, 0.15, false, false),
            RightLightCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "LightCharge.png"), 0, 0, 128, 128, 12, 0.1, false, false),
            RightRun: new Animator(ASSET_MANAGER.getAsset(CELES + "Run.png"), 0, 0, 128, 128, 8, 0.1, false, true),
            RightWalk: new Animator(ASSET_MANAGER.getAsset(CELES + "Walk.png"), 0, 0, 128, 128, 7, 0.15, false, true)
        }

        this.currentState = 'LeftIdle';
    };

    setState(state) {
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error(`State '${state}' not found.`);
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 128, 128)
    }

    update() {
        if (this.currentState === 'RightRun') {
            this.x += 500 * this.game.clockTick;
        } else if (this.currentState === 'LeftRun') {
            this.x -= 500 * this.game.clockTick;
        } else if (this.currentState === 'RightWalk') {
            this.x += 100 * this.game.clockTick;
        }else if (this.currentState === 'LeftWalk') {
            this.x -= 100 * this.game.clockTick;
        }
    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    }
}