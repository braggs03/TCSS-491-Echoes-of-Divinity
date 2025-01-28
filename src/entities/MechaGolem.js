class MechaGolem {
    constructor(game, x, y) {
        this.game = game;
        this.animator = this.idleRight(); // Default idle animation
        this.x = x;
        this.y = y;
        this.speed = 4; 
        this.facing = RIGHT; 
        this.range = 300; // Detection range
        this.attackRange = 90; // Attack range
        this.target = null; // Target (Knight)
        this.attackCooldown = 0; // Cooldown timer for attacks
        this.updateBB(); // Initialize bounding box
        this.dead = false; // Alive state
    }

    updateBB() {
        this.BB = new BoundingBox(this.x , this.y , 300, 300);
    }

    die() {
        this.dead = true;
        this.animator = this.facing === RIGHT ? this.deathRight() : this.deathLeft();
        console.log("MechaGolem dies!");
    }

    update() {
		
		if (this.dead) return; // Stop actions if dead
	
		// Check if the target is still valid
		if (this.target && (this.target.dead || this.target.removeFromWorld)) {
			this.target = null; 

			
		}
	
		// Find a new target if none exists
		if (!this.target) {
			this.target = this.game.entities.find(entity => entity instanceof Knight && !entity.dead);
		}
	
		if (this.target) {
			const dx = this.target.x - this.x; // Distance to the target in x-axis
			const distance = Math.abs(dx);
	
			// Determine facing direction based on knight's position
			this.facing = dx > 0 ? RIGHT : LEFT;
	
			if (distance <= this.range) {
				// Knight is within detection range
				if (distance > this.attackRange) {
					// Move toward the knight
					this.x += dx > 0 ? this.speed : -this.speed;
					this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
				} else if (this.attackCooldown <= 0) {
					// Knight is within attack range
					this.animator = this.facing === RIGHT ? this.meleeRight() : this.meleeLeft();
					console.log("Golem attacks knight!");
	
					// Delay the attack effect until the animation finishes
					if (!this.attackInProgress) {
						this.attackInProgress = true;
						setTimeout(() => {
							if (this.BB.collide(this.target.BB) && !this.target.dead) {
								console.log("Knight dies!");
								this.target.die();
							}
							this.attackInProgress = false;
							// Return to idle after the attack
							this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
						}, 700); // Adjust timing to match the attack animation duration
					}
	
					// Set cooldown to avoid spamming attacks
					this.attackCooldown = 2; // 2-second cooldown
				}
			} else {
				// Knight is out of range, return to idle
				this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
			}
		} else {
			// No target, return to idle
			this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
		}
	
		if (this.attackCooldown > 0) {
			this.attackCooldown -= this.game.clockTick; // Reduce cooldown timer
		}
	
		this.updateBB(); // Update bounding box after movement
	}
	

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 4);

		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
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
