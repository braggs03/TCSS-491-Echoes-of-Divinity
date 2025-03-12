
class Werewolf {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.maxHp = 1400;
        this.hp = 1400;
        this.height = 90;
        this.bheight = 30;
        this.healthBar = new HealthBar(this);
        this.damage = 150;
        this.aggro = false;
        this.inCutscene = false;
        this.facingLeft = true;
        this.dead = false;
        this.speed = 500;
        this.target = null;

        this.velocityX = 0;
        this.velocityY = 0;
        this.maxVelocityY = 990;
        this.accelerationY = 4125;

        this.werewolfDeath = new Audio("./resources/SoundEffects/werewolfdeath.mp3");
        
        // Create bounding box
        this.updateBB();
        
        this.animators = {
            WalkRight: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "walk.png"), 0, 0, 128, 128, 11, 0.1, false, true),
            runRight: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Run.png"), 0, 0, 128, 128, 9, 0.1, false, true),
            run_attackRight: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Run+Attack.png"), 0, 0, 128, 128, 7, 0.1, false, false),
            JumpRight: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Jump.png"), 0, 0, 128, 128, 11, 0.1, false, false),
            idleRight: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Idle.png"), 0, 0, 128, 128, 8, 0.1, false, true),
            HurtRight: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Hurt.png"), 0, 0, 128, 128, 2, 0.15, false, false),
            DeadRight: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Dead.png"), 0, 0, 128, 128, 2, 0.2, false, false),
            Attack_3Right: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Attack_3.png"), 0, 0, 128, 128, 5, 0.1, false, false),
            Attack_2Right: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Attack_2.png"), 0, 0, 128, 128, 4, 0.1, false, false),
            Attack_1Right: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Attack_1.png"), 0, 0, 128, 128, 6, 0.1, false, false),
            
            WalkLeft: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "walk.png"), 1408, 0, 128, 128, 11, 0.1, true, true),
            runLeft: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Run.png"), 1152, 0, 128, 128, 9, 0.1, true, true),
            run_attackLeft: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Run+Attack.png"), 896, 0, 128, 128, 7, 0.1, true, false),
            JumpLeft: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Jump.png"), 1408, 0, 128, 128, 11, 0.1, true, false),
            idleLeft: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Idle.png"), 1024, 0, 128, 128, 8, 0.1, true, true),
            HurtLeft: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Hurt.png"), 256, 0, 128, 128, 2, 0.15, true, false),
            DeadLeft: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Dead.png"), 256, 0, 128, 128, 2, 0.2, true, false),
            Attack_3Left: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Attack_3.png"), 640, 0, 128, 128, 5, 0.1, true, false),
            Attack_2Left: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Attack_2.png"), 512, 0, 128, 128, 4, 0.1, true, false),
            Attack_1Left: new Animator(ASSET_MANAGER.getAsset(WEREWOLF + "Attack_1.png"), 768, 0, 128, 128, 6, 0.1, true, false)
        }
        
        this.state = 'idleLeft';
        this.attackNumber = 0;
    }

    setState(state) {
        for (let key in this.animators) {
            if (this.state === key) {
               
            } else if (this.animators.hasOwnProperty(key)) {
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
		
		if (this.aggro) {
			this.BB = new BoundingBox(this.x - this.game.camera.x, this.y + 50 - this.game.camera.y, 256, 206);
		} else {
			this.BB = new BoundingBox(this.x - this.game.camera.x - 150, this.y - this.game.camera.y + 170, 400, 88);
		}
	}
	
    
    takeDamage(amount) {
		if (!this.invincible) {
			this.hp -= amount;
			console.log(`Werewolf taking ${amount} damage, health: ${this.hp}/${this.maxHp}`);
			
			if (this.hp <= 0) {
				this.die();
				return;
			}

			this.invincible = true;
			this.flickerDuration = 0.5; 
			this.flickerFlag = true;
			
			setTimeout(() => {
				this.invincible = false;
				this.flickerDuration = 0;
			}, 500); 
		}
	}
    
    die() {
        if (this.dead) return;
        
        this.dead = true;
        this.werewolfDeath.play();
        this.werewolfDeath.volume = 0.2;
        
        if (this.facingLeft) {
            this.setState('DeadLeft');
        } else {
            this.setState('DeadRight');
        }
        
        if (this.target) {
            this.target.emberCount += 400;
        }
        
        setTimeout(() => {
            this.removeFromWorld = true;
        }, 1000);
    }

    update() {
        const clockTick = this.game.clockTick;
        
        if (this.dead) {
            return;
        }
        
        this.colliding = {
            right: false,
            left: false,
            down: false,
            up: false,
        }
        
        this.velocityY = this.velocityY || 0;
        this.maxVelocityY = this.maxVelocityY || 990;
        this.accelerationY = this.accelerationY || 4125;
        
        let werewolf = this;
        this.game.entities.forEach((entity) => {
            if (entity.BB && werewolf.BB.collide(entity.BB)) {
                const overlap = entity.BB.overlap(werewolf.BB);
                if (entity instanceof DungeonWall|| entity instanceof DungeonWall2) {
                    if (entity.BB.x < werewolf.BB.x) {
                        this.colliding.right = true;
                        werewolf.x += overlap.x;
                    } else if (entity.BB.x > werewolf.BB.x) {
                        this.colliding.left = true;
                        werewolf.x -= overlap.x;
                    }
                    werewolf.velocityX = 0; 
                } else if (entity instanceof DungeonGround || entity instanceof DungeonGround4) {
                    let horizontalCollision = overlap.x > 0 && overlap.x < overlap.y;
                    let verticalCollision = overlap.y > 0 && overlap.y < overlap.x;

                    if (horizontalCollision) {
                        if (entity.BB.x < werewolf.BB.x) {
                            werewolf.x += overlap.x;
                        } else {
                            werewolf.x -= overlap.x;
                        }
                        werewolf.velocityX = 0;
                    } else if (verticalCollision) {
                        if (entity.BB.y < werewolf.BB.y) {
                            this.colliding.down = true;
                            werewolf.y += overlap.y;
                        } else {
                            this.colliding.up = true;
                            werewolf.y -= overlap.y - 1;
                        }
                        werewolf.velocityY = 0;
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
            return;
        }

        this.updateBB();

        if (this.state === 'WalkRight' || this.state === 'runRight') {
            this.x += this.speed * clockTick;
        } else if (this.state === 'WalkLeft' || this.state === 'runLeft') {
            this.x -= this.speed * clockTick;
        }

        this.attackNumber = Math.floor(Math.random() * 3);
        
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Knight) {

                const dx = entity.x - that.x;
                const distance = Math.abs(dx);
                
                if (entity.BB && that.BB.collide(entity.BB) && !that.aggro) {
                    that.target = entity;
                    that.aggro = true;
                    
                    if (entity.x > that.x) {
                        that.facingLeft = false;
                    } else {
                        that.facingLeft = true;
                    }
                }
                
                if (that.aggro) {
                    const animationDone = that.animators[that.state].getDone();
                    const isAttackState = that.state.includes('Attack');
         
                    if (!isAttackState || animationDone) {
                      
                        if (distance > 400) {
                            if (dx > 0) {
                                that.facingLeft = false;
                                that.setState('runRight');
                            } else {
                                that.facingLeft = true;
                                that.setState('runLeft');
                            }
                        } 
                        
                        else if (distance > 100) {
                            if (dx > 0) {
                                that.facingLeft = false;
                                that.setState('WalkRight');
                            } else {
                                that.facingLeft = true;
                                that.setState('WalkLeft');
                            }
                        }
                       
                        else if (entity.BB && that.BB.collide(entity.BB)) {
                            
                            if (!isAttackState) {
                                if (that.facingLeft) {
                                    if (that.attackNumber === 0) {
                                        that.setState('Attack_1Left');
                                    } else if (that.attackNumber === 1) {
                                        that.setState('Attack_2Left');
                                    } else {
                                        that.setState('Attack_3Left');
                                    }
                                } else {
                                    if (that.attackNumber === 0) {
                                        that.setState('Attack_1Right');
                                    } else if (that.attackNumber === 1) {
                                        that.setState('Attack_2Right');
                                    } else {
                                        that.setState('Attack_3Right');
                                    }
                                }
                                
                               
                                entity.takeDamage(that.damage);
                            }
                        } else {
                            
                            if (that.facingLeft) {
                                that.setState('idleLeft');
                            } else {
                                that.setState('idleRight');
                            }
                        }
                    }
                    
                    // Handle taking damage from knight's attack
                    if (entity.BB && that.BB.collide(entity.BB)) {
                        if (entity.currentState === 'RightAttack1' || entity.currentState === 'LeftAttack1') {
                            that.takeDamage(entity.damage);
                            return;
                        }
                    }
                    
                    // Reset to idle state after attack animation completes
                    if (animationDone && isAttackState) {
                        if (that.facingLeft) {
                            that.setState('idleLeft');
                        } else {
                            that.setState('idleRight');
                        }
                    }
                }
            }
        });
    }

    draw(ctx) {
		
		if (this.flickerDuration > 0) {
			this.flickerDuration -= this.game.clockTick;
			this.flickerFlag = !this.flickerFlag;
			if (!this.flickerFlag) return; 
		}
		
		this.animators[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);

		if (this.healthBar) this.healthBar.draw(ctx);
		if (this.BB) this.BB.draw(ctx);
	}
}