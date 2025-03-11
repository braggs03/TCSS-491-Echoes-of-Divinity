const MECHA_GOLEM_DEFAULTS = {
    maxHp: 1000, 
    Hp: 1000,
    dead: false,
}

class MechaGolem { 
    constructor(game, self) {
        this.game = game;
        this.self = self;
        this.x = this.self.x;
        this.y = this.self.y;
        this.dead = this.self.dead ? this.self.dead : MECHA_GOLEM_DEFAULTS.dead;
        this.healthBar = new HealthBar(this);
        this.maxHp = MECHA_GOLEM_DEFAULTS.maxHp; 
        this.hp = this.self.hp ? this.self.hp : MECHA_GOLEM_DEFAULTS.maxHp;
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
        this.attackRange = 500;
        this.minAttackRange = this.game.camera.levelIndex === "three" ? 0 : 350;
        this.aggroRange = this.game.camera.levelIndex === "three" ? 1000 : 700;
        this.attackRange = 80;
        this.idleCooldown = 0; 
        this.canAttackAgain = true; 
        this.scale = 4;
        this.flickerFlag = true;
        this.flickerDuration = 0;
        this.attackCooldownFactor = 1.7;

        this.velocityX = 0;
        this.speed = 400; 
        
        this.velocityY = 0;
        this.maxVelocityY = 990;
        this.accelerationY = 4125; 


        this.idleAnimator = this.idleRight();
        this.animator = this.idleAnimator;

        this.golemHit = new Audio("./resources/SoundEffects/golemhit.mp3");
        this.golemDeath = new Audio("./resources/SoundEffects/golemdeath.mp3");
        this.updateBB();
    }

    save() {
        this.self.x = this.x;
        this.self.y = this.y;
        this.self.hp = this.hp;
        this.self.dead = this.dead;
    }

    updateBB() {
        this.lastBB = this.BB;
        
        if (this.engaged) {
            this.BB = new BoundingBox(this.x - this.game.camera.x + 96, this.y + 96 - this.game.camera.y, 200, 200);
        } else {
            this.BB = new BoundingBox(this.x - this.game.camera.x - this.aggroRange / 2 + 200, this.y + 96 - this.game.camera.y, this.aggroRange, 200);
        }
    }

    resetAggro() {
        this.aggro = false;
        this.engaged = false;
        this.idleCooldown = 0;
        this.canAttackAgain = true;
        this.idleAnimator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
        this.animator = this.idleAnimator;
    }
    
    takeDamage(amount) {
        this.hp -= amount;
        this.golemHit.play();
        this.golemHit.volume = 0.5;

        if (this.hp <= 0) {
            this.golemDeath.play();
            this.golemDeath.volume = 0.2;
            this.die();
        } else {
            this.flickerDuration = 0.4;
        }
    }

    die() {
        this.dead = true;
        this.self.dead = true;
        this.animator = this.facing === RIGHT ? this.deathRight() : this.deathLeft();
        this.target.emberCount += 200;

        setTimeout(() => {
            this.removeFromWorld = true;
        }, 1000);
    }
    // slow down golem aarcks when knight is rolling:
    update() {
        if (this.dead) return;
        const clockTick = this.game.clockTick;

        if (this.flickerDuration > 0) {
            this.flickerDuration -= this.game.clockTick;
            this.flickerFlag = !this.flickerFlag;
        }

        this.colliding = {
            right: false,
            left: false,
            down: false,
            up: false,
        }
        let mechagolem = this;
        
        this.game.entities.forEach((entity) => {
            if (entity.BB && mechagolem.BB.collide(entity.BB)) {
                const overlap = entity.BB.overlap(mechagolem.BB);
                if (entity instanceof DungeonWall) {
                    if (entity.BB.x < mechagolem.BB.x) {
                        this.colliding.right = true;
                        mechagolem.x += overlap.x;
                    } else if (entity.BB.x > mechagolem.BB.x) {
                        this.colliding.left = true;
                        mechagolem.x -= overlap.x;
                    }
                    mechagolem.velocityX = 0; 
                } else if (entity instanceof DungeonGround || entity instanceof DungeonGround2) {
                    let horizontalCollision = overlap.x > 0 && overlap.x < overlap.y;
                    let verticalCollision = overlap.y > 0 && overlap.y < overlap.x;

                    if (horizontalCollision) {
                        if (entity.BB.x < mechagolem.BB.x) {
                            mechagolem.x += overlap.x;
                        } else {
                            mechagolem.x -= overlap.x;
                        }
                        mechagolem.velocityX = 0;
                    } else if (verticalCollision) {
                        if (entity.BB.y < mechagolem.BB.y) {
                            this.colliding.down = true;
                            mechagolem.y += overlap.y;
                        } else {
                            this.colliding.up = true;
                            mechagolem.y -= overlap.y - 1;
                        }
                        mechagolem.velocityY = 0;
                    }
                }
            }
        });

        if (!this.colliding.up) {
            this.velocityY += this.accelerationY * clockTick;
            this.velocityY = Math.max(this.velocityY, this.maxVelocityY * clockTick);
        }

        this.y += this.velocityY * clockTick;

        if (this.y > VOID_HEIGHT) {
            this.die();
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
            const knightLeft = Math.abs(this.target.BB.right - this.BB.x);
            const knightRight = Math.abs(this.target.BB.x - this.BB.right);
            let dx;
            let newFacing;
            if (knightLeft < knightRight) {
                dx = knightLeft;
                newFacing = LEFT;
            } else {
                dx = knightRight;
                newFacing = RIGHT;
            } 
            const distance = Math.abs(dx);

            if (this.facing !== newFacing) {
                this.facing = newFacing;
                this.idleAnimator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
                if (!this.attackInProgress) {
                    this.animator = this.idleAnimator;
                }
            }

            if (distance > this.range && this.aggro) {
                this.resetAggro();
            } else if (!this.engaged && this.BB.collide(this.target.BB)) {
                this.aggro = true;
                this.engaged = true;
                this.updateBB(); 
            } else if (this.aggro) {
                if (this.BB.collide(this.target.BB)) {
                    if (!this.attackInProgress && this.attackCooldown <= 0) {
                        this.attack();
                    }
                } else if (distance > this.attackRange && this.aggro && !this.attackInProgress && this.attackCooldown <= 0) {
                    this.rangeAttack();
                } else if (!this.attackInProgress && this.game.camera.levelIndex !== "three") {
                    this.x += knightLeft > knightRight ? this.game.clockTick * this.speed : this.game.clockTick * -this.speed;
                    this.animator = this.idleAnimator;
                }
            }
        } else {
            this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
        }

        if (this.attackCooldown > 0) {
            this.attackCooldown -= this.attackCooldownFactor * this.game.clockTick;
        }

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        this.updateBB();
    } 
        

    attack() {
        if (!this.target || this.target.dead || this.attackCooldown > 0) return;
    
        this.attackInProgress = true;
        this.canAttackAgain = false; 
        
        this.animator = this.facing === RIGHT ? this.meleeRight() : this.meleeLeft();

        setTimeout(() => {
            if (this.target && this.BB.collide(this.target.BB) && !this.target.dead) {
                this.target.takeDamage(100);
            }
        }, 550);

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
        }, 400);
    }

    rangeAttack() {
        if (this.attackCooldown > 0) return;
        this.attackInProgress = true;
        this.canAttackAgain = false; 
        this.animator = this.facing === RIGHT ? this.rangeAttackRight() : this.rangeAttackLeft();

        const knightX = this.target.x;
        const knightY = this.target.y;

        setTimeout(() => {
            const dx = Math.min(this.target.BB.x - this.BB.right, this.target.BB.right - this.BB.x);
            const distance = Math.abs(dx);
            if (distance > this.minAttackRange) {
                if (this.facing === LEFT) {
                    const projectile = new MechaProjectile(this.game, this.x + 100, this.y + 200, knightX + KNIGHT_X_OFFSET + KNIGHT_WIDTH / 2, knightY + KNIGHT_Y_OFFSET + KNIGHT_HEIGHT / 2, this.facing);
                    this.game.entities.splice(0, 0, projectile);
                } else {
                    const projectile = new MechaProjectile(this.game, this.x + 200, this.y + 200, knightX + KNIGHT_X_OFFSET + KNIGHT_WIDTH / 2, knightY + KNIGHT_Y_OFFSET + KNIGHT_HEIGHT / 2, this.facing);
                    this.game.entities.splice(0, 0, projectile);
                }
            }
            this.attackInProgress = false;
            this.attackCooldown = 1;
            this.animator = this.idleAnimator; 
            this.canAttackAgain = true;
        }, 800);
    }

    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return;
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 4);
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
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 0, 400, 100, 100, 7, 0.05, false, false);
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
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2100, 400, 100, 100, 7, 0.05, true, false);
    }

    laserLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 2100, 500, 100, 100, 7, 0.1, true, false);
    }

    deathLeft() {
        return new Animator(ASSET_MANAGER.getAsset(MECHA_GOLEM), 1400, 700, 100, 100, 14, 0.1, true, false);
    }
}

const MECHA_GOLEM_PROJECTILE_WIDTH = 34;
const MECHA_GOLEM_PROJECTILE_HEIGHT = 13;

class MechaProjectile {
    constructor(game, x, y, targetX, targetY, direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = 1000;
        this.removeFromWorld = false;
        this.damage = 50;
        this.expireTime = 1;
        this.scale = 4;

        let dx = targetX - x;
        let dy = targetY - y;
        this.angle = Math.atan2(dy, dx);

        this.velocityX = Math.cos(this.angle) * this.speed;
        this.velocityY = Math.sin(this.angle) * this.speed;

        this.spritesheet = ASSET_MANAGER.getAsset(MECHA_GOLEM_PROJECTILE);
    }

     updateBB() {
        let tipX = this.x + Math.cos(this.angle) * (MECHA_GOLEM_PROJECTILE_WIDTH * this.scale);
        let tipY = this.y + Math.sin(this.angle) * (MECHA_GOLEM_PROJECTILE_HEIGHT * this.scale) - MECHA_GOLEM_PROJECTILE_HEIGHT * this.scale;
        this.BB = new BoundingBox(tipX - this.game.camera.x, tipY - this.game.camera.y, MECHA_GOLEM_PROJECTILE_WIDTH * this.scale, MECHA_GOLEM_PROJECTILE_HEIGHT * this.scale);
    }

    update() {
        this.expireTime -= this.game.clockTick;

        if (this.expireTime <= 0) {
            this.removeFromWorld = true;
            return;
        }

        this.x += this.velocityX * this.game.clockTick;
        this.y += this.velocityY * this.game.clockTick;  

        this.updateBB();

        const projectile = this;
        this.game.entities.forEach((entity) => {
            if (entity.BB && projectile.BB.collide(entity.BB) && !(entity instanceof MechaGolem) && !(entity instanceof MechaProjectile) && !entity.invincible) {
                if (entity instanceof Knight) {
                    entity.takeDamage(100);
                }
                projectile.removeFromWorld = true;
            }
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - this.game.camera.x, this.y - this.game.camera.y);
        if (this.direction === RIGHT) {
            ctx.rotate(this.angle + Math.PI);
            ctx.drawImage(this.spritesheet, 35, 0, MECHA_GOLEM_PROJECTILE_WIDTH, MECHA_GOLEM_PROJECTILE_HEIGHT, -280, 10, MECHA_GOLEM_PROJECTILE_WIDTH * this.scale, MECHA_GOLEM_PROJECTILE_HEIGHT * this.scale);
        } else {
            ctx.rotate(this.angle);
            ctx.drawImage(this.spritesheet, 0, 0, MECHA_GOLEM_PROJECTILE_WIDTH, MECHA_GOLEM_PROJECTILE_HEIGHT, 0, 0, MECHA_GOLEM_PROJECTILE_WIDTH * this.scale, MECHA_GOLEM_PROJECTILE_HEIGHT * this.scale);
        }
        
        ctx.restore();
        this.BB.draw(ctx);
    }
}
