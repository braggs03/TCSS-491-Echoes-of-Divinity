class Celes {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.updateBB();
        this.maxHp = 2000;
        this.hp = 2000;
        this.height = 100;
        this.bheight = 0;
        this.healthBar = new HealthBar(this);
        this.updateBB();
        this.inCutscene = false;
        this.facingLeft = true;
        this.target = null;

        this.animations = {
            LeftAttack1: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack1.png"), 1280, 0, 128, 128, 10, 0.1, true, false),
            LeftAttack2: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack2.png"), 512, 0, 128, 128, 4, 0.15, true, false),
            LeftDead: new Animator(ASSET_MANAGER.getAsset(CELES + "Dead.png"), 640, 0, 128, 128, 5, 0.5, true, false),
            LeftHurt: new Animator(ASSET_MANAGER.getAsset(CELES + "Hurt.png"), 384, 0, 128, 128, 3, 0.15, true, false),
            LeftIdle: new Animator(ASSET_MANAGER.getAsset(CELES + "Idle.png"), 896, 0, 128, 128, 7, 0.15, true, true),
            LeftJump: new Animator(ASSET_MANAGER.getAsset(CELES + "Jump.png"), 1024, 0, 128, 128, 8, 0.15, true, false),
            LeftLightCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "LightCharge.png"), 1664, 0, 128, 128, 12, 0.1, true, false),
            LeftRun: new Animator(ASSET_MANAGER.getAsset(CELES + "Run.png"), 1024, 0, 128, 128, 8, 0.1, true, true),
            LeftWalk: new Animator(ASSET_MANAGER.getAsset(CELES + "Walk.png"), 896, 0, 128, 128, 7, 0.15, true, true),
            RightAttack1: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack1.png"), 0, 0, 128, 128, 10, 0.1, false, false),
            RightAttack2: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack2.png"), 0, 0, 128, 128, 4, 0.15, false, false),
            RightDead: new Animator(ASSET_MANAGER.getAsset(CELES + "Dead.png"), 0, 0, 128, 128, 5, 0.5, false, false),
            RightHurt: new Animator(ASSET_MANAGER.getAsset(CELES + "Hurt.png"), 0, 0, 128, 128, 3, 0.15, false, false),
            RightIdle: new Animator(ASSET_MANAGER.getAsset(CELES + "Idle.png"), 0, 0, 128, 128, 7, 0.15, false, true),
            RightJump: new Animator(ASSET_MANAGER.getAsset(CELES + "Jump.png"), 0, 0, 128, 128, 8, 0.15, false, false),
            RightLightCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "LightCharge.png"), 0, 0, 128, 128, 12, 0.1, false, false),
            RightRun: new Animator(ASSET_MANAGER.getAsset(CELES + "Run.png"), 0, 0, 128, 128, 8, 0.1, false, true),
            RightWalk: new Animator(ASSET_MANAGER.getAsset(CELES + "Walk.png"), 0, 0, 128, 128, 7, 0.15, false, true)
        }

        this.currentState = 'LeftLightCharge';
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
        if (this.currentState === 'LeftIdle') {
            this.BB = new BoundingBox(this.x + 110, this.y + 115, 65, 115);
        } else if (this.currentState === 'RightIdle') {
            this.BB = new BoundingBox(this.x + 65, this.y + 115, 55, 115);
        } else if (this.currentState === 'LeftAttack1') {
            this.BB = new BoundingBox(this.x + 15, this.y + 115, 155, 115);
        } else if (this.currentState === 'RightAttack1') {
            this.BB = new BoundingBox(this.x + 65, this.y + 115, 155, 115);
        } else if (this.currentState === 'LeftAttack2') {
            this.BB = new BoundingBox(this.x + 40, this.y + 115, 155, 115);
        } else if (this.currentState === 'RightAttack2') {
            this.BB = new BoundingBox(this.x + 40, this.y + 115, 155, 115);
        } else if (this.currentState === 'LeftLightCharge') {
            this.BB = new BoundingBox(this.x + 0, this.y + 115, 200, 115);
        } else if (this.currentState === 'RightLightCharge') {
            this.BB = new BoundingBox(this.x + 40, this.y + 115, 185, 115);
        } else if (this.currentState === 'LeftRun') {
            this.BB = new BoundingBox(this.x + 80, this.y + 115, 75, 115);
        } else {
            this.BB = new BoundingBox(this.x + 80, this.y + 115, 75, 115);
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
            this.target.emberCount += 1500;
            this.dead = true;
        }
        this.updateBB();
        if (this.currentState === 'RightRun') {
            this.x += 500 * this.game.clockTick;
        } else if (this.currentState === 'LeftRun') {
            this.x -= 500 * this.game.clockTick;
        } else if (this.currentState === 'RightWalk') {
            this.x += 150 * this.game.clockTick;
        }else if (this.currentState === 'LeftWalk') {
            this.x -= 150 * this.game.clockTick;
        }
        if (this.hp <= 1900 && !this.inCutscene) {
            this.specialAttack();
            this.inCutscene = true;
            this.setState('LeftIdle')
        }
        if (this.inCutscene) {
            return;
        }
        if (!this.target) {
            this.target = this.game.entities.find(entity =>
                entity instanceof Knight && !entity.dead
            );
        }

        this.attackNumber = Math.floor(Math.random() * 3);
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Knight && entity.x - that.x > 500) {
                that.facingLeft = false;
                that.setState('RightRun')
            } else if (entity instanceof Knight && that.x - entity.x > 500) {
                that.facingLeft = true;
                that.setState('LeftRun')
            }
            if (entity instanceof Knight) {
                if (that.animations[that.currentState].getDone()) {
                    if (entity.x > that.x) {
                        // Knight is to the right
                        that.facingLeft = false;
                        that.setState('RightWalk');
                    } else if (entity.x < that.x) {
                        // Knight is to the left
                        that.facingLeft = true;
                        that.setState('LeftWalk');
                    }
                }
            }
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (!that.animations[that.currentState].getDone()
                    && that.currentState !== "LeftWalk" && that.currentState !== "RightWalk"
                    && that.currentState !== "LeftRun" && that.currentState !== "RightRun") {
                    return;
                }
                if (entity instanceof Knight) {
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
                            && that.currentState !== 'RightAttack2' && that.currentState !== 'RightAttack1') {
                            if (that.facingLeft) {
                                if (that.attackNumber === 0) {
                                    that.setState('LeftAttack1');
                                } else if (that.attackNumber === 1) {
                                    that.setState('LeftAttack2');
                                } else {
                                    that.setState('LeftLightCharge');
                                }
                            } else {
                                if (that.attackNumber === 0) {
                                    that.setState('RightAttack1');
                                } else if (that.attackNumber === 1) {
                                    that.setState('RightAttack2');
                                } else {
                                    that.setState('RightLightCharge')
                                }
                            }
                        }
                        entity.takeDamage(50);
                    }
                }
            }
        });
    };



    specialAttack() {
        if (!this.isLightning) {
            this.lightning = new Lightning(this.game, this.x, 40, true)
            this.isLightning = true;
        }
        this.game.entities.splice(1, 0, this.lightning);
        this.x = 1000;
        this.y = -30;


        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, 2000);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, 4000);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, 6000);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, 8000);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, 10000);
    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.8);
        this.BB.draw(ctx);
        if (this.healthBar) this.healthBar.draw(ctx);
    }
}