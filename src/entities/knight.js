 class Knight {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 10; 
        this.hp = 1000;
        this.damage = 100;
        this.removeFromWorld = false;
        this.facing = RIGHT;
        this.flickerFlag = true;
        this.flickerDuration = 0;
        this.updateBB();

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Attack2.png"), 0, 0, 125.5, 80, 6, 0.05, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "AttackCombo.png"), 0, 0, 95, 100, 10, 0.05, false, false),
            RightCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Crouch.png"), 0, 0, 48, 100, 2, 0.1, false, false),
            RightCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "CrouchWalk.png"), 0, 0, 64, 100, 8, 0.1, false, false),
            RightDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Death.png"), 0, 0, 120, 100, 10, 0.1, false, false),
            RightFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Fall.png"), 0, 0, 112, 100, 3, 0.1, false, true),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Idle.png"), 0, 0, 120, 100, 10, 0.1, false, true),
            RightJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Jump.png"), 0, 0, 120, 100, 3, 0.1, false, true),
            RightRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Roll.png"), 0, 0, 120, 100, 12, 0.05, false, false),
            RightRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Run.png"), 20, 0, 120, 100, 10, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Attack2.png"), 720, 0, 125.5, 80, 6, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "AttackCombo.png"), 944, 0, 95, 100, 10, 0.1, true, false),
            LeftCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Crouch.png"), 96, 0, 48, 100, 2, 0.1, true, false),
            LeftCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "CrouchWalk.png"), 504, 0, 64, 100, 8, 0.1, true, false),
            LeftDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Death.png"), 1176, 0, 120, 100, 10, 0.1, true, false),
            LeftFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Fall.png"), 296, 0, 112, 100, 3, 0.1, true, true),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Idle.png"), 1176, 0, 120, 100, 10, 0.1, true, true),
            LeftJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Jump.png"), 336, 0, 120, 100, 3, 0.1, true, true),
            LeftRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Roll.png"), 1440, 0, 120, 100, 12, 0.05, true, false),
            LeftRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT + "Run.png"), 1200, 0, 120, 100, 10, 0.1, true, true)

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
            console.error("State '${state}' not found.");
        }
    }
    // setState(state) {
    //     if (this.animations[state]) {
    //         this.currentState = state;
    //     } else {
    //         console.error("State '${state}' not found.");
    //     }
    // }

    updateBB() {
        this.lastBB =this.BB;
        this.BB = new BoundingBox((this.x + 50) - this.game.camera.x , this.y +128 , 128, 128);
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
            }, 1000); // Adjust timing to match the death animation duration
        }
    }

    update() {
        if (this.dead) return;
        if (this.flickerDuration > 0) {
            this.flickerDuration -= this.game.clockTick;
            this.flickerFlag = !this.flickerFlag;
        }
        if (this.game.keys["ArrowLeft"]) {
            this.x -= this.speed;
            if (this.facing == RIGHT) {
                this.currentState = 'LeftRun';
            } else if (this.facing == LEFT) {
                this.currentState = 'LeftRun';
            }
            this.facing = LEFT;
        } else if (this.game.keys["ArrowRight"]) {
            this.x += this.speed;
            if (this.facing == RIGHT) {
                this.currentState = 'RightRun';
            }
            this.facing = RIGHT;
        } else if (this.game.keys["e"]) {
            if (!this.attackAnimationActive) {
                this.attackAnimationActive = true;
                this.currentState = this.facing === RIGHT ? this.currentState = 'RightAttack1' : this.currentState = 'LeftAttack1';  
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
            this.currentState = this.facing === RIGHT ? this.currentState = "RightRoll" : this.currentState = "LeftRoll";
        } else {
            if(this.facing == LEFT) {
                this.currentState = 'LeftIdle';
            } else if (this.facing == RIGHT) {
                this.currentState = 'RightIdle';
            }
            this.resetAnimations();
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
    resetAnimations() {
        for (const key in this.animations) {
            if (this.animations.hasOwnProperty(key)) {
                this.animations[key].elapsedTime = 0;
            }
        }
    }
};
