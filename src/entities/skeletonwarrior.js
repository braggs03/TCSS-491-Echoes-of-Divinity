const SKELETON_DEFAULTS = {
    maxHp: 500,
    hp: 500,
}

class SkeletonWarrior {
	constructor(game, self) {
		this.game = game;
        this.self = self;
        this.x = this.self.x;
        this.y = this.self.y;
        this.maxHp = SKELETON_DEFAULTS.maxHp;
        this.hp = this.self.hp ? this.self.hp : SKELETON_DEFAULTS.hp;
        this.height = 100;
        this.emberQuantity = 100;
        this.bheight = 0;
        this.healthBar = new HealthBar(this);
        this.updateBB();
        this.inCutscene = false;
        this.aggro = false;
        this.facingLeft = true;
        this.damage = 50;
        this.target = null;

        this.runSpeed = 500;
        this.walkSpeed = 250;

        this.velocityY = 0;
        this.maxVelocityY = 990;
        this.accelerationY = 4125; 

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_1.png"), 0, 0, 130, 200, 5, 0.1, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_2.png"), 0, 0, 130, 200, 6, 0.1, false, false),
            RightAttack3 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_3.png"), 0, 0, 130, 200, 4, 0.1, false, false),
            RightDead : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Dead.png"), 0, 0, 130, 200, 4, 0.1, false, false),
            RightHurt : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Hurt.png"), 0, 0, 130, 200, 2, 0.1, false, false),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Idle.png"), 0, 0, 128, 200, 7, 0.1, false, true),
            RightProtect : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Protect.png"), 0, 0, 130, 200, 1, 0.1, false, true),
            RightRun : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run.png"), 0, 0, 128, 200, 8, 0.1, false, true),
            RightRunattack : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run+attack.png"), 0, 0, 128, 200, 7, 0.1, false, false),
            RightWalk : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Walk.png"), 0, 0, 128, 200, 7, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_1.png"), 616, 0, 128, 200, 5, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_2.png"), 750, 0, 128, 200, 6, 0.1, true, false),
            LeftAttack3 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_3.png"), 504, 0, 128, 200, 4, 0.1, true, false),
            LeftDead : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Dead.png"), 504, 0, 128, 200, 4, 0.1, true, false),
            LeftHurt : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Hurt.png"), 256, 0, 128, 200, 2, 0.1, true, false),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Idle.png"), 904, 0, 128, 200, 7, 0.1, true, true),
            LeftProtect : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Protect.png"), 128, 0, 130, 200, 1, 0.1, true, true),
            LeftRun : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run.png"), 1032, 0, 128, 200, 8, 0.1, true, true),
            LeftRunattack : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run+attack.png"), 904, 0, 128, 200, 7, 0.1, true, false),
            LeftWalk : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Walk.png"), 904, 0, 128, 200, 7, 0.1, true, true)

        }

        this.currentState = 'LeftIdle'

	};

    save() {
        this.self.x = this.x;
        this.self.y = this.y;
        this.self.hp = this.hp;
    }

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
            console.error(`State '${state}' not found.`);
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.aggro) {
            if (this.currentState === "LeftWalk") {
                this.BB = new BoundingBox(this.x + 130 - this.game.camera.x, this.y + 140 - this.game.camera.y, 75, 115);
            } else {
                this.BB = new BoundingBox(this.x + 75 - this.game.camera.x, this.y + 140 - this.game.camera.y, 60, 115);
            }
        } else {
            this.BB = new BoundingBox(this.x - this.game.camera.x - 250, this.y + 128 - this.game.camera.y, 700, 128);
        }
    }

    takeDamage(damageAmount) {
        this.hp -= damageAmount;
    }

	update() {
        const clockTick = this.game.clockTick;

        if (this.dead) {
            if (this.currentState !== "LeftDead" || this.currentState !== "LeftDead") {
                if (this.facingLeft) {
                    this.setState('LeftDead');
                } else {
                    this.setState('RightDead');
                }
            }
            this.updateBB();
            return;
        }

        this.colliding = {
            right: false,
            left: false,
            down: false,
            up: false,
        }
        let skeleton = this;
        
        this.game.entities.forEach((entity) => {
            if (entity.BB && skeleton.BB.collide(entity.BB)) {
                const overlap = entity.BB.overlap(skeleton.BB);
                if (entity instanceof DungeonWall) {
                    if (entity.BB.x > skeleton.BB.x) {
                        this.colliding.right = true;
                        skeleton.x += overlap.x;
                    } else if (entity.BB.x < skeleton.BB.x) {
                        this.colliding.left = true;
                        skeleton.x -= overlap.x;
                    }
                } else if (entity instanceof DungeonGround || entity instanceof DungeonGround2 || entity instanceof DungeonGround4) {
                    let horizontalCollision = overlap.x > 0 && overlap.x < overlap.y;
                    let verticalCollision = overlap.y > 0 && overlap.y < overlap.x;

                    if (horizontalCollision) {
                        if (entity.BB.x < skeleton.BB.x) {
                            skeleton.x += overlap.x;
                        } else {
                            skeleton.x -= overlap.x;
                        }
                    } else if (verticalCollision) {
                        if (entity.BB.y < skeleton.BB.y) {
                            this.colliding.down = true;
                            skeleton.y += overlap.y;
                        } else {
                            this.colliding.up = true;
                            skeleton.y -= overlap.y - 1;
                        }
                        skeleton.velocityY = 0;
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
            this.dead = true;
        }

        if (this.hp <= 0) {
            setTimeout(() => {
                this.removeFromWorld = true;
            }, 1000);
            this.game.camera.knight.addEmbers(this.emberQuantity);
            this.dead = true;
        }
        this.updateBB();

        if (this.currentState === 'RightRun' || this.currentState === 'RightRunattack') {
            this.x += this.runSpeed * clockTick;
        } else if (this.currentState === 'LeftRun' || this.currentState === 'LeftRunattack') {
            this.x -= this.runSpeed * clockTick;
        } else if (this.currentState === 'RightWalk') {
            this.x += this.walkSpeed * clockTick;
        }else if (this.currentState === 'LeftWalk') {
            this.x -= this.walkSpeed * clockTick;
        }
        if (this.inCutscene) {
            return;
        }

        this.attackNumber = Math.floor(Math.random() * 3);
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Knight && entity.x - skeleton.x > 500 && skeleton.aggro) {
                skeleton.facingLeft = false;
                skeleton.setState('RightRun')
            } else if (entity instanceof Knight && skeleton.x - entity.x > 500 && skeleton.aggro) {
                skeleton.facingLeft = true;
                skeleton.setState('LeftRun')
            } else if (entity instanceof Knight && skeleton.aggro) {
                if (skeleton.currentState === 'RightRun' &&  entity.x - skeleton.x < 400) {
                    skeleton.setState("RightRunattack");
                } else if (skeleton.currentState === 'LeftRun' && skeleton.x - entity.x < 400) {
                    skeleton.setState("LeftRunattack");
                }
            }
            if (entity instanceof Knight) {
                if (skeleton.animations[skeleton.currentState].getDone() || skeleton.currentState === "LeftWalk"
                    || skeleton.currentState === "RightWalk") {
                    if (entity.x > skeleton.x) {
                        // Knight is to the right
                        if (skeleton.aggro) {
                            skeleton.facingLeft = false;
                            skeleton.setState('RightWalk');
                        }
                    } else if (entity.x < skeleton.x) {
                        // Knight is to the left
                        if (skeleton.aggro) {
                            skeleton.facingLeft = true;
                            skeleton.setState('LeftWalk');
                        }
                    }
                }
            }
            if (entity.BB && skeleton.BB.collide(entity.BB)) {
                if (entity instanceof Knight && !skeleton.aggro) {
                    skeleton.target = entity;
                    skeleton.aggro = true;
                    if (skeleton.facingLeft) {
                        skeleton.setState('LeftWalk');
                    } else {
                        skeleton.setState('RightWalk')
                    }
                } else if (entity instanceof Knight && skeleton.aggro) {
                    if (entity.currentState === 'RightAttack1') {
                        skeleton.setState('LeftHurt')
                        return;
                    } else if (entity.currentState === 'LeftAttack1') {
                        skeleton.setState('RightHurt')
                        return;
                    } else {
                        if (skeleton.currentState !== 'LeftAttack1' && skeleton.currentState !== 'LeftAttack2'
                            && skeleton.currentState !== 'LeftAttack3' && skeleton.currentState !== 'RightAttack1'
                            && skeleton.currentState !== 'RightAttack2' && skeleton.currentState !== 'RightAttack3'
                            && skeleton.currentState !== 'RightRunattack' && skeleton.currentState !== 'LeftRunattack') {
                            if (skeleton.facingLeft) {
                                if (skeleton.attackNumber === 0) {
                                    skeleton.setState('LeftAttack1');
                                } else if (skeleton.attackNumber === 1) {
                                    skeleton.setState('LeftAttack2');
                                } else {
                                    skeleton.setState('LeftAttack3');
                                }
                            } else {
                                if (skeleton.attackNumber === 0) {
                                    skeleton.setState('RightAttack1');
                                } else if (skeleton.attackNumber === 1) {
                                    skeleton.setState('RightAttack2');
                                } else {
                                    skeleton.setState('RightAttack3');
                                }
                            }
                        }
                        entity.takeDamage(skeleton.damage);
                    }
                }
            }
        });
	};

	draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
        this.BB.draw(ctx);
        if (this.healthBar) this.healthBar.draw(ctx);
	};
}