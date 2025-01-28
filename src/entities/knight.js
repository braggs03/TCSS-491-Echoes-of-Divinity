class Knight {
	constructor(game, x, y) {
		this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.updateBB();
        this.colliding = false;
		
        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 0, 120, 80, 6, 0.1, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 80, 95, 100, 10, 0.1, false, false),
            RightCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 160, 48, 100, 3, 0.1, false, false),
            RightCrouchAttack : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 240, 48, 100, 4, 0.1, false, false),
            RightCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 320, 64, 100, 8, 0.1, false, false),
            RightDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 400, 120, 100, 10, 0.1, false, false),
            RightFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 480, 120, 100, 3, 0.1, false, true),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 560, 120, 100, 10, 0.1, false, true),
            RightJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 640, 120, 100, 2, 0.1, false, true),
            RightRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 720, 120, 100, 12, 0.05, false, false),
            RightRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 800, 120, 100, 10, 0.1, false, true),
            RightTurn : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 880, 120, 100, 3, 0.1, false, true),
            RightWallClimb : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 960, 120, 100, 7, 0.1, false, true),
            RightWallHang : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 1040, 120, 100, 1, 0.1, false, true),
            RightWallSlide : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 1120, 120, 100, 3, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2160, 0, 120, 80, 6, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 80, 120, 80, 10, 0.1, true, false),
            LeftCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 160, 120, 80, 3, 0.1, true, false),
            LeftCrouchAttack : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2400, 240, 120, 80, 4, 0.1, true, false),
            LeftCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1920, 320, 120, 80, 8, 0.1, true, false),
            LeftDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 400, 120, 80, 10, 0.1, true, false),
            LeftFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 480, 120, 100, 3, 0.1, true, true),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 560, 120, 100, 10, 0.1, true, true),
            LeftJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2640, 640, 120, 100, 2, 0.1, true, true),
            LeftRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1440, 720, 120, 100, 12, 0.05, true, false),
            LeftRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 800, 120, 100, 10, 0.1, true, true),
            LeftTurn : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 880, 120, 100, 3, 0.1, false, true),
            LeftWallClimb : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2040, 960, 120, 100, 7, 0.1, false, true),
            LeftWallHang : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2760, 1040, 120, 100, 1, 0.1, false, true),
            LeftWallSlide : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 1120, 120, 100, 3, 0.1, false, true),

        }

        this.currentState = 'RightIdle';
        this.animationLocked = false;

       

	};

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

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox((this.x + 50) - this.game.camera.x, this.y + 128, 128, 128);
    }

	update() {
        let that = this;
        this.game.entities.forEach((entity) => {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof DungeonWall) {
                    this.colliding = true;
                    if (that.facing == LEFT && entity.x > that.x) {
                        that.setState('LeftIdle');
                    } else if (that.facing == RIGHT && entity.x < that.x) {
                        that.setState('RightIdle')
                    } else {
                        this.colliding = false;
                    }
                } 
            }
        });
        this.updateBB();
        if (this.game.keys["ArrowLeft"]) {
            if (this.facing === LEFT && !this.colliding) {
                this.currentState = 'LeftRun';
                this.x -= this.speed;
            }
            this.facing = LEFT;
        } else if (this.game.keys["ArrowRight"]) {
            if (this.facing === RIGHT && !this.colliding) {
                this.currentState = 'RightRun';
                this.x += this.speed;
            }
            this.facing = RIGHT;
        } else if (this.game.keys["e"]) {
            this.currentState = this.facing === RIGHT ? this.currentState = 'RightAttack1' : this.currentState = 'LeftAttack1';
        } else {
            if(this.facing === LEFT) {
                this.currentState = 'LeftIdle';
            } else if (this.facing === RIGHT) {
                this.currentState = 'RightIdle';
            }
            this.resetAnimations();
        }
    };

    resetAnimations() {
        for (const key in this.animations) {
            if (this.animations.hasOwnProperty(key)) {
                this.animations[key].elapsedTime = 0;
            }
        }
    };

	draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        this.BB.draw(ctx)
	};
}
