class Celes {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.maxHp = 2000;
        this.hp = 2000;
        this.height = 100;
        this.bheight = 0;
        this.healthBar = new HealthBar(this);
        this.inCutscene = false;
        this.facingLeft = true;
        this.target = null;
        this.counter = 2000;
        this.lightningTime = 2500;

        this.animations = {
            LeftAttack1: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack1.png"), 1280, 0, 128, 128, 10, 0.075, true, false),
            LeftAttack2: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack2.png"), 512, 0, 128, 128, 4, 0.15, true, false),
            LeftDead: new Animator(ASSET_MANAGER.getAsset(CELES + "Dead.png"), 640, 0, 128, 128, 5, 0.1, true, false),
            LeftHurt: new Animator(ASSET_MANAGER.getAsset(CELES + "Hurt.png"), 384, 0, 128, 128, 3, 0.15, true, false),
            LeftIdle: new Animator(ASSET_MANAGER.getAsset(CELES + "Idle.png"), 896, 0, 128, 128, 7, 0.15, true, true),
            LeftJump: new Animator(ASSET_MANAGER.getAsset(CELES + "Jump.png"), 1024, 0, 128, 128, 8, 0.15, true, false),
            LeftLightCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "LightCharge.png"), 1664, 0, 128, 128, 12, 0.1, true, false),
            LeftRun: new Animator(ASSET_MANAGER.getAsset(CELES + "Run.png"), 1024, 0, 128, 128, 8, 0.1, true, true),
            LeftWalk: new Animator(ASSET_MANAGER.getAsset(CELES + "Walk.png"), 896, 0, 128, 128, 7, 0.15, true, true),

            RightAttack1: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack1.png"), 0, 0, 128, 128, 10, 0.075, false, false),
            RightAttack2: new Animator(ASSET_MANAGER.getAsset(CELES + "Attack2.png"), 0, 0, 128, 128, 4, 0.15, false, false),
            RightDead: new Animator(ASSET_MANAGER.getAsset(CELES + "Dead.png"), 0, 0, 128, 128, 5, 0.1, false, false),
            RightHurt: new Animator(ASSET_MANAGER.getAsset(CELES + "Hurt.png"), 0, 0, 128, 128, 3, 0.15, false, false),
            RightIdle: new Animator(ASSET_MANAGER.getAsset(CELES + "Idle.png"), 0, 0, 128, 128, 7, 0.15, false, true),
            RightJump: new Animator(ASSET_MANAGER.getAsset(CELES + "Jump.png"), 0, 0, 128, 128, 8, 0.15, false, false),
            RightLightCharge: new Animator(ASSET_MANAGER.getAsset(CELES + "LightCharge.png"), 0, 0, 128, 128, 12, 0.1, false, false),
            RightRun: new Animator(ASSET_MANAGER.getAsset(CELES + "Run.png"), 0, 0, 128, 128, 8, 0.1, false, true),
            RightWalk: new Animator(ASSET_MANAGER.getAsset(CELES + "Walk.png"), 0, 0, 128, 128, 7, 0.15, false, true)
        }
        this.updateBB();

        this.currentState = 'LeftIdle';
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

    takeDamage(amount) {
        this.hp -= amount;
        console.log(`MechaGolem takes ${amount} damage, remaining health: ${this.hp}`);

        if (this.hp <= 0) {
        }
    }

    update() {
        if (this.dead) {
            if (this.currentState !== 'LeftDead' && this.currentState !== 'RightDead') {
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
        if (this.hp <= 1500 && !this.inCutscene && this.counter >= 2000) {
            if (this.lightningTime >= 500) {
                this.lightningTime -= 500
            }
            this.counter = 0;
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

        if (!this.inCutscene && this.counter < 2000) {
            this.counter += 100 * this.game.clockTick;
        }

        this.attackNumber = Math.floor(Math.random() * 3);
        if (this.animations[this.currentState].getDone() || this.currentState === 'LeftIdle' || this.currentState === 'RightIdle'
            || this.currentState === 'LeftRun' || this.currentState === 'RightRun') {
            if (this.target.x > this.x) {
                    // Knight is to the right
                    this.facingLeft = false;
                    this.setState('RightRun');
                } else if (this.target.x < this.x) {
                    // Knight is to the left
                    this.facingLeft = true;
                    this.setState('LeftRun');
                }
            }
        if (this.target.BB && this.BB.collide(this.target.BB)) {
            if (!this.animations[this.currentState].getDone()
                && this.currentState !== "LeftWalk" && this.currentState !== "RightWalk"
                && this.currentState !== "LeftRun" && this.currentState !== "RightRun") {
                return;
            }
            if (this.target.currentState === 'RightAttack1') {
                this.setState('LeftHurt')
                return;
            } else if (this.target.currentState === 'LeftAttack1') {
                this.setState('RightHurt')
                return;
            } else {
                if (this.currentState !== 'LeftAttack1' && this.currentState !== 'LeftAttack2'
                    && this.currentState !== 'RightAttack2' && this.currentState !== 'RightAttack1') {
                    if (this.facingLeft) {
                        if (this.attackNumber === 0) {
                            this.setState('LeftAttack1');
                        } else if (this.attackNumber === 1) {
                            this.setState('LeftAttack2');
                        } else {
                            this.setState('LeftLightCharge');
                        }
                    } else {
                        if (this.attackNumber === 0) {
                            this.setState('RightAttack1');
                        } else if (this.attackNumber === 1) {
                            this.setState('RightAttack2');
                        } else {
                            this.setState('RightLightCharge')
                        }
                    }
                }
                this.target.takeDamage(100);
            }
        }
    };



    specialAttack() {
        if (!this.isLightning) {
            this.lightning = new Lightning(this.game, this.x, 40, true)
            this.isLightning = true;
        }
        this.game.entities.splice(1, 0, this.lightning);
        setTimeout(() => {
            this.y = -300;
        }, 500)


        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, this.lightningTime);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, this.lightningTime * 2);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, this.lightningTime * 3);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning);
        }, this.lightningTime * 4);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.target.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning)
        }, this.lightningTime * 5);

        setTimeout(() => {
            this.lightning = new Lightning(this.game, this.x, 40, true)
            this.game.entities.splice(1, 0, this.lightning)
            this.isLightning = false;
        }, this.lightningTime * 6);

        setTimeout(() => {
            this.y = 450;
            this.inCutscene = false;
        }, this.lightningTime * 6.2)

    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.8);
        this.BB.draw(ctx);
        if (this.healthBar) this.healthBar.draw(ctx);
    }
}