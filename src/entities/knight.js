 class Knight {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.jumpPoint = this.y - 150;
        this.speed = 10;
        this.hp = 100;
        this.attackspeed = 0.1
        this.damage = 100;
        this.removeFromWorld = false;
        this.facing = RIGHT;
        this.flickerFlag = true;
        this.flickerDuration = 0;
        this.colliding = false;
        this.updateBB();

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 0, 120, 80, 6, this.attackspeed, false, false),
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

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2160, 0, 120, 80, 6, this.attackspeed, true, false),
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
        
        this.dead = false;
        this.updateBB();

       // make knight block or cratch to works as well as add aggro for golem and switch bettwen atfcks  then include 

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
             console.error(`State '${state}' not found.`);
         }
     }

    updateBB() {
        this.lastBB =this.BB;
        this.BB = new BoundingBox((this.x + 128) - this.game.camera.x , this.y +128 , 128, 128);
    }
    takeDamage(amount) {
        this.hp -= amount;
        console.log(`knight takes ${amount} damage, remaining health: ${this.hp}`);
        if (this.hp <= 0) {
            this.die();
        } else {
            this.flickerDuration = 0.3; // Flicker for 0.5 seconds
        }
    }
    die() {
        if (!this.dead) {
            this.dead = true;
            this.currentState = this.facing === RIGHT ? 'RightDeath' : 'LeftDeath';
            console.log("Knight has died!");

            // Optionally mark for removal after the death animation
            setTimeout(() => {
                this.removeFromWorld = true;
                this.game.camera.loadLevel(shopkeeper, 100, 440, false, false)
            }, 1000); 
            // Adjust timing to match the death animation duration
        }
    }

    update() {

        const TICK = this.game.clockTick;

        if(this.dead) return;

        if (this.flickerDuration > 0) {
            this.flickerDuration -= this.game.clockTick;
            this.flickerFlag = !this.flickerFlag;
        }
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
        if (this.currentState === 'RightAttack1' || this.currentState === 'LeftAttack1'
            || this.currentState === 'RightRoll' || this.currentState === 'LeftRoll'
            || this.currentState === 'RightFall' || this.currentState === 'LeftFall'
            || this.currentState === 'RightJump' || this.currentState === 'LeftJump') {
            if (this.currentState === 'RightRoll' || this.currentState === 'LeftRoll') {
                if (this.facing === RIGHT) {
                    this.x += this.speed;
                } else {
                    this.x -= this.speed;
                }
            } else if (this.currentState === 'RightJump' || this.currentState === 'LeftJump') {
                if (this.y === this.jumpPoint) {
                    this.chosenState = this.facing === RIGHT ? this.currentState = 'RightFall' : this.currentState = 'LeftFall';
                    this.setState(this.chosenState);
                }
                this.y -= this.speed;
            } else if (this.currentState === 'RightFall' || this.currentState === 'LeftFall') {
                this.y += this.speed;
            }

            if (this.currentState !== 'RightAttack1' && this.currentState !== 'LeftAttack1'
                && this.currentState !== 'RightRoll' && this.currentState !== 'LeftRoll') {
                if (this.game.keys["ArrowLeft"]) {
                    if (this.facing === LEFT && !this.colliding) {
                        this.x -= this.speed;
                    }
                    this.facing = LEFT;
                } else if (this.game.keys["ArrowRight"]) {
                    if (this.facing === RIGHT && !this.colliding) {
                        this.x += this.speed;
                    }
                    this.facing = RIGHT;
                }
            }
            this.updateBB();
            if (!this.animations[this.currentState].getDone()) {
                return;
            } else {
                this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
                this.setState(this.chosenState);
            }
        }

        if (this.game.keys["e"]) {
            if (!this.attackAnimationActive) {
                this.attackAnimationActive = true;
                this.chosenState = this.facing === RIGHT ? this.currentState = 'RightAttack1' : this.currentState = 'LeftAttack1';
                this.setState(this.chosenState);
                // Check for collision with golem
                const golem = this.game.entities.find(entity => entity instanceof MechaGolem && !entity.dead);
                if (golem && this.BB.collide(golem.BB)) {
                    golem.takeDamage(100);
                    console.log("Knight attacks the MechaGolem!");
                }
                setTimeout(() => {
                    this.attackAnimationActive = false; // Reset flag when animation is complete
                }, 900); // Match the duration of the attack animation
            }
        } else if (this.game.keys["r"]) {
            this.chosenState = this.facing === RIGHT ? this.currentState = "RightRoll" : this.currentState = "LeftRoll";
            this.setState(this.chosenState);
        } else if (this.game.keys["ArrowUp"]) {
            this.currentState = this.facing === RIGHT ? this.currentState = "RightRoll" : this.currentState = "LeftRoll";
            if (this.facing === RIGHT) {
                this.setState('RightJump');
            } else {
                this.setState('LeftJump');
            }
        } else if (this.game.keys["ArrowLeft"]) {
            if (this.facing === LEFT && !this.colliding) {
                this.setState('LeftRun');
                this.x -= this.speed;
            }
            this.facing = LEFT;
        } else if (this.game.keys["ArrowRight"]) {
            if (this.facing === RIGHT && !this.colliding) {
                this.setState('RightRun');
                this.x += this.speed;
            }
            this.facing = RIGHT;
        } else {
            this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
            this.setState(this.chosenState);
        }
        this.updateBB();
    };

    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return; 
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        //this.BB.draw(ctx);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}
