class SkeletonWarrior {
	constructor(game, x, y) {
		this.game = game;
        this.target = null;
        this.x = x
        this.y = y
        this.maxHp = 500;
        this.hp = 500;
        this.height = 100;
        this.bheight = 0;
        this.healthBar = new HealthBar(this);
        this.updateBB();
        this.inCutscene = false;
        this.aggro = false;
        this.facingLeft = true;

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

	update() {
        if (this.dead) {
            if (this.currentState !== "LeftDead" || this.currentState !== "LeftDead") {
                if (this.facingLeft) {
                    this.setState('LeftDead');
                } else {
                    this.setState('RightDead');
                }
            }
            return;
        }
        if (this.hp <= 0) {
            setTimeout(() => {
                this.removeFromWorld = true;
            }, 1000);
            this.target.emberCount += 100;
            this.dead = true;
        }
        this.updateBB();
        if (this.currentState === 'RightRun' || this.currentState === 'RightRunattack') {
            this.x += 500 * this.game.clockTick;
        } else if (this.currentState === 'LeftRun' || this.currentState === 'LeftRunattack') {
            this.x -= 500 * this.game.clockTick;
        } else if (this.currentState === 'RightWalk') {
            this.x += 150 * this.game.clockTick;
        }else if (this.currentState === 'LeftWalk') {
            this.x -= 150 * this.game.clockTick;
        }
        if (this.inCutscene) {
            return;
        }
        this.attackNumber = Math.floor(Math.random() * 3);
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Knight && entity.x - that.x > 500 && that.aggro) {
                that.facingLeft = false;
                that.setState('RightRun')
            } else if (entity instanceof Knight && that.x - entity.x > 500 && that.aggro) {
                that.facingLeft = true;
                that.setState('LeftRun')
            } else if (entity instanceof Knight && that.aggro) {
                if (that.currentState === 'RightRun' &&  entity.x - that.x < 400) {
                    that.setState("RightRunattack");
                } else if (that.currentState === 'LeftRun' && that.x - entity.x < 400) {
                    that.setState("LeftRunattack");
                }
            }
            if (entity instanceof Knight) {
                if (that.animations[that.currentState].getDone() || that.currentState === "LeftWalk"
                    || that.currentState === "RightWalk") {
                    if (entity.x > that.x) {
                        // Knight is to the right
                        if (that.aggro) {
                            that.facingLeft = false;
                            that.setState('RightWalk');
                        }
                    } else if (entity.x < that.x) {
                        // Knight is to the left
                        if (that.aggro) {
                            that.facingLeft = true;
                            that.setState('LeftWalk');
                        }
                    }
                }
            }
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Knight && !that.aggro) {
                    that.target = entity;
                    that.aggro = true;
                    if (that.facingLeft) {
                        that.setState('LeftWalk');
                    } else {
                        that.setState('RightWalk')
                    }
                } else if (entity instanceof Knight && that.aggro) {
                    if (entity.currentState === 'RightAttack1') {
                        that.setState('LeftHurt')
                        that.hp -= entity.damage;
                        that.x += 75;
                        return;
                    } else if (entity.currentState === 'LeftAttack1') {
                        that.setState('RightHurt')
                        that.hp -= entity.damage;
                        that.x -= 75;
                        return;
                    } else {
                        if (that.currentState !== 'LeftAttack1' && that.currentState !== 'LeftAttack2'
                            && that.currentState !== 'LeftAttack3' && that.currentState !== 'RightAttack1'
                            && that.currentState !== 'RightAttack2' && that.currentState !== 'RightAttack3'
                            && that.currentState !== 'RightRunattack' && that.currentState !== 'LeftRunattack') {
                            if (that.facingLeft) {
                                if (that.attackNumber === 0) {
                                    that.setState('LeftAttack1');
                                } else if (that.attackNumber === 1) {
                                    that.setState('LeftAttack2');
                                } else {
                                    that.setState('LeftAttack3');
                                }
                            } else {
                                if (that.attackNumber === 0) {
                                    that.setState('RightAttack1');
                                } else if (that.attackNumber === 1) {
                                    that.setState('RightAttack2');
                                } else {
                                    that.setState('RightAttack3');
                                }
                            }
                        }
                        entity.takeDamage(50);

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