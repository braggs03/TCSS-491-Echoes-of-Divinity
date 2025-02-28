class Swordwave {
    constructor(game, x, y, direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 1500;
        this.removeFromWorld = false;

        if (direction) {
        this.direction = RIGHT;
        }

        this.animations = {
            right: new Animator(ASSET_MANAGER.getAsset("./resources/knight/swordwave.png"), 0, 0, 128, 100, 4, 0.1, false, true),
            left: new Animator(ASSET_MANAGER.getAsset("./resources/knight/swordwave.png"), 512, 0, 128, 100, 4, 0.1, true, true),
        } 

        this.currentState = "right";
    }

    update() {
        if (this.direction === RIGHT) {
            //right direction
		    this.x += this.speed * this.game.clockTick;
        } else {
            //left direction
            this.currentState = "left"
            this.x -= this.speed * this.game.clockTick;
        }
	};

    draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
	};

}