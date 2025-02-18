const KNIGHT_WIDTH = 65;
const KNIGHT_HEIGHT = 110;
const KNIGHT_X_OFFSET = 131;
const KNIGHT_Y_OFFSET = 130;

class Knight {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;

        this.moveable = true;
        this.inCutscene = false;
        
        this.velocityX = 0;
        this.maxVelocityX = 5;
        this.accelerationX = 0.4; 
        this.decelerationX = 0.2; 

        this.velocityY = 0;
        this.maxVelocityY = 6;
        this.accelerationY = 0.15; 
        this.jumpSpeed = 10;

        this.healthBar = new HealthBar(this);
        this.maxHp = 1000; 
        this.hp = 1000;
        this.height = 110;
        this.stamina = 100;
        this.currentStamina = 100;
        this.emberCount = 100;
        this.maxPotionCount = 3;
        this.potionCount = this.maxPotionCount;
        this.potionHealCount = 200;
        this.gKeyPressed = false;
        this.potionCost = 50;
        this.invinsible = false;
        this.attackspeed = 0.1
        this.damage = 100;
        this.attackCooldown = false;
        this.attackAnimationActive = false;
        this.attackHitRegistered = false;
        this.removeFromWorld = false;
        this.facing = RIGHT;
        this.flickerFlag = true;
        this.flickerDuration = 0;
        this.colliding = {
            left: false, // Knight is to the right of the wall.
            right: false, // Knight is to the left of the wall.
            up: false, // Knight is below the floor/cieling.
            down: false, // Knight is above the floor/cieling.
        };   

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 0, 120, 80, 6, this.attackspeed, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 80, 95, 100, 10, 0.1, false, false),
            RightCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 160, 48, 100, 3, 0.1, false, false),
            RightCrouchAttack : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 240, 48, 100, 4, 0.1, false, false),
            RightCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 320, 64, 100, 8, 0.1, false, false),
            RightDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 400, 120, 100, 10, 0.1, false, false),
            RightFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 481, 120, 100, 3, 0.1, false, true),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 560, 120, 100, 10, 0.1, false, true),
            RightJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 641, 120, 100, 2, 0.1, false, true),
            RightRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 6, 720, 120, 100, 12, 0.04, false, false),
            RightRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 800, 120, 100, 10, 0.05, false, true),
            RightTurn : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 880, 120, 100, 3, 0.02, false, true),
            RightWallClimb : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 960, 120, 100, 7, 0.1, false, true),
            RightWallHang : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 1040, 120, 100, 1, 0.1, false, true),
            RightWallSlide : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 1120, 120, 100, 3, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2171, 0, 120, 80, 6, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 80, 120, 80, 10, 0.1, true, false),
            LeftCrouch : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 160, 120, 80, 3, 0.1, true, false),
            LeftCrouchAttack : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2400, 240, 120, 80, 4, 0.1, true, false),
            LeftCrouchWalk : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1920, 320, 120, 80, 8, 0.1, true, false),
            LeftDeath : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1680, 400, 120, 80, 10, 0.1, true, false),
            LeftFall : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2531, 481, 120, 100, 3, 0.1, true, true),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1691, 560, 120, 100, 10, 0.1, true, true),
            LeftJump : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2651, 641, 120, 100, 2, 0.1, true, true),
            LeftRoll : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1440, 720, 120, 100, 12, 0.04, true, false),
            LeftRun : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 1691, 800, 120, 100, 10, 0.05, true, true),
            LeftTurn : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 880, 120, 100, 3, 0.1, false, true),
            LeftWallClimb : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2040, 960, 120, 100, 7, 0.1, false, true),
            LeftWallHang : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2760, 1040, 120, 100, 1, 0.1, false, true),
            LeftWallSlide : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2520, 1120, 120, 100, 3, 0.1, false, true),

        }

        this.currentState = 'RightIdle';
        this.animationLocked = false;
        
        this.dead = false;
        this.updateBB();
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
        if (this.currentState === 'RightAttack1') {
            if (this.animations[this.currentState].currentFrame() < 2) { // Wind-up phase
                this.offsetX = 0; // Small range while pulling back
            } else if (this.animations[this.currentState].currentFrame() < 4) { // Full swing
                this.offsetX = 95; // Extend bounding box
            } else { // Follow-through
                this.offsetX = 0;
            }
            this.BB = new BoundingBox(this.x + KNIGHT_X_OFFSET - this.game.camera.x + this.offsetX, this.y + KNIGHT_Y_OFFSET - this.game.camera.y, KNIGHT_WIDTH, KNIGHT_HEIGHT);
        } else if (this.currentState === 'LeftAttack1') {
            if (this.animations[this.currentState].currentFrame() < 2) { // Wind-up phase
                this.offsetX = 0; // Small range while pulling back
            } else if (this.animations[this.currentState].currentFrame() < 4) { // Full swing
                this.offsetX = 105; // Extend bounding box
            } else { // Follow-through
                this.offsetX = 0;
            }
            this.BB = new BoundingBox(this.x + KNIGHT_X_OFFSET - this.game.camera.x - this.offsetX, this.y + KNIGHT_Y_OFFSET - this.game.camera.y, KNIGHT_WIDTH, KNIGHT_HEIGHT);
        } else {
            this.BB = new BoundingBox(this.x + KNIGHT_X_OFFSET - this.game.camera.x , this.y + KNIGHT_Y_OFFSET - this.game.camera.y, KNIGHT_WIDTH, KNIGHT_HEIGHT);
        }
    }

    takeDamage(amount) {
         if (!this.invinsible) {
             this.invinsible = true;
             this.hp -= amount;
             console.log(`knight takes ${amount} damage, remaining health: ${this.hp}`);
             if (this.hp <= 0) {
                 this.die();
             } else {
                 this.flickerDuration = 0.3; // Flicker for 0.5 seconds
             }
         }
    }

    respawn() {
        this.dead = false;
        this.hp = this.maxHp;
        this.potionCount = this.maxPotionCount;
        this.removeFromWorld = false;
    }

    die() {
        if (!this.dead) {
            this.dead = true;
            this.currentState = this.facing === RIGHT ? 'RightDeath' : 'LeftDeath';
            console.log("Knight has died!");

            // Optionally mark for removal after the death animation
            setTimeout(() => {
                this.removeFromWorld = true;
                this.game.camera.respawnKnight(this);
            }, 1000); 
            // Adjust timing to match the death animation duration
        }
    }
    usePotion () {
        if (this.potionCount > 0 && this.hp < this.maxHp) {
            this.potionCount -= 1;
            this.hp = Math.min(this.hp + this.potionHealCount, this.maxHp); 
            this.game.addEntity(new PotionEffect(this.game, this.x + 100, this.y + KNIGHT_HEIGHT + 1, POTION_BOOST));
            return true;
        }
        return false;
    }

    buyPotion () {
        if (this.emberCount >= this.potionCost) {
            this.emberCount -= this.potionCost;
            this.potionCount += 1;
            return true;
        }
        return false;
    }
    update() {
        this.updateBB();
        if (this.currentStamina < this.stamina) {
            this.currentStamina += 1;
        }
        if (this.inCutscene) {
            if (this.currentState === 'RightRun') {
                this.x += 10;
            } else if (this.currentState === 'LeftRun') {
                this.x -= 10;
            } else if (this.currentState === 'RightRoll') {
                this.x += 10;
            } else if (this.currentState === 'LeftRoll') {
                this.x -= 10;
            }
    
            if (this.animations[this.currentState].getDone()) {
                this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
                this.setState(this.chosenState);
            }
            return;
        }
        if (this.dead) return;
    
        if (this.y > 1000) {
            this.die();
        }
        if (this.flickerDuration > 0) {
            this.flickerDuration -= this.game.clockTick;
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.invinsible = false;
        }
    
        let that = this;
        let left = 0;
        let right = 0;
        let up = 0;
        let down = 0;
        this.game.entities.forEach((entity) => {
            if (entity.BB && that.BB.collide(entity.BB)) {
                const overlap = entity.BB.overlap(that.BB);
                if (entity instanceof DungeonWall) {
                    if (entity.BB.x < that.BB.x) {
                        right++;
                        that.x += overlap.x;
                    } else if (entity.BB.x > that.BB.x) {
                        left++;
                        that.x -= overlap.x;
                    }
                    that.velocityX = 0; 
                } else if (entity instanceof DungeonGround || entity instanceof DungeonGround2) {
                    let horizontalCollision = overlap.x > 0 && overlap.x < overlap.y;
                    let verticalCollision = overlap.y > 0 && overlap.y < overlap.x;
        
                    if (horizontalCollision) {
                        if (entity.BB.x < that.BB.x) {
                            that.x += overlap.x;
                        } else {
                            that.x -= overlap.x;
                        }
                        that.velocityX = 0;
                    } else if (verticalCollision) {
                        if (entity.BB.y < that.BB.y) {
                            down++;
                            that.y += overlap.y;
                        } else {
                            up++;
                            that.y -= overlap.y - 1;
                        }
                        that.velocityY = 0;
                    }
                } else if (entity instanceof Potion) {
                    if (this.buyPotion()) {
                        entity.removeFromWorld = true;
                    }
                }
            }
        });
    
        if (left > 0) {
            that.colliding.left = true;
        } else {
            that.colliding.left = false;
        }
    
        if (right > 0) {
            that.colliding.right = true;
        } else {
            that.colliding.right = false;
        }
    
        if (down > 0) {
            that.colliding.down = true;
        } else {
            that.colliding.down = false;
        }
    
        if (up > 0) {
            that.colliding.up = true;
        } else {
            that.colliding.up = false;
        }
    
        if (this.currentState === 'RightAttack1' || this.currentState === 'LeftAttack1') {
            const currentFrame = this.animations[this.currentState].currentFrame();
            
            if (currentFrame === 0) {
                this.hitTargets = [];
            }
            
            if (currentFrame >= 2 && currentFrame < 4) {
                this.game.entities.forEach(entity => {
                    if ((entity instanceof MechaGolem || entity instanceof NightbornWarrior) && 
                        this.BB.collide(entity.BB) &&
                        !this.hitTargets.includes(entity)) {
                        entity.takeDamage(100);
                        console.log(`Knight attacks MechaGolem at (${entity.x}, ${entity.y})`);
                        this.hitTargets.push(entity);
                    }
                });
            }
    
            if (!this.animations[this.currentState].getDone()) {
                return;
            } else {
                this.invinsible = false;
                this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
                this.setState(this.chosenState);
                
                this.hitTargets = [];
            }
        }
        if (this.currentState === 'RightRoll' || this.currentState === 'LeftRoll') {
            if (this.currentState == 'RightRoll') {
                this.invinsible = true;
                this.x += 5;
            } else if (this.currentState == 'LeftRoll') {
                this.invinsible = true;
                this.x -= 5;
            }
            this.updateBB();
            if (!this.animations[this.currentState].getDone()) {
                return;
            } else {
                this.invinsible = false;
                this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
                this.setState(this.chosenState);
            }
        }
    
        if (!that.colliding.up) {
            if (this.velocityY > 0) {
                this.facing == LEFT ? this.setState("LeftFall") : this.setState("RightFall");
            } else {
                this.facing == LEFT ? this.setState("LeftJump") : this.setState("RightJump");
            }
            this.velocityY += this.accelerationY;
        } else if (Math.abs(this.velocityX) > this.accelerationX) {
            this.setState(this.facing === RIGHT ? "RightRun" : "LeftRun");
        } else {
            this.setState(this.facing === RIGHT ? "RightIdle" : "LeftIdle");
        }
    
        if (this.currentState === 'RightRoll' || this.currentState === 'LeftRoll') {
            if (this.facing === RIGHT) {
                this.velocityX = 5;
            } else {
                this.velocityX = 5;
            }
            return;
        } else if (this.game.keys["ArrowUp"] && that.colliding.up) {
            this.colliding.up = false;
            this.velocityY -= this.jumpSpeed;
        } else if (this.game.keys["ArrowLeft"] && !that.colliding.right) {
            this.facing = LEFT;
            this.velocityX -= this.accelerationX;
            this.velocityX = Math.max(this.velocityX, -this.maxVelocityX);
        } else if (this.game.keys["ArrowRight"] && !that.colliding.left) {
            this.facing = RIGHT;
            this.velocityX += this.accelerationX;
            this.velocityX = Math.min(this.velocityX, this.maxVelocityX);
        }
    
       
        if (this.currentState !== 'RightFall' && this.currentState !== 'LeftFall'
            && this.currentState !== 'RightJump' && this.currentState !== 'LeftJump') {
            if (this.game.keys["e"]) {
                if (!this.attackAnimationActive) {
                    if (this.currentStamina < this.stamina) {
                        return;
                    }
                    this.velocityX = 0;
                    this.attackAnimationActive = true;
                    this.chosenState = this.facing === RIGHT ? this.currentState = 'RightAttack1' : this.currentState = 'LeftAttack1';
                    this.setState(this.chosenState);
                    this.currentStamina = 0;
                    
                    this.hitTargets = [];
                    
                    setTimeout(() => {
                        this.attackAnimationActive = false;
                    }, 900);
                }
            } else if (this.game.keys["r"]) {
                this.chosenState = this.facing === RIGHT ? this.currentState = "RightRoll" : this.currentState = "LeftRoll";
                this.invinsible = true;
                this.setState(this.chosenState);
            } else if (this.game.keys["g"]) {
                if (!this.gKeyPressed) {
                    this.usePotion();
                    this.gKeyPressed = true;
                }
            } else {
                this.gKeyPressed = false;
            }
        }
    
        if (this.velocityX > 0) {
            this.velocityX = Math.max(0, this.velocityX - this.decelerationX);
        } else if (this.velocityX < 0) {
            this.velocityX = Math.min(0, this.velocityX + this.decelerationX);
        }
    
        if (!this.moveable) {
            this.setState(this.facing == LEFT ? "LeftIdle" : "RightIdle");
            this.velocityX = 0; 
            this.velocityY = this.velocityY < 0 ? 0 : this.velocityY;
        }
    
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.updateBB();
    }

    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return; 
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
        if (!this.inCutscene) {
            this.healthBar.draw(ctx);
        }
        this.game.entities.forEach(entity => {
            if (entity instanceof PotionEffect) {
                entity.draw(ctx);
            }
        });
        this.BB.draw(ctx);
    };
}


