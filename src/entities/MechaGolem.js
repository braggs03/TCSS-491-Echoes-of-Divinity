
class MechaGolem {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.hp = 1000;

        this.facing = RIGHT;
        this.aggro = false;
        this.engaged = false; 
        this.dead = false;
        this.attackInProgress = false;
        this.attackCooldown = 0;
        this.target = null;
        this.range = 350;
        this.attackRange = 80;
        this.idleCooldown = 0; 
        this.canAttackAgain = true; 

        
        this.flickerFlag = true;
        this.flickerDuration = 0;

        this.animator = this.idleRight(); 
        this.updateBB();
    }


    updateBB() {
        this.lastBB = this.BB;

      
        if (this.engaged) {
            this.BB = new BoundingBox(this.x - this.game.camera.x + 96, this.y + 96, 200, 200);
        } 
    
        else if (this.aggro) {
            this.engaged = true;
            this.BB = new BoundingBox(this.x - this.game.camera.x + 96, this.y + 96, 200, 200);
        } 
   
        else {
            this.BB = new BoundingBox(this.x - this.game.camera.x - 128, this.y + 96, 700, 200);
        }

    
        if (this.target && Math.abs(this.target.x - this.x) > this.range) {
            this.resetAggro();
        }
    }

   
    resetAggro() {
        //this.target = null;
        this.aggro = false;
        this.engaged = false;
        this.attackInProgress = false;
        this.idleCooldown = 0;
        this.canAttackAgain = true;
        this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
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

    update() {
        if (this.dead) return;
    
    
        if (this.flickerDuration > 0) {
            this.flickerDuration -= this.game.clockTick;
            this.flickerFlag = !this.flickerFlag;
        }
    

        if (this.target && (this.target.dead || this.target.removeFromWorld)) {
            this.resetAggro();
            this.target = null; // Explicitly clear the target
        }
    
     
        if (!this.target) {
            this.target = this.game.entities.find(entity => entity instanceof Knight && !entity.dead);
        }
    
        if (this.target) {
            const dx = this.target.x - this.x;
            const distance = Math.abs(dx);
    
     
            if (!this.engaged && this.BB.collide(this.target.BB)) {
                this.aggro = true;
                this.engaged = true;
            }
            if (this.aggro) {

                this.facing = dx > 0 ? RIGHT : LEFT;
    
             
                if (!this.attackInProgress) {
                    if (distance > this.attackRange) {
                        this.x += dx > 0 ? this.speed : -this.speed;
                        this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
                    } 
                    
                    else if (!this.attackInProgress && this.attackCooldown <= 0 && this.idleCooldown <= 0 && this.canAttackAgain) {
                        this.attack();
                    }
                }
    
              
                if (!this.BB.collide(this.target.BB)) {
                    this.canAttackAgain = true;
                }
            }
        } else {
            // No target available, return to idle
            this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
        }
    
      
        if (this.attackCooldown > 0) {
            this.attackCooldown -= this.game.clockTick;
        }
    
        this.updateBB();
    }
    attack() {
        this.attackInProgress = true;
        this.canAttackAgain = false; 
    
     
        const attackType = Math.random() < 0.5 ? "attack1" : "attack2";
        this.animator = attackType === "attack1"
            ? (this.facing === RIGHT ? this.meleeRight() : this.meleeLeft())
            : (this.facing === RIGHT ? this.rangeAttackRight() : this.rangeAttackLeft());
    
        console.log("Golem attacks knight!");
    

        setTimeout(() => {
            if (this.target && this.BB.collide(this.target.BB) && !this.target.dead) {
                console.log("Knight takes damage!");
                this.target.takeDamage(100);
            }
        }, 350);
    
   
        setTimeout(() => {
            this.attackInProgress = false;
            this.attackCooldown = 1;
            
            if (!this.target || this.target.dead) {
                console.log("No target to attack; returning to idle.");
                this.resetAggro(); // Reset if the Knight is gone or dead
            } else if (!this.BB.collide(this.target.BB)) {
                this.canAttackAgain = true;
            } else {
                this.animator = this.facing === RIGHT ? this.idleRight() : this.idleLeft();
            }
        }, 700);
    }
    

   
    draw(ctx) {
        if (this.flickerDuration > 0 && !this.flickerFlag) return; // Skip drawing on flicker frames
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 4);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
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