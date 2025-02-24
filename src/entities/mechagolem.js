class MechaGolem { 
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.healthBar = new HealthBar(this);
        this.maxHp = 1000; 
        this.hp = 1000;
        this.height = 90;
        this.bheight = 0; 

        this.facing = RIGHT;
        this.aggro = false;
        this.engaged = false; 
        this.dead = false;
        this.attackInProgress = false;
        this.attackCooldown = 0;
        this.target = null;
        this.range = 1000;
        this.aggroRange = 700;
        this.attackRange = 80;
        this.idleCooldown = 0; 
        this.canAttackAgain = true; 
        this.scale = 4;
        this.flickerFlag = true;
        this.flickerDuration = 0;

        this.idleAnimator = this.idleRight();
        this.animator = this.idleAnimator;
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        
        if (this.engaged) {
            this.BB = new BoundingBox(this.x - this.game.camera.x + 96, this.y + 96, 200, 200);
        } else {
            this.BB = new BoundingBox(this.x - this.game.camera.x - 128, this.y + 96, this.aggroRange, 200);
        }
    }

    resetAggro() {
        this.aggro = false;
        this.engaged = false;
        this.attackInProgress = false;
        this.idleCooldown = 0;
        this.canAttackAgain = true;
        this.idleAnimator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
        this.animator = this.idleAnimator;
    }

    takeDamage(amount) {
        if (!this.engaged && !this.aggro) return;

        this.hp -= amount;
        console.log(`MechaGolem takes ${amount} damage, remaining health: ${this.hp}`);

        if (this.hp <= 0) {
            this.die();
        } else {
            this.flickerDuration = 0.4;
        }
    }

    die() {
        this.dead = true;
        this.animator = this.facing === RIGHT ? this.deathRight() : this.deathLeft();
        console.log("MechaGolem dies!");
        this.target.emberCount += 200;
        
        setTimeout(() => {
            this.removeFromWorld = true;
        }, 1000);
    }
    // slow down golem aarcks when knight is rolling:
    update() {
        if (this.dead) return;

        if (this.flickerDuration > 0) {
            this.flickerDuration -= this.game.clockTick;
            this.flickerFlag = !this.flickerFlag;
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
                }
            }
        });

        if (left == 0) {
            this.y += 5;
        }

        if (this.target && (this.target.dead || this.target.removeFromWorld)) {
            this.resetAggro();
            this.target = null;
        }

        if (!this.target && !this.aggro) {
            this.target = this.game.entities.find(entity => 
                entity instanceof Knight && !entity.dead
            );
            
            if (!this.attackInProgress) {
                this.animator = this.idleAnimator;
            }
        }

        if (this.target) {
            const dx = this.target.x - this.x;
            const distance = Math.abs(dx);

            const newFacing = dx > 0 ? RIGHT : LEFT;
            if (this.facing !== newFacing) {
                this.facing = newFacing;
                this.idleAnimator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
                if (!this.attackInProgress) {
                    this.animator = this.idleAnimator;
                }
            }

            if (distance > this.range && this.aggro) {
                this.resetAggro();
            }

            else if (!this.engaged && this.BB.collide(this.target.BB)) {
                this.aggro = true;
                this.engaged = true;
                this.updateBB(); 
            }
  
            else if (this.aggro) {
                if (this.BB.collide(this.target.BB)) {
                    
                    if (!this.attackInProgress && this.attackCooldown <= 0) {
                        this.attack();
                    }
                } else if (!this.attackInProgress && distance > this.attackRange) {
                    
                    this.x += dx > 0 ? this.speed : -this.speed;
                    this.animator = this.idleAnimator;
                }
            }
        } else {
            this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
        }

        if (this.attackCooldown > 0) {
            this.attackCooldown -= this.game.clockTick;
        }

        this.updateBB();
    } 
        

    attack() {
        if (!this.target || this.target.dead || this.attackCooldown > 0) return;
    
        this.attackInProgress = true;
        this.canAttackAgain = false; 

        const attackType = Math.random() < 0.5 ? "attack1" : "attack2";
        this.animator = this.facing === RIGHT ? this.meleeRight() : this.meleeLeft();
    
        console.log("Golem attacks knight!");

        setTimeout(() => {
            if (this.target && this.BB.collide(this.target.BB) && !this.target.dead) {
                console.log("Knight takes damage!");
                this.target.takeDamage(100);
            }
        }, 650);

        setTimeout(() => {
            this.attackInProgress = false;
            this.attackCooldown = 1;
            this.animator = this.idleAnimator; 
    
            if (this.target && this.BB.collide(this.target.BB)) {
                if (this.BB.collide(this.target.BB)) {
                    this.attack();
                } else {
                    this.canAttackAgain = true;
                }
            }
        }, 700);
    }

    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return;
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 4);
        this.healthBar.draw(ctx);
        this.BB.draw(ctx);
    }


    idleRight() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 0, 100, 100, 4, 0.1, false, true);
    }

    glowingRight() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 100, 100, 100, 8, 0.1, false, true);
    }

    rangeAttackRight() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 200, 100, 100, 9, 0.1, false, false);
    }

    blockRight() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 300, 100, 100, 8, 0.1, false, false);
    }

    meleeRight() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 400, 100, 100, 7, 0.1, false, false);
    }

    laserRight() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 500, 100, 100, 7, 0.1, false, false);
    }

    deathRight() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 700, 100, 100, 14, 0.1, false, false);
    }
    
    idleLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2400, 0, 100, 100, 4, 0.1, true, true);
    }

    glowingLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2000, 100, 100, 100, 8, 0.1, true, true);
    }

    rangeAttackLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 1900, 200, 100, 100, 9, 0.1, true, false);
    }

    blockLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2000, 300, 100, 100, 8, 0.1, true, false);
    }

    meleeLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2100, 400, 100, 100, 7, 0.1, true, false);
    }

    laserLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2100, 500, 100, 100, 7, 0.1, true, false);
    }

    deathLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 1400, 700, 100, 100, 14, 0.1, true, false);
    }
}
