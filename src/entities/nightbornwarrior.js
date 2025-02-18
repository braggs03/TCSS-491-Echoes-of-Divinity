class NightbornWarrior {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 8; // Fast chasing speed
        this.maxHp = 800;
        this.hp = 800;
        this.height = 100;
        this.healthBar = new HealthBar(this);

        this.facing = RIGHT;
        this.aggro = false;
        this.engaged = false;
        this.dead = false;
        this.attackInProgress = false;
        this.target = null;
        this.range = 800;
        this.aggroRange = 500;
        this.attackRange = 100;
        this.scale = 4;
        this.attackTimer = 0;
        
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/nightBorneWarrior/NightBorneWarrior.png");
        this.animators = {
            idleLeft: new Animator(this.spritesheet, 1080, 0, 80, 80, 9, .15, true, true),
            runLeft: new Animator(this.spritesheet, 1320, 80, 80, 80, 6, .1, true, true),
            AttackLeft: new Animator(this.spritesheet, 840, 160, 80, 80, 12, .08, true, false),
            HurtLeft: new Animator(this.spritesheet, 1400, 240, 80, 80, 5, .1, true, false),
            DeathLeft: new Animator(this.spritesheet, 0, 320, 80, 80, 23, .1, true, false),
            idleRight: new Animator(this.spritesheet, 1840, 0, 80, 80, 9, .15, false, true),
            runRight: new Animator(this.spritesheet, 1840, 80, 80, 80, 6, .1, false, true),
            AttackRight: new Animator(this.spritesheet, 1840, 160, 80, 80, 12, .08, false, false),
            HurtRight: new Animator(this.spritesheet, 1840, 240, 80, 80, 5, .1, false, false),
            DeathRight: new Animator(this.spritesheet, 1840, 320, 80, 80, 23, .1, false, false)
        };

        // Reset attack animators for each attack
        this.resetAttackAnimators();

        this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
        this.updateBB();
    }

    // Create new attack animators to ensure full animation plays each time
    resetAttackAnimators() {
        this.animators.AttackLeft = new Animator(this.spritesheet, 840, 160, 80, 80, 12, .08, true, false);
        this.animators.AttackRight = new Animator(this.spritesheet, 1840, 160, 80, 80, 12, .08, false, false);
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.engaged) {
            this.BB = new BoundingBox(this.x - this.game.camera.x + 96, this.y + 96, 160, 160);
        } else {
            this.BB = new BoundingBox(this.x - this.game.camera.x - 128, this.y + 96, this.aggroRange, 160);
        }
    }

    resetAggro() {
        this.aggro = false;
        this.engaged = false;
        this.attackInProgress = false;
        this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
    }

    takeDamage(amount) {
        if (!this.engaged && !this.aggro) return;

        this.hp -= amount;
        if (this.hp <= 0) {
            this.die();
        } else {
            // Only change to hurt animation if not attacking
            if (!this.attackInProgress) {
                this.state = this.facing === RIGHT ? 'HurtRight' : 'HurtLeft';
                setTimeout(() => {
                    if (!this.dead && !this.attackInProgress) {
                        this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
                    }
                }, 500);
            }
        }
    }

    die() {
        this.dead = true;
        this.attackInProgress = false;
        this.state = this.facing === RIGHT ? 'DeathRight' : 'DeathLeft';
        setTimeout(() => {
            this.removeFromWorld = true;
        }, 2000);
    }

    update() {
        if (this.dead) return;
        this.updateBB();

        // If attack is in progress, track its duration
        if (this.attackInProgress) {
            this.attackTimer += this.game.clockTick;
            const attackDuration = 12 * 0.08; // 12 frames at 0.08s per frame
            
            // When attack animation should complete
            if (this.attackTimer >= attackDuration) {
                this.attackInProgress = false;
                this.attackTimer = 0;
                
                // Check if target is still in range for another attack
                if (this.target && this.BB.collide(this.target.BB) && !this.target.dead) {
                    this.attack();
                } else {
                    this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
                }
            }
        }

        if (this.target && (this.target.dead || this.target.removeFromWorld)) {
            this.resetAggro();
            this.target = null;
        }

        if (!this.target && !this.aggro) {
            this.target = this.game.entities.find(entity => 
                entity instanceof Knight && !entity.dead
            );
        }

        if (this.target) {
            const dx = this.target.x - this.x;
            const distance = Math.abs(dx);

            const newFacing = dx > 0 ? RIGHT : LEFT;
            if (this.facing !== newFacing) {
                this.facing = newFacing;
                if (!this.attackInProgress) {
                    this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
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
                    if (!this.attackInProgress) {
                        this.attack();
                    }
                } else if (!this.attackInProgress && distance > this.attackRange) {
                    this.x += dx > 0 ? this.speed : -this.speed;
                    this.state = this.facing === RIGHT ? 'runRight' : 'runLeft';
                }
            }
        }
    }

    attack() {
        if (!this.target || this.target.dead || this.attackInProgress) return;

        // Reset attack animators to ensure full animation plays
        this.resetAttackAnimators();
        
        // Start attack
        this.attackInProgress = true;
        this.attackTimer = 0;
        
        // Set attack animation
        this.state = this.facing === RIGHT ? 'AttackRight' : 'AttackLeft';
        
        // Deal damage at 60% through animation (0.576s = 60% of 0.96s)
        setTimeout(() => {
            if (!this.dead && this.target && this.BB.collide(this.target.BB) && !this.target.dead) {
                console.log("NightbornWarrior deals damage to Knight");
                this.target.takeDamage(50);
            }
        }, 576);
    }

    draw(ctx) {
        // Draw current animation
        this.animators[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        
        if (this.healthBar) this.healthBar.draw(ctx);
        if (this.BB) this.BB.draw(ctx);
    }
}
