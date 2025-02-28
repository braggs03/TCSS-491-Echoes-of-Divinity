class Swordwave {
    constructor(game, x, y, direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 1000;

        this.animations = {
            right: new Animator(ASSET_MANAGER.getAsset("./resources/knight/swordwave.png"), 0, 0, 128, 100, 4, 0.1, false, true),
            left: new Animator(ASSET_MANAGER.getAsset("./resources/knight/swordwave.png"), 512, 0, 128, 100, 4, 0.1, true, true),
        } 

        this.currentState = "right";
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
            console.error("State '${state}' not found.");
        }
    }

    update() {

		this.x += this.speed * this.game.clockTick;
		if (this.x > 1024) this.removeFromWorld = true;
	};

    draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        console.log("projectile")
	};

}