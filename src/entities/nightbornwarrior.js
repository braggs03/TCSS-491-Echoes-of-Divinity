class NightbornWarrior {
    constructor(game, x, y, split) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.maxHp = 1400;
        this.hp = 200;
        this.height = 100;
        this.healthBar = new HealthBar(this);
		this.inCutscene = false;
        this.invinsible = false;
        this.split = split;
        this.splitTransition = false;
        this.flickerFlag = true;
        this.flickerDuration = 0;
        this.isLightning = false;
        this.removeFromWorld = false;

        this.maxVelocityX = 825;
        this.facing = RIGHT;
        this.dead = false;
        this.attackInProgress = false;
        this.target = null;
        this.clone = null;
        this.attackRange = 100;
        this.scale = 4;
        this.attackTimer = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./resources/nightBorneWarrior/NightBorneWarrior.png");
        this.sprite = ASSET_MANAGER.getAsset("./resources/nightBorneWarrior/NightBorneflip.png");
        this.animators = {
            idleLeft: new Animator(this.spritesheet, 1080, 0, 80, 80, 9, .15, true, true),
            runLeft: new Animator(this.spritesheet, 1320, 80, 80, 80, 6, .1, true, true),
            AttackLeft: new Animator(this.spritesheet, 840, 160, 80, 80, 12, .08, true, false),
            HurtLeft: new Animator(this.spritesheet, 1400, 240, 80, 80, 5, .1, true, false),
            DeathLeft: new Animator(this.sprite, 0, 320, 80, 80, 23, .1, true, false),
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

	setState(state) {
		for (let key in this.animators) {
			if (this.state === key) {
			} else if (this.animators.hasOwnProperty(key)) {
				// Reset each Animator instance
				this.animators[key].reset();
			}
		}
		if (this.animators[state]) {
			this.state = state;
		} else {
			console.error(`State '${state}' not found.`);
		}
	}

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - this.game.camera.x + 96, this.y + 96, 160, 160);
    }

    takeDamage(amount) {
        if (!this.splitTransition) {this.hp -= amount;}
        if (this.hp <= 700) {
            if (!this.split) {
                if (!this.splitTransition) {
                    this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
                    this.flickerDuration = 5.0;
                    this.splitTransition = true;
                    this.inCutscene = true;
                    this.invinsible = true;
                    this.split = true;
                }
            }
        }
        if (this.invinsible) return;
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

    die() {
        this.dead = true;
        this.attackInProgress = false;
        this.state = this.facing === RIGHT ? 'DeathRight' : 'DeathLeft';
        setTimeout(() => {
            this.removeFromWorld = true;
        }, 2000);
        if (!this.clone) {
            this.game.camera.cutscene.push({ startX: -200, cutsceneNum: 6})
        }
    }

    update() {
        const clockTick = this.game.clockTick;
        this.speed = this.maxVelocityX * clockTick; // Fast chasing speed
        if (this.hp <= 0 && !this.dead) {
            this.target.emberCount += 1000;
            this.die();
        }
        if (this.splitTransition) {
            if (this.flickerDuration > 0) {
                this.flickerDuration -= this.game.clockTick;
                this.flickerFlag = !this.flickerFlag;
                return;
            }
            if (this.hp <= 400) {
                this.x -= 1;
            } else {
                this.x += 1;
            }
            if (!this.isLightning) {
                this.lightning = new Lightning(this.game, this.x, 40, true)
                this.isLightning = true;
            }
            this.game.entities.splice(1, 0, this.lightning);
            if (!this.lightning.done) {
                return;
            }
            this.lucan2 = new NightbornWarrior(this.game, this.x + 50, this.y, true);
            this.x -= 50;
            this.game.entities.splice(1, 0, this.lucan2);
            this.splitTransition = false;
            this.inCutscene = false;
        }
        if (this.dead) return;
        this.updateBB();
        if (this.inCutscene) {
            if (this.state === "runLeft") {
                this.x -= 10;
            } else if (this.state === "runRight") {
                this.x += 10;
            }
            return;
        }

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
            this.target = null;
        }

        if (!this.target) {
            this.target = this.game.entities.find(entity => 
                entity instanceof Knight && !entity.dead
            );
        }

        if (!this.clone) {
            this.clone = this.game.entities.find(entity =>
                entity instanceof NightbornWarrior && !entity.dead && entity !== this
            );
        }

        if (this.clone && this.clone.hp <=0) {
            this.clone = null;
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

           if (this.BB.collide(this.target.BB)) {
                if (!this.attackInProgress) {
                    this.attack();
                }
            }
           if (!this.attackInProgress && distance > this.attackRange) {
                if (this.clone) {
                    if (this.hp === 500) {
                        console.log('works')
                    }
                    if ((this.x < this.clone.x && this.x > this.target.x)
                        || (this.x > this.clone.x && this.x < this.target.x)) {
                        this.x += dx > 0 ? this.speed : -this.speed;
                        this.state = this.facing === RIGHT ? 'runRight' : 'runLeft';
                    } else if ((this.x < this.clone.x && this.x < this.target.x)
                        || (this.x > this.clone.x && this.x > this.target.x)) {
                        const cx = this.clone.x - this.x;
                        const clonedistance = Math.abs(cx);
                        if (clonedistance > distance) {
                            this.x += dx > 0 ? this.speed : -this.speed;
                            this.state = this.facing === RIGHT ? 'runRight' : 'runLeft';
                        } else {
                            this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
                        }
                    } else {
                        this.state = this.facing === RIGHT ? 'idleRight' : 'idleLeft';
                    }
                } else {
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
                this.target.takeDamage(200);
            }
        }, 576);
    }

    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return;
        // Draw current animation
		console.log('works');
        this.animators[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        
        if (this.healthBar) this.healthBar.draw(ctx);
        if (this.BB) this.BB.draw(ctx);
    }
}
