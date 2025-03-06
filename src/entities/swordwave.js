class Swordwave {
    constructor(game, x, y, direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 1000;
        this.removeFromWorld = false;
        this.damage = 100;
        this.expiretime = 2;

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
        this.expiretime -= this.game.clockTick;
        if (this.direction === RIGHT) {
            //right direction
		    this.x += this.speed * this.game.clockTick;
            this.BB = new BoundingBox(this.x - this.game.camera.x, this.y + 40 - this.game.camera.y, 300, 115);
        } else {
            //left direction
            this.currentState = "left"
            this.x -= this.speed * this.game.clockTick;
            this.BB = new BoundingBox(this.x + 90 - this.game.camera.x, this.y + 40 - this.game.camera.y, 300, 115);
        }
        if (this.expiretime <= 0) {
            this.removeFromWorld = true;
        }
	};

    draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
        this.BB.draw(ctx);
	};

}