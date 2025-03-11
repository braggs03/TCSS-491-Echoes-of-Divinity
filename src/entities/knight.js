
const KNIGHT_WIDTH = 65;
const KNIGHT_HEIGHT = 110;
const KNIGHT_X_OFFSET = 131;
const KNIGHT_Y_OFFSET = 130;

class Knight {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;

        this.height = KNIGHT_HEIGHT;

        this.moveable = true;
        this.inCutscene = false;

        this.velocityX = 0;
        this.maxVelocityX = 825;
        this.accelerationX = 6000; 
        this.decelerationX = 4000;
        
        this.velocityY = 0;
        this.maxVelocityY = 1400;
        this.jumpSpeed = 1350;
        this.accelerationY = 4125; 

        this.rollSpeed = 825;

        this.rollSpeed = 825;
        this.healthBar = new HealthBar(this);
        this.maxHp = 1000;
        this.hp = 1000;
        this.shieldBar = new ShieldBar(this);
        this.maxShield = 200;
        this.shield = 200;
        this.height = 110;
        this.bheight = 0;
        this.stamina = 1000;
        this.currentStamina = this.stamina;
        this.staminaRegen = 500;
        this.meleeAttackStaminaCost = 200;
        this.rangedAttackStaminaCost = 1000;

        this.emberCount = 0;
        
        this.maxPotionCount = 3;
        this.potionCount = this.maxPotionCount;
        this.potionHealCount = 200;
        this.potionCost = 2000;

        this.gKeyPressed = false;
        
        this.invincible = false;

        this.attackspeed = 0.1
        this.damage = 100;
        this.attackCooldown = false;
        this.attackAnimationActive = false;
        this.attackHitRegistered = false;
        
        this.removeFromWorld = false;
        
        this.facing = RIGHT;
        
        this.flickerFlag = true;
        this.flickerDuration = 0;
        
        this.animationLocked = false;
        
        this.hasDoubleJump = false;
        this.hasDoubleJumped = false;
        this.hasWaveAttack = false;
        this.dead = false;

        this.hasShield = false;
        this.isShielded = true;
        

        this.colliding = {
            left: false, // Knight is to the right of the wall.
            right: false, // Knight is to the left of the wall.
            up: false, // Knight is below the floor/cieling.
            down: false, // Knight is above the floor/cieling.
        };

        this.runSound = new Audio("./resources/SoundEffects/run.ogg");
        this.runSound.loop = true;
        this.runSound.playbackRate = 3;
        this.runSound.volume = 0.2;
        this.attackSound = new Audio("./resources/SoundEffects/knightAttack.ogg");
        this.attackSound.loop = false;
        this.attackSound.playbackRate = 1;
        this.attackSound.volume = 0.2;
        this.jumpSound = new Audio("./resources/SoundEffects/jump.ogg");
        this.jumpSound.loop = false;
        this.jumpSound.playbackRate = 1;
        this.jumpSound.volume = 0.2;
        this.rollSound = new Audio("./resources/SoundEffects/roll.ogg");
        this.rollSound.loop = false;
        this.rollSound.playbackRate = 1;
        this.rollSound.volume = 0.2;
        this.knightHit = new Audio("./resources/SoundEffects/knighthit.mp3");
        this.knightDeath = new Audio("./resources/SoundEffects/knightdeath.mp3");
        


        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 0, 120, 80, 6, this.attackspeed, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 0, 80, 120, 100, 10, 0.1, false, false),
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

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(KNIGHT_SPRITE), 2171, 0, 120, 80, 6, this.attackspeed, true, false),
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
        if (!this.invincible) {
            this.invincible = true;
            if (!this.isShielded) {
                this.knightHit.play();
                this.knightHit.volume = 0.2;
                this.hp -= amount;
            } else {
                this.shield -= amount;
            }
            console.log(`knight takes ${amount} damage, remaining health: ${this.hp}`);
            if (this.hp <= 0) {
                this.die();
            } else {
                this.flickerDuration = 0.3; // Flicker for 0.5 seconds
            }
            if (this.shield <= 0) {
                this.isShielded = false;
            }
        }
    }

    reset() {
        this.dead = false;
        this.hp = this.maxHp;
        this.shield = this.maxShield;
        this.potionCount = this.maxPotionCount;
        this.removeFromWorld = false;
    }

    die() {
        if (!this.dead) {
            this.dead = true;
            this.knightHit.muted = true;
            this.knightDeath.play();
            this.knightDeath.volume = 0.3;
            this.currentState = this.facing === RIGHT ? 'RightDeath' : 'LeftDeath';
            console.log("Knight has died!");
            this.velocityX = 0;
            // Optionally mark for removal after the death animation
            setTimeout(() => {
                this.removeFromWorld = true;
                this.game.camera.respawnKnight(this); 
            }, 1000);

            setTimeout(() => {
                this.knightHit.muted = false; 
            }, 5000);
            // Adjust timing to match the death animation duration

            this.game.camera.emberDrop = new EmberDrop(this.game, this.x + KNIGHT_X_OFFSET, this.y + KNIGHT_HEIGHT, this.emberCount, this.game.camera.levelIndex);
            this.emberCount = 0;          
        }
    }
    usePotion() {
        if (this.potionCount > 0 && this.hp < this.maxHp) {
            this.potionCount -= 1;
            const healAmount = Math.min(this.potionHealCount, this.maxHp - this.hp);
            this.hp = Math.min(this.hp + this.potionHealCount, this.maxHp);
            
            this.game.addEntity(new PotionEffect(
                this.game,
                this.x + KNIGHT_WIDTH + 50,  // Position slightly to the right of player
                this.y + 50,                 // Position above the player
                "health",
                healAmount                   
            ));
            
            console.log(`Used potion: Healed for ${healAmount} HP. Potions remaining: ${this.potionCount}`);
            return true;
        }
        return false;
    }

    addEmbers(numberOfEmbers) {
        if (numberOfEmbers > 0) {
            this.emberCount += numberOfEmbers;
        } else {
            console.error("Negative embers passed to: addEmbers()");
        }
    }

    buyPotion () {
        let ableToBuy = false;
        if (this.emberCount >= this.potionCost) {
            this.emberCount -= this.potionCost;
            this.maxPotionCount += 1;
            this.potionCount += 1;
            ableToBuy = true;
        }
        return ableToBuy;
    }

    pauseSound() {
        this.rollSound.pause();
        this.rollSound.currentTime = 0;
        this.attackSound.pause();
        this.attackSound.currentTime = 0;
        this.jumpSound.pause();
        this.jumpSound.currentTime = 0;
        this.runSound.pause();
        this.runSound.currentTime = 0;

    }

    update() {
        const clockTick = this.game.clockTick;

        if (this.currentStamina < this.stamina && this.currentState !== "RightRoll" 
            && this.currentState !== "LeftRoll" && this.currentState !== "LeftAttack1" 
            && this.currentState !== "LeftAttack2" && this.currentState !== "RightAttack1" 
            && this.currentState !== "RightAttack2" && this.currentState !== "RightAttack2" 
            && this.currentState !== "LeftJump" && this.currentState !== "RightJump"
        ) {
            this.currentStamina = Math.min(this.currentStamina + this.staminaRegen * this.game.clockTick, this.stamina);
        }
    
        if (this.y > VOID_HEIGHT) {
            this.die();
        }

        if (this.flickerDuration > 0) {
            this.flickerDuration -= clockTick;
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.invincible = false;
        }
        
        this.colliding = {
            right: false,
            left: false,
            down: false,
            up: false,
        }
        let knight = this;
        
        this.game.entities.forEach((entity) => {
            if (entity.BB && knight.BB.collide(entity.BB)) {
                const overlap = entity.BB.overlap(knight.BB);
                if (
                    entity instanceof DungeonGround 
                    || entity instanceof DungeonGround2 
                    || entity instanceof DungeonWall 
                    || entity instanceof DungeonWall1 
                    || entity instanceof DungeonSpike 
                    || entity instanceof DungeonWall2 
                    || entity instanceof DungeonGround4 
                    || entity instanceof MovingPlatform
                ) {
                    let horizontalCollision = overlap.x > 0 && overlap.x < overlap.y;
                    let verticalCollision = overlap.y > 0 && overlap.y < overlap.x;

                    if (horizontalCollision) {
                        if (entity.BB.x < knight.BB.x) {
                            knight.x += overlap.x;
                        } else {
                            knight.x -= overlap.x;
                        }
                        knight.velocityX = 0;
                    }
                    
                    if (verticalCollision) {
                        if (entity.BB.y < knight.BB.y) {
                            this.colliding.down = true;
                            knight.y += overlap.y;
                            
                            if (entity instanceof DungeonSpike) {
                                this.takeDamage(entity.damage);
                            }
                        } else {
                            this.colliding.up = true;
                            knight.y -= overlap.y - 1;
                            this.hasDoubleJumped = false;

                            if (entity instanceof MovingPlatform && entity.isVertical) {
                                    knight.y += entity.speed * entity.direction * this.game.clockTick;;
                            }
                        }
                        knight.velocityY = 0;                        
                    }
                } else if (entity instanceof DungeonBridge) {
                    let horizontalCollision = overlap.x > 0 && overlap.x < overlap.y;
                    let verticalCollision = overlap.y > 0 && overlap.y < overlap.x;
                
                    if (horizontalCollision) {
                        if (entity.BB.x < knight.BB.x) {
                            knight.x += overlap.x;
                        } else {
                            knight.x -= overlap.x;
                        }
                        knight.velocityX = 0;
                    }
                
                    if (verticalCollision) {
                        if (entity.BB.y < knight.BB.y) {
                            this.colliding.down = true;
                            knight.y += overlap.y;
                        } else {
                            this.colliding.up = true;
                            knight.y -= overlap.y - 1;
                        }
                        knight.velocityY = 0;
                    }
                } else if (entity instanceof Potion) {
                    if (this.game.keys["f"]) {
                        if (this.buyPotion()) {
                            entity.bought = true;
                            entity.save();
                            entity.removeFromWorld = true;
                        }
                    }
                }
            }
        });

        this.updateBB();

        if (this.inCutscene) {
            if (this.currentState === "RightRun") {
                this.x += this.maxVelocityX * clockTick;
                if (this.runSound.paused) {this.runSound.play();}
            } else if (this.currentState === "LeftRun") {
                this.x -= this.maxVelocityX * clockTick;
                if (this.runSound.paused) {this.runSound.play();}
            } else if (this.currentState === "RightRoll") {
                this.x += this.rollSpeed * clockTick;
                if (this.rollSound.paused) {this.rollSound.play();}
            } else if (this.currentState === "LeftRoll") {
                this.x -= this.rollSpeed * clockTick;
                if (this.rollSound.paused) {this.rollSound.play();}
            } else if (this.currentState === "RightIdle" || this.currentState === "LeftIdle") {
                this.pauseSound();
            }
            if (this.animations[this.currentState].getDone()) {
                this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
                this.setState(this.chosenState);
                this.pauseSound();
            }
            this.velocityX = 0;
        }
    
        if (!this.dead && !this.inCutscene) {
            if (this.currentState === 'RightAttack1' || this.currentState === 'LeftAttack1' || this.currentState === 'RightAttack2'|| this.currentState === 'LeftAttack2') {
                const currentFrame = this.animations[this.currentState].currentFrame();
                if (currentFrame === 0) {
                    this.hitTargets = [];
                }
                
                if (currentFrame >= 2 && currentFrame < 4) {
                    this.game.entities.forEach(entity => {
                        if ((typeof entity.takeDamage === 'function' && !(entity instanceof Knight)) &&
                            this.BB.collide(entity.BB) &&
                            !this.hitTargets.includes(entity)) {
                            entity.takeDamage(this.damage);
                            console.log(`Knight attacks MechaGolem at (${entity.x}, ${entity.y})`);
                            this.hitTargets.push(entity);
                        }
                    });
                }
        
                if (!this.animations[this.currentState].getDone()) {
                    return;
                } else {
                    this.invincible = false;
                    this.chosenState = this.facing === RIGHT ? this.currentState = 'RightIdle' : this.currentState = 'LeftIdle';
                    this.setState(this.chosenState);
                    this.pauseSound();
                    this.hitTargets = [];
                }
            }
    
            if (this.currentState === 'RightRoll' || this.currentState === 'LeftRoll') {
                if (this.currentState == 'RightRoll') {
                    if (!this.colliding.left) {
                        this.invincible = true;
                        this.x += this.rollSpeed * clockTick;
                        this.x = Math.round(this.x);
                    } else {
                        this.setState('RightIdle');
                    }
                } else if (this.currentState == 'LeftRoll' && !this.colliding.right) {
                    if (!this.colliding.right) {
                        this.invincible = true;
                        this.x -= this.rollSpeed * clockTick;
                        this.x = Math.round(this.x);
                    } else {
                        this.setState('LeftIdle');
                    }
                }
                if (this.rollSound.paused) {
                    this.runSound.pause();
                    this.rollSound.play();
                }
                this.updateBB();
                if (!this.animations[this.currentState].getDone()) {
                    return;
                } else {
                    this.invincible = false;
                    this.chosenState = this.facing === RIGHT ? 'RightIdle' : 'LeftIdle';
                    this.setState(this.chosenState);
                    this.pauseSound();
                }
            }
        
            if (!this.colliding.up) {
                if (this.velocityY > 0) {
                    this.facing == LEFT ? this.setState("LeftFall") : this.setState("RightFall");
                } else {
                    this.facing == LEFT ? this.setState("LeftJump") : this.setState("RightJump");
                    if(this.jumpSound.paused) {
                        this.runSound.pause();
                        this.jumpSound.play();
                    }
                }
                this.velocityY += this.accelerationY * clockTick;
                this.velocityY = Math.min(this.velocityY, this.maxVelocityY);
            } else if (Math.abs(this.velocityX) > this.accelerationX * clockTick) {
                this.setState(this.facing === RIGHT ? "RightRun" : "LeftRun");
                if (this.runSound.paused) {
                    this.runSound.play();
                }
            } else {
                this.setState(this.facing === RIGHT ? "RightIdle" : "LeftIdle");
                this.pauseSound();
            }
    
            if (this.game.keys["ArrowUp"]) {
                if (this.colliding.up) {
                    this.colliding.up = false;
                    this.velocityY = -this.jumpSpeed; 
                    this.hasDoubleJumped = false;
                } else if (this.hasDoubleJump && !this.hasDoubleJumped && this.arrowUpReleased) {
                    this.colliding.up = false;
                    this.velocityY = -this.jumpSpeed; 
                    this.hasDoubleJumped = true;
                }
                this.arrowUpReleased = false;
            } else {
                this.arrowUpReleased = true;
            }
            
            if (this.game.keys["ArrowLeft"] && !this.colliding.right) {
                this.facing = LEFT;
                this.velocityX -= this.accelerationX * clockTick;
                this.velocityX = Math.max(this.velocityX, -this.maxVelocityX);
            } else if (this.game.keys["ArrowRight"] && !this.colliding.left) {
                this.facing = RIGHT;
                this.velocityX += this.accelerationX * clockTick;
                this.velocityX = Math.min(this.velocityX, this.maxVelocityX);
            } else {
                if (this.velocityX > 0) {
                    this.velocityX = Math.max(0, this.velocityX - this.decelerationX * clockTick);
                } else if (this.velocityX < 0) {
                    this.velocityX = Math.min(0, this.velocityX + this.decelerationX * clockTick);
                }
            }
           
            if (this.currentState !== 'RightFall' && this.currentState !== 'LeftFall'
                && this.currentState !== 'RightJump' && this.currentState !== 'LeftJump') {
                if (this.game.keys["e"]) {
                    if (!this.attackAnimationActive) {
                        console.log(this.currentStamina >= this.meleeAttackStaminaCost);
                        if (this.currentStamina >= this.meleeAttackStaminaCost) {
                            this.velocityX = 0;
                            this.attackAnimationActive = true;
                            this.chosenState = this.facing === RIGHT ? this.currentState = 'RightAttack1' : this.currentState = 'LeftAttack1';
                            this.setState(this.chosenState);
                            this.currentStamina -= this.meleeAttackStaminaCost;
                            if (this.attackSound.paused) {
                                this.runSound.pause();
                                this.attackSound.play();
                            }
                            this.hitTargets = [];
                            
                            setTimeout(() => {
                                this.attackAnimationActive = false;
                            }, 700);
                        }
                    }
                } else if (this.game.keys["w"]) { // Swordwave projectile
                    if (!this.attackAnimationActive && this.hasWaveAttack) {
                        if (this.currentStamina < this.rangedAttackStaminaCost) {
                            return;
                        }
                        this.velocityX = 0;
                        this.attackAnimationActive = true;
                        this.chosenState = this.facing === RIGHT ? this.currentState = 'RightAttack2' : this.currentState = 'LeftAttack2';
                        this.setState(this.chosenState);
                        if (this.attackSound.paused) {
                            this.runSound.pause();
                            this.attackSound.play();
                        }
                        setTimeout(() => {
                        this.swordwave = new Swordwave(this.game, this.x, this.y + 80, this.facing);
                        this.game.entities.splice(1, 0, this.swordwave);
                        console.log(`projectile @ ("${knight.x}, ${knight.y}")`);
                        }, 700);
                        this.currentStamina = 0;
                        // if (this.swordwaveSound.paused) {
                        //     this.runSound.pause();
                        //     this.swordwaveSound.play();
                        // }
                        this.runSound.pause();
                        this.hitTargets = [];

                        setTimeout(() => {
                            this.attackAnimationActive = false;
                        }, 900);
                    }                  
                } else if (this.game.keys["r"]) {
                    this.chosenState = this.facing === RIGHT ? this.currentState = "RightRoll" : this.currentState = "LeftRoll";
                    this.invincible = true;
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
        }

        if (!this.moveable) {
            this.setState(this.facing == LEFT ? "LeftIdle" : "RightIdle");
            this.velocityX = 0; 
            if (!this.colliding.up) {
                this.velocityY = this.maxVelocityY;
            }
        }

        if (PARAMS.DEBUG) {
            this.hasDoubleJumped = false;
        }

        this.x += this.velocityX * clockTick;
        this.y += this.velocityY * clockTick;
        
        this.x = Math.round(this.x * 100) / 100;
        this.y = Math.round(this.y * 100) / 100;
        
        this.updateBB();
    }

    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return;
        if (this.hasShield && this.isShielded) {
            // Set glow effect
            ctx.save(); // Save canvas state
            ctx.shadowColor = "rgba(0, 255, 255, 0.8)"; // Cyan glow
            ctx.shadowBlur = 20; // Increase for a stronger glow
        }

        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
        ctx.restore(); // Restore canvas state to avoid affecting other drawings
        if (!this.inCutscene) {
            this.healthBar.draw(ctx);
            if (this.hasShield && this.isShielded) {
                this.shieldBar.draw(ctx);
            }
        }
        this.game.entities.forEach(entity => {
            if (entity instanceof PotionEffect) {
                entity.draw(ctx);
            }
        });
        this.BB.draw(ctx);
    };
}