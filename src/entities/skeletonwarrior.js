class SkeletonWarrior {
	constructor(game, x, y) {
		this.game = game;
        this.target = null;
        this.x = x
        this.y = y
        this.updateBB();

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

        this.currentState = 'RightIdle'

	};

    setState(state) {
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error("State '${state}' not found.");
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 100 - this.game.camera.x, this.y + 140, 100, 115)
    }

	update() {
        if (this.dead) {
            this.target.emberCount += 100;
            return;
        }
        if (this.hp <= 0) {
            if (this.facingLeft) {
                this.setState('LeftDead');
            } else {
                this.setState('RightDead');
            }
            this.dead = true;
        }

        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.x - that.x > 500) {
                that.aggro = false;
                that.facingLeft = false;
                that.setState('RightIdle1')
            } else if (that.x - entity.x > 500) {
                that.aggro = false;
                that.facingLeft = true;
                that.setState('LeftIdle1')
            }
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Knight && !that.aggro) {
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
                        that.x += 50;
                        return;
                    } else if (entity.currentState === 'LeftAttack1') {
                        that.setState('RightHurt')
                        that.hp -= entity.damage;
                        that.x -= 50;
                        return;
                    } else if (entity.currentState === 'LeftRoll' || entity.currentState === 'RightRoll') {

                    } else {
                        if (that.facingLeft) {
                            entity.setState('RightDeath');
                        } else {
                            entity.setState('LeftDeath');
                        }
                        entity.dead = true;
                    }
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
            } else if (entity instanceof Knight) {
                that.target = entity;
                if (that.animations[that.currentState].getDone()) {
                    that.attackNumber = Math.floor(Math.random() * 3);
                    if (entity.x > that.x) {
                        // Knight is to the right
                        if (that.aggro) {
                            that.facingLeft = false;
                            that.setState('RightRun');
                        }
                    } else if (entity.x < that.x) {
                        // Knight is to the left
                        if (that.aggro) {
                            that.facingLeft = true;
                            that.setState('LeftRun');
                        }
                    }
                }
            }
        });

        if (this.currentState === 'RightRun' || this.currentState === 'RightRunattack') {
            this.x += 500 * this.game.clockTick;
        } else if (this.currentState === 'LeftRun' || this.currentState === 'LeftRunattack') {
            this.x -= 500 * this.game.clockTick;
        } else if (this.currentState === 'RightWalk') {
            this.x += 100 * this.game.clockTick;
        }else if (this.currentState === 'LeftWalk') {
            this.x -= 100 * this.game.clockTick;
        }
        this.updateBB();
	};

	draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        this.BB.draw(ctx);
	};
}