class Duma {
    constructor(game, x, y) {
        this.game = game;
        this.target = null;
        this.x = x
        this.y = y
        this.updateBB();
        this.maxHp = 4000;
        this.hp = 4000;
        this.height = 100;
        this.bheight = 0;
        this.healthBar = new HealthBar(this);
        this.inCutscene = false;
        this.target = null;
        this.specialAttackTransition = false;
        this.specialAttack2Transition = false;
        this.specialAttackX = false;
        this.specialAttackY = false;
        this.goDown = false;
        this.goRight = false;
        this.goLeft = false;
        this.facingLeft = true;
        this.attackChargeRun = false;
        this.phaseOne = true;
        this.phaseTwo = false
        this.test = false;

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack.png"), 0, 0, 240, 192, 11, 0.1, true, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack2.png"), 0, 0, 192, 176, 8, 0.1, false, false),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(DUMA + "Idle.png"), 0, 0, 160, 144, 6, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack.png"), 2640, 0, 240, 192, 11, 0.1, false, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack2.png"), 1536, 0, 192, 176, 8, 0.1, false, false),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(DUMA + "Idle.png"), 960, 0, 160, 144, 6, 0.1, true, true),
        }
        this.currentState = 'LeftIdle'
    }

    setState(state) {
        if (this.currentState === 'LeftIdle' && state === 'LeftAttack1') {
            this.x -= 200;
            this.y -= 125;
        }
        if (this.currentState === 'LeftIdle' && state === 'RightAttack1') {
            this.x -= 200;
            this.y -= 125;
        }
        if (this.currentState === 'LeftAttack1' && state === 'LeftIdle') {
            this.x += 200;
            this.y += 125;
        }
        if (this.currentState === 'RightAttack1' && state === 'RightIdle') {
            this.y += 125;
        }
        if (this.currentState === 'RightIdle' && state === 'RightAttack1') {
            this.y -= 125;
        }
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
        if (this.currentState === 'LeftIdle') {
            this.bodyBB = null;
            this.BB = new BoundingBox(this.x + 100 - this.game.camera.x, this.y + 140, 175, 250);
        } else if (this.currentState === 'LeftAttack1') {
            if (this.animations[this.currentState].currentFrame() < 7) { // Wind-up phase
                this.BB = new BoundingBox(this.x + 300 - this.game.camera.x, this.y + 240, 175, 250);
                this.bodyBB = this.BB;
            } else {
                this.BB = new BoundingBox(this.x + 50 - this.game.camera.x, this.y + 325, 300, 200);
            }
        } else if (this.currentState === 'RightAttack1') {
            if (this.animations[this.currentState].currentFrame() < 7) { // Wind-up phase
                this.BB = new BoundingBox(this.x + 200 - this.game.camera.x, this.y + 240, 175, 250);
                this.bodyBB = this.BB;
            } else {
                this.BB = new BoundingBox(this.x + 370 - this.game.camera.x, this.y + 325, 300, 200);
            }
        } else if (this.currentState === 'RightIdle') {
            this.bodyBB = null;
            this.BB = new BoundingBox(this.x + 200 - this.game.camera.x, this.y + 140, 175, 250);
        } else {
            this.bodyBB = null;
            this.BB = new BoundingBox(this.x + 100 - this.game.camera.x, this.y + 140, 175, 250);
        }
    }

    update() {
        if (this.inCutscene) {
            return;
        }
        if (!this.target) {
            this.target = this.game.entities.find(entity =>
                entity instanceof Knight && !entity.dead
            );
        }

        if (this.goDown) {
            if (this.y < 275) {
                this.y += 200 * this.game.clockTick;
            } else {
                this.goDown = false;
            }
        }

        if (this.goRight) {
            if (this.currentState === 'RightAttack1') {
                if (this.animations[this.currentState].currentFrame() < 6) {
                    return
                }
                if (this.x < 600) {
                    this.x += 900 * this.game.clockTick;
                } else {
                    this.goRight = false;
                    if (this.attackChargeRun) {
                        this.attackChargeRun = false
                    }
                    this.setState('LeftIdle');
                }
            } else {
                if (this.x < 700) {
                    this.x += 900 * this.game.clockTick;
                } else {
                    this.goRight = false;
                    this.setState('LeftIdle')
                }
            }
        }

        if (this.goLeft) {
            if (this.currentState === 'LeftAttack1') {
                if (this.animations[this.currentState].currentFrame() < 6) {
                    return
                }
                if (this.x > -100) {
                    this.x -= 600 * this.game.clockTick;
                } else {
                    this.goLeft = false;
                    if (this.attackChargeRun) {
                        this.goRight = true;
                    } else {
                        this.setState('RightIdle');
                    }
                }
            } else {
                if (this.x > 100) {
                    this.x -= 600 * this.game.clockTick;
                } else {
                    this.goLeft = false;
                    this.setState('RightIdle')
                }
            }
        }

        if (this.currentState === 'LeftAttack1' || this.currentState === 'RightAttack1') {
            let animation = this.animations[this.currentState];

            if (!this.loopCount) this.loopCount = 0; // Initialize loop count

            let frame8Time = animation.frameDuration * 8;
            let frame10Time = animation.frameDuration * 10;
            if (animation.elapsedTime >= frame10Time && this.loopCount < 7) {
                if (animation.currentFrame() === 10) {
                    this.loopCount++; // Increment loop count when frame 10 is reached
                }
                animation.elapsedTime = frame8Time;
            } else if (this.loopCount >= 7 && animation.currentFrame() < 11) {
                animation.elapsedTime += animation.frameDuration;
            } else if (animation.currentFrame() === 11 && animation.getDone()) {
                if (this.currentState === 'LeftAttack1') {
                    this.x += 200;
                }
                this.y += 125;
                this.loopCount = 0;
            }
        }
        if (this.hp < 2000 && !this.test) {
            this.test = true;
            this.phaseOne = false;
            this.phaseTwo = true;
            this.specialAttackTransition = true;
        }

        if (this.animations[this.currentState].getDone() || (this.currentState === 'LeftIdle' || this.currentState === 'RightIdle')) {
            if (this.target.x > this.x) {
                this.facingLeft = false;
                setTimeout(() => {
                    this.goRight = true;
                }, 2000);
                this.setState('RightIdle')
            } else if (this.target.x < this.x) {
                this.facingLeft = true;
                setTimeout(() => {
                    this.goLeft = true;
                }, 2000);
                this.setState('LeftIdle')
            }
        }

        if (this.phaseOne) {
            if (this.currentState === 'LeftIdle' || this.currentState === 'RightIdle') {
                this.goRight = false;
                this.goLeft = false;
                if (this.facingLeft && this.x - this.target.x < 300) {
                    if (this.currentState !== 'LeftAttack1') {
                        this.setState('LeftAttack1')
                    }
                }
                if (!this.facingLeft && this.target.x - this.x < 300) {
                    if (this.currentState !== 'RightAttack1') {
                        this.x -= 0;
                        this.y -= 125;
                        this.setState('RightAttack1')
                    }
                }
            }
        }

        if (this.phaseTwo) {
            if (this.specialAttackTransition) {
                if (this.facingLeft) {
                    if (this.x > 470) {
                        this.x -= 200 * this.game.clockTick;
                    } else {
                        this.specialAttackX = true;
                    }
                } else {
                    if (this.x < 470) {
                        this.x += 200 * this.game.clockTick;
                    } else {
                        this.specialAttackX = true;
                    }
                }
                if (this.y > 0) {
                    this.y -= 200 * this.game.clockTick;
                } else {
                    this.specialAttackY = true;
                }
                if (this.specialAttackX && this.specialAttackY) {
                    if (this.currentState === 'LeftIdle') {
                        this.x -= 70;
                        this.y -= 120;
                    }
                    this.setState('LeftAttack2');
                    if (this.animations[this.currentState].currentFrame() > 4) {
                        this.specialAttack();
                        this.specialAttackX = false;
                        this.specialAttackY = false;
                        this.specialAttackTransition = false;
                    }
                }
                return;
            }

            if (this.currentState === 'LeftAttack2') {
                if (this.hp < 2000 && !this.specialAttack2Transition) {
                    this.specialAttack2Transition = true;
                    setTimeout(() => {
                        this.x -= 70;
                        this.y -= 120;
                        this.setState('LeftAttack2')
                    }, 2000);
                    setTimeout(() => {
                        this.specialAttack2()
                    }, 2800);
                    setTimeout(() => {
                        this.goDown = true;
                    }, 3000);
                }
            }
        }

        if ((this.currentState === 'LeftAttack1' || this.currentState === 'RightAttack1')  && this.animations[this.currentState].currentFrame() > 7) {
            if (this.target.BB && this.BB.collide(this.target.BB)) {
                this.target.takeDamage(50);
            }
        }

        if (this.target.currentState === 'LeftAttack1' || this.target.currentState === 'RightAttack1') {
            if (this.target.BB && this.BB.collide(this.target.BB) || this.bodyBB && this.bodyBB.collide(this.target.BB)) {
                this.hp -= this.target.damage;
            }
        }

        this.updateBB();
    }

    attackCharge() {
        this.attackChargeRun = true;
        this.x -= 200;
        this.y -= 125;
        this.setState('LeftAttack1')
        this.goLeft = true;
    }

    specialAttack() {
        this.fireBomb = new FireBomb(this.game, 0, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
        this.fireBomb = new FireBomb(this.game, 300, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
        this.fireBomb = new FireBomb(this.game, 600, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
        this.fireBomb = new FireBomb(this.game, 900, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
    }

    specialAttack2() {
        this.lightning = new Lightning(this.game, 0, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 100, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 200, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 300, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 400, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 500, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 600, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 700, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 800, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 950, -280, true)
        this.game.entities.splice(1, 0, this.lightning);
    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        this.BB.draw(ctx);
        if (this.bodyBB) { this.bodyBB.draw(ctx); }
        if (this.healthBar) { this.healthBar.draw(ctx); }
    };
}